import { HeroSection } from '@/components/home/HeroSection';
import { TrustBanner } from '@/components/home/TrustBanner';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Categories } from '@/components/home/Categories';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wolfixa | Premium Electronics & Clothing',
  description: 'Discover premium Electronics & Clothing crafted for modern lifestyles — where design meets durability.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBanner />
      <FeaturedProducts />
      <Categories />
      <WhyChooseUs />
      <NewsletterSection />
    </>
  );
}
