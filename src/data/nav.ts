import type { NavItem } from '@/lib/types';

export const navItems: NavItem[] = [
  {
    label: 'New',
    href: '/shop?sort=newest',
  },
  {
    label: 'Women',
    href: '/shop?category=women',
    children: [
      { label: 'Dresses', href: '/shop?category=women&tag=dress' },
      { label: 'Tops', href: '/shop?category=women&tag=top' },
      { label: 'Tees & Tanks', href: '/shop?category=women&tag=tee' },
      { label: 'Pants', href: '/shop?category=women&tag=pant' },
      { label: 'Matching Sets', href: '/shop?category=women&tag=set' },
      { label: 'Lounge', href: '/shop?category=women&tag=lounge' },
      { label: 'Accessories', href: '/shop?category=accessories' },
    ],
  },
  {
    label: 'Men',
    href: '/shop?category=men',
    children: [
      { label: 'Tees', href: '/shop?category=men&tag=tee' },
      { label: 'Shirts', href: '/shop?category=men&tag=shirt' },
      { label: 'Shorts', href: '/shop?category=men&tag=short' },
      { label: 'Pants', href: '/shop?category=men&tag=pant' },
      { label: 'Sweatshirts', href: '/shop?category=men&tag=sweatshirt' },
      { label: 'Resort Wear', href: '/shop?category=men&tag=resort' },
      { label: 'Accessories', href: '/shop?category=accessories' },
    ],
  },
  {
    label: 'Best Sellers',
    href: '/shop?filter=best-sellers',
  },
  {
    label: 'Last Call',
    href: '/shop?collection=last-call',
  },
  {
    label: 'Story',
    href: '/about',
  },
];

export const featuredNavItems: NavItem[] = [
  { label: 'New Arrivals', href: '/shop?sort=newest' },
  { label: 'Best Sellers', href: '/shop?filter=best-sellers' },
  { label: 'Summer Edit', href: '/shop?tag=summer' },
  { label: 'Linen Shop', href: '/shop?collection=linen-edit' },
  { label: 'Last Call', href: '/shop?collection=last-call' },
];