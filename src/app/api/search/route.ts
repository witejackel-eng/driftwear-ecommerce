import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/data/products';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';
  const trimmed = q.trim().toLowerCase();

  if (!trimmed || trimmed.length < 2) {
    return NextResponse.json({ products: [] });
  }

  const results = searchProducts(trimmed).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.compareAtPrice,
    image: p.colors[0]?.image || '',
    slug: p.slug,
  }));

  return NextResponse.json({ products: results });
}