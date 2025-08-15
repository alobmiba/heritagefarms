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
  // Use optimized static images for better performance
  const optimizedImages = {
    hero: '/branding/images/about/hero-optimized.jpg',
    sustainability: '/branding/images/about/sustainability-bg.jpg',
    crops: '/branding/images/about/crops-showcase.jpg'
  };

  return (
    <>
      <Header />
      
      <main>
        {/* HERO: About page hero with Dark Green overlay */}
        <AboutHero heroImage={optimizedImages.hero} />

        {/* PURPOSE • PROMISE • METRICS */}
        <PurposePromiseMetrics />

        {/* OUR STORY (Timeline) */}
        <StoryTimeline />

        {/* HOW WE GROW (Sustainability Practices) */}
        <SustainabilityPractices backgroundImage={optimizedImages.sustainability} />

        {/* TEAM */}
        <section id="team" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-gilroy font-bold text-[#00312D] mb-4">
                The People Behind the Produce
              </h2>
              <p className="text-lg font-gilroy text-gray-600 max-w-3xl mx-auto">
                Meet the people behind the produce—growers and partners dedicated to flavour, freshness, and sustainability.
              </p>
            </div>
            <Team />
          </div>
        </section>

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