# Heritage Farms Website

A modern, high-performance website for Heritage Farms, featuring local image optimization, offline support, and comprehensive performance monitoring.

## 🚀 Features

- **Performance Optimized**: Local image processing, Service Worker, Core Web Vitals monitoring
- **Offline Support**: Service Worker with smart caching strategies
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **E-commerce Ready**: Shopping cart, checkout, and inventory management
- **Admin Dashboard**: Inventory and order management
- **SEO Optimized**: Structured data, meta tags, and performance monitoring
- **Security Focused**: Input validation, rate limiting, and secure Firebase configuration

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Performance Optimizations](#performance-optimizations)
- [Security Implementation](#security-implementation)
- [Firebase Setup](#firebase-setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Development](#development)

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project (for backend functionality)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/heritagefarms.git
cd heritage-farms/heritage-farms-website

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Set up Firebase (see Firebase Setup section)
# Add your Firebase configuration to .env.local

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY=your-private-key

# NextAuth (if using authentication)
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# Optional: Analytics and monitoring
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📁 Project Structure

```
heritage-farms-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin pages
│   │   ├── about/             # About page
│   │   ├── products/          # Products page
│   │   ├── checkout/          # Checkout page
│   │   └── offline/           # Offline fallback page
│   ├── components/            # React components
│   │   ├── common/            # Shared components
│   │   ├── about/             # About page components
│   │   ├── contact/           # Contact components
│   │   └── shop/              # E-commerce components
│   ├── lib/                   # Utility functions
│   ├── context/               # React context providers
│   ├── data/                  # Static data and types
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
│   ├── branding/              # Brand assets
│   └── sw.js                  # Service Worker
├── scripts/                   # Build and utility scripts
└── tests/                     # Test files
```

## ⚡ Performance Optimizations

### Image Optimization
- **Local Processing**: WebP/AVIF conversion with Sharp
- **Responsive Images**: Multiple sizes and formats
- **Lazy Loading**: Intersection Observer API
- **Blur Placeholders**: Progressive image loading
- **Critical Preloading**: Above-the-fold images

### Service Worker
- **Offline Support**: Cache-first for static assets
- **Smart Caching**: Network-first for API calls
- **Background Sync**: Queue operations when offline
- **Push Notifications**: Real-time updates

### Bundle Optimization
- **Code Splitting**: Route-based and component-level
- **Dynamic Imports**: Lazy load non-critical components
- **Tree Shaking**: Remove unused code
- **Compression**: Gzip and Brotli support

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s target
- **FID (First Input Delay)**: < 100ms target
- **CLS (Cumulative Layout Shift)**: < 0.1 target

### Caching Strategies
- **Browser Cache**: Long-term for static assets
- **Service Worker Cache**: Offline-first approach
- **CDN Headers**: Optimized cache control

## 🔒 Security Implementation

### Input Validation
- **Zod Schemas**: Type-safe validation for all API routes
- **Sanitization**: XSS protection and input cleaning
- **Rate Limiting**: In-memory rate limiting (consider Redis for production)

### Firebase Security
- **Environment Variables**: Secure credential management
- **Admin SDK**: Server-side only initialization
- **Security Rules**: Firestore rules (see Firebase Setup)

### API Security
- **CORS**: Proper cross-origin configuration
- **Error Handling**: No sensitive data in error responses
- **Authentication**: NextAuth integration for protected routes

### Recommendations for Production
1. **Implement Firebase Security Rules** (Critical)
2. **Redis-based Rate Limiting** (High Priority)
3. **Authorization Checks** (Medium Priority)
4. **Regular Security Audits** (Ongoing)

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Set up Authentication (if needed)

### 2. Service Account Setup
1. Go to Project Settings > Service Accounts
2. Generate new private key
3. Download JSON file
4. Extract credentials for environment variables

### 3. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Inventory - read-only for public, full access for admin
    match /inventory/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Orders - authenticated users can create, admin can read/write
    match /orders/{document} {
      allow create: if request.auth != null;
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 4. Environment Variables
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# CI mode
npm run test:ci
```

### E2E Tests
```bash
# Run Playwright tests
npm run test:e2e

# UI mode
npm run test:e2e:ui

# Headed mode
npm run test:e2e:headed

# Debug mode
npm run test:e2e:debug
```

### Test Structure
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API route testing
- **E2E Tests**: User workflow testing
- **Performance Tests**: Core Web Vitals monitoring

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables for Production
- Set all Firebase credentials
- Configure NextAuth secrets
- Add analytics IDs
- Set up monitoring tools

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run optimize-images # Optimize images
```

### Code Quality
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Husky**: Git hooks for quality checks
- **Commitlint**: Conventional commit messages

### Git Hooks
- **Pre-commit**: Lint and type check
- **Commit-msg**: Validate commit message format

### Performance Monitoring
- **Core Web Vitals**: Real-time monitoring
- **Bundle Analysis**: Webpack bundle analyzer
- **Lighthouse**: Performance audits
- **Custom Metrics**: Application-specific monitoring

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Performance Best Practices](https://web.dev/performance/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation sections above
- Review the Firebase setup guide

---

**Note**: This project includes comprehensive performance optimizations and security measures. Make sure to review the security recommendations and implement Firebase security rules before deploying to production.
