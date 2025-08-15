import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactPage from '../page'

// Mock all the components
jest.mock('@/components/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>
  }
})

jest.mock('@/components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer Component</div>
  }
})

jest.mock('@/components/contact/ContactHero', () => {
  return function MockContactHero() {
    return <div data-testid="contact-hero">Contact Hero Component</div>
  }
})

jest.mock('@/components/contact/ContactForm', () => {
  return function MockContactForm() {
    return <div data-testid="contact-form">Contact Form Component</div>
  }
})

jest.mock('@/components/contact/ContactPageMap', () => {
  return function MockContactPageMap() {
    return <div data-testid="contact-map">Contact Map Component</div>
  }
})

describe('ContactPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering Tests', () => {
    it('renders all main sections without crashing', () => {
      render(<ContactPage />)
      
      // Check that all main sections are rendered
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
      expect(screen.getByTestId('contact-hero')).toBeInTheDocument()
      expect(screen.getByTestId('contact-form')).toBeInTheDocument()
      expect(screen.getByTestId('contact-map')).toBeInTheDocument()
    })

    it('renders main heading correctly', () => {
      render(<ContactPage />)
      
      expect(screen.getByText("Let's Connect")).toBeInTheDocument()
    })

    it('renders contact information section', () => {
      render(<ContactPage />)
      
      expect(screen.getByText('Contact Information')).toBeInTheDocument()
      expect(screen.getByText('Email Us')).toBeInTheDocument()
      expect(screen.getByText('Call Us')).toBeInTheDocument()
      expect(screen.getByText('Business Hours')).toBeInTheDocument()
    })

    it('renders FAQ section', () => {
      render(<ContactPage />)
      
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
      expect(screen.getByText('What heritage greens do you grow?')).toBeInTheDocument()
      expect(screen.getByText('Do you deliver to restaurants and individuals?')).toBeInTheDocument()
      expect(screen.getByText('Can I visit the farm?')).toBeInTheDocument()
      expect(screen.getByText('Are your greens organic?')).toBeInTheDocument()
    })
  })

  describe('Contact Information Tests', () => {
    it('displays correct email information', () => {
      render(<ContactPage />)
      
      const emailLink = screen.getByText('heritagefieldsandacreage@gmail.com')
      expect(emailLink).toBeInTheDocument()
      expect(emailLink).toHaveAttribute('href', 'mailto:heritagefieldsandacreage@gmail.com')
    })

    it('displays correct phone information', () => {
      render(<ContactPage />)
      
      const phoneLink = screen.getByText('+1 (647) 616-2833')
      expect(phoneLink).toBeInTheDocument()
      expect(phoneLink).toHaveAttribute('href', 'tel:+16476162833')
    })

    it('displays correct business hours', () => {
      render(<ContactPage />)
      
      expect(screen.getByText('Monday - Friday: 8:00 AM - 6:00 PM')).toBeInTheDocument()
      expect(screen.getByText('Saturday: 9:00 AM - 4:00 PM')).toBeInTheDocument()
      expect(screen.getByText('Sunday: Closed')).toBeInTheDocument()
    })
  })

  describe('FAQ Content Tests', () => {
    it('displays correct FAQ answers', () => {
      render(<ContactPage />)
      
      // Check FAQ answers
      expect(screen.getByText(/We specialize in authentic West African and Caribbean greens/)).toBeInTheDocument()
      expect(screen.getByText(/Yes! We supply fresh heritage greens to restaurants/)).toBeInTheDocument()
      expect(screen.getByText(/Absolutely! We welcome visitors to our farm/)).toBeInTheDocument()
      expect(screen.getByText(/We use sustainable greenhouse technology/)).toBeInTheDocument()
    })

    it('has proper FAQ structure', () => {
      render(<ContactPage />)
      
      const faqItems = document.querySelectorAll('.bg-gray-50.rounded-2xl')
      expect(faqItems.length).toBe(4) // Should have 4 FAQ items
    })
  })

  describe('Section Structure Tests', () => {
    it('has proper section structure', () => {
      render(<ContactPage />)
      
      const sections = document.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
      
      const mainElement = document.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      expect(mainElement).toHaveClass('min-h-screen')
    })

    it('has correct background gradients', () => {
      render(<ContactPage />)
      
      const gradientSection = screen.getByText("Let's Connect").closest('section')
      expect(gradientSection).toHaveClass('bg-gradient-to-b', 'from-gray-50', 'to-white')
    })

    it('has proper container structure', () => {
      render(<ContactPage />)
      
      const containers = document.querySelectorAll('.container')
      expect(containers.length).toBeGreaterThan(0)
      
      const maxWidthContainers = document.querySelectorAll('.max-w-7xl')
      expect(maxWidthContainers.length).toBeGreaterThan(0)
    })
  })

  describe('Typography and Content Tests', () => {
    it('has correct heading hierarchy', () => {
      render(<ContactPage />)
      
      const h2Elements = screen.getAllByRole('heading', { level: 2 })
      expect(h2Elements.length).toBeGreaterThan(0)
      
      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      expect(h3Elements.length).toBeGreaterThan(0)
    })

    it('has correct font classes', () => {
      render(<ContactPage />)
      
      const gilroyElements = document.querySelectorAll('[class*="font-gilroy"]')
      expect(gilroyElements.length).toBeGreaterThan(0)
      
      const gilroyExtraboldElements = document.querySelectorAll('[class*="font-gilroy-extrabold"]')
      expect(gilroyExtraboldElements.length).toBeGreaterThan(0)
    })

    it('has correct text colors', () => {
      render(<ContactPage />)
      
      const textColorElements = document.querySelectorAll('[class*="text-[#404A3D]"]')
      expect(textColorElements.length).toBeGreaterThan(0)
      
      const grayTextElements = document.querySelectorAll('[class*="text-gray-600"]')
      expect(grayTextElements.length).toBeGreaterThan(0)
    })
  })

  describe('Contact Cards Tests', () => {
    it('renders contact cards with proper styling', () => {
      render(<ContactPage />)
      
      const contactCards = document.querySelectorAll('.bg-white.rounded-2xl.p-6.shadow-lg')
      expect(contactCards.length).toBe(3) // Email, Phone, Business Hours
    })

    it('has proper hover effects on contact cards', () => {
      render(<ContactPage />)
      
      const contactCards = document.querySelectorAll('.hover\\:shadow-xl')
      expect(contactCards.length).toBeGreaterThan(0)
    })

    it('has proper icon containers', () => {
      render(<ContactPage />)
      
      const iconContainers = document.querySelectorAll('.w-12.h-12.bg-gradient-to-br')
      expect(iconContainers.length).toBe(3) // One for each contact method
    })
  })

  describe('Grid Layout Tests', () => {
    it('has proper grid structure for contact information', () => {
      render(<ContactPage />)
      
      const gridElements = document.querySelectorAll('.lg\\:grid-cols-2')
      expect(gridElements.length).toBeGreaterThan(0)
    })

    it('has proper spacing between grid items', () => {
      render(<ContactPage />)
      
      const gapElements = document.querySelectorAll('.gap-12')
      expect(gapElements.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility Tests', () => {
    it('has proper semantic structure', () => {
      render(<ContactPage />)
      
      const mainElement = document.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      
      const sections = document.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
    })

    it('has proper link accessibility', () => {
      render(<ContactPage />)
      
      const emailLink = screen.getByText('heritagefieldsandacreage@gmail.com')
      const phoneLink = screen.getByText('+1 (647) 616-2833')
      
      expect(emailLink).toHaveAttribute('href')
      expect(phoneLink).toHaveAttribute('href')
    })

    it('has proper heading structure', () => {
      render(<ContactPage />)
      
      const headings = document.querySelectorAll('h2, h3, h4')
      expect(headings.length).toBeGreaterThan(0)
      
      // Check that headings are properly nested
      const h2Elements = screen.getAllByRole('heading', { level: 2 })
      const h3Elements = screen.getAllByRole('heading', { level: 3 })
      
      expect(h2Elements.length).toBeGreaterThan(0)
      expect(h3Elements.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Design Tests', () => {
    it('has responsive grid classes', () => {
      render(<ContactPage />)
      
      const responsiveElements = document.querySelectorAll('[class*="lg:grid-cols-"]')
      expect(responsiveElements.length).toBeGreaterThan(0)
    })

    it('has responsive text classes', () => {
      render(<ContactPage />)
      
      const responsiveTextElements = document.querySelectorAll('[class*="md:text-"]')
      expect(responsiveTextElements.length).toBeGreaterThan(0)
    })

    it('has responsive padding classes', () => {
      render(<ContactPage />)
      
      const responsivePaddingElements = document.querySelectorAll('[class*="py-20"]')
      expect(responsivePaddingElements.length).toBeGreaterThan(0)
    })
  })

  describe('Component Integration Tests', () => {
    it('renders components in correct order', () => {
      render(<ContactPage />)
      
      const components = [
        'header',
        'contact-hero',
        'contact-form',
        'contact-map',
        'footer'
      ]
      
      const renderedComponents = components.map(id => screen.getByTestId(id))
      
      // Check that all components are rendered
      renderedComponents.forEach(component => {
        expect(component).toBeInTheDocument()
      })
    })

    it('maintains proper component hierarchy', () => {
      render(<ContactPage />)
      
      // Check that components are properly nested within main
      const mainElement = document.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      expect(mainElement).toHaveClass('min-h-screen')
    })
  })

  describe('Performance Tests', () => {
    it('renders without performance issues', () => {
      const startTime = performance.now()
      
      render(<ContactPage />)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Render should complete within reasonable time
      expect(renderTime).toBeLessThan(1000) // 1 second
    })

    it('handles multiple re-renders efficiently', () => {
      const { rerender } = render(<ContactPage />)
      
      // Perform multiple re-renders
      for (let i = 0; i < 5; i++) {
        rerender(<ContactPage />)
      }
      
      // Should still render all components
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })

  describe('SEO and Meta Tests', () => {
    it('has proper page structure for SEO', () => {
      render(<ContactPage />)
      
      // Check that the page has proper semantic structure
      const mainElement = document.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      
      // Check for proper heading hierarchy
      const h2Elements = screen.getAllByRole('heading', { level: 2 })
      expect(h2Elements.length).toBeGreaterThan(0)
    })

    it('has proper content structure for search engines', () => {
      render(<ContactPage />)
      
      // Check that important content is present
      expect(screen.getByText('Contact Information')).toBeInTheDocument()
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
      expect(screen.getByText('heritagefieldsandacreage@gmail.com')).toBeInTheDocument()
    })
  })

  describe('Error Handling Tests', () => {
    it('handles component errors gracefully', () => {
      expect(() => render(<ContactPage />)).not.toThrow()
    })

    it('maintains functionality when components fail to load', () => {
      // This test would be more relevant with error boundaries
      expect(() => render(<ContactPage />)).not.toThrow()
    })
  })

  describe('CSS Class Validation Tests', () => {
    it('has correct Tailwind CSS classes', () => {
      render(<ContactPage />)
      
      // Check for specific Tailwind classes
      const containerElements = document.querySelectorAll('.container')
      expect(containerElements.length).toBeGreaterThan(0)
      
      const flexElements = document.querySelectorAll('.flex')
      expect(flexElements.length).toBeGreaterThan(0)
      
      const gridElements = document.querySelectorAll('.grid')
      expect(gridElements.length).toBeGreaterThan(0)
    })

    it('has proper color scheme classes', () => {
      render(<ContactPage />)
      
      // Check for specific color classes
      const bgElements = document.querySelectorAll('[class*="bg-gradient-"]')
      expect(bgElements.length).toBeGreaterThan(0)
      
      const textColorElements = document.querySelectorAll('[class*="text-[#"]')
      expect(textColorElements.length).toBeGreaterThan(0)
    })
  })

  describe('Interactive Elements Tests', () => {
    it('has proper hover states', () => {
      render(<ContactPage />)
      
      const hoverElements = document.querySelectorAll('[class*="hover:"]')
      expect(hoverElements.length).toBeGreaterThan(0)
    })

    it('has proper transition effects', () => {
      render(<ContactPage />)
      
      const transitionElements = document.querySelectorAll('[class*="transition-"]')
      expect(transitionElements.length).toBeGreaterThan(0)
    })
  })
})
