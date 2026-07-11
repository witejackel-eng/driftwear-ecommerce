# Driftwear Studio

Soft everyday clothing for warm days. An editorial ecommerce experience built with Next.js, Tailwind CSS, and modern web standards.

## Brand Concept

Driftwear Studio designs relaxed, breathable clothing for people who like comfort but still want to look put together. Soft fabrics, warm tones, zero fuss — made for Indian warm-weather living: slow mornings, coffee walks, weekend travel, and ordinary days that deserve to feel good.

## Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives (shadcn-style)
- **State Management**: Zustand (cart persistence)
- **Animation**: Framer Motion (subtle, purposeful)
- **Forms**: Zod validation
- **Images**: Next.js Image (sharp optimization)
- **Deployment**: Vercel (standalone output)

## Local Setup

```bash
# Install dependencies
bun install

# Copy environment variables
cp .env.example .env.local

# Start development server
bun run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

## Development Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server on port 3000 |
| `bun run build` | Create production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | TypeScript type checking |

## Environment Variables

See [.env.example](.env.example) for all available variables. Key settings:

- **NEXT_PUBLIC_STORE_MODE** — `demo` (default) or `production`. Demo mode shows a notice and limits checkout.
- **NEXT_PUBLIC_SITE_URL** — Base URL for sitemap generation and OG images.
- **RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET** — Required for production payments (India-focused).

## Demo vs Production Mode

### Demo Mode (default)
- Checkout creates a local order confirmation only
- No real payment is processed
- A tasteful demo notice appears in the footer
- Contact form acknowledges receipt but doesn't send email

### Production Mode
Set `NEXT_PUBLIC_STORE_MODE=production` and configure:
- Razorpay credentials for payments
- Email provider for newsletter and contact forms
- Support email/phone for customer care display
- Social media URLs for footer links

## Product Data Structure

Products are defined in `src/data/products.ts` as typed TypeScript objects. Each product includes:

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;           // INR, whole rupees
  compareAtPrice?: number; // Original price for sale items
  category: 'women' | 'men' | 'accessories';
  collections: string[];   // e.g. ['linen-edit', 'soft-tee-shop']
  tags: string[];          // e.g. ['top', 'shirt', 'linen']
  colors: ProductColor[];
  sizes: string[];
  fit: string;
  fabric: string;
  care: string[];
  features: string[];
  images: string[];
  isNew: boolean;
  isBestSeller: boolean;
  isSale: boolean;
  inventory: number;
}
```

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with editorial sections |
| `/shop` | Shop all products with filters |
| `/shop/women` | Women's category |
| `/shop/men` | Men's category |
| `/shop/new` | New arrivals |
| `/shop/best-sellers` | Best sellers |
| `/shop/last-call` | Sale items |
| `/product/[slug]` | Product detail page |
| `/cart` | Full cart page |
| `/checkout` | Checkout flow |
| `/order-success` | Order confirmation |
| `/about` | Brand story |
| `/sustainability` | Material & care transparency |
| `/faq` | Frequently asked questions |
| `/shipping-returns` | Shipping and returns policy |
| `/contact` | Contact form |
| `/size-guide` | Size guide with measurement tables |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Design System

The brand palette is defined in `src/app/globals.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-warm-paper` | `#F7F2E8` | Section backgrounds |
| `--color-soft-cream` | `#EFE5D5` | Secondary backgrounds |
| `--color-light-sand` | `#E4D6C3` | Borders, dividers |
| `--color-deep-ink` | `#1B1A17` | Primary text |
| `--color-muted-brown` | `#6F6256` | Secondary text |
| `--color-faded-olive` | `#70745B` | Success, badges |
| `--color-clay` | `#A75F45` | Accent, sale badges |
| `--color-offwhite` | `#FFFDF9` | Page background |

Typography: Instrument Serif (display) + Inter (body), loaded via `next/font/google`.

## Image Credits

See [IMAGE_CREDITS.md](./IMAGE_CREDITS.md) for all image sources. All images are stock photography used for demonstration. Replace with professional product photography for production.

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Manual

```bash
bun run build
NODE_ENV=production bun .next/standalone/server.js
```

## Known Production Requirements

- Replace all stock product images with actual product photography
- Configure Razorpay (or other payment provider) for live checkout
- Set up email provider (Resend, SendGrid) for contact form and newsletter
- Have privacy policy and terms reviewed by a legal professional
- Configure analytics (GTM/Meta Pixel) if desired
- Add real social media URLs
- Set real support email and phone number

## License

Private. All rights reserved.