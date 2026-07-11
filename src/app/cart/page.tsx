'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  X,
  Tag,
  ArrowRight,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { EmptyState } from '@/components/shared/EmptyState';
import { Reveal } from '@/components/shared/Reveal';
import { useCartStore } from '@/store/cart-store';
import { storeConfig } from '@/lib/store-config';
import { formatPrice, cn } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 2999;

// ─── Free Shipping Bar ────────────────────────────────────────────────────
function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const qualified = remaining <= 0;

  return (
    <div className="bg-cream/70 rounded-sm p-4">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="flex items-center gap-2 text-ink">
          <Truck className="w-4 h-4 text-faded-olive" />
          {qualified ? (
            <>You qualify for <strong className="text-faded-olive">free shipping!</strong></>
          ) : (
            <>
              Add <strong className="text-clay">{formatPrice(remaining)}</strong> more for
              free shipping
            </>
          )}
        </span>
      </div>
      <div className="h-1.5 bg-sand/60 rounded-full overflow-hidden">
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

// ─── Cart Item ────────────────────────────────────────────────────────────
function CartItemCard() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (items.length === 0) return null;

  return (
    <div className="space-y-0 divide-y divide-border">
      {items.map((item) => {
        const { product, quantity, selectedColor, selectedSize } = item;
        const colorObj = product.colors.find(
          (c) => c.name.toLowerCase() === selectedColor.toLowerCase()
        );
        const imageUrl = colorObj?.image || product.colors[0]?.image || '';

        return (
          <div key={`${product.id}-${selectedColor}-${selectedSize}`} className="py-6 first:pt-0">
            <div className="flex gap-4">
              {/* Image */}
              <Link
                href={`/product/${product.slug}`}
                className="relative w-24 h-32 md:w-28 md:h-36 bg-cream overflow-hidden shrink-0"
              >
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-sm font-medium text-ink hover:text-clay transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                      <span>{selectedColor}</span>
                      <span>·</span>
                      <span>{selectedSize}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(product.id, selectedColor, selectedSize)}
                    className="text-muted-foreground hover:text-clay transition-colors shrink-0 p-1"
                    aria-label={`Remove ${product.name} from bag`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-end justify-between mt-4">
                  {/* Quantity */}
                  <div className="flex items-center border rounded-sm">
                    <button
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          selectedColor,
                          selectedSize,
                          quantity - 1
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-cream transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          selectedColor,
                          selectedSize,
                          quantity + 1
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-cream transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-sm font-medium text-ink">
                      {formatPrice(product.price * quantity)}
                    </p>
                    {quantity > 1 && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatPrice(product.price)} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Cart Summary ─────────────────────────────────────────────────────────
function CartSummaryCard() {
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscount = useCartStore((s) => s.getDiscount);
  const getTotal = useCartStore((s) => s.getTotal);
  const promoCode = useCartStore((s) => s.promoCode);
  const promoDiscount = useCartStore((s) => s.promoDiscount);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const removePromoCode = useCartStore((s) => s.removePromoCode);

  const [codeInput, setCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : storeConfig.shippingCost;

  const handleApplyPromo = () => {
    const result = applyPromoCode(codeInput);
    setPromoMessage(result.message);
    if (result.success) setCodeInput('');
  };

  return (
    <div className="bg-cream/50 rounded-sm p-6 space-y-4">
      <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink">
        Order Summary
      </h2>

      {/* Promo code */}
      {promoCode ? (
        <div className="flex items-center justify-between bg-faded-olive/10 rounded-sm px-3 py-2">
          <span className="text-sm text-faded-olive font-medium">
            <Tag className="w-3 h-3 inline mr-1.5" />
            {promoCode} — {promoDiscount}% off
          </span>
          <button
            onClick={() => {
              removePromoCode();
              setPromoMessage('');
            }}
            className="text-faded-olive hover:text-faded-olive/80"
            aria-label="Remove promo code"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Promo code"
            value={codeInput}
            onChange={(e) => {
              setCodeInput(e.target.value);
              setPromoMessage('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
            className="h-9 rounded-sm bg-offwhite border-sand text-sm"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleApplyPromo}
            disabled={!codeInput.trim()}
            className="h-9 rounded-sm shrink-0 border-sand text-ink hover:bg-cream"
          >
            Apply
          </Button>
        </div>
      )}
      {promoMessage && (
        <p
          className={cn(
            'text-xs',
            promoMessage.includes('applied') ? 'text-faded-olive' : 'text-clay'
          )}
          role="alert"
        >
          {promoMessage}
        </p>
      )}

      <Separator />

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-ink">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-faded-olive">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className={shipping === 0 ? 'text-faded-olive' : 'text-ink'}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between text-base font-medium">
          <span className="text-ink">Total</span>
          <span className="text-ink">{formatPrice(total + shipping)}</span>
        </div>
      </div>

      {/* Checkout button */}
      <Button
        asChild
        className="w-full h-12 bg-ink text-offwhite hover:bg-ink/90 rounded-sm text-sm font-medium mt-2"
      >
        <Link href="/checkout">
          Checkout <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>

      <Link
        href="/shop"
        className="block text-center text-sm text-muted-foreground hover:text-ink transition-colors mt-2"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const subtotal = getSubtotal();

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
                <BreadcrumbPage>Your Bag</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        <Reveal>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-ink mb-8">
            Your Bag
          </h1>
        </Reveal>

        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your bag is empty"
            description="Looks like you haven't added anything yet. Time to change that."
            actionLabel="Start Shopping"
            onAction={() => {
              window.location.href = '/shop';
            }}
          />
        ) : (
          <>
            {/* Free shipping bar */}
            <Reveal>
              <FreeShippingBar subtotal={subtotal} />
            </Reveal>

            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Items list */}
              <div className="lg:col-span-2">
                <Reveal>
                  <CartItemCard />
                </Reveal>
              </div>

              {/* Order summary (sticky) */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <Reveal>
                    <CartSummaryCard />
                  </Reveal>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}