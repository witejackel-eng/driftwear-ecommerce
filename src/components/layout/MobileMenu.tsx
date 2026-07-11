"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Close on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-offwhite border-sand p-0 overflow-y-auto scrollbar-thin"
      >
        <SheetHeader className="px-5 pt-6 pb-4 border-b border-sand">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Browse all categories and collections
          </SheetDescription>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-10 border-sand bg-cream/50 focus-visible:border-navy"
            />
          </form>
        </SheetHeader>

        <div className="py-2">
          {/* Quick links */}
          <div className="px-5 py-3 border-b border-sand/50">
            {featuredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-2.5 text-sm text-ink hover:text-terracotta transition-colors"
              >
                <span
                  className={
                    link.label === "Last Call"
                      ? "text-terracotta font-medium"
                      : ""
                  }
                >
                  {link.label}
                </span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            ))}
          </div>

          {/* Accordion categories */}
          <Accordion type="multiple" className="px-5">
            <AccordionItem value="women" className="border-b border-sand/50">
              <AccordionTrigger className="text-sm font-medium text-ink hover:no-underline py-3">
                Women
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-0.5 pb-1">
                  {womenCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-terracotta transition-colors"
                    >
                      <span>{cat.label}</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  ))}
                  <Link
                    href="/shop/women"
                    onClick={onClose}
                    className="flex items-center justify-between py-2 text-sm font-medium text-navy hover:text-terracotta transition-colors"
                  >
                    <span>Shop All Women</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="men" className="border-b border-sand/50">
              <AccordionTrigger className="text-sm font-medium text-ink hover:no-underline py-3">
                Men
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-0.5 pb-1">
                  {menCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-terracotta transition-colors"
                    >
                      <span>{cat.label}</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  ))}
                  <Link
                    href="/shop/men"
                    onClick={onClose}
                    className="flex items-center justify-between py-2 text-sm font-medium text-navy hover:text-terracotta transition-colors"
                  >
                    <span>Shop All Men</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Story link */}
          <div className="px-5 py-3 border-b border-sand/50">
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center justify-between py-2.5 text-sm text-ink hover:text-terracotta transition-colors"
            >
              <span>Our Story</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          </div>

          {/* Help links */}
          <div className="px-5 py-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
              Help
            </p>
            <div className="space-y-0">
              <Link
                href="/faq"
                onClick={onClose}
                className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-terracotta transition-colors"
              >
                <span>FAQ</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
              <Link
                href="/shipping-returns"
                onClick={onClose}
                className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-terracotta transition-colors"
              >
                <span>Shipping & Returns</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-terracotta transition-colors"
              >
                <span>Contact Us</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}