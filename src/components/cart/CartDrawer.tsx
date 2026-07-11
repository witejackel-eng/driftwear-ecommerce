'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { formatPrice, cn } from '@/lib/utils';
import { storeConfig } from '@/lib/store-config';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck, X } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 2999;

// Event-based open/close for the cart drawer
let openCartDrawer: (() => void) | null = null;
export function triggerCartOpen() {
  openCartDrawer?.();
}

function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const qualified = remaining <= 0;

  return (
    <div className="px-5 py-3 bg-cream/60">
      <div className="flex items-center gap-2 text-xs mb-1.5">
        <Truck className="w-3.5 h-3.5 text-faded-olive shrink-0" />
        {qualified ? (
          <span className="text-faded-olive font-medium">
            You qualify for free shipping!
          </span>
        ) : (
          <span className="text-muted-foreground">
            Add <strong className="text-ink">{formatPrice(remaining)}</strong> more for free shipping
          </span>
        )}
      </div>
      <div className="h-1 bg-sand/60 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            qualified ? 'bg-faded-olive' : 'bg-clay'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDiscount,
    getTotal,
    promoDiscount,
    promoCode,
    removePromoCode,
    getItemCount,
  } = useCartStore();

  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Open handler
  useEffect(() => {
    openCartDrawer = () => {
      setIsOpen(true);
      // Store the element that opened the drawer for focus restoration
      closeRef.current = document.activeElement as HTMLButtonElement;
    };
    const handler = () => setIsOpen(true);
    window.addEventListener('open-cart-drawer', handler);
    return () => {
      openCartDrawer = null;
      window.removeEventListener('open-cart-drawer', handler);
    };
  }, []);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Focus trap — delegate to Sheet component which handles this

  // Escape to close
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
      closeRef.current?.focus();
    }
  }, [isOpen]);

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        closeRef.current?.focus();
      }
    }}>
      <SheetContent
        ref={sheetRef}
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0 bg-offwhite"
        onKeyDown={handleKeyDown}
      >
        <SheetHeader className="border-b border-sand/30 px-5 py-4 shrink-0">
          <SheetTitle className="font-[family-name:var(--font-instrument-serif)] text-2xl text-ink">
            Your Bag ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5">
            <div className="h-16 w-16 rounded-full bg-cream flex items-center justify-center">
              <ShoppingBag className="h-7 w-7 text-ink/30" />
            </div>
            <div className="text-center">
              <p className="text-ink font-medium mb-1">Your bag is empty</p>
              <p className="text-sm text-muted-foreground">
                Looks like you haven&apos;t added anything yet.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-sm border-sand text-ink hover:bg-cream"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/shop">
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Free shipping bar */}
            <FreeShippingBar subtotal={subtotal} />

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-3"
                >
                  {/* Thumbnail */}
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-cream">
                    <Image
                      src={
                        item.product.colors.find((c) => c.name === item.selectedColor)
                          ?.image || item.product.colors[0]?.image
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-ink hover:text-clay transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.selectedColor} / {item.selectedSize}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-sand/50 rounded-sm">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="h-7 w-7 flex items-center justify-center hover:bg-cream transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="h-7 w-8 flex items-center justify-center text-xs border-x border-sand/50">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="h-7 w-7 flex items-center justify-center hover:bg-cream transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-medium text-ink">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeItem(item.product.id, item.selectedColor, item.selectedSize)
                    }
                    className="flex-shrink-0 h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-clay transition-colors self-start"
                    aria-label={`Remove ${item.product.name} from bag`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <SheetFooter className="border-t border-sand/30 px-5 pt-4 pb-6 space-y-3 shrink-0">
              {discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-faded-olive">
                    Promo ({promoCode}){' '}
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-muted-foreground hover:text-ink underline ml-1"
                      aria-label="Remove promo code"
                    >
                      <X className="w-3 h-3 inline" />
                    </button>
                  </span>
                  <span className="text-faded-olive font-medium">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-base font-medium text-ink">{formatPrice(subtotal)}</span>
              </div>

              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="text-xs text-muted-foreground">
                  Shipping calculated at checkout
                </p>
              )}
              {subtotal >= FREE_SHIPPING_THRESHOLD && (
                <p className="text-xs text-faded-olive font-medium">
                  You qualify for free shipping
                </p>
              )}

              <Link href="/checkout" onClick={() => setIsOpen(false)} className="block">
                <Button className="w-full bg-ink text-offwhite hover:bg-ink/90 h-11 rounded-sm">
                  Checkout — {formatPrice(total + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : storeConfig.shippingCost))}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm text-muted-foreground hover:text-ink transition-colors"
              >
                View full bag
              </Link>

              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="block text-center text-xs text-muted-foreground hover:text-ink transition-colors"
              >
                Continue Shopping
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}