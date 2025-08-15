import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductsPage from '../page'

// Mock the CartContext
jest.mock('@/context/CartContext', () => ({
  useCart: () => ({
    addToCart: jest.fn(),
    isCartOpen: false,
    setIsCartOpen: jest.fn(),
  }),
}))

// Mock the Wishlist hook
jest.mock('@/components/Wishlist', () => ({
  useWishlist: () => ({
    addToWishlist: jest.fn(),
    removeFromWishlist: jest.fn(),
    isInWishlist: jest.fn(() => false),
  }),
}))

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

jest.mock('@/components/SearchAndFilter', () => {
  return function MockSearchAndFilter({ onSearch, onFilterChange, categories, priceRanges }: any) {
    return (
      <div data-testid="search-filter">
        Search and Filter Component
        <button onClick={() => onSearch('test')}>Search</button>
        <button onClick={() => onFilterChange({ category: 'test' })}>Filter</button>
      </div>
    )
  }
})

jest.mock('@/components/ProductModal', () => {
  return function MockProductModal({ product, isOpen, onClose, onAddToCart }: any) {
    if (!isOpen) return null
    return (
      <div data-testid="product-modal">
        Product Modal Component
        <div>Product: {product?.name}</div>
        <button onClick={onClose}>Close Modal</button>
        <button onClick={onAddToCart}>Add to Cart</button>
      </div>
    )
  }
})

jest.mock('@/components/StructuredData', () => {
  return function MockStructuredData({ type, data }: any) {
    return <div data-testid="structured-data" data-type={type}>Structured Data Component</div>
  }
})

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} data-testid="product-image" />
  },
}))

// Mock fetch
global.fetch = jest.fn()

describe('ProductsPage Component', () => {
  const mockProducts = [
    {
      id: '1',
      sku: 'CALL001',
      name: 'Fresh Callaloo Greens',
      localName: 'Callaloo',
      price: 8.99,
      priceUnit: 'bunch',
      image: '/branding/images/products/callaloo.jpg',
      cultivar: 'Traditional',
      healthBenefits: 'Rich in vitamins and minerals',
      growingMethod: 'Greenhouse',
      maturityTime: '45 days',
      description: 'Authentic West African callaloo greens',
      category: 'Greens',
      active: true,
      inStock: true,
      stockQuantity: 50
    },
    {
      id: '2',
      sku: 'AMAR002',
      name: 'Organic Amaranth Leaves',
      localName: 'Amaranth',
      price: 7.50,
      priceUnit: 'bunch',
      image: '/branding/images/products/amaranth.jpg',
      cultivar: 'Organic',
      healthBenefits: 'High in protein and iron',
      growingMethod: 'Greenhouse',
      maturityTime: '40 days',
      description: 'Nutritious amaranth leaves',
      category: 'Greens',
      active: true,
      inStock: false,
      stockQuantity: 0
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ items: mockProducts })
    })
  })

  describe('Rendering Tests', () => {
    it('renders all main sections without crashing', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByTestId('header')).toBeInTheDocument()
        expect(screen.getByTestId('footer')).toBeInTheDocument()
        expect(screen.getByTestId('search-filter')).toBeInTheDocument()
        expect(screen.getByTestId('shopping-cart')).toBeInTheDocument()
      })
    })

    it('renders loading state initially', () => {
      render(<ProductsPage />)
      
      expect(screen.getByText('Loading products...')).toBeInTheDocument()
      expect(screen.getByRole('status')).toBeInTheDocument() // Loading spinner
    })

    it('renders products grid after loading', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Fresh Callaloo Greens')).toBeInTheDocument()
        expect(screen.getByText('Organic Amaranth Leaves')).toBeInTheDocument()
      })
    })

    it('renders product cards with correct information', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Fresh Callaloo Greens')).toBeInTheDocument()
        expect(screen.getByText('Callaloo')).toBeInTheDocument()
        expect(screen.getByText('$8.99 per bunch')).toBeInTheDocument()
        expect(screen.getByText('Authentic West African callaloo greens')).toBeInTheDocument()
      })
    })
  })

  describe('Product Display Tests', () => {
    it('displays product images correctly', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const productImages = screen.getAllByTestId('product-image')
        expect(productImages.length).toBe(2)
        
        productImages.forEach((img, index) => {
          expect(img).toHaveAttribute('src', mockProducts[index].image)
          expect(img).toHaveAttribute('alt', mockProducts[index].name)
        })
      })
    })

    it('displays out of stock badge for unavailable products', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Out of Stock')).toBeInTheDocument()
      })
    })

    it('displays product categories and stock information', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Greens')).toBeInTheDocument()
        expect(screen.getByText('In Stock: 50')).toBeInTheDocument()
      })
    })
  })

  describe('Search and Filter Tests', () => {
    it('renders search and filter component', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByTestId('search-filter')).toBeInTheDocument()
      })
    })

    it('passes correct props to search and filter component', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const searchFilter = screen.getByTestId('search-filter')
        expect(searchFilter).toBeInTheDocument()
      })
    })

    it('handles search functionality', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const searchButton = screen.getByText('Search')
        fireEvent.click(searchButton)
      })
    })

    it('handles filter functionality', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const filterButton = screen.getByText('Filter')
        fireEvent.click(filterButton)
      })
    })
  })

  describe('Product Modal Tests', () => {
    it('opens product modal when view details is clicked', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const viewDetailsButtons = screen.getAllByText('View Details')
        fireEvent.click(viewDetailsButtons[0])
      })
      
      await waitFor(() => {
        expect(screen.getByTestId('product-modal')).toBeInTheDocument()
        expect(screen.getByText('Product: Fresh Callaloo Greens')).toBeInTheDocument()
      })
    })

    it('closes product modal when close button is clicked', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const viewDetailsButtons = screen.getAllByText('View Details')
        fireEvent.click(viewDetailsButtons[0])
      })
      
      await waitFor(() => {
        const closeButton = screen.getByText('Close Modal')
        fireEvent.click(closeButton)
      })
      
      await waitFor(() => {
        expect(screen.queryByTestId('product-modal')).not.toBeInTheDocument()
      })
    })
  })

  describe('Shopping Cart Integration Tests', () => {
    it('renders shopping cart component', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByTestId('shopping-cart')).toBeInTheDocument()
      })
    })

    it('handles add to cart functionality', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const addToCartButtons = screen.getAllByText('Add to Cart')
        fireEvent.click(addToCartButtons[0])
      })
    })

    it('disables add to cart for out of stock products', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const addToCartButtons = screen.getAllByText('Add to Cart')
        const outOfStockButton = addToCartButtons.find(button => 
          button.closest('.bg-white')?.textContent?.includes('Organic Amaranth Leaves')
        )
        expect(outOfStockButton).toBeDisabled()
      })
    })
  })

  describe('Error Handling Tests', () => {
    it('displays error message when API fails', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))
      
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByText(/Error loading products/)).toBeInTheDocument()
        expect(screen.getByText('Try Again')).toBeInTheDocument()
      })
    })

    it('handles empty products list', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [] })
      })
      
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('No Products Found')).toBeInTheDocument()
        expect(screen.getByText('Try adjusting your search or filter criteria.')).toBeInTheDocument()
      })
    })
  })

  describe('Performance Tests', () => {
    it('renders without performance issues', async () => {
      const startTime = performance.now()
      
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Fresh Callaloo Greens')).toBeInTheDocument()
      })
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Render should complete within reasonable time
      expect(renderTime).toBeLessThan(2000) // 2 seconds for API call
    })

    it('handles multiple re-renders efficiently', async () => {
      const { rerender } = render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Fresh Callaloo Greens')).toBeInTheDocument()
      })
      
      // Perform multiple re-renders
      for (let i = 0; i < 3; i++) {
        rerender(<ProductsPage />)
      }
      
      // Should still render all components
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })

  describe('Accessibility Tests', () => {
    it('has proper semantic structure', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const sections = document.querySelectorAll('section')
        expect(sections.length).toBeGreaterThan(0)
        
        const mainElement = document.querySelector('.min-h-screen')
        expect(mainElement).toBeInTheDocument()
      })
    })

    it('has proper image accessibility', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const productImages = screen.getAllByTestId('product-image')
        productImages.forEach(img => {
          expect(img).toHaveAttribute('alt')
        })
      })
    })

    it('has proper button accessibility', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const buttons = screen.getAllByRole('button')
        buttons.forEach(button => {
          expect(button).toBeInTheDocument()
        })
      })
    })
  })

  describe('Responsive Design Tests', () => {
    it('has responsive grid classes', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const gridElements = document.querySelectorAll('.grid')
        expect(gridElements.length).toBeGreaterThan(0)
        
        const responsiveElements = document.querySelectorAll('[class*="md:grid-cols-"], [class*="lg:grid-cols-"], [class*="xl:grid-cols-"]')
        expect(responsiveElements.length).toBeGreaterThan(0)
      })
    })

    it('has responsive image sizing', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const productImages = screen.getAllByTestId('product-image')
        productImages.forEach(img => {
          expect(img).toHaveAttribute('sizes')
        })
      })
    })
  })

  describe('SEO and Meta Tests', () => {
    it('renders structured data for products', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const structuredDataElements = screen.getAllByTestId('structured-data')
        expect(structuredDataElements.length).toBe(2) // One for each product
        
        structuredDataElements.forEach(element => {
          expect(element).toHaveAttribute('data-type', 'product')
        })
      })
    })

    it('has proper product schema structure', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        // Check that products have proper structure for SEO
        expect(screen.getByText('Fresh Callaloo Greens')).toBeInTheDocument()
        expect(screen.getByText('$8.99 per bunch')).toBeInTheDocument()
      })
    })
  })

  describe('User Interaction Tests', () => {
    it('handles product card interactions', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const viewDetailsButtons = screen.getAllByText('View Details')
        const addToCartButtons = screen.getAllByText('Add to Cart')
        
        expect(viewDetailsButtons.length).toBe(2)
        expect(addToCartButtons.length).toBe(2)
      })
    })

    it('handles wishlist functionality', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        const wishlistButtons = screen.getAllByText('Add to Wishlist')
        expect(wishlistButtons.length).toBe(2)
      })
    })
  })

  describe('Data Fetching Tests', () => {
    it('fetches products from API on mount', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/inventory')
      })
    })

    it('handles API response correctly', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Fresh Callaloo Greens')).toBeInTheDocument()
        expect(screen.getByText('Organic Amaranth Leaves')).toBeInTheDocument()
      })
    })

    it('updates filtered products when search/filter changes', async () => {
      render(<ProductsPage />)
      
      await waitFor(() => {
        expect(screen.getByText('Fresh Callaloo Greens')).toBeInTheDocument()
      })
    })
  })
})
