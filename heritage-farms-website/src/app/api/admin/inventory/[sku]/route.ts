import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { InventoryItem } from '@/types/commerce';
import { z } from 'zod';

// Validation schema for inventory items (same as main route)
const inventoryItemSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(1, 'Name is required'),
  localName: z.string().min(1, 'Local name is required'),
  price: z.number().positive('Price must be positive'),
  priceUnit: z.string().min(1, 'Price unit is required'),
  image: z.string().min(1, 'Image is required'),
  cultivar: z.string().min(1, 'Cultivar is required'),
  healthBenefits: z.string().min(1, 'Health benefits are required'),
  growingMethod: z.string().min(1, 'Growing method is required'),
  maturityTime: z.string().min(1, 'Maturity time is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  active: z.boolean().default(true),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be non-negative').default(0),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sku: string }> }
) {
  try {
    const { sku } = await params;
    const body = await request.json();
    
    // Validate the input
    const validatedData = inventoryItemSchema.parse(body);
    
    // Ensure SKU in URL matches SKU in body
    if (validatedData.sku !== sku) {
      return NextResponse.json(
        { error: 'SKU in URL does not match SKU in body' },
        { status: 400 }
      );
    }
    
    // Check if item exists
    const existingDoc = await db.collection("inventory").doc(sku).get();
    
    if (!existingDoc.exists) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    // Update item with new timestamp
    const updatedItem: InventoryItem = {
      ...validatedData,
      inStock: validatedData.stockQuantity > 0,
      createdAt: existingDoc.data()?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };
    
    // Update in Firestore
    await db.collection("inventory").doc(sku).set(updatedItem);
    
    return NextResponse.json(
      { message: 'Item updated successfully', item: updatedItem },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
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
  { params }: { params: Promise<{ sku: string }> }
) {
  try {
    const { sku } = await params;
    
    // Check if item exists
    const existingDoc = await db.collection("inventory").doc(sku).get();
    
    if (!existingDoc.exists) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    
    // Delete from Firestore
    await db.collection("inventory").doc(sku).delete();
    
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
