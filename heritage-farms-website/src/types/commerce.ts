export type CartItem = {
  id: string;
  name: string;
  localName: string;
  price: string;
  image: string;
  quantity: number;
};

export type InventoryItem = {
  sku: string;
  name: string;
  localName: string;
  price: number;        // cents
  priceUnit: string;    // "bunch", "lb"
  image: string;
  cultivar: string;
  healthBenefits: string;
  growingMethod: string;
  maturityTime: string;
  description: string;
  category: string;
  active: boolean;
  inStock: boolean;
  stockQuantity: number;
  createdAt: number;
  updatedAt: number;
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
