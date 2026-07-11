'use client';

import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Container } from '@/components/shared/Container';
import { EmptyState } from '@/components/shared/EmptyState';
import { Reveal } from '@/components/shared/Reveal';
import { useWishlistStore } from '@/store/wishlist-store';
import { products, getProductBySlug } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';

function WishlistProductCard({
  product,
  onRemove,
}: {
  product: Product;
  onRemove: () => void;
}) {
  const color = product.colors[0];

  return (
    <div className="group relative">
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        aria-label="Remove from favorites"
      >
        <Trash2 className="w-3.5 h-3.5 text-ink" />
      </button>
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-cream rounded-sm mb-3">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${color.image})` }}
          />
          {(product.isNew || product.isBestSeller || product.isSale) && (
            <span
              className={
                'absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-sm ' +
                (product.isNew
                  ? 'bg-olive text-white'
                  : product.isBestSeller
                  ? 'bg-navy text-white'
                  : 'bg-terracotta text-white')
              }
            >
              {product.isNew ? 'New' : product.isBestSeller ? 'Best Seller' : 'Sale'}
            </span>
          )}
          <span className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 fill-terracotta text-terracotta" />
          </span>
        </div>
        <h3 className="text-sm font-medium text-ink group-hover:text-navy transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-ink">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const removeItem = useWishlistStore((s) => s.removeItem);

  const wishlistProducts = productIds
    .map((id) => {
      // Try finding by id first, then by slug (in case wishlist was populated differently)
      let product = products.find((p) => p.id === id);
      if (!product) product = getProductBySlug(id);
      return product;
    })
    .filter((p): p is Product => p !== undefined);

  return (
    <main className="flex-1">
      <Container className="py-8 md:py-12">
        {/* Breadcrumb */}
        <Reveal>
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Your Favorites</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        <Reveal>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-ink mb-2">
            Your Favorites
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            {wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? 's' : ''}
          </p>
        </Reveal>

        {wishlistProducts.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorites yet."
            description="Your future favorite shirt is probably two clicks away. Go find it."
            actionLabel="Start Shopping"
            onAction={() => {
              window.location.href = '/shop';
            }}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
            {wishlistProducts.map((product, i) => (
              <Reveal key={product.id} delay={Math.min(i * 0.05, 0.3)}>
                <WishlistProductCard
                  product={product}
                  onRemove={() => removeItem(product.id)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}