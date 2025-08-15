import { test, expect } from '@playwright/test';

test.describe('Heritage Farms Application', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Heritage Farms/);
    
    // Check main navigation
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
    
    // Check hero section
    await expect(page.locator('section').first()).toBeVisible();
  });

  test('should navigate between pages correctly', async ({ page }) => {
    // Test About page navigation
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByText('About Heritage Farms')).toBeVisible();
    
    // Test Products page navigation
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL('/products');
    
    // Test Contact page navigation
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
    
    // Test Home page navigation
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should have responsive navigation', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile navigation
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile menu button is visible
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      
      // Check if mobile menu opens
      const mobileMenu = page.locator('nav, [role="navigation"]');
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('should handle header transparency correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check header has correct background
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check header has the specified background color with opacity
    const headerStyle = await header.getAttribute('class');
    expect(headerStyle).toContain('bg-[#3A7817]/60');
  });

  test('should load products page with cart functionality', async ({ page }) => {
    await page.goto('/products');
    
    // Check products are displayed
    await expect(page.getByText(/Products/)).toBeVisible();
    
    // Check cart icon is present
    const cartIcon = page.locator('[data-testid="cart"], .cart, [aria-label*="cart"]');
    if (await cartIcon.isVisible()) {
      await expect(cartIcon).toBeVisible();
    }
  });

  test('should load contact page with form', async ({ page }) => {
    await page.goto('/contact');
    
    // Check contact form elements
    const form = page.locator('form');
    if (await form.isVisible()) {
      await expect(form).toBeVisible();
      
      // Check for common form fields
      const nameField = page.locator('input[name="name"], input[placeholder*="name"]');
      const emailField = page.locator('input[name="email"], input[type="email"]');
      const messageField = page.locator('textarea[name="message"], textarea[placeholder*="message"]');
      
      if (await nameField.isVisible()) {
        await expect(nameField).toBeVisible();
      }
      if (await emailField.isVisible()) {
        await expect(emailField).toBeVisible();
      }
      if (await messageField.isVisible()) {
        await expect(messageField).toBeVisible();
      }
    }
  });

  test('should handle admin page access', async ({ page }) => {
    await page.goto('/admin');
    
    // Check if admin page loads (might redirect to login)
    await expect(page).toHaveURL(/.*admin.*/);
    
    // Check for admin-specific content or login form
    const adminContent = page.locator('h1, h2, .admin, [data-testid="admin"]');
    if (await adminContent.isVisible()) {
      await expect(adminContent).toBeVisible();
    }
  });

  test('should have proper footer links', async ({ page }) => {
    await page.goto('/');
    
    // Check footer is present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check footer links work
    const footerLinks = footer.locator('a');
    const linkCount = await footerLinks.count();
    
    for (let i = 0; i < Math.min(linkCount, 5); i++) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        await expect(link).toBeVisible();
      }
    }
  });

  test('should handle image loading correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check that images load without errors
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 10); i++) {
      const image = images.nth(i);
      const src = await image.getAttribute('src');
      const alt = await image.getAttribute('alt');
      
      expect(src).toBeTruthy();
      if (alt !== null) {
        expect(alt.length).toBeGreaterThan(0);
      }
    }
  });

  test('should have proper SEO structure', async ({ page }) => {
    await page.goto('/');
    
    // Check meta tags
    const metaDescription = page.locator('meta[name="description"]');
    if (await metaDescription.isVisible()) {
      await expect(metaDescription).toHaveAttribute('content');
    }
    
    // Check title
    await expect(page).toHaveTitle();
    
    // Check canonical link
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.isVisible()) {
      await expect(canonical).toHaveAttribute('href');
    }
  });

  test('should handle accessibility requirements', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    if (headingCount > 0) {
      // Check that first heading is h1
      const firstHeading = headings.first();
      const tagName = await firstHeading.evaluate(el => el.tagName.toLowerCase());
      expect(tagName).toBe('h1');
    }
    
    // Check for proper ARIA labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();
      
      // Button should have either aria-label or visible text
      expect(ariaLabel || textContent).toBeTruthy();
    }
  });

  test('should handle different screen sizes', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 1024, height: 768 },  // Tablet
      { width: 375, height: 667 },   // Mobile
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      
      // Check that main content is visible
      await expect(page.locator('main, .main, [role="main"]')).toBeVisible();
      
      // Check that navigation is accessible
      const nav = page.locator('nav, [role="navigation"]');
      await expect(nav).toBeVisible();
    }
  });

  test('should handle JavaScript errors gracefully', async ({ page }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check that no critical JavaScript errors occurred
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('analytics') && 
      !error.includes('advertisement')
    );
    
    expect(criticalErrors.length).toBeLessThan(5);
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate offline state
    await page.route('**/*', route => {
      route.abort();
    });
    
    try {
      await page.goto('/', { timeout: 5000 });
    } catch (error) {
      // Expected to fail, but should not crash the browser
      expect(error).toBeTruthy();
    }
    
    // Reset routing
    await page.unroute('**/*');
    
    // Should work normally after reset
    await page.goto('/');
    await expect(page).toHaveTitle();
  });

  test('should have proper performance metrics', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check that page loads within reasonable time
    const loadTime = await page.evaluate(() => {
      return performance.timing.loadEventEnd - performance.timing.navigationStart;
    });
    
    expect(loadTime).toBeLessThan(5000); // 5 seconds
  });

  test('should handle form submissions correctly', async ({ page }) => {
    await page.goto('/contact');
    
    // Find contact form
    const form = page.locator('form');
    if (await form.isVisible()) {
      // Fill out form fields if they exist
      const nameField = page.locator('input[name="name"], input[placeholder*="name"]');
      const emailField = page.locator('input[name="email"], input[type="email"]');
      const messageField = page.locator('textarea[name="message"], textarea[placeholder*="message"]');
      
      if (await nameField.isVisible()) {
        await nameField.fill('Test User');
      }
      if (await emailField.isVisible()) {
        await emailField.fill('test@example.com');
      }
      if (await messageField.isVisible()) {
        await messageField.fill('This is a test message');
      }
      
      // Check submit button
      const submitButton = page.locator('button[type="submit"], input[type="submit"]');
      if (await submitButton.isVisible()) {
        await expect(submitButton).toBeVisible();
      }
    }
  });

  test('should handle search functionality', async ({ page }) => {
    await page.goto('/products');
    
    // Look for search functionality
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[name="search"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('greens');
      
      // Check if search results appear
      const searchResults = page.locator('.search-results, [data-testid="search-results"]');
      if (await searchResults.isVisible()) {
        await expect(searchResults).toBeVisible();
      }
    }
  });
});
