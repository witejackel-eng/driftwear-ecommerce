"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { triggerCartOpen } from "@/components/cart/CartDrawer";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/shared/SearchOverlay";

const navLinks = [
  { label: "New", href: "/shop?sort=newest" },
  { label: "Women", href: "/shop/women", hasMegaMenu: true, megaTrigger: "Women" },
  { label: "Men", href: "/shop/men", hasMegaMenu: true, megaTrigger: "Men" },
  { label: "Best Sellers", href: "/shop/best-sellers" },
  { label: "Last Call", href: "/shop?collection=last-call", highlight: true },
  { label: "Story", href: "/about" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeTrigger, setActiveTrigger] = useState<string | undefined>();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const cartItems = useCartStore((s) => s.items);
  const totalCartItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearMegaTimeout = useCallback(() => {
    if (megaTimeoutRef.current) {
      clearTimeout(megaTimeoutRef.current);
      megaTimeoutRef.current = null;
    }
  }, []);

  const scheduleMegaClose = useCallback(() => {
    clearMegaTimeout();
    megaTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
      setActiveTrigger(undefined);
    }, 150);
  }, [clearMegaTimeout]);

  // Scroll listener for header background transition
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega menu on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && megaMenuOpen) {
        clearMegaTimeout();
        setMegaMenuOpen(false);
        setActiveTrigger(undefined);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaMenuOpen, clearMegaTimeout]);

  const handleNavMouseEnter = useCallback(
    (link: (typeof navLinks)[number]) => {
      if (link.hasMegaMenu) {
        clearMegaTimeout();
        setActiveTrigger(link.megaTrigger!);
        setMegaMenuOpen(true);
      }
      setHoveredLink(link.label);
    },
    [clearMegaTimeout]
  );

  const handleNavMouseLeave = useCallback(() => {
    setHoveredLink(null);
    scheduleMegaClose();
  }, [scheduleMegaClose]);

  const handleMegaMouseEnter = useCallback(() => {
    clearMegaTimeout();
  }, [clearMegaTimeout]);

  const handleMegaMouseLeave = useCallback(() => {
    scheduleMegaClose();
  }, [scheduleMegaClose]);

  const handleNavClick = useCallback(() => {
    clearMegaTimeout();
    setMegaMenuOpen(false);
    setActiveTrigger(undefined);
  }, [clearMegaTimeout]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[var(--z-header)] w-full transition-colors duration-300",
          scrolled
            ? "bg-offwhite/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-light-sand)]"
            : "bg-offwhite"
        )}
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[4.25rem]">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "lg:hidden p-2 -ml-2 transition-colors duration-150",
                "hover:bg-warm-paper",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-deep-ink" />
            </button>

            {/* Desktop nav — left of logo */}
            <nav className="hidden lg:flex items-center gap-0" aria-label="Main navigation">
              {navLinks.slice(0, 3).map((link) => (
                <div
                  key={link.label}
                  onMouseEnter={() => handleNavMouseEnter(link)}
                  onMouseLeave={handleNavMouseLeave}
                >
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    className={cn(
                      "relative block px-3.5 py-2 text-[13px] tracking-[0.01em] transition-colors duration-150",
                      link.highlight
                        ? "text-clay font-medium"
                        : "text-deep-ink/80 hover:text-deep-ink"
                    )}
                  >
                    {link.label}
                    {hoveredLink === link.label && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-px bg-clay" />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Centered logo */}
            <Link
              href="/"
              className="flex items-center gap-1.5 shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
              aria-label="Driftwear Studio — Home"
            >
              <span className="font-[family-name:var(--font-instrument-serif)] text-[1.55rem] md:text-3xl text-deep-ink leading-none tracking-[-0.01em]">
                Driftwear
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-brown font-medium mt-2 hidden sm:block">
                Studio
              </span>
            </Link>

            {/* Desktop nav — right of logo */}
            <nav className="hidden lg:flex items-center gap-0" aria-label="Main navigation continued">
              {navLinks.slice(3).map((link) => (
                <div
                  key={link.label}
                  onMouseEnter={() => handleNavMouseEnter(link)}
                  onMouseLeave={handleNavMouseLeave}
                >
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    className={cn(
                      "relative block px-3.5 py-2 text-[13px] tracking-[0.01em] transition-colors duration-150",
                      link.highlight
                        ? "text-clay font-medium"
                        : "text-deep-ink/80 hover:text-deep-ink"
                    )}
                  >
                    {link.label}
                    {hoveredLink === link.label && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-px bg-clay" />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Action icons */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "p-2 transition-colors duration-150",
                  "hover:bg-warm-paper",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink"
                )}
                aria-label="Search products"
              >
                <Search className="h-[18px] w-[18px] text-deep-ink" />
              </button>
              <button
                onClick={triggerCartOpen}
                className={cn(
                  "relative p-2 transition-colors duration-150",
                  "hover:bg-warm-paper",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink"
                )}
                aria-label={`Open cart${totalCartItems > 0 ? `, ${totalCartItems} item${totalCartItems !== 1 ? "s" : ""}` : ""}`}
              >
                <ShoppingBag className="h-[18px] w-[18px] text-deep-ink" />
                {totalCartItems > 0 && (
                  <span
                    className={cn(
                      "absolute -top-0.5 -right-0.5 flex items-center justify-center",
                      "h-4 min-w-4 px-1 rounded-full",
                      "bg-clay text-offwhite text-[10px] font-semibold leading-none"
                    )}
                    aria-hidden="true"
                  >
                    {totalCartItems > 99 ? "99+" : totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MegaMenu — desktop only */}
        <div
          className="hidden lg:block"
          onMouseEnter={handleMegaMouseEnter}
          onMouseLeave={handleMegaMouseLeave}
        >
          <MegaMenu
            open={megaMenuOpen}
            onClose={handleNavClick}
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