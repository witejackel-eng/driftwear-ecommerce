'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Ruler,
  ChevronRight,
  AlertTriangle,
  ChevronLeft,
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
import { ProductBadge } from '@/components/shared/Badge';
import { ProductCard } from '@/components/product/ProductCard';
import { SizeGuideModal } from '@/components/shared/SizeGuideModal';
import { useCartStore } from '@/store/cart-store';
import { triggerCartOpen } from '@/components/cart/CartDrawer';
import { storeConfig } from '@/lib/store-config';
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
    // ignore storage errors
  }
}

// ─── Product Gallery ──────────────────────────────────────────────────────
function ProductGallery({ product }: { product: Product }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = product.images.length > 0 ? product.images : [product.colors[0]?.image || ''];

  const goToPrev = useCallback(() => {
    setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  // Touch swipe
  const touchStartRef = useCallback((e: React.TouchEvent) => {
    const startX = e.touches[0].clientX;
    const handleTouchEnd = (ev: TouchEvent) => {
      const diff = ev.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToPrev();
        else goToNext();
      }
      window.removeEventListener('touchend', handleTouchEnd);
    };
    window.addEventListener('touchend', handleTouchEnd);
  }, [goToPrev, goToNext]);

  const hasDiscount = product.isSale && product.compareAtPrice;
  const discountPercent = hasDiscount
    ? getDiscountPercentage(product.price, product.compareAtPrice!)
    : 0;

  return (
    <div className="flex flex-col-reverse md:flex-col gap-3">
      {/* Thumbnails — below on mobile, above on desktop is also fine, but standard is below */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto md:order-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                'relative w-14 h-[70px] md:w-20 md:h-24 flex-shrink-0 overflow-hidden border-2 transition-all',
                selectedIndex === i
                  ? 'border-ink'
                  : 'border-transparent hover:border-sand'
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${product.name} — view ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative aspect-[3/4] bg-cream overflow-hidden md:order-2">
        <Image
          src={images[selectedIndex]}
          alt={`${product.name} — ${selectedIndex === 0 ? 'main product image' : `view ${selectedIndex + 1}`}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={selectedIndex === 0}
        />

        {/* Mobile nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-offwhite/80 backdrop-blur-sm rounded-sm md:hidden"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-ink" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-offwhite/80 backdrop-blur-sm rounded-sm md:hidden"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-ink" />
            </button>
          </>
        )}

        {/* Badges */}
        {(product.isNew || product.isBestSeller || product.isSale) && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <ProductBadge variant="new" />}
            {product.isBestSeller && !product.isNew && <ProductBadge variant="best-seller" />}
            {hasDiscount && (
              <ProductBadge variant="sale" percentage={discountPercent || undefined} />
            )}
          </div>
        )}

        {/* Image counter on mobile */}
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-ink/60 text-offwhite text-[10px] font-medium px-2 py-0.5 rounded-sm md:hidden">
            {selectedIndex + 1} / {images.length}
          </span>
        )}

        {/* Touch handler div */}
        <div className="absolute inset-0 md:hidden" onTouchStart={touchStartRef} />
      </div>
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
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    addItem(product, quantity, selectedColor, selectedSize);
    setAddedToCart(true);
    setTimeout(() => {
      triggerCartOpen();
    }, 200);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setShowSizeError(false);
  };

  const hasDiscount = product.isSale && product.compareAtPrice;
  const discountPercent = hasDiscount
    ? getDiscountPercentage(product.price, product.compareAtPrice!)
    : 0;

  return (
    <>
      <div className="space-y-5">
        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap">
          {product.isNew && (
            <span className="text-xs font-medium px-2 py-0.5 bg-faded-olive/10 text-faded-olive rounded-sm">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="text-xs font-medium px-2 py-0.5 bg-ink/10 text-ink rounded-sm">
              Best Seller
            </span>
          )}
          {hasDiscount && (
            <span className="text-xs font-medium px-2 py-0.5 bg-clay/10 text-clay rounded-sm">
              {discountPercent}% Off
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink leading-tight">
            {product.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{product.subtitle}</p>
        </div>

        {/* Reviews placeholder — honest, no fake data */}
        <p className="text-xs text-muted-foreground italic">
          Reviews coming soon
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-medium text-ink">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-base text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
          {hasDiscount && (
            <span className="text-sm font-medium text-clay">
              {discountPercent}% off
            </span>
          )}
        </div>

        <Separator />

        {/* Colour selector */}
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
                  'w-9 h-9 rounded-full border-2 transition-all min-h-[36px] min-w-[36px]',
                  selectedColor === color.name
                    ? 'ring-2 ring-ink ring-offset-2 border-transparent'
                    : 'border-black/10 hover:border-black/30'
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              />
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-ink">
              Size{' '}
              {selectedSize && (
                <span className="font-normal text-muted-foreground">— {selectedSize}</span>
              )}
            </p>
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="text-xs text-ink underline hover:no-underline flex items-center gap-1"
            >
              <Ruler className="w-3 h-3" /> Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelect(size)}
                className={cn(
                  'h-10 min-h-[44px] min-w-[44px] px-3 text-sm border rounded-sm transition-all',
                  selectedSize === size
                    ? 'bg-ink text-offwhite border-ink'
                    : 'border-border text-ink hover:border-ink/40'
                )}
              >
                {size}
              </button>
            ))}
          </div>
          {showSizeError && (
            <p className="text-xs text-clay mt-2 flex items-center gap-1" role="alert">
              <AlertTriangle className="w-3 h-3" /> Please select a size
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <p className="text-sm font-medium text-ink mb-3">Quantity</p>
          <div className="inline-flex items-center border rounded-sm">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-cream transition-colors rounded-l-sm"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.inventory || 10, q + 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-cream transition-colors rounded-r-sm"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add to Bag */}
        <Button
          onClick={handleAddToCart}
          disabled={addedToCart}
          className={cn(
            'w-full h-12 rounded-sm text-sm font-medium transition-all min-h-[48px]',
            addedToCart
              ? 'bg-faded-olive text-white hover:bg-faded-olive/90'
              : 'bg-ink text-offwhite hover:bg-ink/90'
          )}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          {addedToCart ? 'Added to Bag' : 'Add to Bag'}
        </Button>

        {/* Shipping & Returns — only show what's in storeConfig */}
        {(storeConfig.freeShippingThreshold > 0 || storeConfig.returnWindow > 0) && (
          <div className="bg-cream/50 rounded-sm p-4 space-y-3">
            {storeConfig.freeShippingThreshold > 0 && (
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-ink mt-0.5 shrink-0" />
                <p className="text-xs text-ink/70">
                  Free shipping on orders over {formatPrice(2999)}. Standard delivery {storeConfig.estimatedDeliveryDays} business days.
                </p>
              </div>
            )}
            {storeConfig.returnWindow > 0 && (
              <div className="flex items-start gap-3">
                <RotateCcw className="w-4 h-4 text-ink mt-0.5 shrink-0" />
                <p className="text-xs text-ink/70">
                  Free returns within {storeConfig.returnWindow} days. Items must be unworn with tags attached.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <SizeGuideModal open={sizeGuideOpen} onOpenChange={setSizeGuideOpen} />
    </>
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
            <Button asChild className="bg-ink text-offwhite hover:bg-ink/90 rounded-sm">
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
          <div className="md:sticky md:top-28 md:self-start">
            <Reveal direction="right" delay={0.1}>
              <ProductInfo product={product} />
            </Reveal>
          </div>
        </div>

        {/* About this piece */}
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

        {/* Product details */}
        <Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <h3 className="font-medium text-ink mb-1.5">Fit</h3>
              <p className="text-muted-foreground">{product.fit}</p>
            </div>
            <div>
              <h3 className="font-medium text-ink mb-1.5">Fabric</h3>
              <p className="text-muted-foreground">{product.fabric}</p>
            </div>
            <div>
              <h3 className="font-medium text-ink mb-1.5">Care</h3>
              <ul className="text-muted-foreground space-y-1">
                {product.care.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-ink mb-1.5">Features</h3>
              <ul className="text-muted-foreground space-y-1">
                {product.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>
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
                  className="text-sm text-ink hover:text-clay hover:underline flex items-center gap-1 transition-colors"
                >
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {relatedProducts.map((rp, i) => (
                <Reveal key={rp.id} delay={i * 0.06}>
                  <ProductCard product={rp} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}