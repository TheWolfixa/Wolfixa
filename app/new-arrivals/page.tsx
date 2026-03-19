import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Arrivals | Wolfixa',
  description: 'Shop the newest premium electronics and clothing at Wolfixa.',
};

export const revalidate = 3600;

async function NewArrivalsGrid() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h3 className="text-2xl font-display font-bold mb-2">No new arrivals yet</h3>
        <p className="text-muted-foreground">Check back soon for the latest premium collections.</p>
      </div>
    );
  }

  return <ProductGrid products={products} isLoading={false} />;
}

export default function NewArrivalsPage() {
  return (
    <div className="bg-background min-h-[80vh] py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
            New Arrivals
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover our latest drops in premium Electronics & Clothing.
          </p>
        </div>

        <Suspense fallback={<ProductGrid products={[]} isLoading={true} />}>
          <NewArrivalsGrid />
        </Suspense>
      </div>
    </div>
  );
}
