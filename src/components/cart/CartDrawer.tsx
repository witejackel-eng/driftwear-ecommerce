'use client';

import React, { useEffect, useState } from 'react';
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
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

// Event-based open/close for the cart drawer
let openCartDrawer: (() => void) | null = null;
export function triggerCartOpen() {
  openCartDrawer?.();
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

  useEffect(() => {
    openCartDrawer = () => setIsOpen(true);
    const handler = () => setIsOpen(true);
    window.addEventListener('open-cart-drawer', handler);
    return () => {
      openCartDrawer = null;
      window.removeEventListener('open-cart-drawer', handler);
    };
  }, []);

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b border-sand/30 pb-4">
          <SheetTitle className="font-[family-name:var(--font-instrument-serif)] text-2xl text-ink">
            Your Bag ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
            <ShoppingBag className="h-12 w-12 text-sand" />
            <p className="text-muted-foreground text-center">
              Your bag is empty.
              <br />
              <Link
                href="/shop"
                className="text-terracotta hover:underline mt-1 inline-block"
                onClick={() => setIsOpen(false)}
              >
                Start shopping →
              </Link>
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-3"
                >
                  {/* Thumbnail */}
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-cream">
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
                      className="text-sm font-medium text-ink hover:text-terracotta transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.selectedColor} / {item.selectedSize}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-sand/50 rounded">
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
                    className="flex-shrink-0 h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-terracotta transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <SheetFooter className="border-t border-sand/30 pt-4 space-y-3">
              {discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-olive">
                    Promo ({promoCode}){' '}
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-muted-foreground hover:text-ink underline ml-1"
                    >
                      Remove
                    </button>
                  </span>
                  <span className="text-olive font-medium">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-base font-medium text-ink">{formatPrice(subtotal)}</span>
              </div>

              <p className="text-xs text-muted-foreground">Shipping calculated at checkout</p>

              <Link href="/checkout" onClick={() => setIsOpen(false)} className="block">
                <Button className="w-full bg-navy text-cream hover:bg-navy/90 h-11 rounded-md">
                  Checkout — {formatPrice(total)}
                </Button>
              </Link>

              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="block text-center text-sm text-muted-foreground hover:text-ink transition-colors"
              >
                View full bag
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}