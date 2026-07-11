import type { Product, FilterState } from '@/lib/types';

export const products: Product[] = [
  // ─── WOMEN ───────────────────────────────────────────────────────────────
  {
    id: 'wls-001',
    slug: 'women-linen-shirt',
    name: 'Sunwashed Linen Shirt',
    subtitle: 'Breezy, breathable, and beautifully broken in',
    description:
      'Our signature linen shirt, garment-washed for that perfect lived-in softness from the very first wear. Crafted from 100% European flax linen, it features a relaxed camp collar, mother-of-pearl buttons, and a slightly longer back hem that looks incredible tucked or untucked. The kind of shirt that makes every outfit look effortless.',
    price: 2499,
    category: 'women',
    collections: ['linen-edit'],
    tags: ['top', 'shirt', 'linen', 'summer'],
    colors: [
      {
        name: 'Sand',
        hex: '#D4C5A9',
        image: '/images/products/women-linen-shirt.jpg',
        hoverImage: '/images/products/women-linen-shirt-2.jpg',
      },
      {
        name: 'White',
        hex: '#FAF9F6',
        image: '/images/products/women-linen-shirt.jpg',
        hoverImage: '/images/products/women-linen-shirt-2.jpg',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fit: 'Relaxed fit — size down for a closer silhouette',
    fabric: '100% European flax linen, 150gsm',
    care: ['Machine wash cold gentle cycle', 'Tumble dry low', 'Warm iron if needed', 'Do not bleach'],
    features: [
      'Pre-washed for zero shrinkage',
      'Mother-of-pearl buttons',
      'Camp collar with relaxed neckline',
      'Slightly longer back hem',
      'Chest patch pocket',
    ],
    images: [
      '/images/products/women-linen-shirt.jpg',
      '/images/products/women-linen-shirt-2.jpg',
    ],
    rating: 4.8,
    reviewCount: 142,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    inventory: 45,
  },
  {
    id: 'wlt-002',
    slug: 'women-lazy-tee',
    name: 'Lazy Sunday Tee',
    subtitle: 'The softest tee you\'ll ever own',
    description:
      'Knitted from our proprietary 220gsm Supersoft cotton, this is the tee that started it all. Slightly boxy with drop shoulders and a ribbed crew neck, it has that perfect "I\'ve had this for years" feel from day one. Available in a palette of muted, dye-free tones that go with literally everything.',
    price: 1299,
    category: 'women',
    collections: ['soft-tee-shop'],
    tags: ['tee', 'top', 'cotton', 'everyday', 'summer'],
    colors: [
      {
        name: 'Sage',
        hex: '#9CAF88',
        image: '/images/products/women-lazy-tee.jpg',
        hoverImage: '/images/products/women-lazy-tee-2.jpg',
      },
      {
        name: 'Oatmeal',
        hex: '#E8DFD0',
        image: '/images/products/women-lazy-tee.jpg',
        hoverImage: '/images/products/women-lazy-tee-2.jpg',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Relaxed boxy fit — true to size',
    fabric: '100% Supersoft organic cotton, 220gsm',
    care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Cool iron'],
    features: [
      'Proprietary Supersoft cotton blend',
      'Drop shoulder construction',
      'Ribbed crew neckline',
      'Pre-shrunk fabric',
      'Side-seamed for minimal twisting',
    ],
    images: [
      '/images/products/women-lazy-tee.jpg',
      '/images/products/women-lazy-tee-2.jpg',
    ],
    rating: 4.9,
    reviewCount: 156,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    inventory: 78,
  },
  {
    id: 'wcd-003',
    slug: 'women-cotton-dress',
    name: 'Cloud Cotton Dress',
    subtitle: 'Float through your day in pure comfort',
    description:
      'A midi-length shift dress in our lightest cotton — so soft it feels like wearing a cloud. Features adjustable tie straps, a subtle A-line silhouette, and inseam pockets (yes, we\'re those people). Perfect for summer days with sandals or dressed up with espadrilles for evening.',
    price: 2799,
    category: 'women',
    collections: ['weekend-shop'],
    tags: ['dress', 'cotton', 'summer', 'everyday'],
    colors: [
      {
        name: 'Dusty Rose',
        hex: '#D4A5A5',
        image: '/images/products/women-cotton-dress.jpg',
        hoverImage: '/images/products/women-cotton-dress-2.jpg',
      },
      {
        name: 'Ivory',
        hex: '#FFFFF0',
        image: '/images/products/women-cotton-dress.jpg',
        hoverImage: '/images/products/women-cotton-dress-2.jpg',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fit: 'A-line midi — true to size, adjustable straps',
    fabric: '100% organic cotton voile, 120gsm',
    care: ['Machine wash cold gentle', 'Hang dry recommended', 'Warm iron', 'Do not bleach'],
    features: [
      'Adjustable tie straps',
      'A-line midi silhouette',
      'Deep inseam pockets',
      'Self-fabric belt included',
      'French seam interior finish',
    ],
    images: [
      '/images/products/women-cotton-dress.jpg',
      '/images/products/women-cotton-dress-2.jpg',
    ],
    rating: 4.7,
    reviewCount: 89,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    inventory: 32,
  },
  {
    id: 'wrt-004',
    slug: 'women-rib-tank',
    name: 'Soft Rib Tank',
    subtitle: 'Your new layering essential',
    description:
      'A slim-fitting ribbed tank in buttery soft cotton. The kind of piece you buy in every color because it just works with everything. Features a scooped neckline, slim straps, and just the right amount of stretch for a flattering but comfortable fit.',
    price: 999,
    category: 'women',
    collections: ['soft-tee-shop'],
    tags: ['tee', 'tank', 'top', 'cotton', 'layering'],
    colors: [
      {
        name: 'Black',
        hex: '#1A1A1A',
        image: '/images/products/women-rib-tank.jpg',
        hoverImage: '/images/products/women-rib-tank-2.jpg',
      },
      {
        name: 'Bone',
        hex: '#E8E0D4',
        image: '/images/products/women-rib-tank.jpg',
        hoverImage: '/images/products/women-rib-tank-2.jpg',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Slim fit with stretch — true to size',
    fabric: '95% organic cotton, 5% elastane rib knit, 180gsm',
    care: ['Machine wash cold', 'Hang dry', 'Do not bleach', 'Cool iron'],
    features: [
      'Fine ribbed texture',
      'Scooped neckline',
      'Slim adjustable straps',
      'Added elastane for shape retention',
      'Doubled hem for durability',
    ],
    images: [
      '/images/products/women-rib-tank.jpg',
      '/images/products/women-rib-tank-2.jpg',
    ],
    rating: 4.6,
    reviewCount: 112,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    inventory: 94,
  },
  {
    id: 'wdp-005',
    slug: 'women-drawstring-pant',
    name: 'Breezy Drawstring Pant',
    subtitle: 'Wide-leg freedom for everyday ease',
    description:
      'Wide-leg pants with a comfortable elastic waistband and drawstring tie. Made from our signature lightweight linen-cotton blend, these flow beautifully with every step. The relaxed drape and cropped ankle length make them perfect for warm weather.',
    price: 1899,
    category: 'women',
    collections: ['linen-edit', 'weekend-shop'],
    tags: ['pant', 'linen', 'summer', 'everyday', 'lounge'],
    colors: [
      {
        name: 'Olive',
        hex: '#6B7B3A',
        image: '/images/products/women-drawstring-pant.jpg',
        hoverImage: '/images/products/women-drawstring-pant-2.jpg',
      },
      {
        name: 'Natural',
        hex: '#E8DFD0',
        image: '/images/products/women-drawstring-pant.jpg',
        hoverImage: '/images/products/women-drawstring-pant-2.jpg',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fit: 'Relaxed wide-leg — true to size',
    fabric: '55% linen, 45% organic cotton, 160gsm',
    care: ['Machine wash cold gentle', 'Tumble dry low', 'Warm iron', 'Do not bleach'],
    features: [
      'Elastic waistband with drawstring',
      'Wide-leg cropped silhouette',
      'Side pockets',
      'Self-fabric drawstring',
      'Pre-washed for softness',
    ],
    images: [
      '/images/products/women-drawstring-pant.jpg',
      '/images/products/women-drawstring-pant-2.jpg',
    ],
    rating: 4.5,
    reviewCount: 67,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    inventory: 38,
  },
  {
    id: 'wws-006',
    slug: 'women-wrap-skirt',
    name: 'Summer Wrap Skirt',
    subtitle: 'Effortless movement in a timeless silhouette',
    description:
      'A lightweight wrap skirt that moves beautifully with every step. Crafted from our softest linen-cotton blend with an asymmetric hem that falls to mid-calf. Wraps and ties at the side for an adjustable, flattering fit on every body.',
    price: 1699,
    category: 'women',
    collections: ['linen-edit'],
    tags: ['skirt', 'linen', 'summer'],
    colors: [
      {
        name: 'Terracotta',
        hex: '#C67B5C',
        image: '/images/products/women-wrap-skirt.jpg',
        hoverImage: '/images/products/women-wrap-skirt-2.jpg',
      },
      {
        name: 'Cream',
        hex: '#FFFDD0',
        image: '/images/products/women-wrap-skirt.jpg',
        hoverImage: '/images/products/women-wrap-skirt-2.jpg',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fit: 'Wrap style — adjustable, fits most body types',
    fabric: '60% linen, 40% organic cotton, 140gsm',
    care: ['Machine wash cold gentle', 'Hang dry', 'Warm iron', 'Do not bleach'],
    features: [
      'Wrap-and-tie closure',
      'Asymmetric midi hem',
      'Lightweight drapey fabric',
      'Self-fabric waist tie',
      'Side seam pockets',
    ],
    images: [
      '/images/products/women-wrap-skirt.jpg',
      '/images/products/women-wrap-skirt-2.jpg',
    ],
    rating: 4.4,
    reviewCount: 45,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    inventory: 28,
  },
  {
    id: 'wms-007',
    slug: 'women-matching-set',
    name: 'Weekend Matching Set',
    subtitle: 'Coordinated comfort, zero effort required',
    description:
      'A relaxed short-sleeve top and wide-leg pant set in our signature Supersoft cotton. Matching sets are the easiest outfit decision you\'ll ever make — throw it on and look put-together instantly. Both pieces can also be worn separately for maximum versatility.',
    price: 2999,
    category: 'women',
    collections: ['weekend-shop', 'soft-tee-shop'],
    tags: ['set', 'cotton', 'summer', 'lounge', 'everyday'],
    colors: [
      {
        name: 'Sky Blue',
        hex: '#87CEEB',
        image: '/images/products/women-matching-set.jpg',
        hoverImage: '/images/products/women-matching-set-2.jpg',
      },
      {
        name: 'Slate',
        hex: '#708090',
        image: '/images/products/women-matching-set.jpg',
        hoverImage: '/images/products/women-matching-set-2.jpg',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fit: 'Relaxed fit on both pieces — true to size',
    fabric: '100% Supersoft organic cotton, 200gsm',
    care: ['Machine wash cold', 'Tumble dry low', 'Cool iron', 'Do not bleach'],
    features: [
      'Top: relaxed short-sleeve with round neck',
      'Pant: elastic waist with drawstring',
      'Both pieces sold as a set',
      'Can be worn separately',
      'Matching packaging for gifting',
    ],
    images: [
      '/images/products/women-matching-set.jpg',
      '/images/products/women-matching-set-2.jpg',
    ],
    rating: 4.8,
    reviewCount: 78,
    isNew: true,
    isBestSeller: true,
    isSale: false,
    inventory: 22,
  },
  {
    id: 'wlm-008',
    slug: 'women-linen-midi-dress',
    name: 'Linen Midi Dress',
    subtitle: 'Simple, sophisticated, and sun-ready',
    description:
      'A clean-lined midi dress in pure European linen. Features a flattering V-neckline, adjustable waist tie, and side slits for ease of movement. The kind of dress that works for beach lunches, gallery visits, and everything in between.',
    price: 2999,
    category: 'women',
    collections: ['linen-edit'],
    tags: ['dress', 'linen', 'summer', 'everyday'],
    colors: [
      {
        name: 'Sage',
        hex: '#9CAF88',
        image: '/images/products/women-linen-midi-dress.jpg',
        hoverImage: '/images/products/women-linen-midi-dress-2.jpg',
      },
      {
        name: 'White',
        hex: '#FAF9F6',
        image: '/images/products/women-linen-midi-dress.jpg',
        hoverImage: '/images/products/women-linen-midi-dress-2.jpg',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    fit: 'Relaxed A-line — true to size, adjustable waist',
    fabric: '100% European flax linen, 155gsm',
    care: ['Machine wash cold gentle', 'Hang dry recommended', 'Warm iron while damp', 'Do not bleach'],
    features: [
      'V-neckline with clean finish',
      'Adjustable self-fabric waist tie',
      'Midi length with side slits',
      'Inseam pockets',
      'Reinforced shoulder seams',
    ],
    images: [
      '/images/products/women-linen-midi-dress.jpg',
      '/images/products/women-linen-midi-dress-2.jpg',
    ],
    rating: 4.7,
    reviewCount: 93,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    inventory: 19,
  },
  {
    id: 'wls-009',
    slug: 'women-lounge-short',
    name: 'Soft Lounge Short',
    subtitle: 'Made for doing absolutely nothing',
    description:
      'The shortest distance between you and the couch. These ultra-soft lounge shorts feature a relaxed fit, elastic waistband, and a slightly curved hem. Made from our Supersoft cotton that gets even better with every wash.',
    price: 1199,
    category: 'women',
    collections: ['weekend-shop', 'soft-tee-shop'],
    tags: ['lounge', 'short', 'cotton', 'summer'],
    colors: [
      {
        name: 'Blush',
        hex: '#DE98AB',
        image: '/images/products/women-lounge-short.jpg',
        hoverImage: '/images/products/women-lounge-short-2.jpg',
      },
      {
        name: 'Stone',
        hex: '#928E85',
        image: '/images/products/women-lounge-short.jpg',
        hoverImage: '/images/products/women-lounge-short-2.jpg',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Relaxed fit — true to size',
    fabric: '100% Supersoft organic cotton, 220gsm',
    care: ['Machine wash cold', 'Tumble dry low', 'Cool iron', 'Do not bleach'],
    features: [
      'Elastic waistband with drawstring',
      'Curved hem for comfort',
      'Side pockets',
      'Pre-shrunk fabric',
      'Self-bound edges',
    ],
    images: [
      '/images/products/women-lounge-short.jpg',
      '/images/products/women-lounge-short-2.jpg',
    ],
    rating: 4.6,
    reviewCount: 54,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    inventory: 62,
  },

  // ─── MEN ─────────────────────────────────────────────────────────────────
  {
    id: 'mls-010',
    slug: 'men-linen-shirt',
    name: 'Classic Linen Shirt',
    subtitle: 'The essential warm-weather shirt',
    description:
      'A perfectly proportioned linen shirt with a clean button-down collar and single chest pocket. Cut from garment-washed European linen that softens beautifully over time. Works equally well with chinos for dinner or shorts for the beach.',
    price: 2499,
    category: 'men',
    collections: ['linen-edit'],
    tags: ['shirt', 'linen', 'summer', 'everyday'],
    colors: [
      {
        name: 'Sky',
        hex: '#87CEEB',
        image: '/images/products/men-linen-shirt.jpg',
        hoverImage: '/images/products/men-linen-shirt-2.jpg',
      },
      {
        name: 'White',
        hex: '#FAF9F6',
        image: '/images/products/men-linen-shirt.jpg',
        hoverImage: '/images/products/men-linen-shirt-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Regular fit — true to size',
    fabric: '100% European flax linen, 155gsm',
    care: ['Machine wash cold gentle', 'Tumble dry low', 'Warm iron', 'Do not bleach'],
    features: [
      'Button-down collar',
      'Single chest pocket',
      'Mother-of-pearl buttons',
      'Box pleat back for comfort',
      'Pre-washed for softness',
    ],
    images: [
      '/images/products/men-linen-shirt.jpg',
      '/images/products/men-linen-shirt-2.jpg',
    ],
    rating: 4.7,
    reviewCount: 128,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    inventory: 41,
  },
  {
    id: 'mrs-011',
    slug: 'men-resort-shirt',
    name: 'Seaside Camp Collar Shirt',
    subtitle: 'Vacation energy, everyday wearability',
    description:
      'A camp-collar linen shirt with that effortless "I just walked off the beach" vibe. The open collar, relaxed body, and straight hem look great untucked. Crafted from our sunwashed linen blend that gets softer with every wear.',
    price: 2199,
    category: 'men',
    collections: ['linen-edit'],
    tags: ['shirt', 'linen', 'resort', 'summer'],
    colors: [
      {
        name: 'Sage',
        hex: '#9CAF88',
        image: '/images/products/men-resort-shirt.jpg',
        hoverImage: '/images/products/men-resort-shirt-2.jpg',
      },
      {
        name: 'Navy',
        hex: '#2C3E50',
        image: '/images/products/men-resort-shirt.jpg',
        hoverImage: '/images/products/men-resort-shirt-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Relaxed fit — size down for a closer look',
    fabric: '55% linen, 45% cotton, 150gsm',
    care: ['Machine wash cold', 'Tumble dry low', 'Warm iron', 'Do not bleach'],
    features: [
      'Camp collar with no buttons at neck',
      'Relaxed body and short sleeves',
      'Straight hem for untucked wear',
      'Coconut shell buttons',
      'Patch pocket at chest',
    ],
    images: [
      '/images/products/men-resort-shirt.jpg',
      '/images/products/men-resort-shirt-2.jpg',
    ],
    rating: 4.6,
    reviewCount: 86,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    inventory: 35,
  },
  {
    id: 'mct-012',
    slug: 'men-crew-tee',
    name: 'Everyday Crew Tee',
    subtitle: 'The foundation of every good wardrobe',
    description:
      'Our go-to crew neck tee in premium organic cotton. Slightly heavier than average (210gsm) so it hangs beautifully and never feels flimsy. The shoulder seam sits perfectly on the shoulder — not halfway down the arm like lesser tees.',
    price: 1199,
    category: 'men',
    collections: ['soft-tee-shop'],
    tags: ['tee', 'cotton', 'everyday', 'summer'],
    colors: [
      {
        name: 'Black',
        hex: '#1A1A1A',
        image: '/images/products/men-crew-tee.jpg',
        hoverImage: '/images/products/men-crew-tee-2.jpg',
      },
      {
        name: 'Oatmeal',
        hex: '#E8DFD0',
        image: '/images/products/men-crew-tee.jpg',
        hoverImage: '/images/products/men-crew-tee-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Regular fit — true to size',
    fabric: '100% organic cotton, 210gsm',
    care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Cool iron'],
    features: [
      'Premium 210gsm organic cotton',
      'Crew neckline with ribbed collar',
      'Set-in sleeves for clean shoulder line',
      'Pre-shrunk',
      'Side-seamed construction',
    ],
    images: [
      '/images/products/men-crew-tee.jpg',
      '/images/products/men-crew-tee-2.jpg',
    ],
    rating: 4.8,
    reviewCount: 145,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    inventory: 86,
  },
  {
    id: 'mcs-013',
    slug: 'men-chino-short',
    name: 'Drift Chino Short',
    subtitle: 'The only summer short you need',
    description:
      'A clean-lined chino short with a 7-inch inseam — long enough to look polished, short enough to keep cool. Features a flat front, zip fly, and a comfortable mid-rise waist. Made from a stretch organic cotton twill that moves with you.',
    price: 1799,
    category: 'men',
    collections: ['weekend-shop'],
    tags: ['short', 'cotton', 'summer', 'everyday'],
    colors: [
      {
        name: 'Khaki',
        hex: '#C3B091',
        image: '/images/products/men-chino-short.jpg',
        hoverImage: '/images/products/men-chino-short-2.jpg',
      },
      {
        name: 'Olive',
        hex: '#6B7B3A',
        image: '/images/products/men-chino-short.jpg',
        hoverImage: '/images/products/men-chino-short-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Regular fit with 7" inseam — true to size',
    fabric: '97% organic cotton, 3% elastane twill, 240gsm',
    care: ['Machine wash cold', 'Tumble dry medium', 'Warm iron', 'Do not bleach'],
    features: [
      '7-inch inseam',
      'Flat front with zip fly',
      'Slant front pockets',
      'Single back welt pocket with button',
      'Stretch for comfort',
    ],
    images: [
      '/images/products/men-chino-short.jpg',
      '/images/products/men-chino-short-2.jpg',
    ],
    rating: 4.5,
    reviewCount: 72,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    inventory: 53,
  },
  {
    id: 'mws-014',
    slug: 'men-sweatshirt',
    name: 'Weekend Sweatshirt',
    subtitle: 'Your Sunday uniform, elevated',
    description:
      'A medium-weight crewneck sweatshirt in brushed-back organic cotton fleece. Features raglan sleeves for unrestricted movement, ribbed cuffs and hem, and a kangaroo pocket. The kind of sweatshirt that looks good enough to wear out but feels like staying in.',
    price: 1999,
    category: 'men',
    collections: ['weekend-shop'],
    tags: ['sweatshirt', 'cotton', 'everyday', 'lounge'],
    colors: [
      {
        name: 'Charcoal',
        hex: '#36454F',
        image: '/images/products/men-sweatshirt.jpg',
        hoverImage: '/images/products/men-sweatshirt-2.jpg',
      },
      {
        name: 'Cream',
        hex: '#FFFDD0',
        image: '/images/products/men-sweatshirt.jpg',
        hoverImage: '/images/products/men-sweatshirt-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Relaxed fit — true to size',
    fabric: '100% organic cotton fleece, 320gsm',
    care: ['Machine wash cold inside out', 'Tumble dry low', 'Do not bleach', 'Cool iron inside out'],
    features: [
      'Brushed-back fleece interior',
      'Raglan sleeve construction',
      'Kangaroo pocket',
      'Ribbed cuffs and hem',
      'Reinforced neckline tape',
    ],
    images: [
      '/images/products/men-sweatshirt.jpg',
      '/images/products/men-sweatshirt-2.jpg',
    ],
    rating: 4.7,
    reviewCount: 98,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    inventory: 44,
  },
  {
    id: 'mos-015',
    slug: 'men-overshirt',
    name: 'Lightweight Overshirt',
    subtitle: 'The perfect layer for in-between weather',
    description:
      'A versatile overshirt that works as a light jacket, a shirt, or a layering piece. Made from a durable cotton-linen blend with a soft brushed finish. Features dual chest pockets, adjustable cuffs, and a straight hem that looks great worn open or buttoned.',
    price: 2399,
    category: 'men',
    collections: ['weekend-shop', 'linen-edit'],
    tags: ['shirt', 'linen', 'layering', 'everyday'],
    colors: [
      {
        name: 'Slate Blue',
        hex: '#6A8CAF',
        image: '/images/products/men-overshirt.jpg',
        hoverImage: '/images/products/men-overshirt-2.jpg',
      },
      {
        name: 'Sand',
        hex: '#D4C5A9',
        image: '/images/products/men-overshirt.jpg',
        hoverImage: '/images/products/men-overshirt-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Regular fit — designed to layer over a tee',
    fabric: '60% cotton, 40% linen, 220gsm',
    care: ['Machine wash cold gentle', 'Hang dry', 'Warm iron', 'Do not bleach'],
    features: [
      'Dual chest pockets with flap',
      'Adjustable button cuffs',
      'Straight hem for layering',
      'YKK buttons',
      'Interior shoulder seams taped',
    ],
    images: [
      '/images/products/men-overshirt.jpg',
      '/images/products/men-overshirt-2.jpg',
    ],
    rating: 4.6,
    reviewCount: 63,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    inventory: 27,
  },
  {
    id: 'mpl-016',
    slug: 'men-polo',
    name: 'Travel Polo',
    subtitle: 'Smart-casual made easy',
    description:
      'A refined polo in our softest piqué cotton. Features a clean placket with two buttons, a ribbed collar and cuff, and a slightly longer back hem. The perfect middle ground between a tee and a button-down — dress it up or down effortlessly.',
    price: 1599,
    category: 'men',
    collections: ['soft-tee-shop'],
    tags: ['tee', 'cotton', 'everyday', 'summer'],
    colors: [
      {
        name: 'White',
        hex: '#FAF9F6',
        image: '/images/products/men-polo.jpg',
        hoverImage: '/images/products/men-polo-2.jpg',
      },
      {
        name: 'Navy',
        hex: '#2C3E50',
        image: '/images/products/men-polo.jpg',
        hoverImage: '/images/products/men-polo-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Regular fit — true to size',
    fabric: '100% organic cotton piqué, 210gsm',
    care: ['Machine wash cold', 'Tumble dry low', 'Cool iron', 'Do not bleach'],
    features: [
      'Classic piqué texture',
      'Two-button placket',
      'Ribbed collar and sleeve cuffs',
      'Side vents at hem',
      'Pre-shrunk fabric',
    ],
    images: [
      '/images/products/men-polo.jpg',
      '/images/products/men-polo-2.jpg',
    ],
    rating: 4.5,
    reviewCount: 56,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    inventory: 48,
  },
  {
    id: 'mss-017',
    slug: 'men-swim-short',
    name: 'Sunset Swim Short',
    subtitle: 'From the waves to the lounge chair',
    description:
      'Quick-dry swim shorts with a clean, modern silhouette. Features an elastic waistband with drawstring, mesh lining, and a single back pocket with drainage eyelet. The 6-inch inseam hits just above the knee for a flattering look.',
    price: 1499,
    category: 'men',
    collections: ['weekend-shop'],
    tags: ['short', 'swim', 'summer', 'resort'],
    colors: [
      {
        name: 'Coral',
        hex: '#FF7F50',
        image: '/images/products/men-swim-short.jpg',
        hoverImage: '/images/products/men-swim-short-2.jpg',
      },
      {
        name: 'Teal',
        hex: '#008080',
        image: '/images/products/men-swim-short.jpg',
        hoverImage: '/images/products/men-swim-short-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Regular fit with 6" inseam — true to size',
    fabric: '100% recycled polyester, quick-dry',
    care: ['Machine wash cold', 'Hang dry', 'Do not iron', 'Do not bleach'],
    features: [
      'Quick-dry recycled polyester',
      'Mesh inner lining',
      'Elastic waistband with drawstring',
      'Back pocket with drainage eyelet',
      'Rust-proof metal grommets',
    ],
    images: [
      '/images/products/men-swim-short.jpg',
      '/images/products/men-swim-short-2.jpg',
    ],
    rating: 4.4,
    reviewCount: 34,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    inventory: 39,
  },
  {
    id: 'mpt-018',
    slug: 'men-trouser',
    name: 'Easy Pull-On Trouser',
    subtitle: 'Tailored look, elastic ease',
    description:
      'Smart trousers with a hidden elastic waistband that looks tailored but feels like sweats. Features a flat front, clean pressed crease, and a comfortable stretch fabric. These are the trousers you\'ll reach for every day.',
    price: 1899,
    category: 'men',
    collections: ['weekend-shop'],
    tags: ['pant', 'cotton', 'everyday'],
    colors: [
      {
        name: 'Black',
        hex: '#1A1A1A',
        image: '/images/products/men-trouser.jpg',
        hoverImage: '/images/products/men-trouser-2.jpg',
      },
      {
        name: 'Stone',
        hex: '#928E85',
        image: '/images/products/men-trouser.jpg',
        hoverImage: '/images/products/men-trouser-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Slim-tapered fit — true to size',
    fabric: '96% organic cotton, 4% elastane twill, 260gsm',
    care: ['Machine wash cold', 'Tumble dry medium', 'Warm iron', 'Do not bleach'],
    features: [
      'Hidden elastic waistband',
      'Zip fly with button closure',
      'Front slant pockets',
      'Back welt pockets',
      'Pressed crease leg',
    ],
    images: [
      '/images/products/men-trouser.jpg',
      '/images/products/men-trouser-2.jpg',
    ],
    rating: 4.6,
    reviewCount: 81,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    inventory: 56,
  },
  {
    id: 'mgt-019',
    slug: 'men-graphic-tee',
    name: 'Washed Graphic Tee',
    subtitle: 'Art-prints on our softest cotton',
    description:
      'A relaxed-fit tee featuring original hand-drawn artwork by our in-house artists. Printed with water-based inks on our signature Supersoft organic cotton. The vintage wash gives it that perfectly worn-in look from day one.',
    price: 1099,
    category: 'men',
    collections: ['soft-tee-shop'],
    tags: ['tee', 'cotton', 'graphic', 'everyday', 'summer'],
    colors: [
      {
        name: 'Washed Black',
        hex: '#333333',
        image: '/images/products/men-crew-tee.jpg',
        hoverImage: '/images/products/men-crew-tee-2.jpg',
      },
      {
        name: 'Faded Teal',
        hex: '#5F9EA0',
        image: '/images/products/men-crew-tee.jpg',
        hoverImage: '/images/products/men-crew-tee-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Relaxed fit — true to size',
    fabric: '100% organic cotton, 220gsm',
    care: ['Machine wash cold inside out', 'Tumble dry low', 'Do not iron print', 'Do not bleach'],
    features: [
      'Original hand-drawn artwork',
      'Water-based eco-friendly inks',
      'Vintage garment wash',
      'Drop shoulder construction',
      'Pre-shrunk fabric',
    ],
    images: [
      '/images/products/men-crew-tee.jpg',
      '/images/products/men-crew-tee-2.jpg',
    ],
    rating: 4.3,
    reviewCount: 29,
    isNew: true,
    isBestSeller: false,
    isSale: false,
    inventory: 67,
  },

  // ─── ACCESSORIES ─────────────────────────────────────────────────────────
  {
    id: 'atb-020',
    slug: 'market-day-tote',
    name: 'Market Day Tote',
    subtitle: 'Carry everything, look good doing it',
    description:
      'A generously sized canvas tote in heavyweight organic cotton. Features inner pockets, a magnetic snap closure, and reinforced handles long enough to carry on the shoulder. Perfect for market runs, beach days, or as your everyday bag.',
    price: 899,
    category: 'accessories',
    collections: ['weekend-shop'],
    tags: ['accessory', 'bag', 'cotton', 'everyday'],
    colors: [
      {
        name: 'Natural',
        hex: '#E8DFD0',
        image: '/images/products/tote-bag.jpg',
        hoverImage: '/images/products/tote-bag-2.jpg',
      },
      {
        name: 'Black',
        hex: '#1A1A1A',
        image: '/images/products/tote-bag.jpg',
        hoverImage: '/images/products/tote-bag-2.jpg',
      },
    ],
    sizes: ['One Size'],
    fit: 'One size — 45cm W × 35cm H × 12cm D',
    fabric: '100% organic cotton canvas, 340gsm',
    care: ['Spot clean', 'Hand wash cold if needed', 'Do not tumble dry', 'Do not bleach'],
    features: [
      'Heavyweight canvas construction',
      'Inner zip pocket + 2 slip pockets',
      'Magnetic snap closure',
      'Reinforced shoulder-length handles',
      'Driftwear woven label',
    ],
    images: [
      '/images/products/tote-bag.jpg',
      '/images/products/tote-bag-2.jpg',
    ],
    rating: 4.7,
    reviewCount: 94,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    inventory: 73,
  },
  {
    id: 'abc-021',
    slug: 'beach-walk-cap',
    name: 'Beach Walk Cap',
    subtitle: 'Shade with style',
    description:
      'An unstructured five-panel cap in washed organic cotton canvas. Features a curved brim, adjustable snapback closure, and a subtle embroidered Driftwear logo. Lightweight and packable — stuff it in your bag and go.',
    price: 699,
    category: 'accessories',
    collections: ['weekend-shop'],
    tags: ['accessory', 'cap', 'cotton', 'summer'],
    colors: [
      {
        name: 'Sand',
        hex: '#D4C5A9',
        image: '/images/products/cap.jpg',
        hoverImage: '/images/products/cap-2.jpg',
      },
      {
        name: 'Stone',
        hex: '#928E85',
        image: '/images/products/cap.jpg',
        hoverImage: '/images/products/cap-2.jpg',
      },
    ],
    sizes: ['One Size'],
    fit: 'One size — adjustable snapback (54–60cm)',
    fabric: '100% organic cotton canvas, 280gsm',
    care: ['Hand wash cold', 'Air dry', 'Do not bleach', 'Do not iron brim'],
    features: [
      'Unstructured five-panel design',
      'Adjustable snapback closure',
      'Curved brim',
      'Subtle embroidered logo',
      'Ventilation eyelets',
    ],
    images: [
      '/images/products/cap.jpg',
      '/images/products/cap-2.jpg',
    ],
    rating: 4.5,
    reviewCount: 67,
    isNew: false,
    isBestSeller: false,
    isSale: false,
    inventory: 88,
  },
  {
    id: 'ars-022',
    slug: 'ribbed-sock-pack',
    name: 'Ribbed Sock Pack',
    subtitle: 'The everyday essential, elevated',
    description:
      'A 3-pack of ribbed crew socks in our signature Supersoft organic cotton. Features a reinforced heel and toe, arch support band, and a stay-up ribbed cuff. Comes in a curated color trio that works with everything in your wardrobe.',
    price: 499,
    category: 'accessories',
    collections: ['soft-tee-shop'],
    tags: ['accessory', 'socks', 'cotton', 'everyday'],
    colors: [
      {
        name: 'Mix Pack',
        hex: '#928E85',
        image: '/images/products/socks.jpg',
        hoverImage: '/images/products/socks-2.jpg',
      },
      {
        name: 'Earth Pack',
        hex: '#8B7355',
        image: '/images/products/socks.jpg',
        hoverImage: '/images/products/socks-2.jpg',
      },
    ],
    sizes: ['One Size'],
    fit: 'One size — fits UK 6–11 / EU 39–45',
    fabric: '80% organic cotton, 18% polyamide, 2% elastane',
    care: ['Machine wash cold', 'Do not tumble dry', 'Do not bleach', 'Do not iron'],
    features: [
      'Pack of 3 pairs',
      'Reinforced heel and toe',
      'Arch support band',
      'Stay-up ribbed cuff',
      'Hand-linked toe seam for comfort',
    ],
    images: [
      '/images/products/socks.jpg',
      '/images/products/socks-2.jpg',
    ],
    rating: 4.6,
    reviewCount: 118,
    isNew: false,
    isBestSeller: true,
    isSale: false,
    inventory: 142,
  },

  // ─── LAST CALL (SALE) ────────────────────────────────────────────────────
  {
    id: 'lcs-023',
    slug: 'graphic-tee-sale',
    name: 'Last Call Graphic Tee',
    subtitle: 'Original art, final print run',
    description:
      'A limited-edition graphic tee featuring exclusive artwork from our Summer \'24 collection. Printed on our Supersoft cotton base with water-based inks. This is the final run — once they\'re gone, this print will never be produced again.',
    price: 549,
    compareAtPrice: 799,
    category: 'accessories',
    collections: ['last-call'],
    tags: ['tee', 'cotton', 'graphic', 'sale'],
    colors: [
      {
        name: 'Washed Navy',
        hex: '#34495E',
        image: '/images/products/graphic-tee-sale.jpg',
        hoverImage: '/images/products/graphic-tee-sale-2.jpg',
      },
      {
        name: 'Dusty Olive',
        hex: '#6B7B3A',
        image: '/images/products/graphic-tee-sale.jpg',
        hoverImage: '/images/products/graphic-tee-sale-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Relaxed fit — true to size',
    fabric: '100% organic cotton, 220gsm',
    care: ['Machine wash cold inside out', 'Tumble dry low', 'Do not iron print', 'Do not bleach'],
    features: [
      'Exclusive limited-edition artwork',
      'Water-based eco inks',
      'Final print run — no restocks',
      'Drop shoulder construction',
      'Vintage garment wash',
    ],
    images: [
      '/images/products/graphic-tee-sale.jpg',
      '/images/products/graphic-tee-sale-2.jpg',
    ],
    rating: 4.4,
    reviewCount: 42,
    isNew: false,
    isBestSeller: false,
    isSale: true,
    inventory: 15,
  },
  {
    id: 'lcd-024',
    slug: 'double-cloth-sale',
    name: 'Double Cloth Shirt',
    subtitle: 'Two layers of goodness, one incredible price',
    description:
      'A unique double-cloth shirt with contrasting inner and outer layers. The fabric has a beautiful textural quality and drapes like a dream. This style is being discontinued to make room for new designs — grab it at a fraction of the original price.',
    price: 1499,
    compareAtPrice: 2199,
    category: 'accessories',
    collections: ['last-call'],
    tags: ['shirt', 'cotton', 'sale', 'layering'],
    colors: [
      {
        name: 'Indigo',
        hex: '#4B0082',
        image: '/images/products/double-cloth-sale.jpg',
        hoverImage: '/images/products/double-cloth-sale-2.jpg',
      },
      {
        name: 'Rust',
        hex: '#B7410E',
        image: '/images/products/double-cloth-sale.jpg',
        hoverImage: '/images/products/double-cloth-sale-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Relaxed fit — true to size',
    fabric: '100% organic cotton double-cloth, 280gsm',
    care: ['Machine wash cold', 'Hang dry', 'Warm iron', 'Do not bleach'],
    features: [
      'Contrasting double-cloth construction',
      'Button-down collar',
      'Chest pocket',
      'Discontinued style — limited stock',
      'Coconut shell buttons',
    ],
    images: [
      '/images/products/double-cloth-sale.jpg',
      '/images/products/double-cloth-sale-2.jpg',
    ],
    rating: 4.5,
    reviewCount: 38,
    isNew: false,
    isBestSeller: false,
    isSale: true,
    inventory: 12,
  },
  {
    id: 'lcc-025',
    slug: 'cardigan-sale',
    name: 'Coffee Run Cardigan',
    subtitle: 'Your grab-and-go layer, now on sale',
    description:
      'A lightweight open-front cardigan in a cozy cotton-cashmere blend. Features drop shoulders, ribbed trim, and two deep patch pockets. Perfect for cool mornings, air-conditioned offices, and coffee runs. Being cleared out at an unbeatable price.',
    price: 1249,
    compareAtPrice: 1899,
    category: 'accessories',
    collections: ['last-call'],
    tags: ['sweatshirt', 'cotton', 'sale', 'layering'],
    colors: [
      {
        name: 'Heather Grey',
        hex: '#B6B6B4',
        image: '/images/products/cardigan-sale.jpg',
        hoverImage: '/images/products/cardigan-sale-2.jpg',
      },
      {
        name: 'Camel',
        hex: '#C19A6B',
        image: '/images/products/cardigan-sale.jpg',
        hoverImage: '/images/products/cardigan-sale-2.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fit: 'Oversized relaxed fit — size down for closer fit',
    fabric: '90% organic cotton, 10% cashmere, 300gsm',
    care: ['Hand wash cold', 'Lay flat to dry', 'Do not bleach', 'Cool iron with cloth'],
    features: [
      'Open-front design — no buttons',
      'Drop shoulder construction',
      'Ribbed trim at cuffs and hem',
      'Two deep patch pockets',
      'Cotton-cashmere blend for softness',
    ],
    images: [
      '/images/products/cardigan-sale.jpg',
      '/images/products/cardigan-sale-2.jpg',
    ],
    rating: 4.7,
    reviewCount: 51,
    isNew: false,
    isBestSeller: false,
    isSale: true,
    inventory: 9,
  },
];

// ─── HELPER FUNCTIONS ──────────────────────────────────────────────────────

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category === category
  );
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collections.includes(collection));
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => p.isSale);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;

  return products.filter((p) => {
    const searchFields = [
      p.name,
      p.subtitle,
      p.description,
      p.category,
      ...p.tags,
      ...p.collections,
      ...p.colors.map((c) => c.name),
      ...p.features,
    ];
    return searchFields.some((field) =>
      field.toLowerCase().includes(q)
    );
  });
}

export function filterProducts(
  allProducts: Product[],
  filters: FilterState
): Product[] {
  let filtered = [...allProducts];

  // Category filter
  if (filters.categories.length > 0) {
    filtered = filtered.filter((p) =>
      filters.categories.includes(p.category)
    );
  }

  // Price range filter
  if (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity) {
    filtered = filtered.filter(
      (p) =>
        p.price >= filters.priceRange[0] &&
        p.price <= filters.priceRange[1]
    );
  }

  // Size filter
  if (filters.sizes.length > 0) {
    filtered = filtered.filter((p) =>
      filters.sizes.some((s) => p.sizes.includes(s))
    );
  }

  // Color filter
  if (filters.colors.length > 0) {
    filtered = filtered.filter((p) =>
      p.colors.some((c) => filters.colors.includes(c.name.toLowerCase()))
    );
  }

  // Collection filter
  if (filters.collections.length > 0) {
    filtered = filtered.filter((p) =>
      p.collections.some((c) => filters.collections.includes(c))
    );
  }

  // In stock filter
  if (filters.inStock) {
    filtered = filtered.filter((p) => p.inventory > 0);
  }

  // Sort
  switch (filters.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'newest':
    default:
      filtered.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return b.reviewCount - a.reviewCount;
      });
      break;
  }

  return filtered;
}

export function getRelatedProducts(
  product: Product,
  limit: number = 4
): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.collections.some((c) => product.collections.includes(c)))
    )
    .slice(0, limit);
}