'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(4);
      
      if (data) {
        setProducts(data);
      }
      setIsLoading(false);
    }

    fetchFeatured();
  }, [supabase]);

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
              Featured Essentials
            </h2>
            <p className="text-muted-foreground text-lg">
              Our most loved pieces, handpicked to elevate your everyday style.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" className="rounded-full" render={<Link href="/products?category=featured" />}>
              View All
            </Button>
          </motion.div>
        </div>

        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </section>
  );
}
