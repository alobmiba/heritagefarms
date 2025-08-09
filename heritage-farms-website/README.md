# Heritage Farms Website

Ontario's first Black-led farm specializing in year-round West African and Caribbean greens using sustainable greenhouse technology.

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.15 with custom Gilroy fonts
- **State Management**: React Context API with localStorage persistence
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
│   │   ├── products/           # Products page
│   │   ├── about/              # About page
│   │   └── api/                # API routes
│   │       ├── orders/         # Order submission
│   │       └── pexels/         # Image fetching
│   ├── components/             # Reusable UI components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   ├── ShoppingCart.tsx    # Cart functionality
│   │   ├── HeroSlider.tsx      # Homepage hero
│   │   ├── ProductModal.tsx    # Product details
│   │   ├── MissionOrderForm.tsx # Order form
│   │   └── [18 other components]
│   ├── context/                # React Context providers
│   │   └── CartContext.tsx     # Shopping cart state
│   ├── types/                  # TypeScript definitions
│   └── assets/                 # Static assets
├── public/                     # Static files
│   ├── branding/              # Brand assets
│   ├── fonts/                 # Custom fonts
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # SEO
│   └── sitemap.xml           # SEO
└── [config files]
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd heritage-farms-website

# Install dependencies
npm ci

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🏛️ Architecture Patterns

### 1. App Router Structure
- **File-based routing** with Next.js 13+ App Router
- **Server Components** by default, Client Components when needed
- **Layout composition** with nested layouts

### 2. Component Architecture
- **Atomic Design** principles
- **Composition over inheritance**
- **Props interface** definitions for all components
- **Error boundaries** for graceful error handling

### 3. State Management
- **Context API** for global cart state
- **localStorage** for cart persistence
- **Server-side rendering** compatibility

### 4. API Architecture
- **Route handlers** in `/app/api/`
- **RESTful endpoints** for orders and images
- **Error handling** with try-catch blocks

## 🔧 Key Features

### E-commerce Functionality
- ✅ Shopping cart with localStorage persistence
- ✅ Product catalog with detailed information
- ✅ Add to cart functionality
- ✅ Quantity management
- ✅ Checkout process integration

### Performance Optimizations
- ✅ Image optimization with Next.js Image component
- ✅ Font optimization with next/font
- ✅ Code splitting and lazy loading
- ✅ Bundle size optimization

### SEO & Accessibility
- ✅ Semantic HTML structure
- ✅ Meta tags and Open Graph
- ✅ Sitemap and robots.txt
- ✅ PWA manifest for mobile experience

### Security
- ✅ Content Security Policy headers
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Input validation

## 📊 Current Status

### ✅ Completed Features
- Homepage with hero slider
- Product catalog with cart functionality
- About page with company information
- Responsive design with Tailwind CSS
- Shopping cart with localStorage
- Error boundaries and loading states
- SEO optimization
- PWA support

### 🔄 In Progress
- Order form integration with cart
- Payment processing setup
- Admin dashboard
- Inventory management

### 📋 Planned Features
- User authentication
- Order tracking
- Email notifications
- Analytics integration
- Multi-language support

## 🎯 Performance Metrics

- **Lighthouse Score**: Target 90+ across all metrics
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Minimized with code splitting
- **Image Optimization**: WebP and AVIF formats

## 📝 Code Standards

- **TypeScript** for all components and functions
- **ESLint** for code quality
- **Prettier** for consistent formatting
- **Component composition** over inheritance
- **Error boundaries** for graceful failures
- **Accessibility** first approach

## 🔄 Development Workflow

1. **Component Development** - Create reusable components
2. **State Management** - Use Context for global state
3. **API Integration** - Build route handlers
4. **Testing** - Unit and integration tests
5. **Deployment** - Vercel or similar platform

## 📚 Environment

Copy `.env.example` to `.env.local` and fill in values (e.g. `PEXELS_API_KEY`).

---

*Last Updated: January 2024*
*Architecture Version: 1.0*
