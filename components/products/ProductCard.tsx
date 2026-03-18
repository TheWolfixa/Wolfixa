'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store/cartStore';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder.png',
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-right',
    });
  };

  const hasStock = product.stock > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-card rounded-2xl shadow-sm border border-border overflow-hidden"
    >
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="relative h-72 overflow-hidden bg-secondary">
        <Badge className="absolute top-4 left-4 z-10 bg-background text-foreground hover:bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-md">
          {product.category}
        </Badge>
        {!hasStock && (
          <Badge variant="destructive" className="absolute top-4 right-4 z-10">
            Out of Stock
          </Badge>
        )}
        <Image
          src={product.images[0] || '/placeholder.png'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
          <Button 
            className="w-full rounded-xl shadow-lg" 
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={!hasStock}
          >
            Add to Cart
          </Button>
        </div>
        {/* Gradient Overlay for text readability if needed */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Info Container */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Link href={`/products/${product.id}`} className="group-hover:text-primary transition-colors">
            <h3 className="font-display font-semibold text-lg line-clamp-1">{product.name}</h3>
          </Link>
          <span className="font-semibold text-lg shrink-0">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center gap-1 mt-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-foreground text-foreground'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-2">
            ({product.rating})
          </span>
        </div>
      </div>
    </motion.div>
  );
}
