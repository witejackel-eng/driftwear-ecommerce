import type { Metadata } from 'next';

const SITE_NAME = 'Driftwear Studio';
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://driftwear-ecommerce.vercel.app';

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

export function generateSEOMetadata({ title, description, path, image }: SEOProps): Metadata {
  const url = `${BASE_URL}${path || ''}`;
  const fullTitle = path === '/' ? `${SITE_NAME} — Soft Everyday Clothing for Warm Days` : `${title} | ${SITE_NAME}`;
  const metaDescription =
    description || `${title} — Driftwear Studio, soft everyday clothing for warm days.`;

  return {
    title: fullTitle,
    description: metaDescription,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description: metaDescription,
    },
    alternates: {
      canonical: url,
    },
  };
}