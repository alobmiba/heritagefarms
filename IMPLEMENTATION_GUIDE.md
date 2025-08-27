# 🚀 Heritage Farms Hybrid System Implementation Guide

## 📋 Overview
This guide will help you implement the hybrid approach where Strapi handles content management and your existing system handles e-commerce operations.

## 🛠️ Phase 1: Strapi Installation & Setup

### Step 1: Install Node.js (if needed)
1. Download Node.js LTS from https://nodejs.org/
2. Install and restart your terminal
3. Verify: `node --version` and `npm --version`

### Step 2: Install Strapi
```bash
# Navigate to your project root
cd C:\Users\abimb\Downloads\heritagefarms

# Install Strapi CMS
npx create-strapi@latest heritage-farms-strapi --ts --skip-cloud --no-example --git-init --skip-db

# Navigate to Strapi directory
cd heritage-farms-strapi

# Start Strapi in development mode
npm run develop
```

### Step 3: Access Strapi Admin
1. Open http://localhost:1337/admin
2. Create your admin account
3. Log in to the admin panel

## 📊 Phase 2: Create Content Types

### Step 1: Create Product Content Type
1. Go to **Content-Type Builder**
2. Click **"Create new collection type"**
3. Name it **"Product"**
4. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| sku | UID | Required, Unique |
| name | Text | Required |
| localName | Text | Required |
| description | Rich Text | Optional |
| cultivar | Text | Optional |
| healthBenefits | Rich Text | Optional |
| growingMethod | Text | Optional |
| maturityTime | Text | Optional |
| priceUnit | Enumeration | Values: bunch, lb, kg, piece |
| featured | Boolean | Default: false |
| images | Media | Multiple, Images only |

5. **Save** and wait for server restart

### Step 2: Create Category Content Type
1. Create new collection type **"Category"**
2. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| name | Text | Required, Unique |
| slug | UID | Target field: name |
| description | Rich Text | Optional |
| image | Media | Single, Images only |

3. **Save** and wait for restart

### Step 3: Add Relations
1. Edit **Product** content type
2. Add **Relation** field:
   - Name: `category`
   - Relation: Product belongs to one Category
3. **Save**

### Step 4: Create Blog Content Types
1. Create **"Blog Post"** collection:

| Field Name | Type | Settings |
|------------|------|----------|
| title | Text | Required |
| slug | UID | Target field: title |
| excerpt | Text | Optional |
| content | Rich Text | Optional |
| featuredImage | Media | Single, Images only |
| publishedAt | DateTime | Optional |

2. Create **"Blog Category"** collection similar to Product Category

## 🔗 Phase 3: API Integration

### Step 1: Install Dependencies in Next.js
```bash
# In your heritage-farms-website directory
cd C:\Users\abimb\Downloads\heritagefarms\heritage-farms-website

# No additional dependencies needed - we've created the service files
```

### Step 2: Update Environment Variables
Create or update `.env.local`:
```bash
# Add these lines to your existing .env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token-here
```

### Step 3: Generate API Token in Strapi
1. Go to **Settings** → **API Tokens**
2. Click **"Create new API Token"**
3. Name: `heritage-farms-frontend`
4. Token type: **Read-only**
5. Copy the token and add to `.env.local`

### Step 4: Test API Connection
Create a test file to verify connection:

```typescript
// test-strapi-connection.ts
import strapiService from './src/services/strapiService';

async function testConnection() {
  try {
    const products = await strapiService.getProducts();
    console.log('✅ Strapi connection successful');
    console.log('Products found:', products.length);
  } catch (error) {
    console.error('❌ Strapi connection failed:', error);
  }
}

testConnection();
```

## 📝 Phase 4: Content Migration

### Step 1: Create Sample Content in Strapi
1. Go to **Content Manager**
2. Create some **Categories**:
   - Leafy Greens
   - Root Vegetables
   - Herbs

3. Create sample **Products**:
   - SKU: `CAL001`
   - Name: `Callaloo`
   - Local Name: `Caribbean Spinach`
   - Description: Rich, nutritious leafy green...
   - Price Unit: `bunch`
   - Category: Leafy Greens
   - Featured: `true`

### Step 2: Update Product Components
Update your existing product components to use the hybrid service:

```typescript
// components/ProductCard.tsx
import { ProductService } from '@/services/strapiService';

export async function ProductCard({ sku }: { sku: string }) {
  const product = await ProductService.getEnrichedProduct(sku);
  
  if (!product) return null;
  
  return (
    <div className="product-card">
      {/* Content from Strapi */}
      {product.images?.[0] && (
        <img src={product.images[0].url} alt={product.name} />
      )}
      <h3>{product.name}</h3>
      <p className="local-name">{product.localName}</p>
      <div dangerouslySetInnerHTML={{ __html: product.description || '' }} />
      
      {/* Commerce data from Firebase */}
      <div className="price">${(product.price / 100).toFixed(2)}</div>
      <div className="stock">
        {product.inStock ? `${product.stockQuantity} available` : 'Out of stock'}
      </div>
      
      {product.active && product.inStock && (
        <button>Add to Cart</button>
      )}
    </div>
  );
}
```

## ⚡ Phase 5: Admin Separation

### Step 1: Content Management (Strapi)
Your content team will use Strapi admin for:
- ✅ Product descriptions & images
- ✅ Blog posts
- ✅ Categories & tags
- ✅ SEO settings

### Step 2: Operations Management (Custom Admin)
Your operations team will continue using your custom admin for:
- ✅ Inventory levels
- ✅ Pricing
- ✅ Order processing
- ✅ Analytics

### Step 3: Sync Mechanisms
Create webhook endpoints for real-time sync:

```typescript
// pages/api/webhooks/strapi.ts
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const { model, entry } = req.body;
  
  if (model === 'product') {
    // Sync new product to Firebase inventory
    await createInventoryRecord({
      sku: entry.sku,
      price: 0,
      stockQuantity: 0,
      active: false,
      // ... other fields
    });
  }
  
  res.status(200).json({ received: true });
}
```

## 🚀 Phase 6: Testing & Deployment

### Step 1: Local Testing
1. Start both servers:
   ```bash
   # Terminal 1: Strapi
   cd heritage-farms-strapi
   npm run develop
   
   # Terminal 2: Next.js
   cd heritage-farms-website
   npm run dev
   ```

2. Test the integration:
   - Create products in Strapi
   - View them on your Next.js site
   - Verify inventory data from Firebase

### Step 2: Production Deployment

#### Strapi Deployment (Railway)
1. Push Strapi code to GitHub
2. Connect to Railway
3. Configure environment variables
4. Deploy

#### Next.js Deployment (Vercel)
1. Update environment variables in Vercel
2. Deploy your updated Next.js app

## 📚 Additional Resources

### Useful Commands
```bash
# Generate new content type via CLI
npx strapi generate:content-type product

# Build Strapi for production
npm run build

# Start Strapi in production
npm run start

# Export/Import data
npx strapi export
npx strapi import
```

### Strapi Plugins to Consider
- **Upload Provider (Cloudinary)**: For image optimization
- **SEO Plugin**: Enhanced SEO management
- **GraphQL**: If you prefer GraphQL over REST
- **Users & Permissions**: For advanced user management

## 🎯 Success Metrics

After implementation, you should have:
- ✅ Content team can manage products independently
- ✅ Operations team can manage inventory/orders
- ✅ Faster content updates (no developer needed)
- ✅ Better SEO control
- ✅ Improved media management
- ✅ Maintained e-commerce functionality

## 🔄 Next Steps

1. **Follow this guide step by step**
2. **Test each phase thoroughly**
3. **Train your team on Strapi admin**
4. **Set up automated backups**
5. **Monitor performance and optimize**

## 🆘 Troubleshooting

### Common Issues
- **CORS errors**: Update Strapi CORS configuration
- **API token issues**: Regenerate tokens in Strapi admin
- **Database connection**: Check environment variables
- **Build errors**: Ensure all dependencies are installed

### Getting Help
- Strapi Documentation: https://docs.strapi.io/
- Community Discord: https://discord.strapi.io/
- GitHub Issues: Report bugs and feature requests

---

**Ready to start?** Begin with Phase 1 and work through each step systematically! 🚀

