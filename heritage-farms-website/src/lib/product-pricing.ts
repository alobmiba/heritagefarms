/**
 * Product pricing verification system
 * In production, this should fetch from your database
 */

interface ProductPrice {
  sku: string;
  price: number; // Price in cents
  name: string;
  available: boolean;
}

// Mock product prices - in production, fetch from database
const PRODUCT_PRICES: Map<string, ProductPrice> = new Map([
  ['callaloo', { sku: 'callaloo', price: 599, name: 'Callaloo (Amaranth)', available: true }],
  ['waterleaf', { sku: 'waterleaf', price: 699, name: 'Waterleaf', available: true }],
  ['jute-leaves', { sku: 'jute-leaves', price: 799, name: 'Jute Leaves', available: true }],
  ['fluted-pumpkin', { sku: 'fluted-pumpkin', price: 899, name: 'Fluted Pumpkin Leaves', available: true }],
  ['bitter-leaf', { sku: 'bitter-leaf', price: 999, name: 'Bitter Leaf', available: true }],
  ['scent-leaf', { sku: 'scent-leaf', price: 599, name: 'Scent Leaf', available: true }],
]);

/**
 * Verify product price against database
 * @param sku - Product SKU
 * @param providedPrice - Price provided by client (in cents)
 * @returns True if price matches database
 */
export async function verifyProductPrice(sku: string, providedPrice: number): Promise<boolean> {
  try {
    // In production, fetch from database
    // const product = await db.collection('products').doc(sku).get();
    
    const product = PRODUCT_PRICES.get(sku);
    
    if (!product) {
      return false;
    }
    
    if (!product.available) {
      return false;
    }
    
    // Allow small price variations (e.g., for currency conversion)
    // but flag significant differences
    const tolerance = 0.01; // 1% tolerance
    const difference = Math.abs(product.price - providedPrice);
    const percentDifference = difference / product.price;
    
    return percentDifference <= tolerance;
  } catch (error) {
    // Log error securely in production
    return false;
  }
}

/**
 * Get verified product price from database
 * @param sku - Product SKU
 * @returns Product price in cents or null if not found
 */
export async function getProductPrice(sku: string): Promise<number | null> {
  try {
    // In production, fetch from database
    // const product = await db.collection('products').doc(sku).get();
    
    const product = PRODUCT_PRICES.get(sku);
    
    if (!product || !product.available) {
      return null;
    }
    
    return product.price;
  } catch (error) {
    // Log error securely in production
    return null;
  }
}

/**
 * Calculate order totals with verified prices
 * @param items - Order items with SKUs and quantities
 * @returns Calculated totals or null if validation fails
 */
export async function calculateOrderTotals(items: Array<{ sku: string; qty: number }>) {
  try {
    let subtotal = 0;
    const verifiedItems = [];
    
    for (const item of items) {
      const price = await getProductPrice(item.sku);
      
      if (price === null) {
        return null; // Invalid product
      }
      
      if (item.qty < 1 || item.qty > 100) {
        return null; // Invalid quantity
      }
      
      const itemTotal = price * item.qty;
      subtotal += itemTotal;
      
      verifiedItems.push({
        sku: item.sku,
        qty: item.qty,
        price: price,
        total: itemTotal
      });
    }
    
    // Calculate tax (example: 13% HST for Ontario)
    const taxRate = 0.13;
    const tax = Math.round(subtotal * taxRate);
    const total = subtotal + tax;
    
    // Validate total is reasonable
    if (total < 100 || total > 10000000) { // $1 to $100,000
      return null;
    }
    
    return {
      items: verifiedItems,
      subtotal,
      tax,
      total
    };
  } catch (error) {
    // Log error securely in production
    return null;
  }
}

/**
 * Verify entire order pricing
 * @param order - Order data from client
 * @returns True if all prices are valid
 */
export async function verifyOrderPricing(order: {
  items: Array<{ sku: string; qty: number; price: number }>;
  subtotal: number;
  tax: number;
  total: number;
}): Promise<boolean> {
  const calculated = await calculateOrderTotals(
    order.items.map(item => ({ sku: item.sku, qty: item.qty }))
  );
  
  if (!calculated) {
    return false;
  }
  
  // Verify each item price
  for (const item of order.items) {
    const verifiedItem = calculated.items.find(i => i.sku === item.sku);
    if (!verifiedItem || Math.abs(verifiedItem.price - item.price) > 1) {
      return false;
    }
  }
  
  // Verify totals (allow $1 difference for rounding)
  if (Math.abs(calculated.subtotal - order.subtotal) > 100) {
    return false;
  }
  
  if (Math.abs(calculated.tax - order.tax) > 100) {
    return false;
  }
  
  if (Math.abs(calculated.total - order.total) > 100) {
    return false;
  }
  
  return true;
}