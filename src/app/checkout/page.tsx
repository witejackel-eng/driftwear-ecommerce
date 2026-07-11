'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  Truck,
  ArrowLeft,
  ArrowRight,
  Lock,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { formatPrice } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/lib/types';

const FREE_SHIPPING_THRESHOLD = 2999;

// ─── Order Summary Sidebar ────────────────────────────────────────────────
function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscount = useCartStore((s) => s.getDiscount);
  const getTotal = useCartStore((s) => s.getTotal);
  const promoCode = useCartStore((s) => s.promoCode);
  const promoDiscount = useCartStore((s) => s.promoDiscount);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;

  return (
    <div className="bg-cream/50 rounded-sm p-6 space-y-4">
      <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink">
        Order Summary
      </h2>

      {/* Item list */}
      <div className="max-h-64 overflow-y-auto scrollbar-thin space-y-3">
        {items.map((item) => {
          const colorObj = item.product.colors.find(
            (c) => c.name.toLowerCase() === item.selectedColor.toLowerCase()
          );
          return (
            <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
              <div className="relative w-14 h-18 bg-cream rounded-sm overflow-hidden shrink-0">
                <Image
                  src={colorObj?.image || item.product.colors[0]?.image || ''}
                  alt={item.product.name}
                  width={56}
                  height={72}
                  className="object-cover w-full h-full"
                />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-navy text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-ink truncate">
                  {item.product.name}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {item.selectedColor} / {item.selectedSize}
                </p>
              </div>
              <p className="text-xs font-medium text-ink shrink-0">
                {formatPrice(item.product.price * item.quantity)}
              </p>
            </div>
          );
        })}
      </div>

      <Separator />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-ink">{formatPrice(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-olive">
            <span>Promo ({promoCode})</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className={shipping === 0 ? 'text-olive' : 'text-ink'}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between text-base font-medium">
          <span className="text-ink">Total</span>
          <span className="text-ink">{formatPrice(total + shipping)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <Lock className="w-3 h-3" />
        Secure checkout — this is a demo, no real payment is processed
      </div>
    </div>
  );
}

// ─── Checkout Form ────────────────────────────────────────────────────────
function CheckoutForm({ onSubmit }: { onSubmit: (data: CheckoutFormData) => void }) {
  const [form, setForm] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    paymentMethod: 'cod',
  });

  const update = (field: keyof CheckoutFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass = 'h-10 rounded-sm bg-cream/30 border-sand text-sm';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact */}
      <div>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
          Contact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label htmlFor="email" className="text-xs text-muted-foreground mb-1.5 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="phone" className="text-xs text-muted-foreground mb-1.5 block">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Shipping */}
      <div>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
          Shipping Address
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-xs text-muted-foreground mb-1.5 block">
              First Name
            </Label>
            <Input
              id="firstName"
              required
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-xs text-muted-foreground mb-1.5 block">
              Last Name
            </Label>
            <Input
              id="lastName"
              required
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="address" className="text-xs text-muted-foreground mb-1.5 block">
              Address
            </Label>
            <Input
              id="address"
              required
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              placeholder="Street address, apartment, etc."
              className={inputClass}
            />
          </div>
          <div>
            <Label htmlFor="city" className="text-xs text-muted-foreground mb-1.5 block">
              City
            </Label>
            <Input
              id="city"
              required
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label htmlFor="state" className="text-xs text-muted-foreground mb-1.5 block">
              State
            </Label>
            <Input
              id="state"
              required
              value={form.state}
              onChange={(e) => update('state', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label htmlFor="pincode" className="text-xs text-muted-foreground mb-1.5 block">
              PIN Code
            </Label>
            <Input
              id="pincode"
              required
              value={form.pincode}
              onChange={(e) => update('pincode', e.target.value)}
              placeholder="400001"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment */}
      <div>
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-4">
          Payment
        </h2>
        <Select
          value={form.paymentMethod}
          onValueChange={(v) => update('paymentMethod', v)}
        >
          <SelectTrigger className="w-full rounded-sm">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cod">Cash on Delivery</SelectItem>
            <SelectItem value="upi">UPI</SelectItem>
            <SelectItem value="card">Credit / Debit Card</SelectItem>
            <SelectItem value="netbanking">Net Banking</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-[10px] text-muted-foreground mt-2">
          This is a demo — no real payment will be processed.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-navy text-white hover:bg-navy/90 rounded-sm text-sm font-medium"
      >
        <Lock className="w-4 h-4 mr-2" />
        Place Order
      </Button>
    </form>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────
interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  paymentMethod: string;
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscount = useCartStore((s) => s.getDiscount);
  const getTotal = useCartStore((s) => s.getTotal);

  const handlePlaceOrder = (data: CheckoutFormData) => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    const total = getTotal();
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;

    const orderNumber = `DW-${Date.now().toString(36).toUpperCase()}`;

    // Save order to localStorage
    localStorage.setItem(
      'driftwear_last_order',
      JSON.stringify({
        orderNumber,
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
        items: items.map((item) => ({
          name: item.product.name,
          slug: item.product.slug,
          color: item.selectedColor,
          size: item.selectedSize,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.colors[0]?.image || '',
        })),
        subtotal,
        discount,
        shipping,
        total: total + shipping,
        paymentMethod: data.paymentMethod,
        createdAt: new Date().toISOString(),
      })
    );

    // Save customer name
    localStorage.setItem(
      'driftwear_customer_name',
      `${data.firstName} ${data.lastName}`
    );

    clearCart();
    router.push('/order-success');
  };

  if (items.length === 0) {
    return (
      <main className="flex-1">
        <Container className="py-20">
          <EmptyState
            icon={ShoppingBag}
            title="Nothing to check out"
            description="Your bag is empty. Add some items before checking out."
            actionLabel="Go to Shop"
            onAction={() => router.push('/shop')}
          />
        </Container>
      </main>
    );
  }

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
                <BreadcrumbLink href="/cart">Bag</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Checkout</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        <Reveal>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-ink mb-8">
            Checkout
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="bg-white rounded-sm border border-sand/50 p-6">
                <CheckoutForm onSubmit={handlePlaceOrder} />
              </div>
            </Reveal>
          </div>

          {/* Summary (sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Reveal direction="left" delay={0.1}>
                <OrderSummary />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}