'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  ShoppingBag,
  ArrowRight,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
import { storeConfig } from '@/lib/store-config';
import { formatPrice, cn } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 2999;

// ─── Validation ───────────────────────────────────────────────────────────
interface FormErrors {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  paymentMethod?: string;
  terms?: string;
}

function validateForm(form: CheckoutFormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!form.phone || !/^\+?[\d\s-]{10,15}$/.test(form.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!form.address.trim()) {
    errors.address = 'Address is required';
  }

  if (!form.city.trim()) {
    errors.city = 'City is required';
  }

  if (!form.state.trim()) {
    errors.state = 'State is required';
  }

  if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode.trim())) {
    errors.pincode = 'Please enter a valid 6-digit PIN code';
  }

  if (!form.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method';
  }

  if (!form.termsAccepted) {
    errors.terms = 'You must accept the terms and conditions';
  }

  return errors;
}

// ─── Order Summary Sidebar ────────────────────────────────────────────────
function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscount = useCartStore((s) => s.getDiscount);
  const getTotal = useCartStore((s) => s.getTotal);
  const promoCode = useCartStore((s) => s.promoCode);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : storeConfig.shippingCost;

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
              <div className="relative w-14 h-[72px] bg-cream overflow-hidden shrink-0">
                <Image
                  src={colorObj?.image || item.product.colors[0]?.image || ''}
                  alt={item.product.name}
                  width={56}
                  height={72}
                  className="object-cover w-full h-full"
                />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-ink text-offwhite text-[10px] font-medium rounded-full flex items-center justify-center">
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
          <div className="flex justify-between text-faded-olive">
            <span>Promo ({promoCode})</span>
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

      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <Lock className="w-3 h-3" />
        Secure checkout
      </div>
    </div>
  );
}

// ─── Checkout Form ────────────────────────────────────────────────────────
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
  termsAccepted: boolean;
}

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
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const update = (field: keyof CheckoutFormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Set all fields as touched to show errors
      const allTouched: Record<string, boolean> = {};
      Object.keys(form).forEach((key) => { allTouched[key] = true; });
      setTouched(allTouched);
      return;
    }

    onSubmit(form);
  };

  const inputClass = (field: string) =>
    cn(
      'h-10 rounded-sm bg-cream/30 border-sand text-sm',
      touched[field] && errors[field as keyof FormErrors] && 'border-clay'
    );

  const showError = (field: string) => touched[field] && errors[field as keyof FormErrors];

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Demo Mode Notice */}
      {storeConfig.isDemo && (
        <div className="bg-sun-yellow/10 border border-sun-yellow/30 rounded-sm p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-sun-yellow mt-0.5 shrink-0" />
          <div className="text-xs text-ink/80">
            <strong>Demo Mode</strong> — This is a demonstration checkout. No real payment will be processed and no items will be shipped. Your order will be saved locally for preview.
          </div>
        </div>
      )}

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
              onBlur={() => handleBlur('email')}
              placeholder="you@example.com"
              className={inputClass('email')}
              autoComplete="email"
            />
            {showError('email') && (
              <p className="text-xs text-clay mt-1" role="alert">{errors.email}</p>
            )}
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
              onBlur={() => handleBlur('phone')}
              placeholder="+91 98765 43210"
              className={inputClass('phone')}
              autoComplete="tel"
            />
            {showError('phone') && (
              <p className="text-xs text-clay mt-1" role="alert">{errors.phone}</p>
            )}
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
              onBlur={() => handleBlur('firstName')}
              className={inputClass('firstName')}
              autoComplete="given-name"
            />
            {showError('firstName') && (
              <p className="text-xs text-clay mt-1" role="alert">{errors.firstName}</p>
            )}
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
              onBlur={() => handleBlur('lastName')}
              className={inputClass('lastName')}
              autoComplete="family-name"
            />
            {showError('lastName') && (
              <p className="text-xs text-clay mt-1" role="alert">{errors.lastName}</p>
            )}
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
              onBlur={() => handleBlur('address')}
              placeholder="Street address, apartment, etc."
              className={inputClass('address')}
              autoComplete="street-address"
            />
            {showError('address') && (
              <p className="text-xs text-clay mt-1" role="alert">{errors.address}</p>
            )}
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
              onBlur={() => handleBlur('city')}
              className={inputClass('city')}
              autoComplete="address-level2"
            />
            {showError('city') && (
              <p className="text-xs text-clay mt-1" role="alert">{errors.city}</p>
            )}
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
              onBlur={() => handleBlur('state')}
              className={inputClass('state')}
              autoComplete="address-level1"
            />
            {showError('state') && (
              <p className="text-xs text-clay mt-1" role="alert">{errors.state}</p>
            )}
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
              onBlur={() => handleBlur('pincode')}
              placeholder="400001"
              className={inputClass('pincode')}
              autoComplete="postal-code"
            />
            {showError('pincode') && (
              <p className="text-xs text-clay mt-1" role="alert">{errors.pincode}</p>
            )}
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
            {storeConfig.isDemo && (
              <SelectItem value="upi" disabled>
                UPI — Coming soon in production
              </SelectItem>
            )}
            {storeConfig.isDemo && (
              <SelectItem value="card" disabled>
                Credit / Debit Card — Coming soon in production
              </SelectItem>
            )}
            {storeConfig.isDemo && (
              <SelectItem value="netbanking" disabled>
                Net Banking — Coming soon in production
              </SelectItem>
            )}
            {!storeConfig.isDemo && storeConfig.paymentMethods.upi && (
              <SelectItem value="upi">UPI</SelectItem>
            )}
            {!storeConfig.isDemo && storeConfig.paymentMethods.razorpay && (
              <SelectItem value="card">Credit / Debit Card</SelectItem>
            )}
            {!storeConfig.isDemo && storeConfig.paymentMethods.razorpay && (
              <SelectItem value="netbanking">Net Banking</SelectItem>
            )}
          </SelectContent>
        </Select>
        {storeConfig.isDemo && (
          <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Online payment options will be available when the store goes live.
          </p>
        )}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={form.termsAccepted}
          onCheckedChange={(checked) => update('termsAccepted', !!checked)}
          className="data-[state=checked]:bg-ink data-[state=checked]:border-ink rounded-sm mt-0.5"
        />
        <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
          I agree to the terms and conditions, including the return policy ({storeConfig.returnWindow > 0 ? `${storeConfig.returnWindow}-day returns` : 'no returns'}). I understand that in demo mode, no real order is placed.
        </Label>
      </div>
      {showError('terms') && (
        <p className="text-xs text-clay -mt-4" role="alert">{errors.terms}</p>
      )}

      <Button
        type="submit"
        className="w-full h-12 bg-ink text-offwhite hover:bg-ink/90 rounded-sm text-sm font-medium min-h-[48px]"
      >
        <Lock className="w-4 h-4 mr-2" />
        {storeConfig.isDemo ? 'Place Demo Order' : 'Place Order'}
      </Button>
    </form>
  );
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
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : storeConfig.shippingCost;

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
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
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
        isDemo: storeConfig.isDemo,
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
              <div className="bg-offwhite rounded-sm border border-sand/50 p-6">
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