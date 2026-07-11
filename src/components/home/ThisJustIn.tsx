'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductCard } from '@/components/product/ProductCard';
import { getNewArrivals } from '@/data/products';
import type { ProductCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

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
      : allNew.filter((p) => p.category === activeTab);

  const displayed = filtered.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-offwhite">
      <Container>
        <SectionHeader title="This Just In" />

        {/* Tabs */}
        <div className="flex items-center justify-center gap-1 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                activeTab === tab.value
                  ? 'bg-ink text-cream'
                  : 'text-muted-foreground hover:text-ink hover:bg-sand/50'
              )}
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}