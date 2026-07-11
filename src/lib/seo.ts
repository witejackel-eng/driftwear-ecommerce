import type { Metadata } from 'next';

const SITE_NAME = 'Driftwear Studio';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://driftwear.studio';
const DEFAULT_DESCRIPTION =
  'Effortless, sustainable essentials for everyday life. Premium linen, organic cotton, and thoughtfully designed pieces made to last.';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '/images/hero/hero-main.jpg',
  type = 'website',
  noIndex = false,
}: SEOProps): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Effortless Everyday Essentials`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      locale: 'en_IN',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateProductSEOMetadata({
  productName,
  productDescription,
  productSlug,
  productImage,
  price,
}: {
  productName: string;
  productDescription: string;
  productSlug: string;
  productImage: string;
  price: number;
}): Metadata {
  return generateSEOMetadata({
    title: productName,
    description: productDescription,
    path: `/product/${productSlug}`,
    image: productImage,
    type: 'product',
  });
}