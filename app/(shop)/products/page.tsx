import { createClient } from '@/lib/supabase/server';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { Metadata } from 'next';

import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop All Products | Wolfixa',
};

// Allow searchParams properly in Next.js 14 server components
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

async function ProductsList({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const supabase = await createClient();
  
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;

  let query = supabase.from('products').select('*');

  if (category && category !== 'featured') {
    query = query.ilike('category', `%${category}%`);
  } else if (category === 'featured') {
    query = query.eq('is_featured', true);
  }

  if (q) {
    query = query.ilike('name', `%${q}%`);
  }

  if (sort === 'price-asc') {
    query = query.order('price', { ascending: true });
  } else if (sort === 'price-desc') {
    query = query.order('price', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data: products } = await query;

  return (
    <>
      {products && products.length > 0 ? (
        <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
          <p>Showing {products.length} results</p>
        </div>
      ) : null}
      
      <ProductGrid products={products || []} isLoading={false} />
    </>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <div className="bg-secondary/30 pt-16 pb-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Shop All Essentials</h1>
          <p className="text-lg text-muted-foreground">
            Explore our curated collection of premium products. Find exactly what you've been looking for.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
        <ProductFilters />
      </div>

      <div className="container mx-auto px-4">
        <Suspense fallback={<ProductGrid products={[]} isLoading={true} />}>
          <ProductsList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
