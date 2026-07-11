"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  // Focus the search input after the sheet opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => searchRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = fd.get("mobile-search") as string;
    if (q?.trim()) {
      onClose();
      router.push(`/shop?search=${encodeURIComponent(q.trim())}`);
    }
  };

  // Separate items: those with children (accordion) vs plain links
  const womenItem = navItems.find((n) => n.label === "Women");
  const menItem = navItems.find((n) => n.label === "Men");
  const plainLinks = navItems.filter(
    (n) => !n.children && n.label !== "Women" && n.label !== "Men"
  );

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="left"
        className={cn(
          "w-full sm:max-w-sm bg-offwhite border-light-sand p-0 overflow-y-auto scrollbar-thin"
        )}
      >
        <SheetHeader className="px-5 pt-6 pb-4">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Browse all categories and collections
          </SheetDescription>

          {/* Inline search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-brown pointer-events-none" />
            <Input
              ref={searchRef}
              name="mobile-search"
              type="search"
              placeholder="Search products\u2026"
              className={cn(
                "pl-10 border-light-sand bg-warm-paper/50",
                "focus-visible:border-deep-ink",
                "font-[family-name:var(--font-inter)]"
              )}
              autoComplete="off"
            />
          </form>
        </SheetHeader>

        <nav aria-label="Mobile navigation" className="pb-8">
          {/* Quick links — New, Best Sellers, Last Call, Story */}
          <div className="px-5">
            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between py-3.5 text-[13px] tracking-[0.01em] transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink rounded-sm",
                  link.label === "Last Call"
                    ? "text-clay font-medium"
                    : "text-deep-ink/85 hover:text-deep-ink"
                )}
              >
                <span>{link.label}</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-brown/60" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <Separator className="my-1 bg-light-sand" />

          {/* Accordion for Women / Men subcategories */}
          <Accordion type="multiple" className="px-5">
            {womenItem?.children && (
              <AccordionItem value="women" className="border-b-0">
                <AccordionTrigger
                  className={cn(
                    "py-3.5 text-[13px] font-medium text-deep-ink hover:no-underline",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink rounded-sm"
                  )}
                >
                  Women
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pb-2">
                    {womenItem.children.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between py-2.5 pl-2 text-[13px]",
                          "text-muted-brown hover:text-clay transition-colors duration-150",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink rounded-sm"
                        )}
                      >
                        <span>{cat.label}</span>
                        <ChevronRight className="h-3 w-3 text-muted-brown/40" aria-hidden="true" />
                      </Link>
                    ))}
                    <Link
                      href="/shop/women"
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between py-3 pl-2 text-[13px] font-medium",
                        "text-deep-ink hover:text-clay transition-colors duration-150",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink rounded-sm"
                      )}
                    >
                      <span>Shop All Women</span>
                      <ChevronRight className="h-3 w-3 text-muted-brown/40" aria-hidden="true" />
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {menItem?.children && (
              <AccordionItem value="men" className="border-b-0">
                <AccordionTrigger
                  className={cn(
                    "py-3.5 text-[13px] font-medium text-deep-ink hover:no-underline",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink rounded-sm"
                  )}
                >
                  Men
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pb-2">
                    {menItem.children.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between py-2.5 pl-2 text-[13px]",
                          "text-muted-brown hover:text-clay transition-colors duration-150",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink rounded-sm"
                        )}
                      >
                        <span>{cat.label}</span>
                        <ChevronRight className="h-3 w-3 text-muted-brown/40" aria-hidden="true" />
                      </Link>
                    ))}
                    <Link
                      href="/shop/men"
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between py-3 pl-2 text-[13px] font-medium",
                        "text-deep-ink hover:text-clay transition-colors duration-150",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink rounded-sm"
                      )}
                    >
                      <span>Shop All Men</span>
                      <ChevronRight className="h-3 w-3 text-muted-brown/40" aria-hidden="true" />
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          <Separator className="my-1 bg-light-sand" />

          {/* Help links */}
          <div className="px-5">
            <p className="text-[10px] uppercase tracking-[0.12em] text-muted-brown/70 mb-2 font-semibold px-0">
              Help
            </p>
            {[
              { label: "FAQ", href: "/faq" },
              { label: "Shipping & Returns", href: "/shipping-returns" },
              { label: "Contact", href: "/contact" },
              { label: "Size Guide", href: "/size-guide" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between py-2.5 text-[13px]",
                  "text-muted-brown hover:text-clay transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink rounded-sm"
                )}
              >
                <span>{link.label}</span>
                <ChevronRight className="h-3 w-3 text-muted-brown/40" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}