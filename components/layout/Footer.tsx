import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Instagram, MapPin, Mail, ArrowRight, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="font-display text-2xl font-bold tracking-tighter block">
            Wolfixa.
          </Link>
          <p className="text-sm text-background/70 leading-relaxed max-w-xs">
            Premium, modern essentials designed for those who appreciate clean aesthetics and supreme quality.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-lg">Shop</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/products" className="text-sm text-background/70 hover:text-background transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/products?category=new" className="text-sm text-background/70 hover:text-background transition-colors">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/products?category=featured" className="text-sm text-background/70 hover:text-background transition-colors">
                Featured
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-lg">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-sm text-background/70 hover:text-background transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-background/70 hover:text-background transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm text-background/70 hover:text-background transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-background/70 hover:text-background transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4 md:col-span-1">
          <h4 className="font-display font-semibold text-lg">Newsletter</h4>
          <p className="text-sm text-background/70 mb-2">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form className="flex gap-2">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus-visible:ring-background/30"
            />
            <Button type="submit" variant="secondary" size="icon">
              <ArrowRight className="w-4 h-4" />
              <span className="sr-only">Subscribe</span>
            </Button>
          </form>
          
          <div className="pt-4 flex items-center gap-4">
            <a 
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
            >
              <Instagram className="w-5 h-5 text-background" />
            </a>
            {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER && (
              <a 
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors px-0"
              >
                <MessageCircle className="w-5 h-5 text-background" />
              </a>
            )}
            <a 
              href={`mailto:hello@wolfixa.com`} 
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
            >
              <Mail className="w-5 h-5 text-background" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-background/50">
          © {new Date().getFullYear()} Wolfixa. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-sm text-background/50">
          <MapPin className="w-4 h-4" />
          <span>Designed with precision.</span>
        </div>
      </div>
    </footer>
  );
}
