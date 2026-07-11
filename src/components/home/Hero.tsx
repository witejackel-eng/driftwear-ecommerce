'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[85vh] bg-cream overflow-hidden">
      {/* Desktop: side-by-side editorial layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-stretch min-h-[85vh]">
          {/* Image column — full bleed on desktop */}
          <div className="relative order-1 lg:order-1 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative w-full h-[50vh] lg:h-full"
            >
              <Image
                src="/images/hero/hero-main.jpg"
                alt="Summer 2025 — woman in a sunwashed linen shirt, warm morning light"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Secondary image — only on desktop, art-directed inset */}
            <div className="hidden lg:block absolute bottom-8 right-0 w-[45%] aspect-[4/5] overflow-hidden shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/hero/hero-secondary.jpg"
                  alt="Linen fabric texture and garment detail"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </motion.div>
            </div>
          </div>

          {/* Text column */}
          <div className="relative z-10 order-2 lg:order-2 flex flex-col justify-center py-12 lg:py-20 lg:pl-12 xl:pl-20">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="relative max-w-lg"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUp}>
                <span className="inline-block text-clay text-xs font-medium tracking-[0.2em] uppercase mb-6">
                  Summer 2025
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-ink leading-[1.08] mb-6"
              >
                Summer, but
                <br />
                make it soft.
              </motion.h1>

              {/* Supporting text */}
              <motion.p
                variants={fadeUp}
                className="text-muted-brown text-base md:text-lg max-w-md leading-relaxed mb-10"
              >
                Breathable shirts, lazy-day dresses, washed tees, and easy layers
                made for warm weather and real life.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link href="/shop">
                  <Button className="bg-ink text-offwhite hover:bg-ink/90 h-12 px-7 rounded-md text-sm font-medium">
                    Shop New Arrivals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/shop?filter=best-sellers">
                  <Button
                    variant="outline"
                    className="border-ink/20 text-ink hover:bg-ink/5 h-12 px-7 rounded-md text-sm font-medium"
                  >
                    Explore Best Sellers
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}