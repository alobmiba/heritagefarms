# Heritage Farms Website

A world-class Next.js 15 + TypeScript website for Heritage Fields and Acreage Ltd, Ontario's first Black-led farm focusing on year-round West African and Caribbean greens.

## 🚀 Features

### Core Functionality
- **Hero Slider**: Auto-rotating banner with manual navigation
- **Our Purpose**: Mission and vision content from Farm Profile
- **Credibility Metrics**: Animated count-up counters with key statistics
- **Mission & Order Form**: Split-screen layout with server-side validation
- **Latest News**: 3-card carousel for CMS-driven blog posts
- **Newsletter Signup**: Email subscription with validation
- **Footer**: Complete contact information and social links

### Technical Features
- **Next.js 15** with App Router and Edge Runtime
- **TypeScript** throughout for type safety
- **Tailwind CSS** with custom brand palette
- **Gilroy Font** integration (Light & Extrabold)
- **Intersection Observer** for scroll animations
- **API Routes** with server-side validation
- **Security Headers** and CSP configuration
- **Image Optimization** with next/future/image
- **Responsive Design** for all devices

## 🎨 Brand Identity

### Color Palette
- **Dark Green**: `#00312D` - Primary brand color
- **Forest Green**: `#3A7817` - Secondary color
- **Lime Slice**: `#EAFDE7` - Light background
- **Leafy Lemon**: `#BFF106` - Accent color

### Typography
- **Gilroy Light**: Body text and descriptions
- **Gilroy Extrabold**: Headings and emphasis

## 📁 Project Structure

```
heritage-farms-website/ ([browse in GitHub](https://github.com/alobmiba/heritagefarms/tree/main/heritage-farms-website))
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── orders/
│   │   │   │   └── route.ts          # Order form API
│   │   │   └── pexels/
│   │   │       └── route.ts          # Pexels image proxy
│   │   ├── globals.css               # Global styles & fonts
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   └── components/
│       ├── HeroSlider.tsx            # Auto-rotating banner
│       ├── OurPurpose.tsx            # Mission content
│       ├── CredibilityMetrics.tsx    # Animated counters
│       ├── MissionOrderForm.tsx      # Split-screen form
│       ├── LatestNews.tsx            # News carousel
│       ├── NewsletterSignup.tsx      # Email subscription
│       └── Footer.tsx                # Site footer
├── public/
│   ├── branding/
│   │   ├── Images/                   # Product & banner images
│   │   └── Logo/                     # Logo variants
│   └── fonts/
│       └── Gilroy/                   # Custom fonts
├── tailwind.config.ts                # Tailwind configuration
├── next.config.js                    # Next.js configuration
└── README.md
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Gilroy (Light & Extrabold)
- **Images**: next/future/image
- **Animations**: CSS transitions + Intersection Observer
- **API**: Edge Functions
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

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

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   ```
   PEXELS_API_KEY=your_pexels_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Content Sources

All website content is sourced from internal documents:

- **Business Plan**: `./Branding/Heritage Farms Business Plan.md`
- **Farm Profile**: `./Branding/Farm Profile.md`
- **Brand Assets**: `./Branding/` directory
- **Product Images**: `./Branding/Images/products/`
- **Logo Variants**: `./Branding/Logo/PNG/`

## 🎯 Key Metrics Displayed

From the Business Plan, the website showcases:

- **75%** less water usage
- **50%** fewer food-mile CO₂ emissions
- **7** heritage crops grown
- **90%** year-round greenhouse capacity
- **5** local grocer partnerships
- **Bi-weekly** farm tours (coming soon)

## 🔧 API Endpoints

### `/api/orders` (POST)
- Handles order form submissions
- Server-side validation
- Returns success/error responses

### `/api/pexels` (GET)
- Proxies Pexels image API requests
- Requires `PEXELS_API_KEY` environment variable
- Cached responses for performance

## 🎨 Customization

### Brand Colors
Update `tailwind.config.ts` to modify the brand palette:

```typescript
colors: {
  'heritage': {
    'dark-green': '#00312D',
    'forest-green': '#3A7817',
    'lime-slice': '#EAFDE7',
    'leafy-lemon': '#BFF106',
  }
}
```

### Fonts
Gilroy fonts are loaded from `public/fonts/Gilroy/` and configured in `globals.css`.

### Content
Update component files to modify:
- Mission statements
- Product listings
- Contact information
- Social media links

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables
- `PEXELS_API_KEY`: For additional image content
- `NEXT_PUBLIC_SITE_URL`: For canonical URLs

## 📊 Performance Features

- **Edge Runtime**: Fast API responses
- **Image Optimization**: WebP/AVIF formats
- **Font Optimization**: Local font loading
- **Code Splitting**: Automatic by Next.js
- **Caching**: Static generation + ISR
- **Security**: CSP headers and validation

## 🔒 Security

- **Content Security Policy**: Configured in `next.config.js`
- **Input Validation**: Server-side form validation
- **HTTPS**: Enforced with HSTS headers
- **XSS Protection**: Enabled headers
- **CSRF Protection**: Built into Next.js

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎭 Animations

- **Scroll-triggered**: Intersection Observer
- **Count-up**: Animated metrics
- **Fade-in**: Content reveals
- **Slide-up**: Smooth transitions
- **Hover effects**: Interactive elements

## 📈 Analytics

Ready for integration with:
- Vercel Analytics
- Google Analytics
- Custom tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Heritage Fields and Acreage Ltd.

## 📞 Support

For questions or support, contact:
- **Email**: info@heritagefarms.ca
- **Phone**: +1 (555) 123-4567
- **Address**: 16 Twin Sisters Lake Road, Marmora, Ontario

---

**Built with ❤️ for Heritage Farms**