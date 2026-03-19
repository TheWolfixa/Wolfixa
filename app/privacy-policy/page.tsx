import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wolfixa',
  description: 'Learn how we collect, use, and safeguard your information at Wolfixa.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[800px] mx-auto bg-card p-10 md:p-14 rounded-3xl shadow-sm border border-border prose prose-slate dark:prose-invert">
          <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            At Wolfixa, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We collect information you provide when placing orders, creating accounts, or contacting us — including name, email, phone, and delivery address.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Your information is used to process orders, send updates, and improve your experience. We never sell your data to third parties.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Data Security</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We use industry-standard encryption to protect your personal information.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            For privacy concerns, email us at <a href="mailto:support@wolfixa.com" className="text-primary hover:underline">support@wolfixa.com</a>
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
