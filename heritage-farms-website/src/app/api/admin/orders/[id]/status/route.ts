import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { z } from 'zod';

const statusUpdateSchema = z.object({
  status: z.enum(['pending_payment', 'paid', 'cancelled']),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Validate the input
    const validatedData = statusUpdateSchema.parse(body);
    
    // Check if order exists
    const orderDoc = await db.collection("orders").doc(params.id).get();
    
    if (!orderDoc.exists) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update order status and timestamp
    await db.collection("orders").doc(params.id).update({
      status: validatedData.status,
      updatedAt: Date.now(),
    });
    
    return NextResponse.json(
      { 
        message: 'Order status updated successfully',
        orderId: params.id,
        newStatus: validatedData.status
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
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
