import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orderId = searchParams.id as string;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 relative">
        <CheckCircle className="w-12 h-12 text-green-600 absolute inset-0 m-auto" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">
        Order Confirmed
      </h1>
      
      <p className="text-lg text-muted-foreground text-center max-w-md mb-8 leading-relaxed">
        Thank you for your purchase. We've received your order and are getting it ready for shipment. You will pay via <strong className="text-foreground">Cash on Delivery</strong> when your order arrives.
      </p>

      {orderId && (
        <div className="bg-card px-6 py-4 rounded-2xl border border-border/50 shadow-sm mb-12 flex items-center gap-4">
          <span className="text-muted-foreground">Order Ref:</span>
          <span className="font-mono font-medium">{orderId.split('-')[0].toUpperCase()}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button render={<Link href="/products" />} size="lg" className="rounded-full h-14 px-8" variant="default">
          Continue Shopping
        </Button>
        <Button render={<Link href="/dashboard" />} size="lg" className="rounded-full h-14 px-8" variant="outline">
          View Dashboard
        </Button>
      </div>
    </div>
  );
}
