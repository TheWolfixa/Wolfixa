import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      {/* Categories block could be added here if needed */}
      <NewsletterSection />
    </>
  );
}
