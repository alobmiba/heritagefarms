import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { z } from 'zod';

// Build-time check to prevent Firebase initialization during build
const isBuildTime = () => {
  return process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;
};

const statusUpdateSchema = z.object({
  status: z.enum(['pending_payment', 'paid', 'cancelled']),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Skip during build time
  if (isBuildTime()) {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    
    // Validate the input
    const validatedData = statusUpdateSchema.parse(body);
    
    const db = getDb();
    
    // Check if order exists
    const orderDoc = await db.collection("orders").doc(id).get();
    
    if (!orderDoc.exists) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update order status and timestamp
    await db.collection("orders").doc(id).update({
      status: validatedData.status,
      updatedAt: Date.now(),
    });
    
    return NextResponse.json(
      { 
        message: 'Order status updated successfully',
        orderId: id,
        newStatus: validatedData.status
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
