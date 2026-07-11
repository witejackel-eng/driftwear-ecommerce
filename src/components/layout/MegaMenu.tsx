"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const womenCategories = [
  { label: "Dresses", href: "/shop/women?category=dresses" },
  { label: "Tops", href: "/shop/women?category=tops" },
  { label: "Tees + Tanks", href: "/shop/women?category=tees-tanks" },
  { label: "Pants", href: "/shop/women?category=pants" },
  { label: "Matching Sets", href: "/shop/women?category=matching-sets" },
  { label: "Lounge", href: "/shop/women?category=lounge" },
  { label: "Accessories", href: "/shop/women?category=accessories" },
];

const menCategories = [
  { label: "Tees", href: "/shop/men?category=tees" },
  { label: "Shirts", href: "/shop/men?category=shirts" },
  { label: "Shorts", href: "/shop/men?category=shorts" },
  { label: "Pants", href: "/shop/men?category=pants" },
  { label: "Sweatshirts", href: "/shop/men?category=sweatshirts" },
  { label: "Resort Wear", href: "/shop/men?category=resort-wear" },
  { label: "Accessories", href: "/shop/men?category=accessories" },
];

const featuredLinks = [
  { label: "New Arrivals", href: "/shop?collection=new" },
  { label: "Best Sellers", href: "/shop?collection=best-sellers" },
  { label: "Summer Edit", href: "/shop?collection=summer-edit" },
  { label: "Linen Shop", href: "/shop?collection=linen" },
  { label: "Last Call", href: "/shop?collection=last-call" },
];

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
  activeTrigger?: string;
}

export function MegaMenu({ open, onClose, activeTrigger }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open, onClose]);

  const showWomen = activeTrigger === "Women";
  const showMen = activeTrigger === "Men";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="absolute left-0 right-0 top-full z-40 bg-offwhite border-b border-sand shadow-md"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Women categories */}
              {(showWomen || (!showWomen && !showMen)) && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Women
                  </h3>
                  <ul className="space-y-2.5">
                    {womenCategories.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="text-sm text-ink hover:text-terracotta transition-colors inline-block"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    <li className="pt-2">
                      <Link
                        href="/shop/women"
                        onClick={onClose}
                        className="text-sm font-medium text-navy hover:text-terracotta transition-colors"
                      >
                        Shop All Women →
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Men categories */}
              {(showMen || (!showWomen && !showMen)) && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Men
                  </h3>
                  <ul className="space-y-2.5">
                    {menCategories.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="text-sm text-ink hover:text-terracotta transition-colors inline-block"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    <li className="pt-2">
                      <Link
                        href="/shop/men"
                        onClick={onClose}
                        className="text-sm font-medium text-navy hover:text-terracotta transition-colors"
                      >
                        Shop All Men →
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* Featured */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Featured
                </h3>
                <ul className="space-y-2.5">
                  {featuredLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "text-sm inline-block transition-colors",
                          item.label === "Last Call"
                            ? "text-terracotta hover:text-terracotta/80 font-medium"
                            : "text-ink hover:text-terracotta"
                        )}
                      >
                        {item.label}
                        {item.label === "New Arrivals" && (
                          <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-sun-yellow" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}