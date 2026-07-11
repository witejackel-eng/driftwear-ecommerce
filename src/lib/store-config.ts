/**
 * Central store configuration for Driftwear Studio.
 * All public-facing values should be read from here.
 * When a value is absent, the UI should hide that element or show a truthful fallback.
 */

export const storeConfig = {
  /** 'demo' shows a tasteful notice and limits checkout. 'production' requires real integrations. */
  storeMode: (process.env.NEXT_PUBLIC_STORE_MODE as 'demo' | 'production') || 'demo',

  businessName: 'Driftwear Studio',
  legalBusinessName: 'Driftwear Studio Pvt. Ltd.',

  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '',
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '',

  physicalAddress: process.env.NEXT_PUBLIC_STORE_ADDRESS || '',

  /** Free-shipping threshold in INR (minor units). 0 = no free shipping configured. */
  freeShippingThreshold: 299900, // ₹2,999 in paise-equivalent (we use whole rupees)

  /** Shipping cost in INR when below threshold */
  shippingCost: 99,

  /** Return window in days. 0 = not configured. */
  returnWindow: 30,

  /** Estimated delivery business days */
  estimatedDeliveryDays: '3–5',

  socialLinks: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || '',
    pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL || '',
  },

  /** Only show payment method badges when these are actually supported */
  paymentMethods: {
    razorpay: !!process.env.RAZORPAY_KEY_ID,
    cod: true,
    upi: !!process.env.RAZORPAY_KEY_ID,
  },

  /** Analytics */
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
    metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  },

  /** Newsletter / email */
  email: {
    provider: process.env.EMAIL_PROVIDER || '', // 'resend', 'sendgrid', etc.
  },

  isDemo: (process.env.NEXT_PUBLIC_STORE_MODE as string) !== 'production',
} as const;

export type StoreConfig = typeof storeConfig;