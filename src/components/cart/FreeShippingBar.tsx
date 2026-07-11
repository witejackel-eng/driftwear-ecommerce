'use client';

import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { Truck } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 2999;

interface FreeShippingBarProps {
  subtotal: number;
}

export function FreeShippingBar({ subtotal }: FreeShippingBarProps) {
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Truck className="h-3.5 w-3.5" />
          {hasFreeShipping
            ? "You've earned free shipping! 🎉"
            : `You're ${formatPrice(remaining)} away from free shipping!`}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            hasFreeShipping ? 'bg-olive' : 'bg-terracotta'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}