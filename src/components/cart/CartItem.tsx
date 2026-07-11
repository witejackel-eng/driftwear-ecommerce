'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import type { CartItem as CartItemType } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity, selectedColor, selectedSize } = item;
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 py-4">
      {/* Product Image */}
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-cream">
        <Image
          src={product.colors.find((c) => c.name === selectedColor)?.image ?? product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-ink leading-tight line-clamp-1">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {selectedColor} / {selectedSize}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeItem(product.id, selectedColor, selectedSize)}
            className="flex-shrink-0 p-1 text-muted-foreground hover:text-ink transition-colors rounded-md hover:bg-cream"
            aria-label="Remove item"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-1">
          {/* Quantity Controls */}
          <div className="inline-flex items-center border border-sand rounded-md">
            <button
              onClick={() =>
                updateQuantity(product.id, selectedColor, selectedSize, quantity - 1)
              }
              className="flex h-7 w-7 items-center justify-center text-ink hover:bg-cream transition-colors rounded-l-md"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="flex h-7 w-8 items-center justify-center text-xs font-medium text-ink border-x border-sand">
              {quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(product.id, selectedColor, selectedSize, quantity + 1)
              }
              className="flex h-7 w-7 items-center justify-center text-ink hover:bg-cream transition-colors rounded-r-md"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <span className="text-sm font-medium text-ink">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}