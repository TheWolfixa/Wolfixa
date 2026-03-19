import { Mail, MapPin, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Wolfixa',
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-[80vh] py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Get In Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have a question? We would love to hear from you. Send us a message and we will respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-1">support@wolfixa.com</p>
                <p className="text-sm text-muted-foreground">We aim to reply within 24 hours.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-muted-foreground mb-1">Chat with us on WhatsApp</p>
                <a href="https://wa.me/910000000000" className="text-sm font-medium hover:underline">Message Us →</a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Store Hours</h3>
                <p className="text-muted-foreground mb-1">Mon–Sat, 10AM – 7PM IST</p>
                <p className="text-muted-foreground">Online Support Available 24/7</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input placeholder="John Doe" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Message</label>
                <textarea 
                  className="flex min-h-[150px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <Button size="lg" className="w-full h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 group">
                Send Message <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
