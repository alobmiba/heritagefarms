# Heritage Farms Testing & Quality Assurance Guide

## 🎯 Overview

This guide covers our comprehensive testing strategy using **Playwright** for end-to-end testing and **Pexels API** for image optimization, ensuring high-quality user experiences across all devices and scenarios.

## 🧪 Playwright Testing Strategy

### Why Playwright?

Playwright serves as our primary quality assurance tool by providing:

- **Cross-browser testing** (Chrome, Firefox, Safari)
- **Mobile responsiveness testing** (iOS, Android)
- **Real user interaction simulation**
- **Performance monitoring**
- **Accessibility validation**
- **Visual regression detection**

### Test Coverage Areas

#### 1. **About Page Quality Assurance**
```bash
npm run test:e2e tests/about-page.spec.ts
```

**Tests include:**
- ✅ Page loading and navigation
- ✅ Hero section with optimized images
- ✅ Purpose, Promise, and Metrics display
- ✅ Story timeline functionality
- ✅ Sustainability practices with progress bars
- ✅ Team section with proper navigation
- ✅ Heritage crops teaser with images
- ✅ FAQ accordion interactions
- ✅ CTA button functionality
- ✅ Mobile responsiveness
- ✅ Accessibility compliance
- ✅ SEO meta tags validation

#### 2. **Application-wide Quality Assurance**
```bash
npm run test:e2e tests/app.spec.ts
```

**Tests include:**
- ✅ Cross-page navigation
- ✅ Header transparency and styling
- ✅ Mobile menu functionality
- ✅ Cart and checkout flows
- ✅ Contact form validation
- ✅ Admin page access control
- ✅ Footer link functionality
- ✅ Image loading optimization
- ✅ Performance metrics
- ✅ Error handling
- ✅ Network resilience

### Running Tests

#### Quick Start
```bash
# Run all tests
npm run test:e2e

# Run with UI (interactive)
npm run test:e2e:ui

# Run with browser visible
npm run test:e2e:headed

# Debug specific test
npm run test:e2e:debug

# View test reports
npm run test:e2e:report
```

#### Browser-specific Testing
```bash
# Test on specific browsers
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Test mobile viewports
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

#### CI/CD Integration
```bash
# Run tests in CI environment
npx playwright test --reporter=html,junit
```

## 🖼️ Pexels Image Optimization

### Why Pexels Integration?

Our Pexels integration ensures:
- **High-quality, professional images**
- **Consistent visual branding**
- **Optimized loading performance**
- **Local storage for reliability**
- **Automatic fallback handling**

### Image Optimization Process

#### 1. **Setup Environment**
```bash
# Add to .env.local
PEXELS_API_KEY=your_pexels_api_key_here
```

#### 2. **Fetch and Optimize Images**
```bash
# Run image optimization script
npm run optimize-images
```

**This script:**
- 📸 Fetches high-quality images for each About page section
- 💾 Stores images locally in `/public/branding/images/pexels/`
- 📄 Creates configuration mapping
- 🔄 Provides fallback handling

#### 3. **Image Sections Optimized**

| Section | Query | Purpose |
|---------|-------|---------|
| **Hero** | `greenhouse farming sustainable agriculture` | Main hero background |
| **Sustainability** | `sustainable agriculture technology irrigation` | Background texture |
| **Team** | `farm team diverse agriculture` | Team section imagery |
| **Crops** | `fresh vegetables greens organic` | Product showcase |
| **Process** | `farming process greenhouse cultivation` | Process visualization |

### Manual Image Management

#### Fetch Specific Images
```javascript
// In your component
import { fetchPexelsImages } from '@/lib/pexels-utils';

const images = await fetchPexelsImages('greenhouse farming', 5);
```

#### Download and Store
```javascript
import { downloadAndStoreImage } from '@/lib/pexels-utils';

const localPath = await downloadAndStoreImage(
  'https://images.pexels.com/photos/...',
  'hero-greenhouse.jpg'
);
```

## 🔍 Quality Metrics

### Performance Benchmarks
- **Page Load Time**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1

### Accessibility Standards
- **WCAG 2.1 AA Compliance**
- **Keyboard Navigation**
- **Screen Reader Compatibility**
- **Color Contrast Ratios**
- **Alt Text Coverage**

### Cross-browser Compatibility
- **Chrome** (latest 2 versions)
- **Firefox** (latest 2 versions)
- **Safari** (latest 2 versions)
- **Edge** (latest 2 versions)

### Mobile Responsiveness
- **iPhone SE** (375x667)
- **iPhone 12** (390x844)
- **Samsung Galaxy** (360x640)
- **iPad** (768x1024)

## 🚀 Continuous Quality Assurance

### Pre-commit Hooks
```bash
# Run tests before commit
npm run test:e2e
npm run test:coverage
```

### CI/CD Pipeline
```yaml
# Example GitHub Actions
- name: Run Playwright Tests
  run: npm run test:e2e

- name: Upload Test Results
  uses: actions/upload-artifact@v2
  with:
    name: playwright-report
    path: playwright-report/
```

### Monitoring and Alerts
- **Performance regression detection**
- **Visual regression alerts**
- **Accessibility compliance monitoring**
- **Cross-browser compatibility tracking**

## 📊 Test Reports and Analytics

### HTML Reports
```bash
# Generate detailed HTML report
npm run test:e2e:report
```

**Report includes:**
- 📈 Test execution timeline
- 🖼️ Screenshots on failure
- 🎥 Video recordings
- 📱 Mobile vs desktop comparisons
- ⚡ Performance metrics

### JUnit Reports
```bash
# Generate CI-friendly reports
npx playwright test --reporter=junit
```

## 🛠️ Troubleshooting

### Common Issues

#### Image Loading Failures
```bash
# Check Pexels API key
echo $PEXELS_API_KEY

# Verify image directory
ls -la public/branding/images/pexels/
```

#### Test Failures
```bash
# Debug specific test
npx playwright test --debug tests/about-page.spec.ts

# Check browser compatibility
npx playwright install
```

#### Performance Issues
```bash
# Run performance audit
npx playwright test --project=chromium --grep="performance"

# Check network conditions
npx playwright test --project=chromium --grep="network"
```

## 📚 Best Practices

### Writing Tests
1. **Use descriptive test names**
2. **Test user workflows, not implementation**
3. **Include accessibility checks**
4. **Test error scenarios**
5. **Validate performance metrics**

### Image Optimization
1. **Use appropriate image sizes**
2. **Implement lazy loading**
3. **Provide meaningful alt text**
4. **Optimize for web delivery**
5. **Maintain fallback images**

### Quality Assurance
1. **Run tests on multiple browsers**
2. **Test mobile responsiveness**
3. **Validate accessibility**
4. **Monitor performance**
5. **Document visual changes**

## 🎯 Success Metrics

### Quality Indicators
- ✅ **100% test pass rate**
- ✅ **< 3s page load time**
- ✅ **WCAG 2.1 AA compliance**
- ✅ **Cross-browser compatibility**
- ✅ **Mobile-first responsive design**

### User Experience
- ✅ **Smooth navigation**
- ✅ **Fast image loading**
- ✅ **Accessible interactions**
- ✅ **Consistent branding**
- ✅ **Professional appearance**

---

## 🚀 Getting Started

1. **Install dependencies**: `npm install`
2. **Set up environment**: Add `PEXELS_API_KEY` to `.env.local`
3. **Optimize images**: `npm run optimize-images`
4. **Run tests**: `npm run test:e2e`
5. **View reports**: `npm run test:e2e:report`

This comprehensive testing and optimization strategy ensures Heritage Farms delivers a world-class user experience across all devices and scenarios.
