import type { Collection } from '@/lib/types';

export const collections: Collection[] = [
  {
    slug: 'linen-edit',
    name: 'The Linen Edit',
    description:
      'Sunwashed, breathable, and effortlessly cool — our curated linen collection designed for warm days and laid-back evenings. Every piece is garment-washed for that lived-in softness from day one.',
    image: '/images/collections/linen-edit.jpg',
    cta: 'Shop Linen',
    ctaLink: '/shop?collection=linen-edit',
    productSlugs: [
      'women-linen-shirt',
      'men-linen-shirt',
      'men-resort-shirt',
      'women-linen-midi-dress',
    ],
  },
  {
    slug: 'weekend-shop',
    name: 'The Weekend Shop',
    description:
      'From brunch to beach walks, these are the pieces that make your weekends feel effortless. Matching sets, cozy knits, and everything you need to do nothing — beautifully.',
    image: '/images/collections/weekend-shop.jpg',
    cta: 'Shop Weekend',
    ctaLink: '/shop?collection=weekend-shop',
    productSlugs: [
      'women-matching-set',
      'men-sweatshirt',
      'men-overshirt',
      'women-cotton-dress',
      'men-chino-short',
      'women-lounge-short',
    ],
  },
  {
    slug: 'soft-tee-shop',
    name: 'The Soft Tee Shop',
    description:
      'Our cult-favorite tees, engineered for comfort. Supersoft cotton, relaxed fits, and colors that go with everything. Once you try them, there\'s no going back.',
    image: '/images/collections/soft-tee.jpg',
    cta: 'Shop Tees',
    ctaLink: '/shop?collection=soft-tee-shop',
    productSlugs: [
      'women-lazy-tee',
      'men-crew-tee',
      'women-rib-tank',
      'men-polo',
      'men-graphic-tee',
    ],
  },
  {
    slug: 'last-call',
    name: 'Last Call',
    description:
      'Final chance to grab these favorites before they\'re gone forever. Limited stock, unbeatable prices — when they\'re gone, they\'re gone.',
    image: '/images/collections/best-sellers.jpg',
    cta: 'Shop Sale',
    ctaLink: '/shop?collection=last-call',
    productSlugs: [
      'graphic-tee-sale',
      'double-cloth-sale',
      'cardigan-sale',
    ],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getAllCollections(): Collection[] {
  return collections;
}