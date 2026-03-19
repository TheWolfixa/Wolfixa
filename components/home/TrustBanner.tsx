'use client';

import { motion } from 'framer-motion';

const statements = [
  "FREE DELIVERY ON ORDERS ABOVE ₹499",
  "100% AUTHENTIC PRODUCTS",
  "EASY 7-DAY RETURNS",
  "CASH ON DELIVERY AVAILABLE",
  "10,000+ HAPPY CUSTOMERS"
];

// Duplicate to create seamless loop
const marqueeContent = [...statements, ...statements, ...statements, ...statements];

export function TrustBanner() {
  return (
    <div className="bg-black text-white overflow-hidden py-3 border-y border-white/10 relative flex items-center">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
        className="flex whitespace-nowrap items-center will-change-transform"
      >
        {marqueeContent.map((text, i) => (
          <div key={i} className="flex items-center text-xs md:text-sm font-semibold tracking-widest mx-6">
            <span className="text-white/60 mr-6">✦</span>
            {text}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
