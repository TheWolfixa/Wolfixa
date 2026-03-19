import { createClient } from '@/lib/supabase/server';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';

export const revalidate = 3600;

async function FeaturedProductsGrid() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .limit(4);

  return <ProductGrid products={products || []} isLoading={false} />;
}

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-4 duration-1000">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
              Handpicked For You
            </h2>
            <p className="text-muted-foreground text-lg">
              Our most loved Electronics & Clothing — curated for quality and style
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-right-4 duration-1000">
            <Button render={<Link href="/products?featured=true" />} variant="outline" className="rounded-full">
              View All
            </Button>
          </div>
        </div>

        <Suspense fallback={<ProductGrid products={[]} isLoading={true} />}>
          <FeaturedProductsGrid />
        </Suspense>
      </div>
    </section>
  );
}
