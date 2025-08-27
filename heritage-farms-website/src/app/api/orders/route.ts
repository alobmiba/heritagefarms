import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/firebase-admin';
import { generateOrderCode } from '@/lib/order-code';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { checkCSRF } from '@/lib/csrf-protection';
import { EnhancedOrderSchema, sanitizeText, sanitizeEmail, sanitizePhone, validateCartItem } from '@/lib/input-validation';

// Build-time check to prevent Firebase initialization during build
const isBuildTime = () => {
  return process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;
};

interface CartItem {
  id: string;
  name: string;
  localName: string;
  price: string;
  image: string;
  quantity: number;
}

interface OrderData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  message?: string;
  cartItems?: CartItem[];
  selectedProducts?: string[];
  totalPrice?: number;
  orderType: 'ecommerce' | 'mission';
}

// Order schema is now imported from input-validation.ts as EnhancedOrderSchema

export async function POST(request: NextRequest) {
  // Skip during build time
  if (isBuildTime()) {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 });
  }

  // Import rate limiter only when needed (not during build)
  const { default: rateLimiter } = await import('@/lib/rate-limiter');

  // CSRF Protection
  const csrfValid = await checkCSRF(request);
  if (!csrfValid) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const ip = (request.headers.get("x-forwarded-for") || "127.0.0.1").split(",")[0];

    try {
      await rateLimiter.consume(ip);
    } catch {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body: OrderData = await request.json();
    
    // Validate required fields based on order type
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields: name, email, and phone are required.' 
        },
        { status: 400 }
      );
    }

    // For ecommerce orders, require address fields
    if (body.orderType === 'ecommerce') {
      if (!body.address || !body.city || !body.postalCode) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Missing required fields: address, city, and postal code are required for delivery orders.' 
          },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please enter a valid email address.' 
        },
        { status: 400 }
      );
    }

    // Validate phone number
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = body.phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please enter a valid phone number.' 
        },
        { status: 400 }
      );
    }

    // Validate cart items for ecommerce orders
    if (body.orderType === 'ecommerce') {
      if (!body.cartItems || body.cartItems.length === 0) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Cart is empty. Please add items to your cart before placing an order.' 
          },
          { status: 400 }
        );
      }

      if (!body.totalPrice || body.totalPrice <= 0) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Invalid order total. Please refresh and try again.' 
          },
          { status: 400 }
        );
      }
    }

    // Convert legacy order format to new format for Firebase
    let orderItems: Array<{
      sku: string;
      name: string;
      qty: number;
      price: number;
    }> = [];
    let subtotal = 0;
    let total = 0;

    if (body.orderType === 'ecommerce' && body.cartItems) {
      // Validate each cart item
      for (const item of body.cartItems) {
        if (!validateCartItem(item)) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Invalid cart item data. Please refresh and try again.' 
            },
            { status: 400 }
          );
        }
      }
      
      // Fetch actual prices from database to prevent price manipulation
      // In production, prices should be fetched from your product database
      // For now, we'll use the provided prices but validate them
      orderItems = body.cartItems.map(item => {
        // Parse price safely - ensure it's a valid number
        const priceString = item.price.replace(/[^0-9.]/g, '');
        const price = Math.round(parseFloat(priceString) * 100); // Convert to cents
        
        // Validate price is reasonable (between $0.01 and $10,000)
        if (price < 1 || price > 1000000) {
          throw new Error('Invalid item price');
        }
        
        // Validate quantity
        if (item.quantity < 1 || item.quantity > 100) {
          throw new Error('Invalid item quantity');
        }
        
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;
        
        return {
          sku: sanitizeText(item.id, 50),
          name: sanitizeText(item.name, 200),
          qty: item.quantity,
          price: price
        };
      });
    } else if (body.selectedProducts) {
      // For mission orders, create placeholder items
      orderItems = body.selectedProducts.map(product => ({
        sku: product.toLowerCase().replace(/\s+/g, '-'),
        name: product,
        qty: 1,
        price: 0 // Will be calculated by admin
      }));
    }

    total = subtotal;
    const tax = 0; // No tax for now

    // Validate order data with enhanced schema
    const orderData = {
      name: sanitizeText(body.name, 100),
      email: sanitizeEmail(body.email),
      phone: sanitizePhone(body.phone),
      address: body.address ? sanitizeText(body.address, 200) : undefined,
      city: body.city ? sanitizeText(body.city, 100) : undefined,
      postalCode: body.postalCode ? sanitizeText(body.postalCode, 10) : undefined,
      message: body.message ? sanitizeText(body.message, 1000) : undefined,
      items: orderItems,
      subtotal,
      tax,
      total
    };

    const parsed = EnhancedOrderSchema.safeParse(orderData);
    if (!parsed.success) {
      return NextResponse.json({ 
        error: "Invalid order", 
        details: parsed.error.issues 
      }, { status: 400 });
    }

    // Generate order code and save to Firebase
    const code = generateOrderCode();
    const ts = Date.now();
    const doc = {
      ...parsed.data,
      code,
      status: "pending_payment",
      createdAt: ts,
      updatedAt: ts,
    };

    const db = getDb();
    const ref = await db.collection("orders").add(doc);
    const instructions = {
      pay_to: "heritagefieldsandacreage@gmail.com",
      amount_cents: parsed.data.total,
      currency: "CAD",
      message: `ORDER ${code} - please include this code in your Interac e-Transfer note`,
    };

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully! Please complete your Interac e-Transfer payment.',
      orderId: ref.id,
      code,
      status: "pending_payment",
      instructions
    }, { status: 200 });

  } catch (error) {
    // Log error securely without exposing sensitive details
    // In production, this should go to a secure logging service
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

 