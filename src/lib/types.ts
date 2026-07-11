export type ProductCategory = 'women' | 'men' | 'accessories';

export type ProductColor = {
  name: string;
  hex: string;
  image: string;
  hoverImage?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  collections: string[];
  tags: string[];
  colors: ProductColor[];
  sizes: string[];
  fit: string;
  fabric: string;
  care: string[];
  features: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  isSale: boolean;
  inventory: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
};

export type WishlistItem = {
  productId: string;
  addedAt: string;
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  productSlugs: string[];
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type FAQ = {
  question: string;
  answer: string;
};

export type SizeGuide = {
  size: string;
  chest: string;
  waist: string;
  length: string;
};

export type FilterState = {
  categories: ProductCategory[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  collections: string[];
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
  inStock: boolean;
};