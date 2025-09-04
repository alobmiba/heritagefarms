import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { Order } from '@/types/commerce';

// Build-time check to prevent Firebase initialization during build
const isBuildTime = () => {
  return process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;
};

export async function GET() {
  // Skip during build time
  if (isBuildTime()) {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 });
  }

  try {
    const db = getDb();
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
