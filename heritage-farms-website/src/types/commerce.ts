export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  price: number;        // cents
  unit?: string;        // "bunch", "lb"
  stock: number;
  active: boolean;
  imageUrl?: string;
};

export type OrderItem = {
  sku: string;
  name: string;
  qty: number;
  price: number;        // cents
};

export type Order = {
  id: string;                 // Firestore doc id
  code: string;               // e.g., HF-20250725-AB12
  email: string;
  name: string;
  phone?: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;           // cents
  tax: number;                // cents
  total: number;              // cents
  status: "pending_payment" | "paid" | "cancelled";
  createdAt: number;          // epoch ms
  updatedAt: number;
};
