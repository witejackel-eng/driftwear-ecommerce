"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const messages = [
  "Free shipping on orders over ₹2,999",
  "Easy 30-day returns",
  "Soft clothes, zero drama",
  "New summer pieces just landed",
];

export function PromoBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextMessage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(nextMessage, 4000);
    return () => clearInterval(interval);
  }, [isVisible, nextMessage]);

  if (!isVisible) return null;

  return (
    <div className="relative bg-cream text-navy z-50">
      <div className="relative flex items-center justify-center h-9 px-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-xs sm:text-sm font-medium tracking-wide text-center whitespace-nowrap"
          >
            {messages[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-sand/50 transition-colors"
        aria-label="Close promo bar"
      >
        <X className="h-3.5 w-3.5 text-navy/70" />
      </button>
    </div>
  );
}