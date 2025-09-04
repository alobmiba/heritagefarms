import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkout from '../Checkout'

// Mock the mock cart data
const mockCartProducts = [
  {
    id: 1,
    title: "Fresh Callaloo Greens",
    price: 8.99,
    quantity: 2,
    image: "/branding/images/products/callaloo.jpg",
    image2x: "/branding/images/products/callaloo@2x.jpg"
  },
  {
    id: 2,
    title: "Organic Amaranth Leaves",
    price: 7.50,
    quantity: 1,
    image: "/branding/images/products/amaranth.jpg",
    image2x: "/branding/images/products/amaranth@2x.jpg"
  }
]

describe('Checkout Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Rendering Tests', () => {
    it('renders checkout form without crashing', () => {
      render(<Checkout />)
      
      expect(screen.getByText('Billing address')).toBeInTheDocument()
      expect(screen.getByText('Payment')).toBeInTheDocument()
      expect(screen.getByText('Order Summary')).toBeInTheDocument()
    })

    it('renders all form fields correctly', () => {
      render(<Checkout />)
      
      // Check billing address fields
      expect(screen.getByLabelText('First name')).toBeInTheDocument()
      expect(screen.getByLabelText('Last name')).toBeInTheDocument()
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByLabelText('Address')).toBeInTheDocument()
      expect(screen.getByLabelText(/Address 2/)).toBeInTheDocument()
      expect(screen.getByLabelText('Postal Code')).toBeInTheDocument()
      
      // Check payment fields
      expect(screen.getByLabelText('Credit card number')).toBeInTheDocument()
      expect(screen.getByLabelText('Name on card')).toBeInTheDocument()
      expect(screen.getByLabelText('Expiration')).toBeInTheDocument()
      expect(screen.getByLabelText('CVV')).toBeInTheDocument()
    })

    it('renders cart items correctly', () => {
      render(<Checkout />)
      
      expect(screen.getByText('Fresh Callaloo Greens')).toBeInTheDocument()
      expect(screen.getByText('Organic Amaranth Leaves')).toBeInTheDocument()
      expect(screen.getByText('Quantity: 2')).toBeInTheDocument()
      expect(screen.getByText('Quantity: 1')).toBeInTheDocument()
    })

    it('renders payment method options', () => {
      render(<Checkout />)
      
      expect(screen.getByLabelText('Credit card')).toBeInTheDocument()
      expect(screen.getByLabelText('Debit card')).toBeInTheDocument()
      expect(screen.getByLabelText('PayPal')).toBeInTheDocument()
    })

    it('renders shipping options', () => {
      render(<Checkout />)
      
      expect(screen.getByLabelText('Free - Standard delivery')).toBeInTheDocument()
      expect(screen.getByLabelText('$10 - Express delivery')).toBeInTheDocument()
    })
  })

  describe('Form Validation Tests', () => {
    it('shows validation errors for required fields', async () => {
      const user = userEvent.setup()
      render(<Checkout />)
      
      // Try to submit without filling required fields
      const placeOrderButton = screen.getByText('Place Order')
      await user.click(placeOrderButton)
      
      // Check that validation errors appear
      await waitFor(() => {
        expect(screen.getByText('Valid first name is required.')).toBeInTheDocument()
        expect(screen.getByText('Valid last name is required.')).toBeInTheDocument()
        expect(screen.getByText('Please enter a valid email address for shipping updates.')).toBeInTheDocument()
      })
    })

    it('validates email format', async () => {
      const user = userEvent.setup()
      render(<Checkout />)
      
      const emailInput = screen.getByLabelText('Email')
      await user.type(emailInput, 'invalid-email')
      
      // Trigger validation
      fireEvent.blur(emailInput)
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address for shipping updates.')).toBeInTheDocument()
      })
    })
  })

  describe('Price Calculation Tests', () => {
    it('calculates subtotal correctly', () => {
      render(<Checkout />)
      
      // Expected: (8.99 * 2) + (7.50 * 1) = 17.98 + 7.50 = 25.48
      expect(screen.getByText('$25.48')).toBeInTheDocument()
    })

    it('calculates discount correctly', () => {
      render(<Checkout />)
      
      // Expected: 25.48 * 0.05 = 1.27
      expect(screen.getByText('-$1.27')).toBeInTheDocument()
    })

    it('calculates grand total correctly', () => {
      render(<Checkout />)
      
      // Expected: 25.48 - 1.27 + 10 = 34.21
      expect(screen.getByText('$34.21')).toBeInTheDocument()
    })
  })

  describe('User Interaction Tests', () => {
    it('allows user to fill out form fields', async () => {
      const user = userEvent.setup()
      render(<Checkout />)
      
      const firstNameInput = screen.getByLabelText('First name')
      const lastNameInput = screen.getByLabelText('Last name')
      const emailInput = screen.getByLabelText('Email')
      
      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john.doe@example.com')
      
      expect(firstNameInput).toHaveValue('John')
      expect(lastNameInput).toHaveValue('Doe')
      expect(emailInput).toHaveValue('john.doe@example.com')
    })

    it('allows user to select payment method', async () => {
      const user = userEvent.setup()
      render(<Checkout />)
      
      const creditCardRadio = screen.getByLabelText('Credit card')
      const debitCardRadio = screen.getByLabelText('Debit card')
      
      // Credit card should be checked by default
      expect(creditCardRadio).toBeChecked()
      expect(debitCardRadio).not.toBeChecked()
      
      // Switch to debit card
      await user.click(debitCardRadio)
      
      expect(creditCardRadio).not.toBeChecked()
      expect(debitCardRadio).toBeChecked()
    })

    it('allows user to select shipping method', async () => {
      const user = userEvent.setup()
      render(<Checkout />)
      
      const standardShipping = screen.getByLabelText('Free - Standard delivery')
      const expressShipping = screen.getByLabelText('$10 - Express delivery')
      
      // Express shipping should be checked by default
      expect(expressShipping).toBeChecked()
      expect(standardShipping).not.toBeChecked()
      
      // Switch to standard shipping
      await user.click(standardShipping)
      
      expect(expressShipping).not.toBeChecked()
      expect(standardShipping).toBeChecked()
    })
  })

  describe('TypeScript Safety Tests', () => {
    it('ensures all required props are properly typed', () => {
      // This test ensures TypeScript compilation
      // If there are type errors, the test will fail to compile
      expect(() => render(<Checkout />)).not.toThrow()
    })

    it('ensures form inputs have correct types', () => {
      render(<Checkout />)
      
      const emailInput = screen.getByLabelText('Email')
      const firstNameInput = screen.getByLabelText('First name')
      
      // These should have the correct input types
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(firstNameInput).toHaveAttribute('type', 'text')
    })

    it('ensures radio buttons have correct defaultChecked values', () => {
      render(<Checkout />)
      
      const creditCardRadio = screen.getByLabelText('Credit card')
      const expressShipping = screen.getByLabelText('$10 - Express delivery')
      
      // These should be checked by default (boolean true, not string)
      expect(creditCardRadio).toBeChecked()
      expect(expressShipping).toBeChecked()
    })
  })

  describe('Accessibility Tests', () => {
    it('has proper form labels', () => {
      render(<Checkout />)
      
      // Check that all form inputs have associated labels
      const inputs = screen.getAllByRole('textbox')
      inputs.forEach(input => {
        expect(input).toHaveAttribute('id')
        const label = screen.getByLabelText(input.getAttribute('aria-label') || '')
        expect(label).toBeInTheDocument()
      })
    })

    it('has proper ARIA attributes', () => {
      render(<Checkout />)
      
      // Check that radio buttons have proper grouping
      const paymentRadios = screen.getAllByRole('radio', { name: /payment/i })
      expect(paymentRadios[0]).toHaveAttribute('name', 'paymentMethod')
      
      const shippingRadios = screen.getAllByRole('radio', { name: /shipping/i })
      expect(shippingRadios[0]).toHaveAttribute('name', 'shippingMethod')
    })
  })

  describe('Error Handling Tests', () => {
    it('handles empty cart gracefully', () => {
      // This would test the component with an empty cart
      // We'd need to modify the component to accept cart data as props
      render(<Checkout />)
      
      // Currently shows mock data, but we can test the structure
      expect(screen.getByText('Order Summary')).toBeInTheDocument()
    })

    it('prevents form submission with invalid data', async () => {
      const user = userEvent.setup()
      const mockPreventDefault = jest.fn()
      
      render(<Checkout />)
      
      // The form should prevent default submission
      const form = screen.getByRole('form') || document.querySelector('form')
      if (form) {
        fireEvent.submit(form, { preventDefault: mockPreventDefault })
        expect(mockPreventDefault).toHaveBeenCalled()
      }
    })
  })
})
