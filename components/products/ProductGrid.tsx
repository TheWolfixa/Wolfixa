'use client';

import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  stock: number;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 animate-pulse">
            <div className="h-72 bg-muted rounded-2xl" />
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-6 bg-muted rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h3 className="text-2xl font-display font-bold mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
