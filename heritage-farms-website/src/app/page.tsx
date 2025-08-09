'use client';

import React from "react";
import dynamic from 'next/dynamic';
const HeroSlider = dynamic(() => import('@/components/HeroSlider'), {
  ssr: false,
  loading: () => <div className="h-screen bg-[#F8F7F0]" />,
});
import ServicesSection from '@/components/ServicesSection';
import ProductsSection from '@/components/ProductsSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import ClientLogosSection from '@/components/ClientLogosSection';
import OurPurpose from '@/components/OurPurpose';
import CredibilityMetrics from '@/components/CredibilityMetrics';
import MissionOrderForm from '@/components/MissionOrderForm';
import LatestNews from '@/components/LatestNews';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import { useCart } from '@/context/CartContext';

interface CartItem {
  id: string;
  name: string;
  localName: string;
  price: string;
  image: string;
  quantity: number;
}

const HomePage = () => {
  const { isCartOpen, setIsCartOpen } = useCart();

  const handleCheckout = async (items: CartItem[]) => {
    // Cart items are now handled by the CheckoutForm component
    console.log('Order completed with items:', items);
  };

  return (
    <>
      <div>
        {/* Hero Section */}
        <section id="home">
          <HeroSlider />
        </section>

        {/* Credibility Metrics Section */}
        <section id="metrics">
          <CredibilityMetrics />
        </section>

        {/* Services Section */}
        <section id="services">
          <ServicesSection />
        </section>

        {/* Products Section */}
        <section id="products">
          <ProductsSection />
        </section>

        {/* Portfolio Section */}
        <section id="portfolio">
          <PortfolioSection />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* CTA Section */}
        <section id="cta">
          <CTASection />
        </section>

        {/* Client Logos Section */}
        <section id="clients">
          <ClientLogosSection />
        </section>

        {/* Our Purpose Section */}
        <section id="purpose">
          <OurPurpose />
        </section>

        {/* Mission & Order Form Section */}
        <section id="mission">
          <MissionOrderForm />
        </section>

        {/* Latest News Section */}
        <section id="news">
          <LatestNews />
        </section>

        {/* Newsletter Signup Section */}
        <section id="newsletter">
          <NewsletterSignup />
        </section>

        {/* Footer */}
        <Footer />
      </div>

      {/* Shopping Cart */}
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </>
  );
};

export default HomePage;
