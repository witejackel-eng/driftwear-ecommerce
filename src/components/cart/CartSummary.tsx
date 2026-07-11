'use client';

import { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

interface CartSummaryProps {
  showPromo?: boolean;
}

export function CartSummary({ showPromo = false }: CartSummaryProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{
    text: string;
    success: boolean;
  } | null>(null);

  const subtotal = useCartStore((s) => s.getSubtotal());
  const discount = useCartStore((s) => s.getDiscount());
  const promoCode = useCartStore((s) => s.promoCode);
  const promoDiscount = useCartStore((s) => s.promoDiscount);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const removePromoCode = useCartStore((s) => s.removePromoCode);

  const hasDiscount = discount > 0;
  const shippingCost = subtotal >= 2999 ? 0 : 99;
  const total = subtotal - discount + shippingCost;

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    setPromoMessage({ text: result.message, success: result.success });
    if (result.success) {
      setPromoInput('');
    }
    // Clear message after 4s
    setTimeout(() => setPromoMessage(null), 4000);
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoMessage(null);
  };

  return (
    <div className="space-y-3">
      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
      </div>

      {/* Discount */}
      {hasDiscount && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-olive">Discount ({promoDiscount}%)</span>
          <span className="font-medium text-olive">-{formatPrice(discount)}</span>
        </div>
      )}

      {/* Shipping */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Shipping</span>
        <span className={cn('font-medium', shippingCost === 0 ? 'text-olive' : 'text-ink')}>
          {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
        </span>
      </div>

      {/* Promo Code */}
      {showPromo && (
        <div className="pt-2">
          {promoCode ? (
            <div className="flex items-center justify-between rounded-md border border-olive/30 bg-olive/5 px-3 py-2">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-olive" />
                <span className="text-sm font-medium text-olive">{promoCode}</span>
              </div>
              <button
                onClick={handleRemovePromo}
                className="text-muted-foreground hover:text-ink transition-colors"
                aria-label="Remove promo code"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                  placeholder="Promo code"
                  className="h-9 w-full rounded-md border border-sand bg-offwhite pl-8 pr-3 text-sm text-ink placeholder:text-muted-foreground focus:border-navy focus:ring-1 focus:ring-navy/20 focus:outline-none"
                />
              </div>
              <button
                onClick={handleApplyPromo}
                disabled={!promoInput.trim()}
                className="h-9 rounded-md bg-ink px-3 text-xs font-medium text-white transition-colors hover:bg-ink/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          )}
          {promoMessage && (
            <p
              className={cn(
                'mt-1.5 text-xs',
                promoMessage.success ? 'text-olive' : 'text-terracotta'
              )}
            >
              {promoMessage.text}
            </p>
          )}
        </div>
      )}

      <div className="my-3 h-px bg-sand" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink">Total</span>
        <span className="text-lg font-medium text-ink">{formatPrice(total)}</span>
      </div>

      {/* Shipping Note */}
      {shippingCost > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Free shipping on orders over ₹2,999
        </p>
      )}
    </div>
  );
}