'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CartItem {
  id: string;
  name: string;
  localName: string;
  price: string;
  image: string;
  quantity: number;
}

interface CheckoutFormProps {
  cartItems: CartItem[];
  onClose: () => void;
  onOrderSuccess: (orderId: string) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export default function CheckoutForm({ cartItems, onClose, onOrderSuccess }: CheckoutFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [orderId, setOrderId] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Postal code validation
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormStatus('loading');

    try {
      const orderData = {
        ...formData,
        cartItems,
        totalPrice: getTotalPrice(),
        orderType: 'ecommerce'
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        setOrderId(result.code);
        setFormStatus('success');
        onOrderSuccess(result.code);
      } else {
        setFormStatus('error');
        console.error('Order submission failed:', result.message);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setFormStatus('error');
    }
  };

  const getStatusStyles = () => {
    switch (formStatus) {
      case 'loading':
        return 'bg-blue-500 text-white';
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      default:
        return 'bg-[#5B8C51] text-white hover:bg-opacity-90';
    }
  };

  const getStatusText = () => {
    switch (formStatus) {
      case 'loading':
        return 'Processing Order...';
      case 'success':
        return 'Order Submitted Successfully!';
      case 'error':
        return 'Error - Please Try Again';
      default:
        return 'Complete Order';
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          
          <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-lg font-gilroy-extrabold font-bold text-[#404A3D] mb-4">
                Order Confirmed!
              </h3>
              
              <div className="bg-[#EDDD5E] p-4 rounded-lg mb-6">
                                  <p className="text-base font-gilroy font-semibold text-[#404A3D] mb-2">
                  Your Order Number:
                </p>
                <p className="text-xl font-gilroy-extrabold font-bold text-[#404A3D]">
                  {orderId}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                <h4 className="font-gilroy font-semibold text-[#404A3D] mb-3">
                  Interac e-Transfer Instructions:
                </h4>
                <div className="space-y-2 text-base text-gray-700">
                  <p><strong>Send payment to:</strong> heritagefieldsandacreage@gmail.com</p>
                  <p><strong>Amount:</strong> ${getTotalPrice().toFixed(2)} CAD</p>
                  <p><strong>Important:</strong> Include your Order Code <strong>{orderId}</strong> in the message</p>
                  <p><strong>Security Question:</strong> &quot;Heritage Farm Order&quot;</p>
                  <p><strong>Answer:</strong> &quot;Produce&quot;</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                <p className="text-base text-yellow-800 font-gilroy">
                  <strong>Important:</strong> Your order will be processed upon receipt and confirmation of payment. 
                  Payment must be received within 24 hours to avoid order cancellation.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#5B8C51] text-white font-gilroy-extrabold font-semibold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        
        <div className="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-gilroy-extrabold font-bold text-[#00312D]">
              Checkout
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-gilroy-extrabold font-bold text-[#00312D] mb-4">
                Order Summary
              </h3>
              
              <div className="bg-[#00312D] p-4 rounded-lg mb-6">
                <p className="text-base font-gilroy font-semibold text-[#EAFDE7] mb-2">
                  Total Items: {cartItems.length}
                </p>
                <p className="text-xl font-gilroy-extrabold font-bold text-[#EAFDE7]">
                  Total: ${getTotalPrice().toFixed(2)}
                </p>
              </div>
              
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-base font-gilroy font-semibold text-[#00312D] truncate">
                          {item.name}
                        </p>
                        <p className="text-sm font-gilroy text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-base font-gilroy font-semibold text-[#00312D]">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-gilroy font-semibold text-[#00312D]">Total:</span>
                  <span className="text-xl font-gilroy font-bold text-[#00312D]">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-base font-gilroy font-semibold text-[#00312D] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00312D] focus:border-transparent font-gilroy"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-base text-red-600 font-gilroy">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-base font-gilroy font-semibold text-[#00312D] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00312D] focus:border-transparent font-gilroy"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-base text-red-600 font-gilroy">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-base font-gilroy font-semibold text-[#00312D] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00312D] focus:border-transparent font-gilroy"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-base text-red-600 font-gilroy">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-base font-gilroy font-semibold text-[#00312D] mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00312D] focus:border-transparent font-gilroy resize-none"
                    placeholder="Enter your complete delivery address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-base text-red-600 font-gilroy">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-gilroy font-semibold text-[#00312D] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00312D] focus:border-transparent font-gilroy"
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600 font-gilroy">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-gilroy font-semibold text-[#00312D] mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00312D] focus:border-transparent font-gilroy"
                      placeholder="Enter your postal code"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-600 font-gilroy">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-gilroy font-semibold text-[#00312D] mb-1">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00312D] focus:border-transparent font-gilroy resize-none"
                    placeholder="Any special delivery instructions or notes"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-gilroy font-semibold text-blue-800 mb-2">
                    Payment Method: Interac e-Transfer
                  </h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Send payment to: <strong>heritagefieldsandacreage@gmail.com</strong></p>
                    <p>• Include your Order Code in the message</p>
                    <p>• Payment must be received within 24 hours</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className={`w-full py-3 px-6 rounded-full font-gilroy-extrabold font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${getStatusStyles()}`}
                >
                  {getStatusText()}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 