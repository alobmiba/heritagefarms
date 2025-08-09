import HeroSlider from '@/components/HeroSlider';
import OurPurpose from '@/components/OurPurpose';
import CredibilityMetrics from '@/components/CredibilityMetrics';
import MissionOrderForm from '@/components/MissionOrderForm';
import LatestNews from '@/components/LatestNews';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footer';

export const runtime = 'edge';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <OurPurpose />
      <CredibilityMetrics />
      <MissionOrderForm />
      <LatestNews />
      <NewsletterSignup />
      <Footer />
    </main>
  );
} 