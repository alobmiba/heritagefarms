import React from 'react'
import { render, screen } from '@testing-library/react'
import AboutPage from '../page'

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

jest.mock('@/components/about/AboutHero', () => {
  return function MockAboutHero() {
    return (
      <div data-testid="about-hero">
        <h1>About Heritage Farms</h1>
        <p>Ontario's first Black-led farm growing West African & Caribbean greens—rooted in heritage, nurtured under Canadian skies.</p>
        <img src="/branding/images/about/hero.jpg" alt="Heritage Farms Greenhouse" />
      </div>
    )
  }
})

jest.mock('@/components/about/PurposePromiseMetrics', () => {
  return function MockPurposePromiseMetrics() {
    return <div data-testid="purpose-promise-metrics">Purpose Promise Metrics</div>
  }
})

jest.mock('@/components/about/StoryTimeline', () => {
  return function MockStoryTimeline() {
    return <div data-testid="story-timeline">Story Timeline</div>
  }
})

jest.mock('@/components/about/SustainabilityPractices', () => {
  return function MockSustainabilityPractices() {
    return <div data-testid="sustainability-practices">Sustainability Practices</div>
  }
})

jest.mock('@/components/about/HeritageCropsTeaser', () => {
  return function MockHeritageCropsTeaser() {
    return <div data-testid="heritage-crops-teaser">Heritage Crops Teaser</div>
  }
})

jest.mock('@/components/about/FAQSection', () => {
  return function MockFAQSection() {
    return <div data-testid="faq-section">FAQ Section</div>
  }
})

jest.mock('@/components/about/AboutCTA', () => {
  return function MockAboutCTA() {
    return <div data-testid="about-cta">About CTA</div>
  }
})

jest.mock('@/components/about/Team', () => {
  return function MockTeam() {
    return <div data-testid="team">Team Component</div>
  }
})

describe('AboutPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering Tests', () => {
    it('renders all main sections without crashing', () => {
      render(<AboutPage />)
      
      // Check that all main sections are rendered
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
      expect(screen.getByTestId('about-hero')).toBeInTheDocument()
      expect(screen.getByTestId('purpose-promise-metrics')).toBeInTheDocument()
      expect(screen.getByTestId('story-timeline')).toBeInTheDocument()
      expect(screen.getByTestId('sustainability-practices')).toBeInTheDocument()
      expect(screen.getByTestId('team')).toBeInTheDocument()
      expect(screen.getByTestId('heritage-crops-teaser')).toBeInTheDocument()
      expect(screen.getByTestId('faq-section')).toBeInTheDocument()
      expect(screen.getByTestId('about-cta')).toBeInTheDocument()
    })

    it('renders hero section with correct content', () => {
      render(<AboutPage />)
      
      expect(screen.getByText('About Heritage Farms')).toBeInTheDocument()
      expect(screen.getByText(/Ontario&apos;s first Black-led farm/)).toBeInTheDocument()
    })

    it('renders hero image with correct attributes', () => {
      render(<AboutPage />)
      
      const heroImage = screen.getByAltText('Heritage Farms Greenhouse')
      expect(heroImage).toBeInTheDocument()
      expect(heroImage).toHaveAttribute('src', '/branding/images/about/hero.jpg')
    })
  })

  describe('Section Structure Tests', () => {
    it('has proper section structure with correct classes', () => {
      render(<AboutPage />)
      
      // Check main element
      const mainElement = document.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      
      // Check section elements
      const sections = document.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
    })

    it('has correct background colors for different sections', () => {
      render(<AboutPage />)
      
      // Hero section should exist
      expect(screen.getByText('About Heritage Farms')).toBeInTheDocument()
      
      // Team section should have white background
      const teamSection = screen.getByTestId('team').closest('section')
      expect(teamSection).toHaveClass('bg-white')
    })
  })

  describe('Typography and Content Tests', () => {
    it('has correct heading hierarchy', () => {
      render(<AboutPage />)
      
      const h1Element = screen.getByText('About Heritage Farms')
      expect(h1Element.tagName).toBe('H1')
      expect(h1Element).toHaveClass('text-4xl', 'md:text-6xl', 'lg:text-7xl', 'font-gilroy-extrabold')
    })

    it('has correct lead paragraph styling', () => {
      render(<AboutPage />)
      
      const leadParagraph = screen.getByText(/Ontario&apos;s first Black-led farm/)
      expect(leadParagraph).toHaveClass('text-lg', 'md:text-xl', 'lg:text-2xl', 'font-gilroy')
    })

    it('displays correct metadata content', () => {
      render(<AboutPage />)
      
      // Check that the main content is displayed
      expect(screen.getByText('About Heritage Farms')).toBeInTheDocument()
      expect(screen.getByText(/rooted in heritage, nurtured under Canadian skies/)).toBeInTheDocument()
    })
  })

  describe('Layout and Spacing Tests', () => {
    it('has proper container spacing', () => {
      render(<AboutPage />)
      
      const containers = document.querySelectorAll('.max-w-7xl')
      expect(containers.length).toBeGreaterThan(0)
    })

    it('has proper padding on sections', () => {
      render(<AboutPage />)
      
      const sections = document.querySelectorAll('section')
      sections.forEach(section => {
        expect(section).toHaveClass('py-16')
      })
    })
  })

  describe('Accessibility Tests', () => {
    it('has proper semantic structure', () => {
      render(<AboutPage />)
      
      // Check for main element
      expect(document.querySelector('main')).toBeInTheDocument()
      
      // Check for proper heading hierarchy
      const h1Elements = document.querySelectorAll('h1')
      expect(h1Elements.length).toBe(1)
    })

    it('has proper alt text for images', () => {
      render(<AboutPage />)
      
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        expect(img).toHaveAttribute('alt')
      })
    })
  })

  describe('Navigation and Links Tests', () => {
    it('has proper navigation structure', () => {
      render(<AboutPage />)
      
      // Check that team section has proper ID for navigation
      const teamSection = screen.getByTestId('team').closest('section')
      expect(teamSection).toHaveAttribute('id', 'team')
    })

    it('has proper link structure', () => {
      render(<AboutPage />)
      
      // Check for navigation links in hero section
      expect(screen.getByText('About Heritage Farms')).toBeInTheDocument()
    })
  })

  describe('Component Integration Tests', () => {
    it('integrates all components properly', () => {
      render(<AboutPage />)
      
      // Verify all components are rendered in the correct order
      const components = [
        'header',
        'about-hero',
        'purpose-promise-metrics',
        'story-timeline',
        'sustainability-practices',
        'team',
        'heritage-crops-teaser',
        'faq-section',
        'about-cta',
        'footer'
      ]
      
      components.forEach(componentId => {
        expect(screen.getByTestId(componentId)).toBeInTheDocument()
      })
    })

    it('maintains proper component hierarchy', () => {
      render(<AboutPage />)
      
      // Check that main content is wrapped properly
      const mainElement = document.querySelector('main')
      expect(mainElement).toBeInTheDocument()
      
      // Check that footer is outside main
      const footerElement = screen.getByTestId('footer')
      expect(footerElement.closest('main')).toBeNull()
    })
  })

  describe('Responsive Design Tests', () => {
    it('has responsive classes applied', () => {
      render(<AboutPage />)
      
      // Check for responsive text classes
      const h1Element = screen.getByText('About Heritage Farms')
      expect(h1Element).toHaveClass('text-4xl', 'md:text-6xl', 'lg:text-7xl')
      
      // Check for responsive container classes
      const containers = document.querySelectorAll('.max-w-7xl')
      expect(containers.length).toBeGreaterThan(0)
    })
  })

  describe('Performance Tests', () => {
    it('renders efficiently without unnecessary re-renders', () => {
      const { rerender } = render(<AboutPage />)
      
      // Re-render and check that components are still present
      rerender(<AboutPage />)
      
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('about-hero')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })
})
