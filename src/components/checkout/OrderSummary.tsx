import Image from 'next/image';
import type { CartItem } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

export function OrderSummary({
  items,
  subtotal,
  discount,
  total,
}: OrderSummaryProps) {
  const shipping = subtotal >= 2999 ? 0 : 99;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-ink uppercase tracking-wider">
        Order Summary
      </h3>

      {/* Items */}
      <div className="max-h-64 overflow-y-auto space-y-3 scrollbar-thin">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
            <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-md bg-cream">
              <Image
                src={
                  item.product.colors.find((c) => c.name === item.selectedColor)?.image ??
                  item.product.images[0]
                }
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="56px"
              />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-sand text-[10px] font-medium text-ink">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between min-w-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink leading-tight line-clamp-1">
                  {item.product.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.selectedColor} / {item.selectedSize}
                </p>
              </div>
              <p className="text-sm font-medium text-ink">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 border-t border-sand pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-ink">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-olive">Discount</span>
            <span className="text-olive">-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className={shipping === 0 ? 'text-olive' : 'text-ink'}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-sand">
          <span className="text-sm font-medium text-ink">Total</span>
          <span className="text-base font-medium text-ink">
            {formatPrice(total + shipping - discount)}
          </span>
        </div>
      </div>
    </div>
  );
}