'use client';

import { useCallback } from 'react';
import { X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { products } from '@/data/products';
import { collections } from '@/data/collections';
import type { ProductCategory, FilterState } from '@/lib/types';

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const PRICE_RANGES: { label: string; range: [number, number] }[] = [
  { label: 'Under ₹999', range: [0, 998] },
  { label: '₹999 – ₹1,999', range: [999, 1999] },
  { label: '₹2,000 – ₹2,999', range: [2000, 2999] },
  { label: '₹3,000+', range: [3000, Infinity] },
];

interface FilterPanelContentProps {
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  onClear: () => void;
  allColors: string[];
  hiddenCategory?: string;
}

export function FilterPanelContent({
  filters,
  onFiltersChange,
  onClear,
  allColors,
  hiddenCategory,
}: FilterPanelContentProps) {
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

  const visibleCategories = (['women', 'men', 'accessories'] as ProductCategory[]).filter(
    (c) => c !== hiddenCategory
  );

  return (
    <div className="space-y-5">
      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="text-xs text-clay hover:underline flex items-center gap-1"
        >
          <X className="w-3 h-3" /> Clear all filters
        </button>
      )}

      <Separator />

      {/* Category (hide the active one) */}
      {visibleCategories.length > 0 && (
        <>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink mb-3">
              Category
            </h4>
            <div className="space-y-2.5">
              {visibleCategories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters.categories.includes(cat)}
                    onCheckedChange={() => toggleCategory(cat)}
                    className="data-[state=checked]:bg-ink data-[state=checked]:border-ink rounded-sm"
                  />
                  <span className="text-sm text-ink/80 group-hover:text-ink capitalize">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Collection */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink mb-3">
          Collection
        </h4>
        <div className="space-y-2.5">
          {collections.map((col) => (
            <label
              key={col.slug}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={filters.collections.includes(col.slug)}
                onCheckedChange={() => toggleCollection(col.slug)}
                className="data-[state=checked]:bg-ink data-[state=checked]:border-ink rounded-sm"
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
                'h-8 px-3 text-xs border rounded-sm transition-colors min-h-[32px]',
                filters.sizes.includes(size)
                  ? 'bg-ink text-offwhite border-ink'
                  : 'border-border text-ink/70 hover:border-ink/40'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colour */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink mb-3">
          Colour
        </h4>
        <div className="flex flex-wrap gap-2.5">
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
                    ? 'ring-2 ring-ink ring-offset-2'
                    : 'border-black/10 hover:border-black/30'
                )}
                style={{ backgroundColor: productColor?.hex || '#ccc' }}
                title={color}
                aria-label={`Filter by ${color}`}
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
        <div className="space-y-2.5">
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
                className="data-[state=checked]:bg-ink data-[state=checked]:border-ink rounded-sm"
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