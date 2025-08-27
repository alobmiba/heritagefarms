import React from "react";

// Import Heritage Farms components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Team from "@/components/about/Team";

// Import new About page components
import AboutHero from "@/components/about/AboutHero";
import PurposePromiseMetrics from "@/components/about/PurposePromiseMetrics";
import StoryTimeline from "@/components/about/StoryTimeline";
import SustainabilityPractices from "@/components/about/SustainabilityPractices";
import HeritageCropsTeaser from "@/components/about/HeritageCropsTeaser";
import FAQSection from "@/components/about/FAQSection";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About • Heritage Farms",
  description: "Our story, mission, and sustainable growing practices.",
};

export default function AboutPage() {
  // Use available static images for better performance
  const optimizedImages = {
    hero: '/branding/Images/about/hero.jpg',
    sustainability: '/branding/Images/about/greenhouse.jpg',
    crops: '/branding/Images/about/leaf-texture.jpg'
  };

  return (
    <>
      <Header />
      
      <main>
        {/* HERO: About page hero with Dark Green overlay */}
        <AboutHero heroImage={optimizedImages.hero} />

        {/* Fixed Background Section */}
        <div 
          className="relative bg-cover bg-center bg-no-repeat bg-fixed" 
          style={{ backgroundImage: "url('/branding/Images/banner/homebanner.png')" }}
        >
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>

          {/* Content layered on top */}
          <div className="relative z-10">
            {/* PURPOSE • PROMISE • METRICS */}
            <PurposePromiseMetrics />

            {/* OUR STORY (Timeline) */}
            <StoryTimeline />

            {/* TEAM */}
            <section id="team" className="py-16 bg-transparent text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-gilroy font-bold text-white mb-4">
                    The People Behind the Produce
                  </h2>
                  <p className="text-lg font-gilroy text-gray-200 max-w-3xl mx-auto">
                    Meet the people behind the produce—growers and partners dedicated to flavour, freshness, and sustainability.
                  </p>
                </div>
                <Team />
              </div>
            </section>
          </div>
        </div>

        {/* HOW WE GROW (Sustainability Practices) */}
        <SustainabilityPractices backgroundImage={optimizedImages.sustainability} />

        {/* HERITAGE CROPS (teaser) */}
        <HeritageCropsTeaser cropsImages={optimizedImages.crops} />

        {/* FAQ */}
        <FAQSection />

        {/* CTA STRIP */}
        <AboutCTA />
      </main>
      
      <Footer />
    </>
  );
} 