'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { storeConfig } from '@/lib/store-config';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  name: string;
  slug: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

interface OrderData {
  orderNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  isDemo?: boolean;
  createdAt: string;
}

function readOrderFromStorage(): OrderData | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('driftwear_last_order');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function readCustomerNameFromStorage(): string {
  if (typeof window === 'undefined') return 'Friend';
  return localStorage.getItem('driftwear_customer_name') || 'Friend';
}

export default function OrderSuccessPage() {
  const [order] = useState<OrderData | null>(() => readOrderFromStorage());
  const [customerName] = useState<string>(() => readCustomerNameFromStorage());
  const isDemo = order?.isDemo ?? storeConfig.isDemo;

  useEffect(() => {
    document.title = 'Order Confirmed | Driftwear Studio';
  }, []);

  if (!order) {
    return (
      <main className="flex-1">
        <Container className="py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-2xl text-ink mb-3">
              No order found
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              It looks like you haven&apos;t placed an order yet, or the order data has expired.
            </p>
            <Button
              asChild
              className="bg-ink text-offwhite hover:bg-ink/90 rounded-sm"
            >
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <Container className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <Reveal>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-faded-olive/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-faded-olive" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-ink mb-3">
                Thank you for your order!
              </h1>
              <p className="text-muted-foreground">
                Hey {customerName}, your order has been placed successfully.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8 bg-cream/50 rounded-sm p-6 text-left">
              {/* Order number */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Order Number
                  </p>
                  <p className="text-lg font-medium text-ink mt-1">
                    {order.orderNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Date
                  </p>
                  <p className="text-sm text-ink mt-1">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Items */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                  Items
                </h3>
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-cream overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-ink text-offwhite text-[10px] font-medium rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-ink shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-ink">{formatPrice(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-faded-olive">
                    <span>Discount</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={order.shipping === 0 ? 'text-faded-olive' : 'text-ink'}>
                    {order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-medium">
                  <span className="text-ink">Total</span>
                  <span className="text-ink">{formatPrice(order.total)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Payment</span>
                  <span className="capitalize">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Demo disclaimer */}
          {isDemo && (
            <Reveal delay={0.3}>
              <div className="mt-8 bg-sun-yellow/10 border border-sun-yellow/30 rounded-sm p-4">
                <p className="text-xs text-ink/70 flex items-start gap-2">
                  <Package className="w-4 h-4 text-sun-yellow mt-0.5 shrink-0" />
                  <span>
                    This was a <strong>demo order</strong> — no real payment was processed and no items
                    will be shipped. This page shows what a real order confirmation would look like.
                  </span>
                </p>
              </div>
            </Reveal>
          )}

          {/* Production email note */}
          {!isDemo && (
            <Reveal delay={0.3}>
              <div className="mt-8 bg-cream/50 rounded-sm p-4">
                <p className="text-xs text-ink/70">
                  A confirmation email has been sent to <strong>{order.customer.email}</strong>.
                  You can track your order status from your account.
                </p>
              </div>
            </Reveal>
          )}

          {/* CTAs */}
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Button
                asChild
                className="bg-ink text-offwhite hover:bg-ink/90 rounded-sm"
              >
                <Link href="/shop">
                  Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </main>
  );
}