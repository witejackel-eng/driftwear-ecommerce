'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

interface QuickAddProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickAdd({ product, open, onOpenChange }: QuickAddProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const currentColor = product.colors.find((c) => c.name === selectedColor) ?? product.colors[0];
  const displayImage = currentColor?.image ?? product.images[0];

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(product, quantity, selectedColor, selectedSize);
    setJustAdded(true);

    // Open cart drawer after a brief delay
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-cart-drawer'));
    }, 300);

    // Close quick add
    setTimeout(() => {
      onOpenChange(false);
    }, 600);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-offwhite p-0 overflow-y-auto scrollbar-thin">
        <div className="pt-12 pb-6 px-6">
          {/* Product Image */}
          <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto rounded-md overflow-hidden bg-cream mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentColor?.name}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Product Name & Price */}
          <div className="text-center mb-6">
            <h3 className="font-medium text-ink text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{product.subtitle}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="font-medium text-ink">{formatPrice(product.price)}</span>
              {product.isSale && product.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Color Selection */}
          {product.colors.length > 1 && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-ink">Color</span>
                <span className="text-xs text-muted-foreground">{selectedColor}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      'h-8 w-8 rounded-full border-2 transition-all',
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
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-ink">Size</span>
              {sizeError && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-terracotta"
                >
                  Please select a size
                </motion.span>
              )}
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
                    'h-10 rounded-md border text-sm font-medium transition-all',
                    selectedSize === size
                      ? 'border-navy bg-navy text-white'
                      : 'border-sand bg-offwhite text-ink hover:border-ink/30'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <span className="text-sm font-medium text-ink block mb-2">Quantity</span>
            <div className="inline-flex items-center border border-sand rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center text-ink hover:bg-cream transition-colors rounded-l-md"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex h-10 w-12 items-center justify-center text-sm font-medium text-ink border-x border-sand">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="flex h-10 w-10 items-center justify-center text-ink hover:bg-cream transition-colors rounded-r-md"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToBag}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-medium transition-all',
              justAdded
                ? 'bg-olive text-white'
                : 'bg-navy text-white hover:bg-navy/90'
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
                  <>Added ✓</>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Add to Bag
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}