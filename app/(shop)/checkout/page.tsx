'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import { useUserStore } from '@/lib/store/userStore';
import { AddressForm, type AddressFormValues } from '@/components/checkout/AddressForm';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const { user } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handlePlaceOrder = async (addressData: AddressFormValues) => {
    if (!user) {
      toast.error('Please log in to place an order.');
      router.push('/login?redirect=/checkout');
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      user_id: user.id,
      items: items,
      total: totalPrice,
      status: 'pending',
      address: addressData,
      payment_method: 'cod', // Currently only COD is supported as per prompt
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    setIsSubmitting(false);

    if (error) {
      toast.error('Failed to place order. Please try again.');
    } else {
      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/order-confirmation?id=${data.id}`);
    }
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="bg-secondary/30 pt-10 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Secure Checkout</h1>
          <div className="flex items-center justify-center text-muted-foreground gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span>256-bit Encrypted Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Shipping Details */}
          <div className="flex-1 max-w-2xl">
            <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm">1</span>
              Shipping Address
            </h2>
            
            <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm mb-12">
              <AddressForm id="checkout-form" onSubmit={handlePlaceOrder} />
            </div>

            <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>
            
            <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm">
              <div className="flex items-center justify-between p-4 border border-primary bg-primary/5 rounded-xl cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-[5px] border-primary" />
                  <span className="font-medium">Cash on Delivery (COD)</span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mt-4 ml-9">
                Pay with cash or digital payment upon delivery.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-foreground text-background rounded-3xl p-8 sticky top-28 shadow-xl">
              <h2 className="text-2xl font-display font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 border-b border-background/20 pb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm gap-4">
                    <div className="flex items-start gap-3">
                      <span className="text-background/50 font-medium">{item.quantity}x</span>
                      <span className="text-background/90 line-clamp-2">{item.name}</span>
                    </div>
                    <span className="font-medium shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-background/80">
                  <span>Subtotal</span>
                  <span className="font-semibold text-background">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-background/80">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-background/80 pt-2 border-t border-background/20">
                  <span>Payment Method</span>
                  <span className="font-semibold text-primary/80 uppercase">Cash on Delivery</span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-background/20 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-3xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                type="submit"
                form="checkout-form"
                size="lg" 
                variant="secondary" 
                className="w-full rounded-full h-14 text-base font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
