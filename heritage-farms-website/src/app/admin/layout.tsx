import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <nav className="mb-6 flex gap-4">
        <Link href="/admin" className="text-blue-600 hover:text-blue-800">Orders</Link>
        <Link href="/admin/inventory" className="text-blue-600 hover:text-blue-800">Inventory</Link>
      </nav>
      {children}
    </section>
  );
}
