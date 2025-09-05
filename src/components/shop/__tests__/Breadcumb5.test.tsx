import React from 'react'
import { render, screen } from '@testing-library/react'
import Breadcumb5 from '../Breadcumb5'

describe('Breadcumb5 Component', () => {
  it('renders breadcrumb navigation correctly', () => {
    render(<Breadcumb5 />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('Cart')).toBeInTheDocument()
    expect(screen.getByText('Checkout')).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    render(<Breadcumb5 />)
    
    const homeLink = screen.getByRole('link', { name: 'Home' })
    const shopLink = screen.getByRole('link', { name: 'Shop' })
    const cartLink = screen.getByRole('link', { name: 'Cart' })
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(shopLink).toHaveAttribute('href', '/products')
    expect(cartLink).toHaveAttribute('href', '/cart')
  })

  it('marks current page as active', () => {
    render(<Breadcumb5 />)
    
    const checkoutItem = screen.getByText('Checkout').closest('li')
    expect(checkoutItem).toHaveAttribute('aria-current', 'page')
  })

  it('has proper accessibility attributes', () => {
    render(<Breadcumb5 />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb')
    
    const breadcrumbList = screen.getByRole('list')
    expect(breadcrumbList).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<Breadcumb5 />)
    
    const wrapper = screen.getByRole('navigation').closest('.wrapper')
    expect(wrapper).toHaveClass('bg-[rgba(246,247,249,1)]')
  })
})
