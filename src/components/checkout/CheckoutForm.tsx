'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CreditCard, Truck, Zap, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import type { CartItem } from '@/lib/types';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Separator } from '@/components/ui/separator';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Delhi', 'Chandigarh', 'Puducherry',
];

interface FormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  deliveryMethod: 'standard' | 'express';
}

interface FormErrors {
  [key: string]: string;
}

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscount = useCartStore((s) => s.getDiscount);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    deliveryMethod: 'standard',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Contact
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = 'Enter a valid 10-digit phone number';

    // Shipping
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';
    else if (!/^\d{6}$/.test(formData.pincode.trim()))
      newErrors.pincode = 'Enter a valid 6-digit PIN code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to first error
      const firstError = document.querySelector('[data-error]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    // Simulate a brief processing delay
    await new Promise((r) => setTimeout(r, 1500));

    const shippingCost = formData.deliveryMethod === 'express' ? 199 : (subtotal >= 2999 ? 0 : 99);
    const orderData = {
      ...formData,
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize,
      })),
      subtotal,
      discount,
      shippingCost,
      total: total + shippingCost,
      createdAt: new Date().toISOString(),
      orderId: `DW-${Date.now().toString(36).toUpperCase()}`,
    };

    localStorage.setItem('driftwear_last_order', JSON.stringify(orderData));
    clearCart();
    router.push('/order-success');
  };

  const inputClass = (field: string) =>
    cn(
      'h-10 w-full rounded-md border bg-offwhite px-3 text-sm text-ink placeholder:text-muted-foreground transition-colors focus:border-navy focus:ring-1 focus:ring-navy/20 focus:outline-none',
      errors[field] ? 'border-terracotta' : 'border-sand'
    );

  const selectClass = (field: string) =>
    cn(
      'h-10 w-full rounded-md border bg-offwhite px-3 text-sm text-ink transition-colors focus:border-navy focus:ring-1 focus:ring-navy/20 focus:outline-none appearance-none',
      errors[field] ? 'border-terracotta' : 'border-sand'
    );

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-6">
        <ShoppingBagEmpty />
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl text-ink">
          Your bag is empty
        </h2>
        <p className="text-sm text-muted-foreground">
          Add some items to your bag before checking out.
        </p>
        <button
          onClick={() => router.push('/')}
          className="mt-2 rounded-md bg-navy px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy/90"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
        {/* Left: Form Sections */}
        <div className="space-y-8">
          {/* Back Link */}
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {/* 1. Contact Information */}
          <section>
            <h2 className="text-lg font-medium text-ink mb-4">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-ink mb-1.5">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass('email')}
                  data-error={errors.email ? 'true' : undefined}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-terracotta">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-ink mb-1.5">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="9876543210"
                  className={inputClass('phone')}
                  data-error={errors.phone ? 'true' : undefined}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-terracotta">{errors.phone}</p>
                )}
              </div>
            </div>
          </section>

          <Separator className="bg-sand" />

          {/* 2. Shipping Address */}
          <section>
            <h2 className="text-lg font-medium text-ink mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-ink mb-1.5">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    placeholder="John"
                    className={inputClass('firstName')}
                    data-error={errors.firstName ? 'true' : undefined}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-terracotta">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-ink mb-1.5">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    placeholder="Doe"
                    className={inputClass('lastName')}
                    data-error={errors.lastName ? 'true' : undefined}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-terracotta">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-ink mb-1.5">Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="123 Main Street"
                  className={inputClass('address')}
                  data-error={errors.address ? 'true' : undefined}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-terracotta">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-ink mb-1.5">
                  Apartment, suite, etc. <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.apartment}
                  onChange={(e) => updateField('apartment', e.target.value)}
                  placeholder="Apt 4B"
                  className={inputClass('apartment')}
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-ink mb-1.5">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="Mumbai"
                    className={inputClass('city')}
                    data-error={errors.city ? 'true' : undefined}
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-terracotta">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-ink mb-1.5">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    className={selectClass('state')}
                    data-error={errors.state ? 'true' : undefined}
                  >
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="mt-1 text-xs text-terracotta">{errors.state}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-ink mb-1.5">PIN Code *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => updateField('pincode', e.target.value)}
                    placeholder="400001"
                    maxLength={6}
                    className={inputClass('pincode')}
                    data-error={errors.pincode ? 'true' : undefined}
                  />
                  {errors.pincode && (
                    <p className="mt-1 text-xs text-terracotta">{errors.pincode}</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <Separator className="bg-sand" />

          {/* 3. Delivery Method */}
          <section>
            <h2 className="text-lg font-medium text-ink mb-4">Delivery Method</h2>
            <div className="space-y-3">
              <label
                className={cn(
                  'flex cursor-pointer items-center gap-4 rounded-md border p-4 transition-all',
                  formData.deliveryMethod === 'standard'
                    ? 'border-navy bg-navy/5'
                    : 'border-sand hover:border-ink/20'
                )}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={formData.deliveryMethod === 'standard'}
                  onChange={() => updateField('deliveryMethod', 'standard')}
                  className="h-4 w-4 accent-navy"
                />
                <Truck className="h-5 w-5 text-ink flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">Standard Delivery</p>
                  <p className="text-xs text-muted-foreground">5-7 business days</p>
                </div>
                <span className="text-sm font-medium text-ink">
                  {subtotal >= 2999 ? 'Free' : formatPrice(99)}
                </span>
              </label>

              <label
                className={cn(
                  'flex cursor-pointer items-center gap-4 rounded-md border p-4 transition-all',
                  formData.deliveryMethod === 'express'
                    ? 'border-navy bg-navy/5'
                    : 'border-sand hover:border-ink/20'
                )}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="express"
                  checked={formData.deliveryMethod === 'express'}
                  onChange={() => updateField('deliveryMethod', 'express')}
                  className="h-4 w-4 accent-navy"
                />
                <Zap className="h-5 w-5 text-sun-yellow flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">Express Delivery</p>
                  <p className="text-xs text-muted-foreground">2-3 business days</p>
                </div>
                <span className="text-sm font-medium text-ink">{formatPrice(199)}</span>
              </label>
            </div>
          </section>

          <Separator className="bg-sand" />

          {/* 4. Payment Placeholder */}
          <section>
            <h2 className="text-lg font-medium text-ink mb-4">Payment</h2>
            <div className="rounded-md border border-sand bg-cream/50 p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-ink mb-2">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm font-medium">Payment Gateway</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Demo checkout. Connect Razorpay or Stripe for real payments.
              </p>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Your payment information is secure
              </div>
            </div>
          </section>

          {/* Mobile: Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-navy py-3.5 text-sm font-medium text-white transition-all hover:bg-navy/90 disabled:opacity-70 lg:hidden"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing...
              </span>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Place Order — {formatPrice(total + (formData.deliveryMethod === 'express' ? 199 : (subtotal >= 2999 ? 0 : 99)))}
              </>
            )}
          </button>
        </div>

        {/* Right: Order Summary (sticky on desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 rounded-lg border border-sand bg-offwhite p-6">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              discount={discount}
              total={total}
            />

            {/* Security Badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-olive" />
                Secure Checkout
              </div>
              <div className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-olive" />
                Free Shipping
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-navy py-3.5 text-sm font-medium text-white transition-all hover:bg-navy/90 disabled:opacity-70 mt-4"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing...
                </span>
              ) : (
                <>
                  Place Order
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function ShoppingBagEmpty() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-sand"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    </div>
  );
}