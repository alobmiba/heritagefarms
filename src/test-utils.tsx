import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Add any providers here if needed (Theme, Router, etc.)
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Custom test utilities
export const createMockCart = (items = 2) => {
  return Array.from({ length: items }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: Math.round((Math.random() * 20 + 5) * 100) / 100, // Random price between 5-25
    quantity: Math.floor(Math.random() * 3) + 1, // Random quantity 1-3
    image: `/branding/images/products/product-${i + 1}.jpg`,
    image2x: `/branding/images/products/product-${i + 1}@2x.jpg`
  }))
}

export const createMockUser = () => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  address: '123 Main St',
  city: 'Toronto',
  province: 'Ontario',
  postalCode: 'M5V 3A8',
  country: 'Canada'
})

export const waitForElementToBeRemoved = (element: Element) => {
  return new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      if (!document.contains(element)) {
        observer.disconnect()
        resolve()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
  })
}
