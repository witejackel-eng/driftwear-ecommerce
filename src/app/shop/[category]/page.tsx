'use client';

import { useState, useMemo, useCallback, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Container } from '@/components/shared/Container';
import { EmptyState } from '@/components/shared/EmptyState';
import { Reveal } from '@/components/shared/Reveal';
import { FilterPanelContent } from '@/components/shared/FilterPanelContent';
import { ProductCard } from '@/components/product/ProductCard';
import {
  products,
  filterProducts,
  searchProducts,
  getNewArrivals,
  getBestSellers,
  getSaleProducts,
} from '@/data/products';
import { collections } from '@/data/collections';
import type { ProductCategory, FilterState } from '@/lib/types';

const CATEGORY_TITLES: Record<string, string> = {
  women: 'Women',
  men: 'Men',
  new: 'New Arrivals',
  'best-sellers': 'Best Sellers',
  'last-call': 'Last Call',
};

function CategoryFallback() {
  return (
    <main className="flex-1">
      <Container className="py-8 md:py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-48 bg-cream rounded-sm" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-cream" />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const categorySlug = params.category as string;
  const urlSearch = searchParams.get('search') || '';
  const urlCollection = searchParams.get('collection') || '';
  const urlSort = searchParams.get('sort') || 'featured';

  const searchQuery = urlSearch;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, Infinity],
    sizes: [],
    colors: [],
    collections: urlCollection ? [urlCollection] : [],
    sortBy: urlSort === 'price-asc' ? 'price-asc'
      : urlSort === 'price-desc' ? 'price-desc'
      : 'newest',
    inStock: false,
  });

  // Base products for this category
  const baseProducts = useMemo(() => {
    switch (categorySlug) {
      case 'women':
        return products.filter((p) => p.category === 'women');
      case 'men':
        return products.filter((p) => p.category === 'men');
      case 'new':
        return getNewArrivals();
      case 'best-sellers':
        return getBestSellers();
      case 'last-call':
        return getSaleProducts();
      default:
        return products;
    }
  }, [categorySlug]);

  const allColors = useMemo(() => {
    const colorSet = new Set<string>();
    baseProducts.forEach((p) =>
      p.colors.forEach((c) => colorSet.add(c.name.toLowerCase()))
    );
    return Array.from(colorSet).sort();
  }, [baseProducts]);

  const filteredProducts = useMemo(() => {
    let result = searchQuery
      ? searchProducts(searchQuery).filter((p) =>
          baseProducts.some((bp) => bp.id === p.id)
        )
      : [...baseProducts];
    result = filterProducts(result, filters);
    return result;
  }, [searchQuery, filters, baseProducts]);

  const updateURL = useCallback(
    (key: string, value: string) => {
      const p = new URLSearchParams(searchParams.toString());
      if (value) p.set(key, value);
      else p.delete(key);
      router.replace(
        `/shop/${categorySlug}${p.toString() ? '?' + p.toString() : ''}`,
        { scroll: false }
      );
    },
    [router, searchParams, categorySlug]
  );

  const handleSortChange = (value: string) => {
    updateURL('sort', value === 'featured' ? '' : value);
    setFilters((prev) => ({
      ...prev,
      sortBy: value === 'price-asc' ? 'price-asc'
        : value === 'price-desc' ? 'price-desc'
        : 'newest',
    }));
  };

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
    router.replace(`/shop/${categorySlug}`, { scroll: false });
  };

  const pageTitle = CATEGORY_TITLES[categorySlug] || categorySlug;
  const hiddenCategory =
    categorySlug === 'women' || categorySlug === 'men' ? categorySlug : undefined;

  // Active filter chips
  const activeFilterChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    filters.categories.forEach((cat) => {
      chips.push({
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        onRemove: () => setFilters((f) => ({ ...f, categories: f.categories.filter((c) => c !== cat) })),
      });
    });
    filters.collections.forEach((col) => {
      const colObj = collections.find((c) => c.slug === col);
      chips.push({
        label: colObj?.name || col,
        onRemove: () => setFilters((f) => ({ ...f, collections: f.collections.filter((c) => c !== col) })),
      });
    });
    filters.sizes.forEach((size) => {
      chips.push({
        label: `Size: ${size}`,
        onRemove: () => setFilters((f) => ({ ...f, sizes: f.sizes.filter((s) => s !== size) })),
      });
    });
    filters.colors.forEach((color) => {
      chips.push({
        label: color.charAt(0).toUpperCase() + color.slice(1),
        onRemove: () => setFilters((f) => ({ ...f, colors: f.colors.filter((c) => c !== color) })),
      });
    });
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity) {
      const rangeLabel = filters.priceRange[1] === Infinity
        ? `Over ${formatFilterPrice(filters.priceRange[0])}`
        : `${formatFilterPrice(filters.priceRange[0])} – ${formatFilterPrice(filters.priceRange[1])}`;
      chips.push({
        label: rangeLabel,
        onRemove: () => setFilters((f) => ({ ...f, priceRange: [0, Infinity] })),
      });
    }
    return chips;
  }, [filters]);

  const sortValue = urlSort === 'price-asc' ? 'price-asc' : urlSort === 'price-desc' ? 'price-desc' : 'featured';

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
                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <Reveal>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-ink">
              {pageTitle}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 h-9 rounded-sm bg-cream/50 border-sand"
                />
              </div>

              <Select
                value={sortValue}
                onValueChange={handleSortChange}
              >
                <SelectTrigger className="w-[160px] h-9 rounded-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low–High</SelectItem>
                  <SelectItem value="price-desc">Price: High–Low</SelectItem>
                </SelectContent>
              </Select>

              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="md:hidden h-9 rounded-sm gap-2 border-sand"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="font-[family-name:var(--font-instrument-serif)] text-2xl">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="px-4 py-4">
                    <FilterPanelContent
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClear={clearAllFilters}
                      allColors={allColors}
                      hiddenCategory={hiddenCategory}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </Reveal>
        </div>

        {/* Active filter chips */}
        {activeFilterChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilterChips.map((chip) => (
              <button
                key={chip.label}
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-cream text-xs font-medium text-ink rounded-sm border border-sand hover:border-ink/30 transition-colors"
              >
                {chip.label}
                <span className="text-muted-foreground">×</span>
              </button>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs text-clay hover:underline px-2 py-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Product count — grammatically correct */}
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

        {/* Layout */}
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
                hiddenCategory={hiddenCategory}
              />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 md:gap-x-5 md:gap-y-8">
                {filteredProducts.map((product, i) => (
                  <Reveal key={product.id} delay={Math.min(i * 0.04, 0.24)}>
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

function formatFilterPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<CategoryFallback />}>
      <CategoryContent />
    </Suspense>
  );
}