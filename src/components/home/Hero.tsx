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
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[100dvh] py-24 md:py-32">
          {/* Left: Text Content */}
          <div className="relative z-10 order-2 lg:order-1">
            {/* Decorative blob */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sand/40 blur-3xl pointer-events-none" />

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-xs font-medium tracking-wider uppercase rounded-full mb-6">
                  / SUMMER DROP 01
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-5xl lg:text-7xl text-ink leading-[1.1] mb-6"
              >
                Summer, but
                <br />
                make it soft.
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed mb-8"
              >
                Breathable shirts, lazy-day dresses, washed tees, and easy layers
                made for warm weather and real life.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <MagneticButton>
                  <Link href="/shop">
                    <Button className="bg-navy text-cream hover:bg-navy/90 h-11 px-6 rounded-md text-sm">
                      Shop New Arrivals
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <Link href="/shop?sort=popular">
                    <Button
                      variant="outline"
                      className="border-ink/20 text-ink hover:bg-ink/5 h-11 px-6 rounded-md text-sm"
                    >
                      Shop Best Sellers
                    </Button>
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
              className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/hero/hero-main.jpg"
                alt="Summer collection — woman in flowing linen shirt"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Floating secondary card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-lg border-4 border-offwhite rotate-[-6deg]"
            >
              <Image
                src="/images/hero/hero-secondary.jpg"
                alt="Linen fabric detail"
                fill
                className="object-cover"
                sizes="160px"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Subtle magnetic hover effect on buttons */
function MagneticButton({ children }: { children: React.ReactNode }) {
  return <div className="inline-block">{children}</div>;
}