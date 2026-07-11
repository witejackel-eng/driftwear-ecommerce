import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Reveal } from '@/components/shared/Reveal';
import { ProductCard } from '@/components/product/ProductCard';
import { getBestSellers } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export function BestSellers() {
  const products = getBestSellers().slice(0, 8);

  return (
    <section className="py-20 md:py-28 bg-offwhite">
      <Container>
        <SectionHeader title="Soft stuff people keep coming back for." />

        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Reveal>

        <div className="mt-12 text-center">
          <Link
            href="/shop?filter=best-sellers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-brown hover:text-ink transition-colors"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}