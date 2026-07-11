'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { ProductBadge } from '@/components/shared/Badge';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Product } from '@/lib/types';
import { Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const primaryColor = product.colors[0];
  const hoverColor = product.colors.find((c) => c.hoverImage) || primaryColor;
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.productIds.includes(product.id));

  return (
    <motion.div
      className={cn('group relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-cream">
          <Image
            src={isHovered && hoverColor.hoverImage && !imgError ? hoverColor.hoverImage : primaryColor.image}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-transform duration-500',
              isHovered ? 'scale-105' : 'scale-100'
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <ProductBadge variant="new" />}
            {product.isBestSeller && <ProductBadge variant="best-seller" />}
            {product.isSale && product.compareAtPrice && (
              <span className="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium tracking-wide uppercase bg-terracotta text-white">
                -{getDiscountPercentage(product.price, product.compareAtPrice)}%
              </span>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <div
            className={cn(
              'absolute bottom-3 right-3 flex flex-col gap-2 transition-all duration-300',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            )}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full bg-offwhite/90 backdrop-blur-sm transition-colors",
                isWishlisted ? "text-terracotta" : "text-ink hover:text-terracotta"
              )}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-offwhite/90 backdrop-blur-sm text-ink hover:bg-navy hover:text-cream transition-colors"
              aria-label="Quick add to cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-1.5">
            {product.colors.length > 1 && (
              <div className="flex gap-1">
                {product.colors.slice(0, 4).map((color) => (
                  <span
                    key={color.name}
                    className="h-2.5 w-2.5 rounded-full border border-sand/50"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[10px] text-muted-foreground">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
          <h3 className="text-sm font-medium text-ink leading-tight group-hover:text-terracotta transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground">{product.subtitle}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-ink">
              {formatPrice(product.price)}
            </span>
            {product.isSale && product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}