import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminHome from '../page'

// Mock fetch
global.fetch = jest.fn()

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn(),
})

describe('AdminHome Component', () => {
  const mockOrders = [
    {
      id: '1',
      code: 'ORD001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      total: 2599, // In cents (25.99 * 100)
      status: 'paid',
      createdAt: Date.now(),
      items: [
        { name: 'Callaloo Greens', quantity: 2, price: 899 },
        { name: 'Amaranth Leaves', quantity: 1, price: 801 }
      ]
    },
    {
      id: '2',
      code: 'ORD002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+0987654321',
      total: 1550, // In cents (15.50 * 100)
      status: 'pending_payment',
      createdAt: Date.now() - 86400000, // 1 day ago
      items: [
        { name: 'Waterleaf', quantity: 1, price: 1550 }
      ]
    },
    {
      id: '3',
      code: 'ORD003',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      phone: '+1122334455',
      total: 3275, // In cents (32.75 * 100)
      status: 'cancelled',
      createdAt: Date.now() - 172800000, // 2 days ago
      items: [
        { name: 'Jute Leaves', quantity: 3, price: 1092 }
      ]
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockOrders
    })
  })

  describe('Basic Rendering Tests', () => {
    it('renders admin dashboard without crashing', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(screen.getByText('Heritage Farms Admin')).toBeInTheDocument()
      })
    })

    it('renders main dashboard sections', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(screen.getByText('Manage orders, inventory, and business operations')).toBeInTheDocument()
        expect(screen.getByText('New Order')).toBeInTheDocument()
        expect(screen.getByText('Inventory')).toBeInTheDocument()
      })
    })

    it('renders stats overview after loading', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(screen.getByText('Total Orders')).toBeInTheDocument()
        expect(screen.getByText('Total Revenue')).toBeInTheDocument()
        // Check that status labels exist (they appear multiple times)
        expect(screen.getAllByText('Pending Payment')).toHaveLength(2) // One in stats, one in table
        expect(screen.getAllByText('Paid Orders')).toHaveLength(1)
      })
    })
  })

  describe('Orders Display Tests', () => {
    it('displays order information correctly', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(screen.getByText('ORD001')).toBeInTheDocument()
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('john@example.com')).toBeInTheDocument()
      })
    })

    it('displays multiple orders', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(screen.getByText('ORD001')).toBeInTheDocument()
        expect(screen.getByText('ORD002')).toBeInTheDocument()
        expect(screen.getByText('ORD003')).toBeInTheDocument()
      })
    })

    it('displays correct status badges', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(screen.getByText('Paid')).toBeInTheDocument()
        expect(screen.getByText('Cancelled')).toBeInTheDocument()
        // Pending Payment appears multiple times, so use getAllByText
        expect(screen.getAllByText('Pending Payment')).toHaveLength(2)
      })
    })
  })

  describe('Quick Actions Tests', () => {
    it('renders quick action buttons', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(screen.getByText('New Order')).toBeInTheDocument()
        expect(screen.getByText('Inventory')).toBeInTheDocument()
      })
    })

    it('opens new order page when clicked', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        const newOrderButton = screen.getByText('New Order')
        fireEvent.click(newOrderButton)
        expect(window.open).toHaveBeenCalledWith('/products', '_blank')
      })
    })

    it('opens inventory page when clicked', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        const inventoryButton = screen.getByText('Inventory')
        fireEvent.click(inventoryButton)
        expect(window.open).toHaveBeenCalledWith('/admin/inventory', '_blank')
      })
    })
  })

  describe('Error Handling Tests', () => {
    it('displays error message when API fails', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))
      
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(screen.getByText('Error loading dashboard')).toBeInTheDocument()
        expect(screen.getByText('API Error')).toBeInTheDocument()
        expect(screen.getByText('Try Again')).toBeInTheDocument()
      })
    })

    it('handles empty orders list', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => []
      })
      
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(screen.getByText('No orders yet')).toBeInTheDocument()
        expect(screen.getByText('Create Order')).toBeInTheDocument()
      })
    })

    it('retries fetching orders when try again is clicked', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))
      
      render(<AdminHome />)
      
      await waitFor(() => {
        const tryAgainButton = screen.getByText('Try Again')
        fireEvent.click(tryAgainButton)
        expect(fetch).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe('Data Fetching Tests', () => {
    it('fetches orders from API on mount', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/admin/orders')
      })
    })

    it('handles API response correctly', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        expect(screen.getByText('ORD001')).toBeInTheDocument()
        expect(screen.getByText('ORD002')).toBeInTheDocument()
        expect(screen.getByText('ORD003')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility Tests', () => {
    it('has proper semantic structure', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        const mainElement = document.querySelector('.min-h-screen')
        expect(mainElement).toBeInTheDocument()
      })
    })

    it('has proper heading hierarchy', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        const h1Element = screen.getByText('Heritage Farms Admin')
        expect(h1Element.tagName).toBe('H1')
      })
    })

    it('has proper button accessibility', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Responsive Design Tests', () => {
    it('has responsive grid classes', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        const gridElements = document.querySelectorAll('.grid')
        expect(gridElements.length).toBeGreaterThan(0)
      })
    })

    it('has responsive text classes', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        const responsiveTextElements = document.querySelectorAll('[class*="text-"]')
        expect(responsiveTextElements.length).toBeGreaterThan(0)
      })
    })
  })

  describe('CSS Class Validation Tests', () => {
    it('has correct Tailwind CSS classes', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        // Check for specific Tailwind classes
        const containerElements = document.querySelectorAll('.max-w-7xl')
        expect(containerElements.length).toBeGreaterThan(0)
        
        const flexElements = document.querySelectorAll('.flex')
        expect(flexElements.length).toBeGreaterThan(0)
        
        const gridElements = document.querySelectorAll('.grid')
        expect(gridElements.length).toBeGreaterThan(0)
      })
    })

    it('has proper color scheme classes', async () => {
      render(<AdminHome />)
      
      await waitFor(() => {
        // Check for specific color classes
        const bgElements = document.querySelectorAll('[class*="bg-gradient-"]')
        expect(bgElements.length).toBeGreaterThan(0)
        
        const textColorElements = document.querySelectorAll('[class*="text-slate-"]')
        expect(textColorElements.length).toBeGreaterThan(0)
      })
    })
  })
})
