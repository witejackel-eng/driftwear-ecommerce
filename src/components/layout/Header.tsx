"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { triggerCartOpen } from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/shared/SearchOverlay";

const navLinks = [
  { label: "New", href: "/shop?collection=new" },
  { label: "Women", href: "/shop/women", megaMenu: true, trigger: "Women" },
  { label: "Men", href: "/shop/men", megaMenu: true, trigger: "Men" },
  { label: "Best Sellers", href: "/shop?collection=best-sellers" },
  { label: "Last Call", href: "/shop?collection=last-call", highlight: true },
  { label: "Story", href: "/about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeTrigger, setActiveTrigger] = useState<string | undefined>();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const cartItems = useCartStore((s) => s.items);
  const wishlistProductIds = useWishlistStore((s) => s.productIds);
  const totalCartItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalWishlistItems = wishlistProductIds.length;

  // Listen for scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavHover = (label: string) => {
    const link = navLinks.find((l) => l.label === label);
    if (link?.megaMenu) {
      setActiveTrigger(link.trigger);
      setMegaMenuOpen(true);
    }
    setHoveredLink(label);
  };

  const handleNavLeave = () => {
    setHoveredLink(null);
  };

  const handleMegaClose = () => {
    setMegaMenuOpen(false);
    setActiveTrigger(undefined);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-offwhite/95 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "shadow-[0_1px_8px_rgba(31,58,74,0.06)]" : ""
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-md hover:bg-cream transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-ink" />
            </button>

            {/* Desktop nav left */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 3).map((link) => (
                <div
                  key={link.label}
                  onMouseEnter={() => handleNavHover(link.label)}
                  onMouseLeave={handleNavLeave}
                >
                  <Link
                    href={link.href}
                    onClick={handleMegaClose}
                    className={cn(
                      "relative px-3 py-2 text-sm transition-colors",
                      link.highlight
                        ? "text-terracotta font-medium"
                        : "text-ink hover:text-terracotta"
                    )}
                  >
                    {link.label}
                    {hoveredLink === link.label && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-terracotta rounded-full"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <span className="font-[family-name:var(--font-instrument-serif)] text-2xl md:text-3xl text-ink leading-none">
                Driftwear
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium mt-2 hidden sm:block">
                Studio
              </span>
            </Link>

            {/* Desktop nav right */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(3).map((link) => (
                <div
                  key={link.label}
                  onMouseEnter={() => handleNavHover(link.label)}
                  onMouseLeave={handleNavLeave}
                >
                  <Link
                    href={link.href}
                    onClick={handleMegaClose}
                    className={cn(
                      "relative px-3 py-2 text-sm transition-colors",
                      link.highlight
                        ? "text-terracotta font-medium"
                        : "text-ink hover:text-terracotta"
                    )}
                  >
                    {link.label}
                    {hoveredLink === link.label && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-terracotta rounded-full"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Action icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-md hover:bg-cream transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-ink" />
              </button>
              <Link
                href="/wishlist"
                className="relative p-2 rounded-md hover:bg-cream transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5 text-ink" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-bold text-white leading-none">
                    {totalWishlistItems > 9 ? "9+" : totalWishlistItems}
                  </span>
                )}
              </Link>
              <button
                onClick={triggerCartOpen}
                className="relative p-2 rounded-md hover:bg-cream transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5 text-ink" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white leading-none">
                    {totalCartItems > 9 ? "9+" : totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MegaMenu - desktop only */}
        <div
          className="hidden lg:block"
          onMouseEnter={() => {
            if (activeTrigger) setMegaMenuOpen(true);
          }}
          onMouseLeave={handleMegaClose}
        >
          <MegaMenu
            open={megaMenuOpen}
            onClose={handleMegaClose}
            activeTrigger={activeTrigger}
          />
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Search overlay */}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}