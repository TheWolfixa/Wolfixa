'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-foreground/5 to-transparent blur-[120px]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center justify-center min-h-[90vh] text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-secondary/80 text-foreground text-xs md:text-sm font-bold mb-6 tracking-widest border border-border/50">
              ✦ ELECTRONICS & CLOTHING
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter text-foreground leading-[1.05] md:leading-[1.05]">
            Wolfixa —
            <br />
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-semibold text-foreground/80 block mt-2"
            >
              Redefining Everyday Style
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Discover premium Electronics & Clothing crafted for modern lifestyles — where design meets durability.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6 w-full sm:w-auto"
          >
            <Button 
              size="lg" 
              className="rounded-full w-full sm:w-auto text-base h-14 px-10 bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-300 dark:bg-foreground dark:text-background" 
              render={<Link href="/products" />}
            >
              Explore Collection <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full w-full sm:w-auto text-base h-14 px-10 border-border hover:bg-secondary/50 transition-all duration-300 backdrop-blur-sm" 
              render={<Link href="/about" />}
            >
              Our Story
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-10 flex items-center justify-center text-sm md:text-base text-muted-foreground font-medium flex-wrap gap-2 md:gap-4"
          >
            <span>✦ Premium Quality</span>
            <span className="hidden sm:inline text-border/60">•</span>
            <span>Fast Delivery</span>
            <span className="hidden sm:inline text-border/60">•</span>
            <span>Easy Returns</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
