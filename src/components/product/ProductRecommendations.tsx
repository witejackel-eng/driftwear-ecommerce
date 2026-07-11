'use client';

import { getProductBySlug, getRelatedProducts, getProductsByCategory } from '@/data/products';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProductGrid } from '@/components/product/ProductGrid';

interface ProductRecommendationsProps {
  currentSlug: string;
  category: string;
}

export function ProductRecommendations({
  currentSlug,
  category,
}: ProductRecommendationsProps) {
  const product = getProductBySlug(currentSlug);
  const relatedProducts = product
    ? getRelatedProducts(product, 4)
    : getProductsByCategory(category)
        .filter((p) => p.slug !== currentSlug)
        .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <SectionHeader title="You might also like" align="left" />
      <ProductGrid products={relatedProducts} columns={4} />
    </section>
  );
}