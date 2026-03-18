'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, totalPrice, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6"
        >
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </motion.div>
        <h1 className="text-3xl font-display font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Looks like you haven't added anything to your cart yet. Discover our premium collection and elevate your essentials.
        </p>
        <Button render={<Link href="/products" />} size="lg" className="rounded-full px-8 h-12">
          Start Shopping <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="bg-secondary/30 pt-10 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your bag</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1 bg-card rounded-3xl border border-border p-6 shadow-sm">
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-medium text-muted-foreground">
              <div className="col-span-8">Product</div>
              <div className="col-span-4 text-right pr-14">Total</div>
            </div>
            
            <div className="flex flex-col">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-foreground text-background rounded-3xl p-8 sticky top-28 shadow-xl">
              <h2 className="text-2xl font-display font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-background/80">
                  <span>Subtotal</span>
                  <span className="font-semibold text-background">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-background/80">
                  <span>Shipping</span>
                  <span className="font-semibold text-background">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-background/20 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Estimated Total</span>
                  <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button render={<Link href="/checkout" />} size="lg" variant="secondary" className="w-full rounded-full h-14 text-base font-semibold">
                Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <p className="text-center text-xs text-background/50 mt-4 px-4 leading-relaxed">
                Taxes and shipping calculated at checkout. Free shipping on orders over $150.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
