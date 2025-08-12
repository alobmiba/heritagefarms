import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { Order } from '@/types/commerce';

export async function GET() {
  try {
    const snap = await db.collection("orders").orderBy("createdAt", "desc").limit(50).get();
    const orders = snap.docs.map(d => ({ ...(d.data() as Order), id: d.id }));
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
