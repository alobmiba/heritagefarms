# Heritage Farms Website

Ontario's first Black-led farm specializing in year-round West African and Caribbean greens using sustainable greenhouse technology.

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.15 with custom Gilroy fonts
- **State Management**: React Context API with localStorage persistence
- **Backend**: Firebase Firestore for database, Firebase Admin SDK
- **Authentication**: NextAuth.js with Google OAuth
- **UI Components**: Swiper, React Icons, Preline
- **Development**: ESLint, Prettier, PostCSS

### Directory Structure
```
heritage-farms-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Global styles
│   │   ├── products/           # Products page (Firebase-powered)
│   │   ├── about/              # About page
│   │   ├── admin/              # Admin dashboard
│   │   │   ├── page.tsx        # Orders management
│   │   │   ├── inventory/      # Inventory management
│   │   │   └── layout.tsx      # Admin layout
│   │   └── api/                # API routes
│   │       ├── orders/         # Order submission (Firebase)
│   │       ├── inventory/      # Inventory API (Firebase)
│   │       ├── admin/          # Admin APIs
│   │       │   ├── orders/     # Order management
│   │       │   └── inventory/  # Inventory management
│   │       ├── auth/           # NextAuth configuration
│   │       └── pexels/         # Image fetching
│   ├── components/             # Reusable UI components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   ├── ShoppingCart.tsx    # Cart functionality
│   │   ├── HeroSlider.tsx      # Homepage hero
│   │   ├── ProductModal.tsx    # Product details (updated)
│   │   ├── MissionOrderForm.tsx # Order form (Firebase)
│   │   ├── CheckoutForm.tsx    # Checkout process
│   │   └── [18 other components]
│   ├── context/                # React Context providers
│   │   └── CartContext.tsx     # Shopping cart state
│   ├── lib/                    # Utility libraries
│   │   ├── firebase.ts         # Firebase client config
│   │   ├── firebase-admin.ts   # Firebase admin config
│   │   └── order-code.ts       # Order code generation
│   ├── types/                  # TypeScript definitions
│   │   ├── commerce.ts         # E-commerce types
│   │   └── other.ts            # Other type definitions
│   └── assets/                 # Static assets
├── public/                     # Static files
│   ├── branding/              # Brand assets
│   ├── fonts/                 # Custom fonts
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # SEO
│   └── sitemap.xml           # SEO
├── scripts/                   # Utility scripts
│   └── populate-inventory.js  # Firebase data population
└── [config files]
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm
- Firebase project (see setup guide)

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd heritage-farms-website

# Install dependencies
npm ci

# Copy environment variables
cp env.example .env.local

# Fill in your Firebase and NextAuth credentials in .env.local

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
npm run typecheck     # Run TypeScript checks
```

## 🔥 Firebase Integration

### Features
- **Real-time Inventory Management**: Products loaded from Firestore
- **Order Processing**: Orders stored in Firebase with unique codes
- **Admin Dashboard**: Secure admin interface for order/inventory management
- **Authentication**: Google OAuth for admin access

### Setup Required
1. **Firebase Project**: Create project and enable Firestore
2. **Service Account**: Download service account key
3. **Google OAuth**: Set up OAuth credentials for admin access
4. **Environment Variables**: Configure all Firebase and NextAuth variables

See `FIREBASE_SETUP.md` for detailed setup instructions.

## 🏛️ Architecture Patterns

### 1. App Router Structure
- **File-based routing** with Next.js 13+ App Router
- **Server Components** by default, Client Components when needed
- **Layout composition** with nested layouts
- **API Routes** for backend functionality

### 2. Component Architecture
- **Atomic Design** principles
- **Composition over inheritance**
- **Props interface** definitions for all components
- **Error boundaries** for graceful error handling
- **TypeScript** for type safety

### 3. State Management
- **Context API** for global cart state
- **localStorage** for cart persistence
- **Firebase** for server-side data
- **Server-side rendering** compatibility

### 4. API Architecture
- **Route handlers** in `/app/api/`
- **Firebase integration** for data persistence
- **NextAuth** for authentication
- **Error handling** with try-catch blocks
- **Rate limiting** for order submissions

## 🔧 Key Features

### E-commerce Functionality
- ✅ **Dynamic Product Catalog**: Products loaded from Firebase
- ✅ **Shopping Cart**: With localStorage persistence
- ✅ **Add to Cart**: Real-time inventory checking
- ✅ **Quantity Management**: Stock-aware quantity controls
- ✅ **Checkout Process**: Interac e-Transfer integration
- ✅ **Order Tracking**: Unique order codes and status tracking

### Admin Dashboard
- ✅ **Order Management**: View and update order status
- ✅ **Inventory Management**: View current inventory levels
- ✅ **Secure Access**: Google OAuth authentication
- ✅ **Real-time Updates**: Live data from Firebase

### Performance Optimizations
- ✅ **Image optimization** with Next.js Image component
- ✅ **Font optimization** with next/font
- ✅ **Code splitting** and lazy loading
- ✅ **Bundle size optimization**
- ✅ **Firebase caching** for inventory data

### SEO & Accessibility
- ✅ **Semantic HTML** structure
- ✅ **Meta tags** and Open Graph
- ✅ **Sitemap** and robots.txt
- ✅ **PWA manifest** for mobile experience
- ✅ **Loading states** and error boundaries

### Security
- ✅ **Content Security Policy** headers
- ✅ **XSS protection**
- ✅ **CSRF protection**
- ✅ **Input validation**
- ✅ **Rate limiting** on order submissions
- ✅ **Authentication** for admin access

## 📊 Current Status

### ✅ Completed Features
- **Homepage** with hero slider and company information
- **Product Catalog** with Firebase integration
- **Shopping Cart** with localStorage persistence
- **Order Processing** with Firebase storage and unique codes
- **Admin Dashboard** with order and inventory management
- **Authentication** system with Google OAuth
- **Responsive Design** with Tailwind CSS
- **Error Boundaries** and loading states
- **SEO Optimization** and PWA support
- **TypeScript** integration throughout
- **Firebase Integration** for data persistence

### 🔄 In Progress
- **Firebase Setup**: Need to enable Firestore API and populate data
- **Google OAuth**: Need to configure OAuth credentials
- **Production Deployment**: Ready for deployment once Firebase is configured

### 📋 Planned Features
- **Email Notifications**: Order confirmations and updates
- **Analytics Integration**: Google Analytics and Firebase Analytics
- **Multi-language Support**: French and other languages
- **Advanced Inventory**: Low stock alerts and automatic ordering
- **Customer Accounts**: User registration and order history
- **Payment Processing**: Direct payment integration

## 🎯 Performance Metrics

- **Lighthouse Score**: Target 90+ across all metrics
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Minimized with code splitting
- **Image Optimization**: WebP and AVIF formats
- **Firebase Performance**: Optimized queries and caching

## 📝 Code Standards

- **TypeScript** for all components and functions
- **ESLint** for code quality
- **Prettier** for consistent formatting
- **Component composition** over inheritance
- **Error boundaries** for graceful failures
- **Accessibility** first approach
- **Firebase best practices** for data management

## 🔄 Development Workflow

1. **Component Development** - Create reusable components
2. **State Management** - Use Context for global state
3. **API Integration** - Build route handlers with Firebase
4. **Authentication** - NextAuth integration
5. **Testing** - Unit and integration tests
6. **Deployment** - Vercel or similar platform

## 📚 Environment Setup

### Required Environment Variables
```env
# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Admin Access
ADMIN_EMAILS=heritagefieldsandacreage@gmail.com
```

### Setup Steps
1. Copy `env.example` to `.env.local`
2. Fill in Firebase credentials from Firebase Console
3. Set up Google OAuth credentials
4. Generate NextAuth secret
5. Run `node scripts/populate-inventory.js` to populate data

## 🚀 Deployment

### Prerequisites
- Firebase project configured
- Environment variables set
- Google OAuth configured
- Inventory data populated

### Deployment Platforms
- **Vercel** (recommended)
- **Netlify**
- **Firebase Hosting**

### Production Checklist
- [ ] Environment variables configured
- [ ] Firebase security rules set
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking enabled

---

*Last Updated: January 2024*
*Architecture Version: 2.0 - Firebase Integration*
*Status: Ready for Firebase Setup and Deployment*
