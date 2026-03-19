'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { Mailbox } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    const { error } = await supabase.from('newsletter').insert([{ email }]);
    setIsLoading(false);

    if (error) {
      if (error.code === '23505') { // Unique violation
        toast.info("You're already subscribed!");
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } else {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl w-full"
        >
          <div className="w-16 h-16 bg-background/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mailbox className="w-8 h-8 text-background" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Join the Wolfixa Club
          </h2>
          <p className="text-background/80 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Be the first to know about new arrivals, exclusive deals, and special offers. No spam, ever.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus-visible:ring-background/30"
            />
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="h-12 w-full sm:w-auto px-8 shrink-0 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe Now'}
            </Button>
          </form>
          <p className="text-xs text-background/50 mt-4">
            Join our growing community. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
