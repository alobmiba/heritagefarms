import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { z } from 'zod';

// Build-time check to prevent Firebase initialization during build
const isBuildTime = () => {
  return process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;
};

// Validation schema for stock adjustment
const stockAdjustmentSchema = z.object({
  adjustment: z.number().int('Adjustment must be an integer'),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ sku: string }> }
) {
  // Skip during build time
  if (isBuildTime()) {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 });
  }

  try {
    const { sku } = await params;
    const body = await request.json();
    
    // Validate the input
    const validatedData = stockAdjustmentSchema.parse(body);
    
    const db = getDb();
    
    // Get current item
    const itemDoc = await db.collection("inventory").doc(sku).get();
    
    if (!itemDoc.exists) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    const currentItem = itemDoc.data();
    const currentStock = currentItem?.stockQuantity || 0;
    const newStock = currentStock + validatedData.adjustment;
    
    // Prevent negative stock
    if (newStock < 0) {
      return NextResponse.json(
        { error: 'Stock cannot be negative' },
        { status: 400 }
      );
    }
    
    // Update stock and timestamp
    await db.collection("inventory").doc(sku).update({
      stockQuantity: newStock,
      updatedAt: Date.now(),
    });
    
    return NextResponse.json(
      { 
        message: 'Stock adjusted successfully',
        previousStock: currentStock,
        adjustment: validatedData.adjustment,
        newStock: newStock
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
    
    console.error('Error adjusting stock:', error);
    return NextResponse.json(
      { error: 'Failed to adjust stock' },
      { status: 500 }
    );
  }
}
