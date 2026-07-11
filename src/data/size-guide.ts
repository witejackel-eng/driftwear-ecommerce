import type { SizeGuide } from '@/lib/types';

export const womenSizeGuide: SizeGuide[] = [
  { size: 'XS', chest: '32"', waist: '26"', length: '24.5"' },
  { size: 'S', chest: '34"', waist: '28"', length: '25"' },
  { size: 'M', chest: '36"', waist: '30"', length: '25.5"' },
  { size: 'L', chest: '38"', waist: '32"', length: '26"' },
  { size: 'XL', chest: '40"', waist: '34"', length: '26.5"' },
  { size: 'XXL', chest: '42"', waist: '36"', length: '27"' },
];

export const menSizeGuide: SizeGuide[] = [
  { size: 'XS', chest: '36"', waist: '28"', length: '27"' },
  { size: 'S', chest: '38"', waist: '30"', length: '27.5"' },
  { size: 'M', chest: '40"', waist: '32"', length: '28"' },
  { size: 'L', chest: '42"', waist: '34"', length: '28.5"' },
  { size: 'XL', chest: '44"', waist: '36"', length: '29"' },
  { size: 'XXL', chest: '46"', waist: '38"', length: '29.5"' },
];

export const accessorySizeGuide = [
  { label: 'One Size', description: 'Designed to fit most adults' },
  { label: 'Tote Bag', description: '45cm W × 35cm H × 12cm D' },
  { label: 'Cap', description: 'Adjustable snapback, fits 54–60cm head' },
  { label: 'Socks', description: 'Fits UK 6–11 / EU 39–45' },
];

export function getSizeGuideForCategory(
  category: 'women' | 'men' | 'accessories'
): SizeGuide[] {
  switch (category) {
    case 'women':
      return womenSizeGuide;
    case 'men':
      return menSizeGuide;
    default:
      return [];
  }
}