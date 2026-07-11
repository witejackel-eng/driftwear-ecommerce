# Driftwear Studio — Ecommerce Website

A full-stack-ready ecommerce website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, product filtering, cart drawer, checkout flow, SEO pages, and free-source lifestyle imagery.

## Live Preview

> 🚀 **[View Live Demo](https://driftwear-studio.vercel.app)** *(placeholder — deploy to Vercel to see it live)*

## Features

- **Homepage** with hero, category tiles, product grids, editorial collections, newsletter
- **Product Listing** with search, filters (category, size, color, price), and sort
- **Product Detail** pages with image gallery, color/size selection, add-to-bag
- **Cart Drawer** with quantity controls, free shipping progress, promo codes
- **Wishlist** with localStorage persistence
- **Checkout Flow** with form validation and demo order processing
- **25+ Demo Products** across Women, Men, and Accessories categories
- **Indian Pricing** in rupees (₹)
- **Responsive Design** — mobile, tablet, and desktop
- **Framer Motion** animations throughout
- **SEO Metadata** on all pages
- **Accessibility** — keyboard navigation, focus states, ARIA labels
- **Zustand** state management with localStorage persistence

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Zustand](https://zustand-demo.pmnd.rs/) | Client state management |
| [shadcn/ui](https://ui.shadcn.com/) | Component library |
| [Lucide Icons](https://lucide.dev/) | Icon set |

## Pages / Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/shop` | All products with filters |
| `/shop/[category]` | Category pages (women, men, new, best-sellers, last-call) |
| `/product/[slug]` | Product detail page |
| `/cart` | Full cart page |
| `/checkout` | Checkout flow |
| `/order-success` | Order confirmation |
| `/wishlist` | Saved favorites |
| `/about` | Brand story |
| `/sustainability` | Sustainability story |
| `/contact` | Contact form |
| `/faq` | Frequently asked questions |
| `/shipping-returns` | Shipping and returns policy |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Product System

- 25 demo products with full attributes (colors, sizes, fabric, care, features)
- Helper functions: `getAllProducts`, `getProductBySlug`, `getProductsByCategory`, `getProductsByCollection`, `getBestSellers`, `getNewArrivals`, `getSaleProducts`, `searchProducts`, `filterProducts`
- Product types: `Product`, `CartItem`, `ProductCategory`, `ProductColor`

## Cart & Wishlist

- **Cart**: Zustand store persisted to localStorage, supports add/remove/update quantity, promo codes (try `SOFT10` for 10% off), free shipping progress bar
- **Wishlist**: Toggle favorites from product cards and detail pages, persisted to localStorage

## Demo Checkout

> ⚠️ **This is a demo checkout.** No real payment is processed. Connect [Razorpay](https://razorpay.com/) or [Stripe](https://stripe.com/) for real payments.

The checkout flow saves demo orders to localStorage and shows a confirmation page. All form data is handled client-side.

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
git clone https://github.com/witejackel-eng/driftwear-ecommerce.git
cd driftwear-ecommerce
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CHECKOUT_MODE=demo
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
```

## Image Credits

All images are from free sources (Unsplash) and are used under their respective licenses. Credits are tracked in `/public/images/image-credits.json`.

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy

## Demo Disclaimer

This is a demo ecommerce project. Product data, prices, reviews, policies, images, and checkout behavior should be replaced with verified business data before commercial use.

---

Built with Next.js, Tailwind CSS, and Framer Motion.