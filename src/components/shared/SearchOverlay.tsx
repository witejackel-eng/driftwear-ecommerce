"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

interface SearchProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const debounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.products || []);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Enter" && query.trim()) {
        onClose();
        router.push(`/shop?search=${encodeURIComponent(query)}`);
      }
    },
    [onClose, query, router]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed inset-x-0 top-0 z-[70] bg-offwhite shadow-lg max-h-[90vh] flex flex-col"
          >
            {/* Search input area */}
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-sand">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for tees, linen, dresses..."
                className="border-0 bg-transparent text-lg font-[family-name:var(--font-instrument-serif)] focus-visible:ring-0 focus-visible:border-0 h-auto p-0 placeholder:text-sand placeholder:font-[family-name:var(--font-inter)] placeholder:text-sm placeholder:font-normal"
              />
              <button
                onClick={onClose}
                className="shrink-0 p-1.5 rounded-full hover:bg-cream transition-colors"
                aria-label="Close search"
              >
                <X className="h-5 w-5 text-ink" />
              </button>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-6 py-4">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
                </div>
              )}

              {!loading && query.trim() && results.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-sm">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Try different keywords or browse our collections
                  </p>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onClose();
                        router.push(`/product/${product.slug}`);
                      }}
                      className="flex items-center gap-4 w-full p-3 rounded-md hover:bg-cream transition-colors text-left group"
                    >
                      <div className="h-14 w-14 rounded-md bg-sand/50 overflow-hidden shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate group-hover:text-navy transition-colors">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm text-ink font-medium">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {!loading && !query.trim() && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-sm">
                    Start typing to search...
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Press Enter to see all results
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}