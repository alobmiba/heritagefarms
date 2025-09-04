import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/firebase-admin';
import { generateOrderCode } from '@/lib/order-code';

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

interface RateLimitRecord {
  c: number;
  t: number;
}

interface GlobalWithHits {
  __hits?: Map<string, RateLimitRecord>;
}

const OrderSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(z.object({
    sku: z.string(),
    name: z.string(),
    qty: z.number().int().positive(),
    price: z.number().int().nonnegative(),
  })).min(1),
  subtotal: z.number().int().nonnegative(),
  tax: z.number().int().nonnegative(),
  total: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  // Skip during build time
  if (isBuildTime()) {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 });
  }

  try {
    const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0];
    // basic rate limit (edge-safe, ephemeral)
    const key = `order:${ip}`;
    const globalWithHits = globalThis as GlobalWithHits;
    globalWithHits.__hits = globalWithHits.__hits || new Map<string, RateLimitRecord>();
    const now = Date.now();
    const rec = globalWithHits.__hits.get(key) || { c: 0, t: now };
    if (now - rec.t > 60000) { rec.t = now; rec.c = 0; }
    rec.c++; globalWithHits.__hits.set(key, rec);
    if (rec.c > 10) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

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
      orderItems = body.cartItems.map(item => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) * 100; // Convert to cents
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;
        return {
          sku: item.id,
          name: item.name,
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

    // Validate order data with Zod
    const orderData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      notes: body.message,
      items: orderItems,
      subtotal,
      tax,
      total
    };

    const parsed = OrderSchema.safeParse(orderData);
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
    console.error('Order submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

 