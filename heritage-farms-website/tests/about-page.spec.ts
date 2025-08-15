import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('should load the about page successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/About.*Heritage Farms/);
    
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('About Heritage Farms');
    
    // Check page loads without errors
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display hero section with correct content', async ({ page }) => {
    // Check hero section exists
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Check hero content
    await expect(page.getByText('About Heritage Farms')).toBeVisible();
    await expect(page.getByText(/Ontario's first Black-led farm/)).toBeVisible();
    await expect(page.getByText(/rooted in heritage, nurtured under Canadian skies/)).toBeVisible();
    
    // Check hero buttons
    await expect(page.getByRole('link', { name: 'Meet the Team' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact Us' })).toBeVisible();
  });

  test('should display purpose, promise, and metrics section', async ({ page }) => {
    // Check section headings
    await expect(page.getByText('Purpose')).toBeVisible();
    await expect(page.getByText('Promise')).toBeVisible();
    await expect(page.getByText('Key Metrics')).toBeVisible();
    
    // Check content
    await expect(page.getByText(/Reconnect our community to culturally meaningful greens/)).toBeVisible();
    await expect(page.getByText(/Fresh, traceable heritage crops/)).toBeVisible();
    await expect(page.getByText('75% less water')).toBeVisible();
    await expect(page.getByText('50% lower food-mile carbon')).toBeVisible();
    await expect(page.getByText('90% year-round yield')).toBeVisible();
  });

  test('should display story timeline section', async ({ page }) => {
    // Check section heading
    await expect(page.getByText('Our Story')).toBeVisible();
    
    // Check timeline items
    await expect(page.getByText('Heritage Farms Founded')).toBeVisible();
    await expect(page.getByText('First Seeds Planted')).toBeVisible();
    await expect(page.getByText('Growing Together')).toBeVisible();
    
    // Check dates
    await expect(page.getByText('Aug 2024')).toBeVisible();
    await expect(page.getByText('2025')).toBeVisible();
    await expect(page.getByText('Future')).toBeVisible();
  });

  test('should display sustainability practices section', async ({ page }) => {
    // Check section heading
    await expect(page.getByText('How We Grow, Responsibly')).toBeVisible();
    
    // Check practice cards
    await expect(page.getByText('Efficient irrigation')).toBeVisible();
    await expect(page.getByText('Local distribution')).toBeVisible();
    await expect(page.getByText('Year-round greenhouse')).toBeVisible();
    await expect(page.getByText('Composting')).toBeVisible();
    
    // Check progress bars
    const progressBars = page.locator('.bg-\\[\\#3A7817\\]');
    await expect(progressBars).toHaveCount(4);
  });

  test('should display team section', async ({ page }) => {
    // Check section heading
    await expect(page.getByText('The People Behind the Produce')).toBeVisible();
    
    // Check team section has proper ID for navigation
    const teamSection = page.locator('#team');
    await expect(teamSection).toBeVisible();
  });

  test('should display heritage crops teaser section', async ({ page }) => {
    // Check section heading
    await expect(page.getByText('Signature Greens')).toBeVisible();
    
    // Check crop cards
    await expect(page.getByText('Ugwu (Pumpkin Leaves)')).toBeVisible();
    await expect(page.getByText('Ewedu (Jute Leaves)')).toBeVisible();
    await expect(page.getByText('Scent Leaf (Basil)')).toBeVisible();
    await expect(page.getByText('Waterleaf')).toBeVisible();
    
    // Check CTA button
    await expect(page.getByRole('link', { name: 'View All Produce' })).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    // Check section heading
    await expect(page.getByText('Frequently Asked Questions')).toBeVisible();
    
    // Check FAQ items
    await expect(page.getByText('Where can I buy your greens?')).toBeVisible();
    await expect(page.getByText('Are crops available year-round?')).toBeVisible();
    await expect(page.getByText('Do you deliver?')).toBeVisible();
    await expect(page.getByText('What makes your farm sustainable?')).toBeVisible();
  });

  test('should display CTA section', async ({ page }) => {
    // Check CTA content
    await expect(page.getByText('Ready to bring heritage flavours home?')).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: 'Pre-Order' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact Us' })).toBeVisible();
  });

  test('should have proper navigation functionality', async ({ page }) => {
    // Test "Meet the Team" link scrolls to team section
    await page.getByRole('link', { name: 'Meet the Team' }).click();
    
    // Wait for scroll and check if team section is in view
    await page.waitForTimeout(1000);
    const teamSection = page.locator('#team');
    await expect(teamSection).toBeVisible();
  });

  test('should have proper link functionality', async ({ page }) => {
    // Test Contact Us link
    const contactLink = page.getByRole('link', { name: 'Contact Us' });
    await expect(contactLink).toHaveAttribute('href', '/contact');
    
    // Test View All Produce link
    const productsLink = page.getByRole('link', { name: 'View All Produce' });
    await expect(productsLink).toHaveAttribute('href', '/products');
    
    // Test Pre-Order link
    const preOrderLink = page.getByRole('link', { name: 'Pre-Order' });
    await expect(preOrderLink).toHaveAttribute('href', '/products');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check hero section is still visible
    await expect(page.getByText('About Heritage Farms')).toBeVisible();
    
    // Check buttons stack vertically on mobile
    const heroButtons = page.locator('section').first().locator('a');
    await expect(heroButtons).toHaveCount(2);
    
    // Check grid layouts adapt to mobile
    const purposeCards = page.locator('section').nth(1).locator('.grid > div');
    await expect(purposeCards).toHaveCount(3);
  });

  test('should have proper accessibility features', async ({ page }) => {
    // Check for proper heading hierarchy
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check for proper alt text on images
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const altText = await images.nth(i).getAttribute('alt');
      expect(altText).toBeTruthy();
    }
    
    // Check for proper ARIA labels
    const buttons = page.locator('button');
    for (let i = 0; i < await buttons.count(); i++) {
      const ariaLabel = await buttons.nth(i).getAttribute('aria-label');
      // Some buttons might not need aria-label if they have visible text
      // This is just checking that if aria-label exists, it's not empty
      if (ariaLabel !== null) {
        expect(ariaLabel.length).toBeGreaterThan(0);
      }
    }
  });

  test('should handle FAQ interactions correctly', async ({ page }) => {
    // Find FAQ section
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();
    
    // Test FAQ accordion functionality
    const firstFAQButton = faqSection.locator('button').first();
    await firstFAQButton.click();
    
    // Check that FAQ content is expanded
    await expect(firstFAQButton.locator('svg')).toHaveClass(/rotate-180/);
  });

  test('should load images correctly', async ({ page }) => {
    // Check that hero image loads
    const heroImage = page.locator('section').first().locator('img').first();
    await expect(heroImage).toBeVisible();
    
    // Check that crop images load
    const cropImages = page.locator('section').filter({ hasText: 'Signature Greens' }).locator('img');
    await expect(cropImages).toHaveCount(4);
    
    // Check that all images have proper src attributes
    const allImages = page.locator('img');
    for (let i = 0; i < await allImages.count(); i++) {
      const src = await allImages.nth(i).getAttribute('src');
      expect(src).toBeTruthy();
    }
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', 'Our story, mission, and sustainable growing practices.');
    
    // Check meta title
    await expect(page).toHaveTitle(/About.*Heritage Farms/);
  });

  test('should handle loading states gracefully', async ({ page }) => {
    // Simulate slow network
    await page.route('**/*', route => {
      route.continue({ delay: 1000 });
    });
    
    // Navigate to page
    await page.goto('/about');
    
    // Check that content eventually loads
    await expect(page.getByText('About Heritage Farms')).toBeVisible({ timeout: 10000 });
  });
});
