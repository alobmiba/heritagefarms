import React from 'react'
import { render, screen } from '@testing-library/react'
import Features from '../Features'

describe('Features Component', () => {
  it('renders all feature sections correctly', () => {
    render(<Features />)
    
    expect(screen.getByText('Free Shipping')).toBeInTheDocument()
    expect(screen.getByText('Fresh Guarantee')).toBeInTheDocument()
    expect(screen.getByText('Sustainable Farming')).toBeInTheDocument()
  })

  it('displays feature descriptions', () => {
    render(<Features />)
    
    expect(screen.getByText(/Free standard shipping on all orders over \$50/)).toBeInTheDocument()
    expect(screen.getByText(/All our heritage greens are harvested fresh/)).toBeInTheDocument()
    expect(screen.getByText(/All our heritage crops are grown using sustainable/)).toBeInTheDocument()
  })

  it('renders SVG icons for each feature', () => {
    render(<Features />)
    
    const svgElements = screen.getAllByRole('img', { hidden: true })
    expect(svgElements.length).toBeGreaterThan(0)
  })

  it('applies correct styling classes', () => {
    render(<Features />)
    
    const wrapper = screen.getByText('Free Shipping').closest('.wrapper')
    expect(wrapper).toHaveClass('bg-[rgba(246,247,249,1)]')
  })

  it('has proper heading hierarchy', () => {
    render(<Features />)
    
    const headings = screen.getAllByRole('heading')
    expect(headings).toHaveLength(3)
    
    headings.forEach(heading => {
      expect(heading.tagName).toBe('H4')
    })
  })

  it('renders feature content in correct layout', () => {
    render(<Features />)
    
    const features = screen.getAllByText(/Free Shipping|Fresh Guarantee|Sustainable Farming/)
    expect(features).toHaveLength(3)
    
    // Each feature should be in its own container
    features.forEach(feature => {
      const container = feature.closest('.md\\:w-6\\/12')
      expect(container).toBeInTheDocument()
    })
  })
})
