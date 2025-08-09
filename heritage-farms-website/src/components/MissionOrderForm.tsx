'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  selectedProducts: string[];
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  selectedProducts?: string;
  message?: string;
}

export default function MissionOrderForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    selectedProducts: [],
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const products = [
    'Callaloo (Amaranth)',
    'Fluted Pumpkin Leaves',
    'Jute Leaves',
    'Waterleaf (Gbure)',
    'Scent Leaves',
    'Raw Honey',
    'Red Onions',
    'Yams'
  ];

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

    // Phone validation (optional but if provided, must be valid)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    // Products validation
    if (formData.selectedProducts.length === 0) {
      newErrors.selectedProducts = 'Please select at least one product';
    }

    // Message validation (optional but if provided, must be reasonable length)
    if (formData.message.trim() && formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(product)
        ? prev.selectedProducts.filter(p => p !== product)
        : [...prev.selectedProducts, product]
    }));
    
    // Clear error when user selects a product
    if (errors.selectedProducts) {
      setErrors(prev => ({
        ...prev,
        selectedProducts: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setFormStatus('error');
      setSubmitMessage('Please correct the errors above and try again.');
      return;
    }

    setFormStatus('loading');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setFormStatus('success');
        setSubmitMessage(`Order submitted successfully! Order ID: ${result.orderId}. Please send Interac e-Transfer to payments@heritagefarms.ca with your order number in the message. Payment must be received within 24 hours.`);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          selectedProducts: [],
          message: ''
        });
        setErrors({});
      } else {
        setFormStatus('error');
        setSubmitMessage(result.message || 'Failed to submit order. Please try again.');
      }
    } catch {
      setFormStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    }
  };

  const getStatusStyles = () => {
    switch (formStatus) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700';
    }
  };

  return (
    <section id="mission" className="py-20 bg-[#F8F7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Mission Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-gilroy-extrabold font-bold text-[#404A3D]">
                Our Mission
              </h2>
              <p className="text-lg font-gilroy text-gray-600 leading-relaxed">
                To cultivate heritage crops that connect communities to their cultural roots while promoting sustainable farming practices and food sovereignty.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-gilroy-extrabold font-semibold text-[#404A3D] mb-2">
                  Cultural Heritage
                </h3>
                <p className="text-gray-600 font-gilroy">
                  Preserving and promoting traditional West African and Caribbean agricultural practices and crops.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-gilroy-extrabold font-semibold text-[#404A3D] mb-2">
                  Sustainable Innovation
                </h3>
                <p className="text-gray-600 font-gilroy">
                  Using advanced greenhouse and hydroponic systems for year-round production while minimizing environmental impact.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-gilroy-extrabold font-semibold text-[#404A3D] mb-2">
                  Community Empowerment
                </h3>
                <p className="text-gray-600 font-gilroy">
                  Creating opportunities and representation in the agricultural sector for underrepresented communities.
                </p>
              </div>
            </div>

            {/* Mission Stats */}
            <div className="bg-[#F8F7F0] rounded-2xl p-6">
              <h4 className="text-2xl font-gilroy-extrabold font-bold text-[#404A3D] mb-4">
                Our Commitment
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-gilroy-extrabold font-bold text-[#EDDD5E]">100%</div>
                  <p className="text-gray-600 font-gilroy text-sm">Local Production</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-gilroy-extrabold font-bold text-[#EDDD5E]">365</div>
                  <p className="text-gray-600 font-gilroy text-sm">Days of Growth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Form */}
          <div className="bg-[#F8F7F0] rounded-2xl p-8">
            <h3 className="text-3xl font-gilroy-extrabold font-bold text-[#404A3D] mb-6">
              Place Your Order
            </h3>

            {/* Status Message */}
            {formStatus !== 'idle' && submitMessage && (
              <div className={`mb-6 p-4 rounded-lg border ${getStatusStyles()}`}>
                <div className="flex items-center">
                  {formStatus === 'success' && (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {formStatus === 'error' && (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  {formStatus === 'loading' && (
                    <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  <span className="font-gilroy">{submitMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[#404A3D] font-gilroy font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent font-gilroy transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 font-gilroy">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[#404A3D] font-gilroy font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent font-gilroy transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 font-gilroy">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-[#404A3D] font-gilroy font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent font-gilroy transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 font-gilroy">{errors.phone}</p>
                )}
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-[#404A3D] font-gilroy font-medium mb-3">
                  Products of Interest *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {products.map((product) => (
                    <label key={product} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.selectedProducts.includes(product)}
                        onChange={() => handleProductToggle(product)}
                        className="w-4 h-4 text-[#EDDD5E] border-gray-300 rounded focus:ring-[#EDDD5E]"
                      />
                      <span className="text-gray-600 font-gilroy">{product}</span>
                    </label>
                  ))}
                </div>
                {errors.selectedProducts && (
                  <p className="text-red-500 text-sm mt-1 font-gilroy">{errors.selectedProducts}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[#404A3D] font-gilroy font-medium mb-2">
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent font-gilroy resize-none transition-colors ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your specific needs or questions..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 font-gilroy">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full bg-[#EDDD5E] text-[#404A3D] font-gilroy-extrabold font-semibold py-4 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {formStatus === 'loading' ? (
                  <>
                    <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Order Request'
                )}
              </button>
            </form>

            {/* Payment Instructions */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-6">
              <h4 className="font-gilroy font-semibold text-blue-800 mb-2">
                Payment Method: Interac e-Transfer
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Send payment to: <strong>payments@heritagefarms.ca</strong></p>
                <p>• Include your Order Number in the message</p>
                <p>• Payment must be received within 24 hours</p>
                <p>• Security Question: &quot;Heritage Farm Order&quot; / Answer: &quot;Produce&quot;</p>
              </div>
            </div>

            {/* Form Note */}
            <p className="text-sm text-gray-600 font-gilroy mt-4 text-center">
              After submitting your order, you&apos;ll receive an order number. Please complete your Interac e-Transfer payment within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 