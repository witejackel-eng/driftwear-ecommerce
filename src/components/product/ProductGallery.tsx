'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (activeThumbRef.current && thumbRef.current) {
      const container = thumbRef.current;
      const thumb = activeThumbRef.current;
      const scrollLeft =
        thumb.offsetLeft - container.offsetWidth / 2 + thumb.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [selectedIndex]);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-cream">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${productName} - Image ${selectedIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={selectedIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail Rail */}
      {images.length > 1 && (
        <div
          ref={thumbRef}
          className="flex gap-2 overflow-x-auto scrollbar-thin pb-1 snap-x snap-mandatory"
        >
          {images.map((img, index) => (
            <button
              key={index}
              ref={index === selectedIndex ? activeThumbRef : undefined}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-md overflow-hidden border-2 transition-all snap-start',
                index === selectedIndex
                  ? 'border-navy ring-1 ring-navy/20'
                  : 'border-transparent opacity-60 hover:opacity-100'
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}