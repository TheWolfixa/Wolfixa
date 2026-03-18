import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wolfixa | Premium Fashion & Lifestyle',
};

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
