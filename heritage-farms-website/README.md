# Heritage Farms Website

A modern, responsive e-commerce website for Heritage Farms, Ontario's first Black-led farm focused on West African & Caribbean greens.

## About Heritage Farms

Heritage Farms is Ontario's premier heritage crop farm, specializing in West African and Caribbean greens grown sustainably using modern greenhouse technology. Our mission is to reconnect our community with culturally meaningful greens while reducing environmental impact through innovative farming practices.

### Our Values
- **Cultural Preservation**: Honoring traditional farming methods and heritage crops
- **Sustainability**: 75% less water usage, reduced food miles, responsible waste management
- **Community Focus**: Serving the Ontario community with fresh, locally-grown heritage greens
- **Innovation**: Combining traditional knowledge with modern greenhouse technology

### Heritage Crops Featured
- **Ugwu (Pumpkin Leaves)**: Traditional West African green
- **Ewedu (Jute Leaves)**: Nutritious and culturally significant
- **Scent Leaf**: Aromatic herb with medicinal properties
- **Waterleaf**: Popular in Caribbean cuisine
- **And more**: Expanding our selection of heritage varieties

## Features

### User Experience
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Fast Loading**: Optimized images and efficient code structure
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### E-commerce Functionality
- **Product Catalog**: Browse heritage crops with detailed descriptions
- **Shopping Cart**: Add items and manage quantities
- **Wishlist**: Save products for later purchase
- **Product Reviews**: Customer feedback and ratings system
- **Search & Filter**: Find products by category, price, and availability

### SEO & Accessibility
- **Structured Data**: JSON-LD markup for better search engine visibility
- **Meta Tags**: Comprehensive SEO optimization
- **Sitemap**: Dynamic sitemap generation
- **Alt Text**: Descriptive alt text for all images
- **Semantic HTML**: Proper heading hierarchy and landmarks

### Security
- **Input Validation**: Zod schema validation for all forms
- **Rate Limiting**: API protection against abuse
- **Security Monitoring**: Comprehensive logging and monitoring
- **CSRF Protection**: Cross-site request forgery prevention
- **Content Security Policy**: XSS protection headers

### Performance Optimizations
- **Local Image Processing**: All images optimized locally for maximum performance
- **Multiple Format Support**: WebP, AVIF, and fallback formats
- **Responsive Images**: Automatically generated for different screen sizes
- **Service Worker**: Offline support and smart caching strategies
- **Core Web Vitals**: Real-time performance monitoring and optimization
- **Bundle Optimization**: Code splitting and tree shaking for faster loads

## Directory Structure

```
heritage-farms-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   ├── contact/           # Contact page
│   │   ├── products/          # Product catalog
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── about/             # About page components
│   │   ├── contact/           # Contact form components
│   │   ├── media/             # Media components
│   │   └── wrappers/          # Component wrappers
│   ├── context/               # React Context providers
│   ├── lib/                   # Utility functions
│   │   ├── flaticon-api.ts    # Flaticon API integration
│   │   ├── firebase.ts        # Firebase client config
│   │   ├── firebase-admin.ts  # Firebase admin config
│   │   ├── validation.ts      # Zod schemas
│   │   └── security-monitor.ts # Security utilities
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
│   ├── branding/              # Brand assets and images
│   └── fonts/                 # Custom fonts
└── scripts/                   # Build and utility scripts
```

## State Management

The application uses React Context for global state management:

- **CartContext**: Manages shopping cart state and operations
- **WishlistContext**: Handles wishlist modal and item management
- **AppProviders**: Wraps the app with all necessary contexts

## API Architecture

### Firebase Integration
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: Firestore for product and order data
- **Storage**: Firebase Storage for images and files
- **Admin SDK**: Server-side operations and security

### Security Features
- **Rate Limiting**: Custom rate limiter for API endpoints
- **Input Sanitization**: XSS prevention through input cleaning
- **Security Monitoring**: Comprehensive event logging
- **Validation**: Zod schema validation for all inputs

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project
- Flaticon premium account (for icons)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd heritage-farms-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```

4. **Configure Environment Variables**
   
   **Firebase Configuration:**
   - Get your Firebase config from the Firebase Console
   - Add all Firebase variables to `.env.local`
   
   **Icon API Setup:**
   - **Flaticon API**: Contact Flaticon at info@flaticon.com to request an API key
   - **Icons8 API**: Get your API key from https://developers.icons8.com/
   - Add both API keys to `.env.local`:
     ```
     FLATICON_API_KEY=your_flaticon_api_key_here
     ICONS8_API_KEY=your_icons8_api_key_here
     ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

### Icon API Integration

The About page uses both Flaticon and Icons8 APIs to fetch professional icons and illustrations. To set this up:

1. **Flaticon API Access**: Contact Flaticon at info@flaticon.com
2. **Icons8 API Access**: Get your API key from https://developers.icons8.com/
3. **Add to Environment**: Add both keys to your `.env.local` file
4. **Usage**: The APIs automatically fetch relevant icons and illustrations for:
   - Farming and agriculture
   - Sustainability and environment
   - Community and teamwork
   - Food and nutrition
   - Technology and innovation
   - Cultural heritage and tradition

The APIs include automatic token management and fallback to emoji icons if the APIs are unavailable.

## Key Features

### Completed Features
- ✅ Responsive homepage with hero slider
- ✅ Product catalog with search and filtering
- ✅ Shopping cart functionality
- ✅ Wishlist system
- ✅ Customer testimonials
- ✅ Newsletter signup
- ✅ Contact forms with validation
- ✅ Admin dashboard (basic)
- ✅ SEO optimization with structured data
- ✅ Accessibility improvements
- ✅ Security monitoring and validation
- ✅ Flaticon API integration for professional icons
- ✅ Icons8 API integration for icons and illustrations
- ✅ Modern About page with themeforest-sandbox layout

### In Progress
- 🔄 Enhanced admin features
- 🔄 Advanced product management
- 🔄 Order processing system
- 🔄 Payment integration
- 🔄 Advanced analytics

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, custom CSS animations
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Icons**: Flaticon API (premium), Icons8 API
- **Deployment**: Vercel (recommended)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary to Heritage Farms.

## Support

For support or questions about Heritage Farms products, contact:
- Email: info@heritagefarms.ca
- Phone: (555) 123-4567
- Location: Ontario, Canada
