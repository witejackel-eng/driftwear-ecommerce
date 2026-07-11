'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  AlertTriangle,
  Ruler,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/types';
import { cn, formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { SizeGuideModal } from '@/components/shared/SizeGuideModal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { hasItem, toggleItem } = useWishlistStore();

  const isWishlisted = hasItem(product.id);
  const currentColor = product.colors.find((c) => c.name === selectedColor) ?? product.colors[0];

  // Inventory status
  const inventoryStatus = useMemo(() => {
    if (product.inventory <= 5) {
      return { label: `Only ${product.inventory} left`, variant: 'low' as const, icon: AlertTriangle };
    }
    if (product.inventory <= 15) {
      return { label: 'Selling fast', variant: 'medium' as const, icon: AlertTriangle };
    }
    return { label: 'In stock', variant: 'ok' as const, icon: Truck };
  }, [product.inventory]);

  // Star display
  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(product, quantity, selectedColor, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(product, quantity, selectedColor, selectedSize);
    router.push('/checkout');
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Product Name */}
        <div>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-ink">
            {product.name}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{product.subtitle}</p>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center" aria-label={`${product.rating} out of 5 stars`}>
            {Array.from({ length: fullStars }).map((_, i) => (
              <Star key={`full-${i}`} className="h-4 w-4 fill-sun-yellow text-sun-yellow" />
            ))}
            {hasHalf && (
              <div className="relative h-4 w-4">
                <Star className="absolute inset-0 h-4 w-4 text-sand" />
                <div className="absolute inset-0 overflow-hidden w-[50%]">
                  <Star className="h-4 w-4 fill-sun-yellow text-sun-yellow" />
                </div>
              </div>
            )}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <Star key={`empty-${i}`} className="h-4 w-4 text-sand" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} / 5
          </span>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          {product.isSale && product.compareAtPrice ? (
            <>
              <span className="text-2xl font-medium text-terracotta">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="rounded-sm bg-terracotta/10 px-2 py-0.5 text-xs font-medium text-terracotta">
                {getDiscountPercentage(product.price, product.compareAtPrice)}% off
              </span>
            </>
          ) : (
            <span className="text-2xl font-medium text-ink">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Inventory Status */}
        <div className="flex items-center gap-1.5">
          <inventoryStatus.icon
            className={cn(
              'h-4 w-4',
              inventoryStatus.variant === 'low' && 'text-terracotta',
              inventoryStatus.variant === 'medium' && 'text-sun-yellow',
              inventoryStatus.variant === 'ok' && 'text-olive'
            )}
          />
          <span
            className={cn(
              'text-sm',
              inventoryStatus.variant === 'low' && 'text-terracotta font-medium',
              inventoryStatus.variant === 'medium' && 'text-sun-yellow',
              inventoryStatus.variant === 'ok' && 'text-olive'
            )}
          >
            {inventoryStatus.label}
          </span>
        </div>

        {/* Color Selection */}
        {product.colors.length > 1 && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-medium text-ink">Color</span>
              <span className="text-sm text-muted-foreground">{selectedColor}</span>
            </div>
            <div className="flex gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    'h-9 w-9 rounded-full border-2 transition-all',
                    selectedColor === color.name
                      ? 'border-navy ring-2 ring-navy/20 scale-110'
                      : 'border-sand hover:border-ink/30'
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-sm font-medium text-ink">Size</span>
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-ink transition-colors"
            >
              <Ruler className="h-3.5 w-3.5" />
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                className={cn(
                  'h-11 rounded-md border text-sm font-medium transition-all',
                  selectedSize === size
                    ? 'border-navy bg-navy text-white'
                    : cn(
                        'border-sand bg-offwhite text-ink hover:border-ink/30',
                        sizeError && 'border-terracotta/50 animate-pulse'
                      )
                )}
              >
                {size}
              </button>
            ))}
          </div>
          {sizeError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-terracotta"
            >
              Please select a size to continue
            </motion.p>
          )}
        </div>

        {/* Quantity Selector */}
        <div>
          <span className="text-sm font-medium text-ink block mb-2.5">Quantity</span>
          <div className="inline-flex items-center border border-sand rounded-md">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-ink hover:bg-cream transition-colors rounded-l-md"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="flex h-11 w-14 items-center justify-center text-sm font-medium text-ink border-x border-sand">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="flex h-11 w-11 items-center justify-center text-ink hover:bg-cream transition-colors rounded-r-md"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={handleAddToBag}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-md py-3.5 text-sm font-medium transition-all',
              justAdded
                ? 'bg-olive text-white'
                : 'bg-navy text-white hover:bg-navy/90 active:scale-[0.98]'
            )}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={justAdded ? 'added' : 'add'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                {justAdded ? (
                  <>Added to Bag ✓</>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Add to Bag
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            onClick={handleBuyNow}
            className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-navy bg-transparent py-3.5 text-sm font-medium text-navy transition-all hover:bg-navy/5 active:scale-[0.98]"
          >
            Buy Now
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleItem(product.id)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-ink transition-colors self-start"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              isWishlisted ? 'fill-terracotta text-terracotta' : ''
            )}
          />
          {isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </button>

        {/* Accordion Details */}
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="fit" className="border-sand">
              <AccordionTrigger className="text-sm font-medium text-ink hover:no-underline">
                Fit Details
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <p className="mb-2">{product.fit}</p>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fabric" className="border-sand">
              <AccordionTrigger className="text-sm font-medium text-ink hover:no-underline">
                Fabric Details
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <p>{product.fabric}</p>
                <p className="mt-2">{product.description}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="care" className="border-sand">
              <AccordionTrigger className="text-sm font-medium text-ink hover:no-underline">
                Care Instructions
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <ul className="space-y-1.5">
                  {product.care.map((instruction) => (
                    <li key={instruction} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                      {instruction}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className="border-sand">
              <AccordionTrigger className="text-sm font-medium text-ink hover:no-underline">
                Shipping & Returns
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Truck className="h-4 w-4 mt-0.5 flex-shrink-0 text-olive" />
                    <span>Free shipping on orders over ₹2,999. Standard delivery in 5-7 business days.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-sun-yellow text-center text-[10px] font-bold leading-4">
                      !
                    </span>
                    <span>Easy returns within 7 days of delivery. Items must be unworn with tags intact.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-sun-yellow text-center text-[10px] font-bold leading-4">
                      !
                    </span>
                    <span>Express delivery available (2-3 business days) for an additional ₹199.</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal open={sizeGuideOpen} onOpenChange={setSizeGuideOpen} />
    </>
  );
}