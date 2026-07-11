import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getProductsByCollection } from '@/data/products';
import type { Collection } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface CollectionFeatureProps {
  collection: Collection;
  reverse?: boolean;
}

export function CollectionFeature({ collection, reverse = false }: CollectionFeatureProps) {
  const products = collection.productSlugs
    .map((slug) => getProductsByCollection(collection.slug).find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 4) as typeof import('@/lib/types').Product[];

  return (
    <section className="py-16 md:py-24 bg-offwhite">
      <Container>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Image */}
          <Reveal direction={reverse ? 'right' : 'left'}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          {/* Text + Mini Product Grid */}
          <Reveal direction={reverse ? 'left' : 'right'} delay={0.15}>
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl lg:text-5xl text-ink">
                {collection.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                {collection.description}
              </p>

              <Link href={collection.ctaLink}>
                <Button className="bg-navy text-cream hover:bg-navy/90 h-11 px-6 rounded-md text-sm">
                  {collection.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              {/* Mini product thumbnails */}
              {products.length > 0 && (
                <div className="grid grid-cols-4 gap-3 pt-4">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="group"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-cream mb-1.5">
                        <Image
                          src={product.colors[0]?.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="100px"
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate group-hover:text-ink transition-colors">
                        {product.name}
                      </p>
                      <p className="text-[11px] font-medium text-ink">
                        {formatPrice(product.price)}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}