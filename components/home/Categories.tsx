'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Laptop, Shirt, Watch } from 'lucide-react';

const categories = [
  {
    title: "Electronics",
    subtitle: "Smart gadgets for smart people",
    href: "/products?category=electronics",
    icon: Laptop,
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
  },
  {
    title: "Clothing",
    subtitle: "Style that speaks for itself",
    href: "/products?category=clothing",
    icon: Shirt,
    color: "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
  },
  {
    title: "Accessories",
    subtitle: "The finishing touch",
    href: "/products?category=accessories",
    icon: Watch,
    color: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
  }
];

export function Categories() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
            Shop By Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse ranges tailored to complete your premium lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border border-border rounded-3xl p-8 hover:bg-secondary/50 transition-all duration-300 hover:shadow-sm"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${category.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-8">
                  {category.subtitle}
                </p>
                <Button variant="ghost" className="rounded-full w-full justify-between group-hover:bg-background" render={<Link href={category.href} />}>
                  Explore <span className="text-lg">→</span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
