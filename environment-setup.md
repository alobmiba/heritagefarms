# Environment Configuration for Hybrid System

## Next.js (.env.local)
```bash
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-read-only-token

# Firebase (existing configuration)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# NextAuth (if using)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Other existing environment variables
# ... keep your existing configuration
```

## Strapi (.env) - To be created after installation
```bash
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=your-app-keys-comma-separated
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database (SQLite for development)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# For PostgreSQL (production)
# DATABASE_CLIENT=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=heritage_farms_strapi
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=your-db-password
# DATABASE_SSL=false

# Webhooks (optional, for syncing with Next.js)
NEXTJS_WEBHOOK_URL=http://localhost:3000/api/webhooks/strapi
WEBHOOK_SECRET=your-webhook-secret

# File Upload (optional, for cloud storage)
# CLOUDINARY_NAME=your-cloudinary-name
# CLOUDINARY_KEY=your-cloudinary-key
# CLOUDINARY_SECRET=your-cloudinary-secret

# Email (optional, for admin notifications)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USERNAME=your-email@gmail.com
# SMTP_PASSWORD=your-app-password
```

## Production Environment Variables

### Vercel (Next.js Production)
```bash
# Add these to your Vercel dashboard
NEXT_PUBLIC_STRAPI_URL=https://cms.heritagefarms.ca
STRAPI_API_TOKEN=your-production-strapi-token

# Firebase Production
FIREBASE_PROJECT_ID=heritage-farms-prod
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@heritage-farms-prod.iam.gserviceaccount.com
```

### Railway/DigitalOcean (Strapi Production)
```bash
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=heritage_farms_cms
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your-secure-password
DATABASE_SSL=true

# Production secrets (generate new ones)
APP_KEYS=new-production-app-keys
API_TOKEN_SALT=new-production-salt
ADMIN_JWT_SECRET=new-production-jwt-secret
JWT_SECRET=new-production-jwt

# Production URLs
NEXTJS_WEBHOOK_URL=https://heritagefarms.ca/api/webhooks/strapi

# File storage (Cloudinary recommended)
CLOUDINARY_NAME=heritage-farms
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

## Security Considerations

### API Tokens
1. **Read-only token** for frontend
2. **Full access token** for admin operations
3. **Webhook token** for system integration

### CORS Configuration (Strapi)
```javascript
// config/middlewares.ts
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'", 
            'data:', 
            'blob:', 
            'dl.airtable.com',
            'res.cloudinary.com'
          ],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3000',
        'https://heritagefarms.ca',
        'https://www.heritagefarms.ca',
        'https://heritage-farms-website.vercel.app'
      ]
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## Development Setup Checklist

### After Strapi Installation
- [ ] Copy `.env.example` to `.env` in Strapi directory
- [ ] Generate and set all required secrets
- [ ] Update CORS configuration
- [ ] Create API tokens
- [ ] Test connection from Next.js

### Next.js Updates
- [ ] Add Strapi environment variables
- [ ] Install required packages for API integration
- [ ] Test API connection
- [ ] Update existing components to use hybrid data

### Database Setup
- [ ] Start with SQLite for development
- [ ] Plan PostgreSQL migration for production
- [ ] Set up database backups
- [ ] Configure connection pooling

## Command Reference

### Generate Strapi Secrets
```bash
# In Strapi directory
npm run strapi generate:secret

# Or manually generate
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Start Development Servers
```bash
# Terminal 1: Next.js
cd heritage-farms-website
npm run dev

# Terminal 2: Strapi
cd heritage-farms-strapi
npm run develop
```

### Production Deployment
```bash
# Build Strapi
npm run build
npm run start

# Deploy Next.js (Vercel)
vercel --prod
```

