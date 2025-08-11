import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { status } = await req.json();
    if (!["paid", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    
    const resolvedParams = await params;
    const ref = db.collection("orders").doc(resolvedParams.id);
    await ref.update({ status, updatedAt: Date.now() });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}
