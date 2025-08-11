'use client';

import React from "react";
import dynamic from 'next/dynamic';
const HeroSlider = dynamic(() => import('@/components/HeroSlider'), {
  ssr: false,
  loading: () => <div className="h-screen bg-[#F8F7F0]" />,
});
import ServicesSection from '@/components/ServicesSection';

import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import OurPurpose from '@/components/OurPurpose';
import YouTubeEmbed from '@/components/media/YouTubeEmbed';
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

        {/* Our Purpose Section */}
        <section id="purpose">
          <OurPurpose />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* YouTube Video Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-gilroy font-bold text-[#404A3D] mb-6">
              Aerial View of Heritage Farms
            </h2>
            <YouTubeEmbed
              urlOrId="https://youtu.be/loTBYvTHvcg?si=HlA_y0YpKgRmxTfj"
              title="Heritage Farms — Aerial view"
              className="mx-auto"
            />
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio">
          <PortfolioSection />
        </section>

        {/* CTA Section */}
        <section id="cta">
          <CTASection />
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
