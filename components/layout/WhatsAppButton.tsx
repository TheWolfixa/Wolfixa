'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

  if (!whatsappNumber) return null;

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1ebd5a] transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: [
          '0 0 0 0 rgba(37, 211, 102, 0.7)',
          '0 0 0 15px rgba(37, 211, 102, 0)',
        ],
      }}
      transition={{
        boxShadow: {
          repeat: Infinity,
          duration: 1.5,
        },
      }}
    >
      <MessageCircle className="w-7 h-7" />
      <span className="sr-only">Contact us on WhatsApp</span>
    </motion.a>
  );
}
