'use client';

import React from "react";
import HeroSlider from '@/components/HeroSlider';
import ServicesSection from '@/components/ServicesSection';
import BlogSection from '@/components/BlogSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import OurPurpose from '@/components/OurPurpose';
import BenefitsSection from '@/components/BenefitsSection';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import { useCart } from '@/context/CartContext';
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/aboutUs"

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
          <HeroSection />
        </section>
        <section id="aboutUs">
         <AboutUs></AboutUs>
        </section>
        {/* Our Purpose Section */}
        <section id="purpose" className="mt-20">
          <OurPurpose />
        </section>

        {/* Services Section */}
        <section id="services">
          <ServicesSection />
        </section>

        {/* Benefits Section - Full Bleed Video Background */}
        <BenefitsSection />

        {/* Testimonials Section */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* Blog Section */}
        <section id="blog">
          <BlogSection />
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