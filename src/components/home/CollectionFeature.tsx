import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import type { Collection } from '@/lib/types';

interface CollectionFeatureProps {
  collection: Collection;
}

export function CollectionFeature({ collection }: CollectionFeatureProps) {
  const products = collection.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean)
    .slice(0, 4) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  return (
    <section className="py-20 md:py-28 bg-warm-paper">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Image */}
          <Reveal direction="left" className="lg:col-span-7">
            <div className="relative aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src={collection.image}
                alt={`${collection.name} — sunwashed linen pieces for warm days`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </Reveal>

          {/* Story Text + Product Rail */}
          <Reveal direction="right" delay={0.15} className="lg:col-span-5">
            <div className="space-y-6">
              <span className="text-clay text-xs font-medium tracking-[0.2em] uppercase">
                Collection
              </span>

              <h2 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.1]">
                {collection.name}
              </h2>

              <p className="text-muted-brown leading-relaxed max-w-md">
                {collection.description}
              </p>

              <Link href={collection.ctaLink}>
                <Button className="bg-ink text-offwhite hover:bg-ink/90 h-11 px-6 rounded-md text-sm font-medium">
                  {collection.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              {/* Curated product rail */}
              {products.length > 0 && (
                <div className="pt-8 border-t border-light-sand">
                  <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-brown mb-4">
                    From this collection
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin -mx-1 px-1">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="group flex-shrink-0 w-28"
                      >
                        <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-cream mb-2">
                          <Image
                            src={product.colors[0]?.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="112px"
                          />
                        </div>
                        <p className="text-[11px] text-muted-brown truncate group-hover:text-ink transition-colors leading-tight">
                          {product.name}
                        </p>
                        <p className="text-[11px] font-medium text-ink mt-0.5">
                          {formatPrice(product.price)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}