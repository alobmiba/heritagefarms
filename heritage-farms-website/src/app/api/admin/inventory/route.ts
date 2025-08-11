import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { z } from "zod";

const InventoryItemSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  price: z.number().int().positive(),
  unit: z.string().optional(),
  stock: z.number().int().nonnegative(),
  active: z.boolean().default(true),
  imageUrl: z.string().url().optional(),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = InventoryItemSchema.safeParse(data);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        error: "Invalid payload", 
        details: parsed.error.issues 
      }, { status: 400 });
    }

    const ref = await db.collection("inventory").add(parsed.data);
    return NextResponse.json({ id: ref.id });
  } catch (error) {
    console.error('Error creating inventory item:', error);
    return NextResponse.json({ error: "Failed to create inventory item" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const snap = await db.collection("inventory").orderBy("sku").get();
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}
