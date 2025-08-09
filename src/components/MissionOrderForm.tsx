'use client';

import { useState } from 'react';

export default function MissionOrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your order! We will contact you soon.');
        setFormData({ name: '', email: '', product: '', notes: '' });
      } else {
        alert('There was an error submitting your order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="section-padding bg-heritage-dark-green">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-gilroy-extrabold mb-8">
              Our Mission
            </h2>
            
            <div className="space-y-6 text-lg font-gilroy-light">
              <p>
                Our mission is to address a significant challenge faced by Sub-Saharan African immigrants: the high costs and often poor quality of imported produce resulting from long supply chain lead times.
              </p>
              
              <p>
                As immigrants ourselves, we frequently encounter the frustration of purchasing staple foods—such as yams, vegetables, and spices—only to find them partially spoiled due to the prolonged and inefficient supply chain.
              </p>
              
              <p>
                To address this issue, our approach focuses on bringing the farm closer to the market by cultivating these cherished crops locally in Ontario. By combining traditional farming methods with innovative techniques like hydroponics and greenhouse farming, we can grow tropical crops and tubers that are not only fresh and affordable but also of the highest quality.
              </p>
              
              <p>
                Our mission is to produce these crops locally, reducing waste and costs, eliminating supply chain lead times, and providing our community with the authentic taste of home they crave.
              </p>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <h3 className="text-3xl font-gilroy-extrabold text-heritage-dark-green mb-6">
              Place Your Order
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-gilroy-extrabold text-heritage-dark-green mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-heritage-forest-green focus:outline-none font-gilroy-light"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-gilroy-extrabold text-heritage-dark-green mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-heritage-forest-green focus:outline-none font-gilroy-light"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="product" className="block text-sm font-gilroy-extrabold text-heritage-dark-green mb-2">
                  Product Interest *
                </label>
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-heritage-forest-green focus:outline-none font-gilroy-light"
                >
                  <option value="">Select a product</option>
                  <option value="fluted-pumpkin-leaves">Fluted Pumpkin Leaves (Ugwu)</option>
                  <option value="jute-leaves">Jute Leaves (Ewedu)</option>
                  <option value="water-leaf">Water Leaf (Gbure)</option>
                  <option value="scent-leaf">Scent Leaf (Efirin)</option>
                  <option value="uziza-leaf">Uziza Leaf</option>
                  <option value="ogbono">Ogbono (Wild Mango Seed)</option>
                  <option value="raw-honey">Raw Honey</option>
                  <option value="mixed-greens">Mixed Greens Package</option>
                  <option value="custom">Custom Order</option>
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-gilroy-extrabold text-heritage-dark-green mb-2">
                  Special Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-heritage-forest-green focus:outline-none font-gilroy-light"
                  placeholder="Any special requirements or questions..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-lg py-4"
              >
                Submit Order Request
              </button>
            </form>

            <div className="mt-6 text-sm text-gray-600 font-gilroy-light">
              <p>* Required fields</p>
              <p className="mt-2">
                We'll contact you within 24 hours to confirm your order and discuss delivery options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 