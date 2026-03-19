'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: "100% Authentic Products",
    text: "Every product is verified and sourced directly from trusted manufacturers."
  },
  {
    icon: Truck,
    title: "Fast & Free Delivery",
    text: "Get your orders delivered quickly with real-time tracking on every purchase."
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    text: "Not satisfied? Return within 7 days — no questions asked."
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    text: "Our team is always here to help you via WhatsApp, email, or chat."
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
            Why Wolfixa?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the gold standard in online retail. We put you first.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-3xl p-8 shadow-sm border border-border/50 text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
