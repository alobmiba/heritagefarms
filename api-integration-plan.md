# API Integration Plan: Strapi + Custom Admin Hybrid

## Phase 1: Data Separation Strategy

### Strapi (Content Management)
```typescript
// Product Catalog Data
interface StrapiProduct {
  sku: string;              // Primary key for sync
  name: string;
  localName: string;
  description: string;
  cultivar: string;
  healthBenefits: string;
  growingMethod: string;
  maturityTime: string;
  priceUnit: string;
  category: Category;
  images: Media[];
  featured: boolean;
  tags: Tag[];
  seo: SEO;
}
```

### Firebase (Commerce Operations)
```typescript
// Inventory & Commerce Data
interface FirebaseInventory {
  sku: string;              // Links to Strapi product
  price: number;            // Current price in cents
  stockQuantity: number;    // Available inventory
  active: boolean;          // Available for sale
  inStock: boolean;         // Calculated field
  createdAt: number;
  updatedAt: number;
}
```

## Phase 2: API Layer Architecture

### Frontend Data Fetching Strategy
```typescript
// services/productService.ts
export class ProductService {
  // Get enriched product data (Strapi + Firebase)
  static async getProduct(sku: string): Promise<EnrichedProduct> {
    const [strapiProduct, inventoryData] = await Promise.all([
      this.getStrapiProduct(sku),
      this.getInventoryData(sku)
    ]);
    
    return this.mergeProductData(strapiProduct, inventoryData);
  }
  
  // Get product catalog from Strapi
  static async getStrapiProduct(sku: string): Promise<StrapiProduct> {
    const response = await fetch(`${STRAPI_URL}/api/products?filters[sku][$eq]=${sku}&populate=*`);
    return response.json();
  }
  
  // Get inventory data from Firebase
  static async getInventoryData(sku: string): Promise<FirebaseInventory> {
    const response = await fetch(`/api/inventory/${sku}`);
    return response.json();
  }
  
  // Merge data from both sources
  static mergeProductData(strapi: StrapiProduct, inventory: FirebaseInventory): EnrichedProduct {
    return {
      // Content from Strapi
      ...strapi,
      // Commerce data from Firebase
      price: inventory.price,
      stockQuantity: inventory.stockQuantity,
      active: inventory.active,
      inStock: inventory.inStock,
    };
  }
}
```

## Phase 3: Admin Interface Separation

### Strapi Admin (Content Team)
- ✅ Product descriptions & images
- ✅ Blog posts & pages
- ✅ Categories & tags
- ✅ SEO settings
- ✅ Media library

### Custom Admin (Operations Team)
- ✅ Inventory management
- ✅ Order processing
- ✅ Pricing updates
- ✅ Stock alerts
- ✅ Analytics & reports

## Phase 4: Synchronization Strategy

### Real-time Sync Endpoints
```typescript
// API Routes for Sync
// pages/api/sync/product-created.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Webhook from Strapi when product is created
  const { sku, name, localName } = req.body;
  
  // Create corresponding inventory record in Firebase
  await createInventoryRecord({
    sku,
    price: 0,           // To be set by operations team
    stockQuantity: 0,   // To be set by operations team
    active: false,      // Needs approval
    inStock: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  
  res.status(200).json({ success: true });
}

// pages/api/sync/inventory-updated.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Called when inventory is updated
  const { sku, stockQuantity } = req.body;
  
  // Could trigger Strapi webhook to update product availability
  if (stockQuantity === 0) {
    await updateStrapiProduct(sku, { available: false });
  }
  
  res.status(200).json({ success: true });
}
```

## Phase 5: Frontend Integration

### Product Display Components
```typescript
// components/ProductCard.tsx
export const ProductCard = async ({ sku }: { sku: string }) => {
  const product = await ProductService.getProduct(sku);
  
  return (
    <div className="product-card">
      {/* Content from Strapi */}
      <Image src={product.images[0].url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      
      {/* Commerce data from Firebase */}
      <div className="price">${(product.price / 100).toFixed(2)}</div>
      <div className="stock">
        {product.inStock ? `${product.stockQuantity} available` : 'Out of stock'}
      </div>
      
      {/* Only show if available */}
      {product.active && product.inStock && (
        <AddToCartButton sku={sku} />
      )}
    </div>
  );
};
```

### Blog Integration
```typescript
// components/BlogPost.tsx
export const BlogPost = async ({ slug }: { slug: string }) => {
  const post = await fetch(`${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`);
  const { data } = await post.json();
  
  return (
    <article>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </article>
  );
};
```

## Environment Variables

### Next.js (.env.local)
```bash
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token

# Firebase (existing)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

### Strapi (.env)
```bash
# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Admin JWT Secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret

# API Tokens
API_TOKEN_SALT=your-api-token-salt

# Webhooks
NEXTJS_WEBHOOK_URL=http://localhost:3000/api/sync
```

## Deployment Strategy

### Development
1. **Strapi**: http://localhost:1337
2. **Next.js**: http://localhost:3000
3. **Firebase**: Emulator or dev project

### Production
1. **Strapi**: Railway/DigitalOcean (cms.heritagefarms.ca)
2. **Next.js**: Vercel (heritagefarms.ca)
3. **Firebase**: Production project

## Migration Timeline

### Week 1: Setup
- [ ] Install Strapi
- [ ] Create content types
- [ ] Set up basic API

### Week 2: Content Migration
- [ ] Export existing product data
- [ ] Import to Strapi
- [ ] Test API endpoints

### Week 3: Frontend Integration
- [ ] Update product components
- [ ] Implement hybrid data fetching
- [ ] Test e-commerce flows

### Week 4: Admin Optimization
- [ ] Refactor custom admin
- [ ] Implement sync webhooks
- [ ] Deploy to production

