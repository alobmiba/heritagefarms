import { getDb } from '@/lib/firebase-admin';
import { Order } from '@/types/commerce';
import AdminDashboardClient from './AdminDashboardClient';

async function getOrders(): Promise<Order[]> {
  try {
    const db = getDb();
    if (!db) {
      throw new Error("Firebase Admin is not available.");
    }
    const snap = await db.collection("orders").orderBy("createdAt", "desc").limit(50).get();
    const orders = snap.docs.map(d => ({ ...(d.data() as Order), id: d.id }));
    return orders;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    // In a real app, you might want to log this to a service like Sentry
    return []; // Return empty array on error to prevent crash
  }
}

export default async function AdminHome() {
  const orders = await getOrders();

  if (orders.length === 0) {
    // You can render a specific state for when there are no orders or an error
    // For simplicity, we'll pass the empty array to the client component,
    // which already has a nice "No orders yet" state.
  }

  return <AdminDashboardClient initialOrders={orders} />;
}

// Optional: Add revalidation to fetch new data periodically
export const revalidate = 60; // Revalidate every 60 seconds
