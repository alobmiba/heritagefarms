import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
  try {
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

    // Generate unique order ID
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderId = `HF-${timestamp}-${randomString}`;
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Prepare order data for logging
    const orderData = {
      orderId,
      orderType: body.orderType,
      customer: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address || 'Not provided',
        city: body.city || 'Not provided',
        postalCode: body.postalCode || 'Not provided'
      },
      items: body.orderType === 'ecommerce' ? body.cartItems || [] : body.selectedProducts || [],
      totalPrice: body.orderType === 'ecommerce' ? (body.totalPrice || 0) : 0,
      message: body.message || 'No additional message',
      timestamp: new Date().toISOString(),
      paymentMethod: 'Interac e-Transfer',
      paymentEmail: 'payments@heritagefarms.ca'
    };

    // Log the order (in production, save to database)
    console.log('New Order Received:', orderData);

    // Send email notification (in production, use a proper email service)
    await sendOrderNotification(orderData);

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully! Please complete your Interac e-Transfer payment.',
      orderId,
      data: {
        customer: orderData.customer,
        items: orderData.items,
        totalPrice: orderData.totalPrice,
        paymentInstructions: {
          email: 'payments@heritagefarms.ca',
          amount: orderData.totalPrice,
          orderNumber: orderId,
          securityQuestion: 'Heritage Farm Order',
          securityAnswer: 'Produce',
          deadline: '24 hours'
        }
      }
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

// Helper function to send email notification (implement with your email service)
async function sendOrderNotification(orderData: {
  orderId: string;
  orderType: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: Array<{
    name: string;
    localName: string;
    quantity: number;
    price: string;
  }> | string[];
  totalPrice: number;
  message: string;
  timestamp: string;
  paymentMethod: string;
  paymentEmail: string;
}) {
    // Example implementation with a service like SendGrid, Mailgun, etc.
  let itemsText = '';
  if (orderData.orderType === 'ecommerce') {
    if (Array.isArray(orderData.items) && orderData.items.length > 0) {
      // Type guard to check if items are CartItem objects
      const cartItems = orderData.items as CartItem[];
      itemsText = cartItems.map((item) => 
        `- ${item.name} (${item.localName}): ${item.quantity} x ${item.price}`
      ).join('\n');
    } else {
      itemsText = 'No items';
    }
  } else {
    itemsText = Array.isArray(orderData.items) ? orderData.items.join(', ') : 'No products selected';
  }

  const emailContent = `
    New Order Received - Heritage Farms
    
    Order ID: ${orderData.orderId}
    Order Type: ${orderData.orderType}
    
    Customer Information:
    Name: ${orderData.customer.name}
    Email: ${orderData.customer.email}
    Phone: ${orderData.customer.phone}
    Address: ${orderData.customer.address}
    City: ${orderData.customer.city}
    Postal Code: ${orderData.customer.postalCode}
    
    ${orderData.orderType === 'ecommerce' ? `
    Order Items:
    ${itemsText}
    
    Total Amount: $${orderData.totalPrice.toFixed(2)}
    ` : `
    Selected Products:
    ${itemsText}
    `}
    
    Additional Message: ${orderData.message}
    
    Payment Method: ${orderData.paymentMethod}
    Payment Email: ${orderData.paymentEmail}
    
    Timestamp: ${orderData.timestamp}
  `;
  
  // In production, implement actual email sending
  // await emailService.send({
  //   to: 'orders@heritagefarms.ca',
  //   subject: `New Order Received - ${orderData.orderId}`,
  //   text: emailContent
  // });
  
  console.log('Order notification email content:', emailContent);
} 