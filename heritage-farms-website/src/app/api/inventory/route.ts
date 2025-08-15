import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

// Build-time check to prevent Firebase initialization during build
const isBuildTime = () => {
  return process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;
};

// Using Node.js runtime for Firebase Admin compatibility

export async function GET() {
  // Skip during build time
  if (isBuildTime()) {
    return NextResponse.json({ error: 'Service unavailable during build' }, { status: 503 });
  }

  try {
    const db = getDb();
    const snap = await db.collection("inventory").where("active", "==", true).get();
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json({ items }, { 
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=600" } 
    });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}
