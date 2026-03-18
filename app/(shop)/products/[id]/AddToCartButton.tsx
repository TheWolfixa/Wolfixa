'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export function AddToCartButton({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Add item multple times or modify the store to accept quantity
    // Our store addItem adds 1 by default, but we can call updateQuantity right after or add iteratively
    // Wait, the store's addItem does: if existing, +1. If not, sets to 1.
    // It's better to add the product and then set its quantity to (existing + new_quantity)
    
    // Quick workaround for the current store implementation:
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] || '/placeholder.png',
        category: product.category,
        size: size,
      });
    }

    toast.success(`${quantity} x ${product.name} added to cart!`, {
      position: 'bottom-right',
    });
    setQuantity(1);
  };

  if (product.stock <= 0) {
    return (
      <Button size="lg" disabled className="w-full sm:w-auto h-14 px-8 rounded-full text-base">
        Out of Stock
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Size Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Select Size</h3>
          <span className="text-sm text-foreground underline cursor-pointer hover:text-primary transition-colors">Size Guide</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all ${
                size === s 
                  ? 'bg-foreground text-background shadow-md' 
                  : 'bg-card hover:border-foreground border-2 border-border text-foreground hover:bg-secondary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center border-2 border-border rounded-full h-14 bg-background w-full sm:w-36 overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex-1 h-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="flex-1 text-center font-medium text-base">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="flex-1 h-full flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            disabled={quantity >= product.stock}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <Button
          size="lg"
          onClick={handleAddToCart}
          className="w-full sm:w-auto h-14 px-8 rounded-full text-base flex-1 shadow-lg hover:shadow-xl transition-all"
        >
          <ShoppingBag className="w-5 h-5 mr-no mr-2" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}
