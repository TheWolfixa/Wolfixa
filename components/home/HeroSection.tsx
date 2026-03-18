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

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6 tracking-wide">
              ELEVATE YOUR AESTHETIC
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
            Curated for the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">
              Modern Minimalist
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Discover our premium collection of essentials. Designed with precision, crafted for durability, and styled for those who appreciate true quality.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" className="rounded-full w-full sm:w-auto text-base h-14 px-8" render={<Link href="/products" />}>
              Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto text-base h-14 px-8 backdrop-blur-sm" render={<Link href="/about" />}>
              Our Story
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
