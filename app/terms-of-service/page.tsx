import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Wolfixa',
  description: 'Our Terms of Service and user agreements.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[800px] mx-auto bg-card p-10 md:p-14 rounded-3xl shadow-sm border border-border prose prose-slate dark:prose-invert">
          <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            By using Wolfixa, you agree to these terms.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Use of Website</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            You must be 18+ to make purchases. You agree to provide accurate information when placing orders.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Products & Pricing</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            All prices are in INR. We reserve the right to modify prices without prior notice. Product images are for reference only.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Orders & Payment</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Orders confirmed via email. We accept Cash on Delivery (COD).
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            These terms are governed by laws of India.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Contact</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Email us at <a href="mailto:support@wolfixa.com" className="text-primary hover:underline">support@wolfixa.com</a>
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
