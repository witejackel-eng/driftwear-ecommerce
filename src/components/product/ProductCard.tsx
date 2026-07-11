'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils';
import { ProductBadge } from '@/components/shared/Badge';
import { QuickAdd } from '@/components/product/QuickAdd';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const primaryColor = product.colors[0];
  const hoverColor = product.colors.find((c) => c.hoverImage) || primaryColor;
  const soldOut = product.inventory <= 0;
  const hasDiscount = product.isSale && product.compareAtPrice;

  const handleQuickAdd = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (soldOut) return;
    setQuickAddOpen(true);
  }, [soldOut]);

  const discountPercent = hasDiscount
    ? getDiscountPercentage(product.price, product.compareAtPrice!)
    : 0;

  return (
    <>
      <motion.div
        className={cn('group relative flex flex-col', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={`/product/${product.slug}`}
          className="block focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 rounded-sm"
          aria-label={`${product.name} — ${formatPrice(product.price)}`}
        >
          {/* Image Container — 4:5 aspect, no border radius on images */}
          <div className="relative aspect-[4/5] overflow-hidden bg-cream">
            {/* Primary image */}
            <Image
              src={primaryColor.image}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              onError={() => setImgError(true)}
              style={{ opacity: isHovered && hoverColor.hoverImage && !imgError ? 0 : 1 }}
            />

            {/* Hover image — crossfade overlay */}
            {hoverColor.hoverImage && !imgError && (
              <Image
                src={hoverColor.hoverImage}
                alt={`${product.name} alternate view`}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
                style={{ opacity: isHovered ? 1 : 0, position: 'absolute', inset: 0 }}
              />
            )}

            {/* Sold-out overlay */}
            {soldOut && (
              <div className="absolute inset-0 bg-ink/40 flex items-center justify-center">
                <span className="text-white text-sm font-medium tracking-wide uppercase bg-ink/70 px-4 py-1.5 rounded-sm">
                  Sold Out
                </span>
              </div>
            )}

            {/* Badges — data-driven only */}
            {product.isNew && (
              <div className="absolute top-2.5 left-2.5">
                <ProductBadge variant="new" />
              </div>
            )}
            {product.isBestSeller && !product.isNew && (
              <div className="absolute top-2.5 left-2.5">
                <ProductBadge variant="best-seller" />
              </div>
            )}
            {product.isSale && !product.isNew && !product.isBestSeller && (
              <div className="absolute top-2.5 left-2.5">
                <ProductBadge variant="sale" percentage={discountPercent || undefined} />
              </div>
            )}
            {product.isSale && hasDiscount && discountPercent > 0 && (
              <div className={cn(
                "absolute top-2.5 left-2.5",
                product.isNew && "top-[calc(0.625rem+1.5rem+0.375rem)]",
                product.isBestSeller && !product.isNew && "top-[calc(0.625rem+1.5rem+0.375rem)]",
              )}>
                <ProductBadge variant="sale" percentage={discountPercent} />
              </div>
            )}

            {/* Quick Add button */}
            {!soldOut && (
              <motion.button
                onClick={handleQuickAdd}
                className={cn(
                  'absolute bottom-2.5 right-2.5 flex h-10 w-10 items-center justify-center rounded-sm bg-offwhite/95 backdrop-blur-sm text-ink transition-colors',
                  'hover:bg-ink hover:text-offwhite focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2'
                )}
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 8,
                }}
                transition={{ duration: 0.2 }}
                aria-label={`Quick add ${product.name} to bag`}
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            )}
          </div>

          {/* Product Info — stable height to prevent layout shift */}
          <div className="mt-3 flex flex-col gap-1 min-h-[5.5rem]">
            {/* Color swatches */}
            {product.colors.length > 1 && (
              <div className="flex gap-1">
                {product.colors.slice(0, 5).map((color) => (
                  <span
                    key={color.name}
                    className="h-2.5 w-2.5 rounded-full border border-sand"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 5 && (
                  <span className="text-[10px] text-muted-foreground leading-5">
                    +{product.colors.length - 5}
                  </span>
                )}
              </div>
            )}

            <h3 className="text-[0.95rem] font-medium text-ink leading-tight group-hover:text-clay transition-colors line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-1">{product.subtitle}</p>

            {/* Price row */}
            <div className="flex items-baseline gap-2 mt-auto pt-0.5">
              <span className="text-sm font-medium text-ink">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Quick Add Sheet */}
      <QuickAdd
        product={product}
        open={quickAddOpen}
        onOpenChange={setQuickAddOpen}
      />
    </>
  );
}