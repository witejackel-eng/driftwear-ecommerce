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

/* ── Navigation data ─────────────────────────────────────────────── */
interface NavLink {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  megaTrigger?: string;
  highlight?: boolean;
}

const leftNavLinks: NavLink[] = [
  { label: "New", href: "/shop?sort=newest" },
  { label: "Women", href: "/shop/women", hasMegaMenu: true, megaTrigger: "Women" },
  { label: "Men", href: "/shop/men", hasMegaMenu: true, megaTrigger: "Men" },
];

const rightNavLinks: NavLink[] = [
  { label: "Best Sellers", href: "/shop/best-sellers" },
  { label: "Last Call", href: "/shop?collection=last-call", highlight: true },
  { label: "Story", href: "/about" },
];

/* ── Header Component ────────────────────────────────────────────── */
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

  // Scroll listener for sticky header background
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
    (link: NavLink) => {
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
            ? "bg-offwhite shadow-[0_1px_0_0_var(--color-light-sand)]"
            : "bg-offwhite"
        )}
      >
        <div className="mx-auto max-w-[var(--container-wide)]">
          {/* ── Desktop: 3-column CSS Grid ─────────────────────── */}
          <div className="hidden xl:grid items-center"
            style={{
              gridTemplateColumns: "1fr auto 1fr",
              height: "72px",
              padding: "0 clamp(24px, 3.5vw, 48px)",
            }}
          >
            {/* LEFT NAV — aligned left */}
            <nav className="flex items-center gap-6 justify-self-start" aria-label="Main navigation">
              {leftNavLinks.map((link) => (
                <div
                  key={link.label}
                  onMouseEnter={() => handleNavMouseEnter(link)}
                  onMouseLeave={handleNavMouseLeave}
                >
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    className={cn(
                      "relative block py-2 text-[13px] tracking-[0.01em] transition-colors duration-150 whitespace-nowrap",
                      link.highlight
                        ? "text-clay font-medium"
                        : "text-deep-ink/80 hover:text-deep-ink"
                    )}
                  >
                    {link.label}
                    {hoveredLink === link.label && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-clay" />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* CENTER LOGO — perfectly centered by grid */}
            <Link
              href="/"
              className="justify-self-center flex items-baseline gap-1.5"
              aria-label="Driftwear Studio — Home"
            >
              <span className="font-[family-name:var(--font-instrument-serif)] text-[1.6rem] text-deep-ink leading-none tracking-[-0.01em] whitespace-nowrap">
                Driftwear
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-brown font-medium leading-none">
                Studio
              </span>
            </Link>

            {/* RIGHT NAV + ICONS — aligned right */}
            <div className="flex items-center justify-end gap-6 justify-self-end">
              <nav className="flex items-center gap-6" aria-label="Main navigation continued">
                {rightNavLinks.map((link) => (
                  <div
                    key={link.label}
                    onMouseEnter={() => handleNavMouseEnter(link)}
                    onMouseLeave={handleNavMouseLeave}
                  >
                    <Link
                      href={link.href}
                      onClick={handleNavClick}
                      className={cn(
                        "relative block py-2 text-[13px] tracking-[0.01em] transition-colors duration-150 whitespace-nowrap",
                        link.highlight
                          ? "text-clay font-medium"
                          : "text-deep-ink/80 hover:text-deep-ink"
                      )}
                    >
                      {link.label}
                      {hoveredLink === link.label && (
                        <span className="absolute bottom-0 left-0 right-0 h-px bg-clay" />
                      )}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Action icons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSearchOpen(true)}
                  className={cn(
                    "flex items-center justify-center w-11 h-11 -mr-1",
                    "rounded-sm transition-colors duration-150",
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
                    "relative flex items-center justify-center w-11 h-11 -mr-2",
                    "rounded-sm transition-colors duration-150",
                    "hover:bg-warm-paper",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink"
                  )}
                  aria-label={`Open cart${totalCartItems > 0 ? `, ${totalCartItems} item${totalCartItems !== 1 ? "s" : ""}` : ""}`}
                >
                  <ShoppingBag className="h-[18px] w-[18px] text-deep-ink" />
                  {totalCartItems > 0 && (
                    <span
                      className={cn(
                        "absolute top-1 right-0.5 flex items-center justify-center",
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

          {/* ── Tablet: hamburger + centered logo + icons (1024–1279px) ── */}
          <div className="hidden lg:flex xl:hidden items-center justify-between"
            style={{
              height: "68px",
              padding: "0 clamp(20px, 3vw, 40px)",
            }}
          >
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "flex items-center justify-center w-11 h-11 -ml-3",
                "rounded-sm transition-colors duration-150",
                "hover:bg-warm-paper",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-deep-ink" />
            </button>

            {/* Centered logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-1.5"
              aria-label="Driftwear Studio — Home"
            >
              <span className="font-[family-name:var(--font-instrument-serif)] text-[1.5rem] text-deep-ink leading-none tracking-[-0.01em] whitespace-nowrap">
                Driftwear
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-brown font-medium leading-none">
                Studio
              </span>
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "flex items-center justify-center w-11 h-11 -mr-1",
                  "rounded-sm transition-colors duration-150",
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
                  "relative flex items-center justify-center w-11 h-11 -mr-2",
                  "rounded-sm transition-colors duration-150",
                  "hover:bg-warm-paper",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink"
                )}
                aria-label={`Open cart${totalCartItems > 0 ? `, ${totalCartItems} item${totalCartItems !== 1 ? "s" : ""}` : ""}`}
              >
                <ShoppingBag className="h-[18px] w-[18px] text-deep-ink" />
                {totalCartItems > 0 && (
                  <span
                    className={cn(
                      "absolute top-1 right-0.5 flex items-center justify-center",
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

          {/* ── Mobile: hamburger + centered logo + icons (<1024px) ── */}
          <div className="flex lg:hidden items-center justify-between relative"
            style={{
              height: "60px",
              padding: "0 clamp(16px, 4vw, 24px)",
            }}
          >
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "flex items-center justify-center w-11 h-11 -ml-2",
                "rounded-sm transition-colors duration-150",
                "hover:bg-warm-paper",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-deep-ink" />
            </button>

            {/* Centered logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-1"
              aria-label="Driftwear Studio — Home"
            >
              <span className="font-[family-name:var(--font-instrument-serif)] text-[1.25rem] text-deep-ink leading-none tracking-[-0.01em] whitespace-nowrap">
                Driftwear
              </span>
              <span className="text-[8px] uppercase tracking-[0.18em] text-muted-brown font-medium leading-none">
                Studio
              </span>
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "flex items-center justify-center w-11 h-11 -mr-1",
                  "rounded-sm transition-colors duration-150",
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
                  "relative flex items-center justify-center w-11 h-11 -mr-2",
                  "rounded-sm transition-colors duration-150",
                  "hover:bg-warm-paper",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink"
                )}
                aria-label={`Open cart${totalCartItems > 0 ? `, ${totalCartItems} item${totalCartItems !== 1 ? "s" : ""}` : ""}`}
              >
                <ShoppingBag className="h-[18px] w-[18px] text-deep-ink" />
                {totalCartItems > 0 && (
                  <span
                    className={cn(
                      "absolute top-1 right-0.5 flex items-center justify-center",
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

        {/* MegaMenu — desktop only (xl+) */}
        <div
          className="hidden xl:block"
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