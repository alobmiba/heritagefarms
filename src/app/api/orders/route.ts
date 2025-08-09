import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface OrderData {
  name: string;
  email: string;
  product: string;
  notes?: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

function validateProduct(product: string): boolean {
  const validProducts = [
    'fluted-pumpkin-leaves',
    'jute-leaves',
    'water-leaf',
    'scent-leaf',
    'uziza-leaf',
    'ogbono',
    'raw-honey',
    'mixed-greens',
    'custom'
  ];
  return validProducts.includes(product);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, product, notes }: OrderData = body;

    // Server-side validation
    const errors: string[] = [];

    if (!name || !validateName(name)) {
      errors.push('Name is required and must be between 2-100 characters');
    }

    if (!email || !validateEmail(email)) {
      errors.push('Valid email address is required');
    }

    if (!product || !validateProduct(product)) {
      errors.push('Valid product selection is required');
    }

    if (notes && notes.length > 500) {
      errors.push('Notes must be less than 500 characters');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          errors 
        },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Log the order
    // 4. Integrate with CRM

    // For now, we'll just return success
    console.log('Order received:', {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      product,
      notes: notes?.trim() || '',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Order received successfully. We will contact you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing order:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        errors: ['Internal server error. Please try again later.'] 
      },
      { status: 500 }
    );
  }
} 