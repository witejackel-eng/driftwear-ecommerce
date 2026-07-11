'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductCard } from '@/components/product/ProductCard';
import { getNewArrivals } from '@/data/products';
import type { ProductCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const tabs: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Women', value: 'women' },
  { label: 'Men', value: 'men' },
];

export function ThisJustIn() {
  const [activeTab, setActiveTab] = useState('all');
  const allNew = getNewArrivals();

  const filtered =
    activeTab === 'all'
      ? allNew
      : allNew.filter((p) => p.category === (activeTab as ProductCategory));

  const displayed = filtered.slice(0, 8);

  return (
    <section className="py-20 md:py-28 bg-offwhite">
      <Container>
        <SectionHeader title="This Just In" />

        {/* Tabs */}
        <div className="flex items-center justify-center gap-1 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200',
                activeTab === tab.value
                  ? 'bg-ink text-offwhite'
                  : 'text-muted-brown hover:text-ink hover:bg-warm-paper'
              )}
              aria-pressed={activeTab === tab.value}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/shop?sort=newest"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-brown hover:text-ink transition-colors"
          >
            View All New Arrivals
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}