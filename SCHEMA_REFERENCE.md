# 📋 Heritage Farms Schema Reference

## 🗂️ Entity Schema Comparison

### **Strapi Entities (Content Management)**

#### **Product Schema**
```sql
-- What Strapi stores
Product {
  id: number (auto)
  sku: string (unique, links to Firebase)
  name: string
  localName: string
  description: richtext
  cultivar: string?
  healthBenefits: richtext?
  growingMethod: string?
  maturityTime: string?
  priceUnit: enum('bunch', 'lb', 'kg', 'piece')
  featured: boolean
  
  -- Relationships
  category_id: foreign_key → Category
  tags: many_to_many → Tag
  images: one_to_many → Media
  seo: component → SEO
  
  -- Metadata
  createdAt: datetime
  updatedAt: datetime
  publishedAt: datetime?
}
```

#### **Category Schema**
```sql
Category {
  id: number (auto)
  name: string (unique)
  slug: string (unique, auto-generated)
  description: text?
  
  -- Relationships
  image_id: foreign_key → Media?
  products: one_to_many ← Product
  
  -- Metadata
  createdAt: datetime
  updatedAt: datetime
}
```

#### **Tag Schema**
```sql
Tag {
  id: number (auto)
  name: string (unique)
  slug: string (unique, auto-generated)
  description: text?
  
  -- Relationships
  products: many_to_many ↔ Product
  blogPosts: many_to_many ↔ BlogPost
  
  -- Metadata
  createdAt: datetime
  updatedAt: datetime
}
```

### **Firebase Entities (Commerce Management)**

#### **Inventory Collection**
```typescript
// /inventory/{sku}
{
  sku: string,              // Document ID & link to Strapi
  stockQuantity: number,
  price: number,
  active: boolean,
  inStock: boolean,         // Computed field
  
  // Cost Management
  costPrice: number,
  supplier: string?,
  
  // Freshness Tracking
  harvestDate: timestamp?,
  expiryDate: timestamp?,
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### **Orders Collection**
```typescript
// /orders/{orderId}
{
  id: string,               // Document ID
  customerId: string?,      // Optional for guest orders
  
  // Order Items
  items: [
    {
      sku: string,          // Links to Product
      quantity: number,
      unitPrice: number,    // Price at time of order
      subtotal: number
    }
  ],
  
  totalAmount: number,
  status: string,           // 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  
  // Customer Information
  customerInfo: {
    name: string,
    email: string,
    phone: string
  },
  
  // Shipping Details
  shippingAddress: object,
  shippingMethod: string,   // 'pickup' | 'delivery'
  shippingCost: number,
  
  // Payment Information
  paymentMethod: string,    // 'cash' | 'card' | 'transfer'
  paymentStatus: string,    // 'pending' | 'paid' | 'failed'
  
  // Timestamps
  createdAt: timestamp,
  updatedAt: timestamp,
  deliveryDate: timestamp?
}
```

#### **Users Collection**
```typescript
// /users/{uid}
{
  uid: string,              // Document ID (Firebase Auth UID)
  email: string,
  displayName: string?,
  
  // Profile Information
  profile: {
    firstName: string,
    lastName: string,
    phone: string?,
    preferences: string[]   // Cultural, dietary preferences
  },
  
  // Address Management
  addresses: [
    {
      id: string,
      type: string,         // 'home' | 'work' | 'other'
      street: string,
      city: string,
      postalCode: string,
      isDefault: boolean
    }
  ],
  
  // Order History
  orderHistory: string[],   // Array of order IDs
  
  // Preferences
  newsletter: boolean,
  notifications: boolean,
  
  // Metadata
  createdAt: timestamp,
  lastLoginAt: timestamp
}
```

## 🔗 Relationship Mapping

### **Primary Connections**
```
Strapi Product.sku ←→ Firebase Inventory.sku
                  ↑
                  └─→ Firebase OrderItem.sku
                  ↑
                  └─→ Firebase User.orderHistory
```

### **Content Relationships (Strapi Only)**
```
Product ←→ Category (many-to-one)
Product ←→ Tag (many-to-many)  
Product ←→ Media (one-to-many)
BlogPost ←→ Tag (many-to-many)
BlogPost ←→ BlogCategory (many-to-many)
```

### **Commerce Relationships (Firebase Only)**
```
Order ←→ OrderItem (one-to-many)
User ←→ Order (one-to-many)
OrderItem → Inventory (many-to-one via SKU)
```

## 📊 Data Access Patterns

### **Frontend Queries**

#### **Product Catalog Page**
```typescript
// Parallel fetch for performance
const [strapiProducts, inventoryData] = await Promise.all([
  strapiService.getProducts({
    populate: ['images', 'category', 'tags'],
    filters: { category: { slug: { $eq: 'leafy-greens' } } }
  }),
  firebaseService.getInventoryBatch(productSkus)
]);

// Merge and filter
const availableProducts = strapiProducts
  .map(product => ({
    ...product,
    ...inventoryData[product.sku],
    inStock: inventoryData[product.sku]?.stockQuantity > 0
  }))
  .filter(product => product.active && product.inStock);
```

#### **Product Detail Page**
```typescript
// Single product with full details
const enrichedProduct = await ProductService.getEnrichedProduct(sku);

// Includes:
// - Full Strapi content (description, images, etc.)
// - Current Firebase inventory (price, stock)
// - Computed availability status
```

### **Admin Queries**

#### **Content Management (Strapi)**
```typescript
// Content team operations
await strapiService.updateProduct(productId, {
  description: newDescription,
  healthBenefits: updatedBenefits,
  images: newImageIds
});

await strapiService.createBlogPost({
  title: "Growing Callaloo at Home",
  content: richTextContent,
  tags: ["caribbean", "growing-tips"]
});
```

#### **Operations Management (Firebase)**
```typescript
// Operations team workflow
await firebaseService.updateInventory(sku, {
  stockQuantity: newStock,
  price: newPrice,
  harvestDate: today
});

await firebaseService.updateOrderStatus(orderId, 'shipped', {
  trackingNumber: '1Z999AA1234567890',
  estimatedDelivery: tomorrow
});
```

### **Analytics Queries**

#### **Performance Dashboard**
```typescript
// Combined analytics from both systems
const productAnalytics = await Promise.all([
  // Content performance from Strapi
  strapiService.getProductViews(sku),
  strapiService.getSEOMetrics(sku),
  
  // Sales performance from Firebase
  firebaseService.getSalesData(sku, dateRange),
  firebaseService.getInventoryTurnover(sku),
  
  // Customer feedback
  firebaseService.getProductReviews(sku)
]);
```

## 🔧 Operation Types

### **Create Operations**

| Entity | System | API Endpoint | Who Can Do |
|--------|--------|--------------|------------|
| Product Content | Strapi | `POST /api/products` | Content Team |
| Product Inventory | Firebase | `POST /api/inventory/{sku}` | Operations Team |
| Order | Firebase | `POST /api/orders` | Customers, Admin |
| Blog Post | Strapi | `POST /api/blog-posts` | Content Team |
| Category | Strapi | `POST /api/categories` | Content Team |

### **Read Operations**

| Data Need | Systems | Caching | Public/Private |
|-----------|---------|---------|----------------|
| Product Catalog | Strapi + Firebase | 5 min | Public |
| Product Detail | Strapi + Firebase | 1 min | Public |
| Order Details | Firebase only | None | Private |
| Blog Content | Strapi only | 1 hour | Public |
| Inventory Levels | Firebase only | Real-time | Admin only |

### **Update Operations**

| Operation | System | Frequency | Impact |
|-----------|--------|-----------|---------|
| Content Updates | Strapi | As needed | SEO, Marketing |
| Price Changes | Firebase | Daily | Revenue |
| Stock Updates | Firebase | Real-time | Availability |
| Order Status | Firebase | Per workflow | Customer experience |

### **Delete Operations**

| Entity | System | Soft/Hard Delete | Cascade Effects |
|--------|--------|------------------|-----------------|
| Product | Strapi | Soft (unpublish) | Hide from catalog |
| Inventory | Firebase | Soft (inactive) | Remove from sales |
| Order | Firebase | Never | Historical data |
| User | Firebase | Hard (GDPR) | Anonymize orders |

This reference shows exactly **how data flows**, **what each system handles**, and **how operations work** across your Heritage Farms hybrid architecture! 📊
