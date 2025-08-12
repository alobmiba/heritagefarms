import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { InventoryItem } from '@/types/commerce';
import { z } from 'zod';

// Validation schema for inventory items (same as main route)
const inventoryItemSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(1, 'Name is required'),
  localName: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  priceUnit: z.string().min(1, 'Price unit is required'),
  image: z.string().url('Image must be a valid URL').optional(),
  cultivar: z.string().optional(),
  healthBenefits: z.string().optional(),
  growingMethod: z.string().optional(),
  maturityTime: z.string().optional(),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  active: z.boolean().default(true),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be non-negative').default(0),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { sku: string } }
) {
  try {
    const body = await request.json();
    
    // Validate the input
    const validatedData = inventoryItemSchema.parse(body);
    
    // Ensure SKU in URL matches SKU in body
    if (validatedData.sku !== params.sku) {
      return NextResponse.json(
        { error: 'SKU in URL does not match SKU in body' },
        { status: 400 }
      );
    }
    
    // Check if item exists
    const existingDoc = await db.collection("inventory").doc(params.sku).get();
    
    if (!existingDoc.exists) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    // Update item with new timestamp
    const updatedItem: InventoryItem = {
      ...validatedData,
      createdAt: existingDoc.data()?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };
    
    // Update in Firestore
    await db.collection("inventory").doc(params.sku).set(updatedItem);
    
    return NextResponse.json(
      { message: 'Item updated successfully', item: updatedItem },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error updating inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to update inventory item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sku: string } }
) {
  try {
    // Check if item exists
    const existingDoc = await db.collection("inventory").doc(params.sku).get();
    
    if (!existingDoc.exists) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    // Delete from Firestore
    await db.collection("inventory").doc(params.sku).delete();
    
    return NextResponse.json(
      { message: 'Item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to delete inventory item' },
      { status: 500 }
    );
  }
}
