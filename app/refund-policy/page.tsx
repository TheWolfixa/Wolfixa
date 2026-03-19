import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | Wolfixa',
  description: 'Details about returns and refunds on Wolfixa products.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[800px] mx-auto bg-card p-10 md:p-14 rounded-3xl shadow-sm border border-border prose prose-slate dark:prose-invert">
          <h1 className="font-display text-4xl font-bold mb-8">Refund & Return Policy</h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            We want you to be completely satisfied with your Wolfixa purchase.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Return Window</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Items can be returned within 7 days of delivery. Products must be unused, unwashed, and in original packaging.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Eligible Items</h2>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-6 space-y-2">
            <li>Wrong product delivered</li>
            <li>Damaged or defective product</li>
            <li>Size mismatch (clothing only)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">Non-Returnable Items</h2>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-6 space-y-2">
            <li>Used or washed items</li>
            <li>Items without original tags</li>
            <li>Electronics with broken seal (unless defective)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">Refund Process</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Refund processed within 5-7 business days after item inspection.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">How to Initiate Return</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            WhatsApp us or email <a href="mailto:support@wolfixa.com" className="text-primary hover:underline">support@wolfixa.com</a> with order ID and issue description.
          </p>

          <div className="mt-16 pt-8 border-t border-border">
            <Link href="/" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-medium transition-colors">
              <span>←</span> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
