import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

// Using Node.js runtime for Firebase Admin compatibility

export async function GET() {
  try {
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
