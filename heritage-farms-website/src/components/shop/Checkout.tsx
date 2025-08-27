"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// Reusable form input component
const FormInput = ({ id, label, type = "text", required = false, optional = false }: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
}) => (
  <div className="w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {optional && <span className="text-gray-500">(Optional)</span>}
    </label>
    <input
      type={type}
      id={id}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required={required}
    />
  </div>
);

// Reusable select component
const FormSelect = ({ id, label, children, required = false }: {
  id: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={id}
      className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required={required}
    >
      {children}
    </select>
  </div>
);

export default function Checkout() {
  const { cartItems, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const discountAmount = totalPrice * 0.05;
  const shippingCost = totalPrice > 0 ? 10 : 0;
  const grandTotal = totalPrice - discountAmount + shippingCost;

  // Helper to parse price string and return a number
  const parsePrice = (price: string) => {
    return parseFloat(price.replace(/[^0-9.]/g, ''));
  };

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Billing Details Column */}
          <div className="lg:col-span-7">
            <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-4 mb-6 text-sm" role="alert">
              Already have an account?{" "}
              <a href="#" className="font-medium underline">
                Sign in
              </a>{" "}
              for a faster checkout experience.
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Billing address</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput id="firstName" label="First name" required />
                <FormInput id="lastName" label="Last name" required />
              </div>
              <FormInput id="email" label="Email" type="email" required />
              <FormInput id="address" label="Address" required />
              <FormInput id="address2" label="Address 2" optional />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-1">
                  <FormSelect id="country" label="Country" required>
                    <option value="">Select...</option>
                    <option>Canada</option>
                    <option>United States</option>
                  </FormSelect>
                </div>
                <div className="sm:col-span-1">
                  <FormSelect id="state" label="Province/State" required>
                    <option value="">Select...</option>
                    <option>Ontario</option>
                    <option>Quebec</option>
                    <option>British Columbia</option>
                    <option>Alberta</option>
                  </FormSelect>
                </div>
                <div className="sm:col-span-1">
                  <FormInput id="zip" label="Postal Code" required />
                </div>
              </div>

              <hr className="my-8" />

              <div className="space-y-3">
                <div className="flex items-center">
                  <input id="same-address" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                  <label htmlFor="same-address" className="ml-2 block text-sm text-gray-900">
                    Shipping address is the same as my billing address
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="save-info" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                  <label htmlFor="save-info" className="ml-2 block text-sm text-gray-900">
                    Save this information for next time
                  </label>
                </div>
              </div>

              <hr className="my-8" />

              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Payment</h3>
              <div className="space-y-3 mb-6">
                {/* Payment method radio buttons */}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div className="sm:col-span-4">
                  <FormInput id="cc-number" label="Credit card number" required />
                </div>
                <div className="sm:col-span-2">
                  <FormInput id="cc-name" label="Name on card" required />
                </div>
                <div className="sm:col-span-1">
                  <FormInput id="cc-expiration" label="Expiration" required />
                </div>
                <div className="sm:col-span-1">
                  <FormInput id="cc-cvv" label="CVV" required />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h3>
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          className="rounded-md"
                          alt={product.name}
                          src={product.image}
                          width={64}
                          height={64}
                        />
                        <div className="ml-4">
                          <h4 className="text-sm font-semibold text-gray-800">
                            <Link href={`/products/${product.id}`} className="hover:text-green-700">
                              {product.name}
                            </Link>
                          </h4>
                          <div className="text-xs text-gray-500">Quantity: {product.quantity}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ${(parsePrice(product.price) * product.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty.</p>
                  <Link href="/products" className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition-colors">
                    Explore Products
                  </Link>
                </div>
              )}

              {cartItems.length > 0 && (
                <>
                  <hr className="my-6" />
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount (5%)</span>
                      <span className="font-medium text-red-500">-${discountAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">${shippingCost.toFixed(2)}</span>
                    </div>
                  </div>
                  <hr className="my-6" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Grand Total</span>
                    <span className="text-gray-900">${grandTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full mt-6 bg-green-700 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Place Order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}