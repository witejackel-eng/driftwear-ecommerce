'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Ruler,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { formatPrice, cn, getDiscountPercentage } from '@/lib/utils';
import type { Product } from '@/lib/types';

// ─── Recently Viewed Helper ───────────────────────────────────────────────
const RECENTLY_VIEWED_KEY = 'driftwear_recently_viewed';
const MAX_RECENT = 12;

function saveToRecentlyViewed(slug: string) {
  try {
    const stored = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
    const filtered = (stored as string[]).filter((s) => s !== slug);
    filtered.unshift(slug);
    localStorage.setItem(
      RECENTLY_VIEWED_KEY,
      JSON.stringify(filtered.slice(0, MAX_RECENT))
    );
  } catch {
    // ignore
  }
}

// ─── Mini Product Card for Recommendations ────────────────────────────────
function MiniProductCard({ product }: { product: Product }) {
  const color = product.colors[0];
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream rounded-sm mb-3">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${color.image})` }}
        />
      </div>
      <h4 className="text-sm font-medium text-ink group-hover:text-navy transition-colors">
        {product.name}
      </h4>
      <span className="text-sm text-ink">{formatPrice(product.price)}</span>
    </Link>
  );
}

// ─── Product Gallery ──────────────────────────────────────────────────────
function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = product.images.length > 0 ? product.images : [product.colors[0]?.image || ''];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-[3/4] bg-cream rounded-sm overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {(product.isNew || product.isBestSeller || product.isSale) && (
          <span
            className={cn(
              'absolute top-4 left-4 px-3 py-1.5 text-xs font-medium rounded-sm',
              product.isNew && 'bg-olive text-white',
              product.isBestSeller && !product.isNew && 'bg-navy text-white',
              product.isSale && !product.isNew && !product.isBestSeller && 'bg-terracotta text-white'
            )}
          >
            {product.isNew ? 'New' : product.isBestSeller ? 'Best Seller' : 'Sale'}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={cn(
                'relative w-16 h-20 md:w-20 md:h-24 rounded-sm overflow-hidden border-2 transition-all',
                selectedImage === i
                  ? 'border-navy'
                  : 'border-transparent hover:border-sand'
              )}
            >
              <Image
                src={img}
                alt={`${product.name} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Product Info ─────────────────────────────────────────────────────────
function ProductInfo({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const wishlistToggle = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.hasItem(product.id));

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    addItem(product, quantity, selectedColor, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setShowSizeError(false);
  };

  return (
    <div className="space-y-6">
      {/* Badges row */}
      <div className="flex items-center gap-2 flex-wrap">
        {product.isNew && (
          <span className="text-xs font-medium px-2 py-0.5 bg-olive/10 text-olive rounded-sm">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="text-xs font-medium px-2 py-0.5 bg-navy/10 text-navy rounded-sm">
            Best Seller
          </span>
        )}
        {product.isSale && product.compareAtPrice && (
          <span className="text-xs font-medium px-2 py-0.5 bg-terracotta/10 text-terracotta rounded-sm">
            {getDiscountPercentage(product.price, product.compareAtPrice)}% Off
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink">
          {product.name}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{product.subtitle}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-4 h-4',
                i < Math.floor(product.rating)
                  ? 'fill-sun-yellow text-sun-yellow'
                  : 'text-sand'
              )}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-medium text-ink">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-base text-muted-foreground line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      <Separator />

      {/* Color selector */}
      <div>
        <p className="text-sm font-medium text-ink mb-3">
          Colour:{' '}
          <span className="font-normal text-muted-foreground">{selectedColor}</span>
        </p>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={cn(
                'w-9 h-9 rounded-full border-2 transition-all',
                selectedColor === color.name
                  ? 'ring-2 ring-navy ring-offset-2 border-transparent'
                  : 'border-black/10 hover:border-black/30'
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-ink">
            Size{' '}
            <span className="font-normal text-muted-foreground">
              {selectedSize && `— ${selectedSize}`}
            </span>
          </p>
          <Link
            href="#size-guide"
            className="text-xs text-navy underline hover:no-underline flex items-center gap-1"
          >
            <Ruler className="w-3 h-3" /> Size Guide
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeSelect(size)}
              className={cn(
                'h-10 min-w-[44px] px-3 text-sm border rounded-sm transition-all',
                selectedSize === size
                  ? 'bg-navy text-white border-navy'
                  : 'border-border text-ink hover:border-ink/40'
              )}
            >
              {size}
            </button>
          ))}
        </div>
        {showSizeError && (
          <p className="text-xs text-terracotta mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Please select a size
          </p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <p className="text-sm font-medium text-ink mb-3">Quantity</p>
        <div className="flex items-center border rounded-sm w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-cream transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.inventory, q + 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-cream transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          className={cn(
            'flex-1 h-12 rounded-sm text-sm font-medium transition-all',
            addedToCart
              ? 'bg-olive text-white hover:bg-olive/90'
              : 'bg-navy text-white hover:bg-navy/90'
          )}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          {addedToCart ? 'Added to Bag ✓' : 'Add to Bag'}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-sm shrink-0"
          onClick={() => wishlistToggle(product.id)}
        >
          <Heart
            className={cn(
              'w-5 h-5 transition-colors',
              isWishlisted ? 'fill-terracotta text-terracotta' : 'text-ink'
            )}
          />
        </Button>
      </div>

      {/* Shipping & Returns */}
      <div className="bg-cream/50 rounded-sm p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Truck className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <p className="text-xs text-ink/70">
            Free shipping on orders over ₹2,999. Standard delivery 3–5 business days.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <RotateCcw className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <p className="text-xs text-ink/70">
            Free returns within 30 days. Items must be unworn with tags attached.
          </p>
        </div>
      </div>

      {/* Product details */}
      <div className="space-y-4 text-sm">
        <div>
          <h3 className="font-medium text-ink mb-1">Fit</h3>
          <p className="text-muted-foreground">{product.fit}</p>
        </div>
        <div>
          <h3 className="font-medium text-ink mb-1">Fabric</h3>
          <p className="text-muted-foreground">{product.fabric}</p>
        </div>
        <div>
          <h3 className="font-medium text-ink mb-1">Care</h3>
          <ul className="text-muted-foreground space-y-1">
            {product.care.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-ink mb-1">Features</h3>
          <ul className="text-muted-foreground space-y-1">
            {product.features.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const relatedProducts = useMemo(
    () => (product ? getRelatedProducts(product, 4) : []),
    [product]
  );

  // Save to recently viewed
  useEffect(() => {
    if (product) saveToRecentlyViewed(product.slug);
  }, [product]);

  // Set document title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Driftwear Studio`;
    } else {
      document.title = 'Product Not Found | Driftwear Studio';
    }
  }, [product]);

  if (!product) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <Container className="py-20 text-center">
          <Reveal>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl text-ink mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find the product you&apos;re looking for. It may have been removed
              or the link might be incorrect.
            </p>
            <Button asChild className="bg-navy text-white hover:bg-navy/90 rounded-sm">
              <Link href="/shop">Browse All Products</Link>
            </Button>
          </Reveal>
        </Container>
      </main>
    );
  }

  const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <main className="flex-1">
      <Container className="py-8 md:py-12">
        {/* Breadcrumb */}
        <Reveal>
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/shop/${product.category}`}>
                  {categoryLabel}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <Reveal direction="left">
            <ProductGallery product={product} />
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <ProductInfo product={product} />
          </Reveal>
        </div>

        {/* Description (below columns on mobile, right column on desktop) */}
        <Reveal>
          <div className="mt-12 max-w-3xl">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-3">
              About this piece
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </Reveal>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <Reveal>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink">
                  You might also like
                </h2>
                <Link
                  href="/shop"
                  className="text-sm text-navy hover:underline flex items-center gap-1"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((rp, i) => (
                <Reveal key={rp.id} delay={i * 0.08}>
                  <MiniProductCard product={rp} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}