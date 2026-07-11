/**
 * Text formatting and transformation utilities
 */

/**
 * Truncate text to a maximum length, adding an ellipsis if needed
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Capitalize the first letter of a string
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert a slug to a human-readable title
 * e.g., "women-linen-shirt" → "Women Linen Shirt"
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Format a category name for display
 * e.g., "women" → "Women", "accessories" → "Accessories"
 */
export function formatCategory(category: string): string {
  return capitalize(category);
}

/**
 * Format a collection slug for display
 * e.g., "soft-tee-shop" → "Soft Tee Shop", "last-call" → "Last Call"
 */
export function formatCollectionSlug(slug: string): string {
  return slugToTitle(slug);
}

/**
 * Format a number with Indian numbering system (lakhs, crores)
 */
export function formatIndianNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Format a date to a readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format a date to a short string
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Format a relative time string (e.g., "2 days ago", "3 months ago")
 */
export function formatRelativeTime(dateString: string): string {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
  if (diffDay < 30) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffMonth < 12) return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
  return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
}

/**
 * Generate a star rating display text
 */
export function ratingText(rating: number, reviewCount: number): string {
  return `${rating.toFixed(1)} (${reviewCount} review${reviewCount !== 1 ? 's' : ''})`;
}

/**
 * Format care instructions for display
 * e.g., ["Machine wash cold", "Tumble dry low"] → "Machine wash cold · Tumble dry low"
 */
export function formatCareInstructions(instructions: string[]): string {
  return instructions.join(' · ');
}

/**
 * Clean and normalize a search query
 */
export function normalizeSearchQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s-]/g, '');
}

/**
 * Generate a Breadcrumb item from a slug
 */
export function breadcrumbFromPath(path: string): { label: string; href: string }[] {
  const segments = path.split('/').filter(Boolean);
  const items: { label: string; href: string }[] = [
    { label: 'Home', href: '/' },
  ];

  let cumulativePath = '';
  segments.forEach((segment) => {
    cumulativePath += `/${segment}`;
    items.push({
      label: slugToTitle(segment),
      href: cumulativePath,
    });
  });

  return items;
}