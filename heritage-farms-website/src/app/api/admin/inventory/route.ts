import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { InventoryItem } from '@/types/commerce';
import { z } from 'zod';

// Validation schema for inventory items
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

export async function GET() {
  try {
    const snap = await db.collection("inventory").orderBy("sku").get();
    const items = snap.docs.map(d => ({ ...(d.data() as InventoryItem), id: d.id }));
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the input
    const validatedData = inventoryItemSchema.parse(body);
    
    // Check if item already exists
    const existingDoc = await db.collection("inventory").doc(validatedData.sku).get();
    
    if (existingDoc.exists) {
      return NextResponse.json(
        { error: 'Item with this SKU already exists' },
        { status: 409 }
      );
    }
    
    // Create new item with timestamps
    const newItem: InventoryItem = {
      ...validatedData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    // Add to Firestore
    await db.collection("inventory").doc(validatedData.sku).set(newItem);
    
    return NextResponse.json(
      { message: 'Item added successfully', item: newItem },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error adding inventory item:', error);
    return NextResponse.json(
      { error: 'Failed to add inventory item' },
      { status: 500 }
    );
  }
}
