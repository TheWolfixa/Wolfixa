'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, CartItem as ICartItem } from '@/lib/store/cartStore';

interface CartItemProps {
  item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 py-6 border-b border-border">
      {/* Image */}
      <Link href={`/products/${item.id}`} className="shrink-0 relative w-24 h-24 bg-secondary rounded-xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Info */}
        <div className="space-y-1">
          <Link href={`/products/${item.id}`} className="font-display font-medium hover:text-primary transition-colors line-clamp-1">
            {item.name}
          </Link>
          <p className="text-sm text-muted-foreground">{item.category}</p>
          <p className="font-semibold sm:hidden">${(item.price * item.quantity).toFixed(2)}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <div className="flex items-center border border-border rounded-full h-10 w-28 bg-background">
            <button
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="flex-1 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="flex-1 text-center font-medium text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex-1 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden sm:block text-right w-24">
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="w-5 h-5" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
