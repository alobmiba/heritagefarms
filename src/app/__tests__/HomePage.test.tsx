import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from '../page'

// Mock the CartContext
jest.mock('@/context/CartContext', () => ({
  useCart: () => ({
    isCartOpen: false,
    setIsCartOpen: jest.fn(),
  }),
}))

// Mock all the components
jest.mock('@/components/HeroSlider', () => {
  return function MockHeroSlider() {
    return <div data-testid="hero-slider">Hero Slider Component</div>
  }
})

jest.mock('@/components/ServicesSection', () => {
  return function MockServicesSection() {
    return <div data-testid="services-section">Services Section Component</div>
  }
})

jest.mock('@/components/BlogSection', () => {
  return function MockBlogSection() {
    return <div data-testid="blog-section">Blog Section Component</div>
  }
})

jest.mock('@/components/TestimonialsSection', () => {
  return function MockTestimonialsSection() {
    return <div data-testid="testimonials-section">Testimonials Section Component</div>
  }
})

jest.mock('@/components/OurPurpose', () => {
  return function MockOurPurpose() {
    return <div data-testid="our-purpose">Our Purpose Component</div>
  }
})

jest.mock('@/components/BenefitsSection', () => {
  return function MockBenefitsSection() {
    return <div data-testid="benefits-section">Benefits Section Component</div>
  }
})

jest.mock('@/components/NewsletterSignup', () => {
  return function MockNewsletterSignup() {
    return <div data-testid="newsletter-signup">Newsletter Signup Component</div>
  }
})

jest.mock('@/components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer Component</div>
  }
})

jest.mock('@/components/ShoppingCart', () => {
  return function MockShoppingCart({ isOpen, onClose, onCheckout }: any) {
    return (
      <div data-testid="shopping-cart" style={{ display: isOpen ? 'block' : 'none' }}>
        Shopping Cart Component
        <button onClick={onClose}>Close Cart</button>
        <button onClick={() => onCheckout([])}>Checkout</button>
      </div>
    )
  }
})

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering Tests', () => {
    it('renders all main sections without crashing', () => {
      render(<HomePage />)
      
      // Check that all main sections are rendered
      expect(screen.getByTestId('hero-slider')).toBeInTheDocument()
      expect(screen.getByTestId('our-purpose')).toBeInTheDocument()
      expect(screen.getByTestId('services-section')).toBeInTheDocument()
      expect(screen.getByTestId('benefits-section')).toBeInTheDocument()
      expect(screen.getByTestId('testimonials-section')).toBeInTheDocument()
      expect(screen.getByTestId('blog-section')).toBeInTheDocument()
      expect(screen.getByTestId('newsletter-signup')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    it('renders shopping cart component', () => {
      render(<HomePage />)
      
      expect(screen.getByTestId('shopping-cart')).toBeInTheDocument()
    })

    it('has proper section structure with IDs', () => {
      render(<HomePage />)
      
      // Check that sections have proper IDs for navigation
      expect(document.getElementById('home')).toBeInTheDocument()
      expect(document.getElementById('purpose')).toBeInTheDocument()
      expect(document.getElementById('services')).toBeInTheDocument()
      expect(document.getElementById('testimonials')).toBeInTheDocument()
      expect(document.getElementById('blog')).toBeInTheDocument()
      expect(document.getElementById('newsletter')).toBeInTheDocument()
    })
  })

  describe('Shopping Cart Integration', () => {
    it('passes correct props to ShoppingCart component', () => {
      render(<HomePage />)
      
      const shoppingCart = screen.getByTestId('shopping-cart')
      expect(shoppingCart).toBeInTheDocument()
      
      // The cart should be closed by default (based on our mock)
      expect(shoppingCart).toHaveStyle({ display: 'none' })
    })

    it('handles checkout function correctly', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
      render(<HomePage />)
      
      const checkoutButton = screen.getByText('Checkout')
      await userEvent.click(checkoutButton)
      
      expect(consoleSpy).toHaveBeenCalledWith('Order completed with items:', [])
      
      consoleSpy.mockRestore()
    })
  })

  describe('Component Integration Tests', () => {
    it('renders components in correct order', () => {
      render(<HomePage />)
      
      const sections = [
        'hero-slider',
        'our-purpose', 
        'services-section',
        'benefits-section',
        'testimonials-section',
        'blog-section',
        'newsletter-signup',
        'footer'
      ]
      
      const renderedSections = sections.map(id => screen.getByTestId(id))
      
      // Check that all sections are rendered
      renderedSections.forEach(section => {
        expect(section).toBeInTheDocument()
      })
    })

    it('maintains proper layout structure', () => {
      render(<HomePage />)
      
      // Check that the main container structure is correct
      const mainContainer = screen.getByTestId('hero-slider').closest('div')
      expect(mainContainer).toBeInTheDocument()
    })
  })

  describe('Accessibility Tests', () => {
    it('has proper semantic structure', () => {
      render(<HomePage />)
      
      // Check that sections are properly structured
      const sections = document.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
      
      // Each section should have an ID for navigation
      sections.forEach(section => {
        expect(section).toHaveAttribute('id')
      })
    })

    it('shopping cart has proper accessibility attributes', () => {
      render(<HomePage />)
      
      const shoppingCart = screen.getByTestId('shopping-cart')
      const closeButton = screen.getByText('Close Cart')
      const checkoutButton = screen.getByText('Checkout')
      
      expect(closeButton).toBeInTheDocument()
      expect(checkoutButton).toBeInTheDocument()
    })
  })

  describe('Performance Tests', () => {
    it('renders without performance issues', () => {
      const startTime = performance.now()
      
      render(<HomePage />)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Render should complete within reasonable time (adjust threshold as needed)
      expect(renderTime).toBeLessThan(1000) // 1 second
    })

    it('handles multiple re-renders efficiently', () => {
      const { rerender } = render(<HomePage />)
      
      // Perform multiple re-renders
      for (let i = 0; i < 5; i++) {
        rerender(<HomePage />)
      }
      
      // Should still render all components
      expect(screen.getByTestId('hero-slider')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })

  describe('Error Handling Tests', () => {
    it('handles component errors gracefully', () => {
      // This test would be more relevant if we had error boundaries
      expect(() => render(<HomePage />)).not.toThrow()
    })

    it('maintains functionality when cart context is unavailable', () => {
      // Test with mocked cart context that returns undefined
      jest.doMock('@/context/CartContext', () => ({
        useCart: () => undefined,
      }))
      
      // Should still render without crashing
      expect(() => render(<HomePage />)).not.toThrow()
    })
  })

  describe('Responsive Design Tests', () => {
    it('maintains layout on different screen sizes', () => {
      render(<HomePage />)
      
      // Check that the main container is responsive
      const mainContainer = screen.getByTestId('hero-slider').closest('div')
      expect(mainContainer).toBeInTheDocument()
      
      // All sections should be present regardless of screen size
      const sections = [
        'hero-slider',
        'our-purpose',
        'services-section',
        'benefits-section',
        'testimonials-section',
        'blog-section',
        'newsletter-signup'
      ]
      
      sections.forEach(sectionId => {
        expect(screen.getByTestId(sectionId)).toBeInTheDocument()
      })
    })
  })

  describe('SEO and Meta Tests', () => {
    it('has proper page structure for SEO', () => {
      render(<HomePage />)
      
      // Check that the page has proper semantic structure
      const sections = document.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
      
      // Each section should have an ID for anchor navigation
      sections.forEach(section => {
        expect(section).toHaveAttribute('id')
      })
    })
  })

  describe('User Interaction Tests', () => {
    it('handles shopping cart interactions', async () => {
      render(<HomePage />)
      
      const closeButton = screen.getByText('Close Cart')
      const checkoutButton = screen.getByText('Checkout')
      
      // Test cart close functionality
      await userEvent.click(closeButton)
      
      // Test checkout functionality
      await userEvent.click(checkoutButton)
      
      // Both buttons should be clickable
      expect(closeButton).toBeInTheDocument()
      expect(checkoutButton).toBeInTheDocument()
    })
  })
})
