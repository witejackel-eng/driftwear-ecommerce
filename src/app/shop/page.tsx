'use client';

import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  X,
  ShoppingBag,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Container } from '@/components/shared/Container';
import { EmptyState } from '@/components/shared/EmptyState';
import { Reveal } from '@/components/shared/Reveal';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice, cn } from '@/lib/utils';
import {
  products,
  filterProducts,
  searchProducts,
} from '@/data/products';
import { collections } from '@/data/collections';
import type { Product, ProductCategory, FilterState } from '@/lib/types';

// ─── Inline ProductCard (until product agent delivers) ────────────────────


// ─── Filter Panel ─────────────────────────────────────────────────────────
const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const PRICE_RANGES: { label: string; range: [number, number] }[] = [
  { label: 'Under ₹999', range: [0, 998] },
  { label: '₹999 – ₹1,999', range: [999, 1999] },
  { label: '₹2,000 – ₹2,999', range: [2000, 2999] },
  { label: '₹3,000+', range: [3000, Infinity] },
];

function FilterPanelContent({
  filters,
  onFiltersChange,
  onClear,
  allColors,
}: {
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  onClear: () => void;
  allColors: string[];
}) {
  const toggleCategory = useCallback(
    (cat: ProductCategory) => {
      const next = filters.categories.includes(cat)
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat];
      onFiltersChange({ ...filters, categories: next });
    },
    [filters, onFiltersChange]
  );

  const toggleSize = useCallback(
    (size: string) => {
      const next = filters.sizes.includes(size)
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size];
      onFiltersChange({ ...filters, sizes: next });
    },
    [filters, onFiltersChange]
  );

  const toggleColor = useCallback(
    (color: string) => {
      const next = filters.colors.includes(color)
        ? filters.colors.filter((c) => c !== color)
        : [...filters.colors, color];
      onFiltersChange({ ...filters, colors: next });
    },
    [filters, onFiltersChange]
  );

  const toggleCollection = useCallback(
    (slug: string) => {
      const next = filters.collections.includes(slug)
        ? filters.collections.filter((c) => c !== slug)
        : [...filters.collections, slug];
      onFiltersChange({ ...filters, collections: next });
    },
    [filters, onFiltersChange]
  );

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.collections.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < Infinity;

  return (
    <div className="space-y-6">
      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="text-xs text-terracotta hover:underline flex items-center gap-1"
        >
          <X className="w-3 h-3" /> Clear all filters
        </button>
      )}

      <Separator />

      {/* Category */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink mb-3">
          Category
        </h4>
        <div className="space-y-2">
          {(['women', 'men', 'accessories'] as ProductCategory[]).map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={filters.categories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
                className="data-[state=checked]:bg-navy data-[state=checked]:border-navy rounded-sm"
              />
              <span className="text-sm text-ink/80 group-hover:text-ink capitalize">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Collection */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink mb-3">
          Collection
        </h4>
        <div className="space-y-2">
          {collections.map((col) => (
            <label
              key={col.slug}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={filters.collections.includes(col.slug)}
                onCheckedChange={() => toggleCollection(col.slug)}
                className="data-[state=checked]:bg-navy data-[state=checked]:border-navy rounded-sm"
              />
              <span className="text-sm text-ink/80 group-hover:text-ink">
                {col.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Size */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={cn(
                'h-8 px-3 text-xs border rounded-sm transition-colors',
                filters.sizes.includes(size)
                  ? 'bg-navy text-white border-navy'
                  : 'border-border text-ink/70 hover:border-ink/40'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Color */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink mb-3">
          Colour
        </h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => {
            const productColor = products
              .flatMap((p) => p.colors)
              .find((c) => c.name.toLowerCase() === color);
            return (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className={cn(
                  'w-7 h-7 rounded-full border-2 transition-all',
                  filters.colors.includes(color)
                    ? 'ring-2 ring-navy ring-offset-2'
                    : 'border-black/10 hover:border-black/30'
                )}
                style={{ backgroundColor: productColor?.hex || '#ccc' }}
                title={color}
              />
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink mb-3">
          Price
        </h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((pr) => (
            <label
              key={pr.label}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={
                  filters.priceRange[0] === pr.range[0] &&
                  filters.priceRange[1] === pr.range[1]
                }
                onCheckedChange={() =>
                  onFiltersChange({
                    ...filters,
                    priceRange:
                      filters.priceRange[0] === pr.range[0] &&
                      filters.priceRange[1] === pr.range[1]
                        ? [0, Infinity]
                        : pr.range,
                  })
                }
                className="data-[state=checked]:bg-navy data-[state=checked]:border-navy rounded-sm"
              />
              <span className="text-sm text-ink/80 group-hover:text-ink">
                {pr.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';
  const urlCollection = searchParams.get('collection') || '';

  const searchQuery = urlSearch;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: urlCategory
      ? [urlCategory as ProductCategory]
      : [],
    priceRange: [0, Infinity],
    sizes: [],
    colors: [],
    collections: urlCollection ? [urlCollection] : [],
    sortBy: 'newest',
    inStock: false,
  });

  // Extract unique colors from all products
  const allColors = useMemo(() => {
    const colorSet = new Set<string>();
    products.forEach((p) =>
      p.colors.forEach((c) => colorSet.add(c.name.toLowerCase()))
    );
    return Array.from(colorSet).sort();
  }, []);

  // Apply search then filters
  const filteredProducts = useMemo(() => {
    let result = searchQuery ? searchProducts(searchQuery) : [...products];
    result = filterProducts(result, filters);
    return result;
  }, [searchQuery, filters]);

  const updateURL = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.replace(`/shop${params.toString() ? '?' + params.toString() : ''}`, {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  const handleSearchChange = (value: string) => {
    updateURL('search', value);
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, Infinity],
      sizes: [],
      colors: [],
      collections: [],
      sortBy: 'newest',
      inStock: false,
    });
    router.replace('/shop', { scroll: false });
  };

  return (
    <main className="flex-1">
      <Container className="py-8 md:py-12">
        {/* Breadcrumb */}
        <Reveal>
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shop</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <Reveal>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-ink">
              Shop All
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 h-9 rounded-sm bg-cream/50 border-sand"
                />
              </div>

              {/* Sort */}
              <Select
                value={filters.sortBy}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: value as FilterState['sortBy'],
                  }))
                }
              >
                <SelectTrigger className="w-[160px] h-9 rounded-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low–High</SelectItem>
                  <SelectItem value="price-desc">Price: High–Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile filter trigger */}
              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="md:hidden h-9 rounded-sm gap-2"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="px-4 py-4">
                    <FilterPanelContent
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClear={clearAllFilters}
                      allColors={allColors}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </Reveal>
        </div>

        {/* Product count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          {searchQuery && (
            <span>
              {' '}
              for &ldquo;
              <span className="text-ink font-medium">{searchQuery}</span>
              &rdquo;
            </span>
          )}
        </p>

        {/* Layout: Sidebar + Grid */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin pr-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink mb-4">
                Filters
              </h3>
              <FilterPanelContent
                filters={filters}
                onFiltersChange={setFilters}
                onClear={clearAllFilters}
                allColors={allColors}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
                {filteredProducts.map((product, i) => (
                  <Reveal key={product.id} delay={Math.min(i * 0.05, 0.3)}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={ShoppingBag}
                title="No products found"
                description={
                  searchQuery
                    ? `We couldn't find anything for "${searchQuery}". Try a different search or clear your filters.`
                    : 'No products match your current filters. Try removing some.'
                }
                actionLabel="Clear Filters"
                onAction={clearAllFilters}
              />
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}