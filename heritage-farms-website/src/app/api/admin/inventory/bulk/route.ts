import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { InventoryItem } from '@/types/commerce';
import { z } from 'zod';

// Validation schema for bulk inventory items
const bulkInventoryItemSchema = z.object({
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

const bulkImportSchema = z.object({
  items: z.array(bulkInventoryItemSchema).min(1, 'At least one item is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the input
    const validatedData = bulkImportSchema.parse(body);
    
    const batch = db.batch();
    const results = {
      created: 0,
      updated: 0,
      errors: [] as string[],
    };
    
    // Process each item
    for (const item of validatedData.items) {
      try {
        // Check if item already exists
        const existingDoc = await db.collection("inventory").doc(item.sku).get();
        
        const inventoryItem: InventoryItem = {
          ...item,
          localName: item.localName || item.name,
          image: item.image || '/branding/Images/products/placeholder.png',
          cultivar: item.cultivar || 'Standard',
          healthBenefits: item.healthBenefits || 'Rich in vitamins and minerals',
          growingMethod: item.growingMethod || 'Hydroponic',
          maturityTime: item.maturityTime || '6-8 weeks',
          description: item.description || `Fresh ${item.name} grown sustainably`,
          inStock: item.stockQuantity > 0,
          createdAt: existingDoc.exists ? existingDoc.data()?.createdAt || Date.now() : Date.now(),
          updatedAt: Date.now(),
        };
        
        // Add to batch
        const docRef = db.collection("inventory").doc(item.sku);
        batch.set(docRef, inventoryItem);
        
        if (existingDoc.exists) {
          results.updated++;
        } else {
          results.created++;
        }
      } catch (error) {
        results.errors.push(`Failed to process ${item.sku}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    // Commit the batch
    await batch.commit();
    
    return NextResponse.json(
      { 
        message: 'Bulk import completed',
        results: {
          total: validatedData.items.length,
          ...results
        }
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
    
    console.error('Error bulk importing inventory:', error);
    return NextResponse.json(
      { error: 'Failed to bulk import inventory' },
      { status: 500 }
    );
  }
}
