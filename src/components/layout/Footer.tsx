"use client";

import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, PinIcon } from "lucide-react";

const shopLinks = [
  { label: "New", href: "/shop?collection=new" },
  { label: "Women", href: "/shop/women" },
  { label: "Men", href: "/shop/men" },
  { label: "Best Sellers", href: "/shop?collection=best-sellers" },
  { label: "Last Call", href: "/shop?collection=last-call" },
];

const helpLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Contact", href: "/contact" },
  { label: "Size Guide", href: "/size-guide" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-ink mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-terracotta transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-cream border-t border-sand">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-[family-name:var(--font-instrument-serif)] text-2xl text-ink">
                Driftwear
              </span>
              <span className="ml-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Studio
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Soft everyday clothing for warm days.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sand/50 hover:bg-sand transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-ink" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sand/50 hover:bg-sand transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-ink" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-sand/50 hover:bg-sand transition-colors"
                aria-label="Pinterest"
              >
                <PinIcon className="h-4 w-4 text-ink" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkGroup title="Shop" links={shopLinks} />
          <FooterLinkGroup title="Help" links={helpLinks} />
          <FooterLinkGroup title="Company" links={companyLinks} />
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-10 border-t border-sand">
          <div className="max-w-md">
            <h3 className="font-[family-name:var(--font-instrument-serif)] text-xl text-ink mb-1">
              Good clothes. Better inbox.
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              New drops, warm stories, and the occasional good deal. No spam, ever.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-offwhite border-sand focus-visible:border-navy flex-1"
              />
              <Button
                type="submit"
                className="bg-navy text-white hover:bg-navy/90 rounded-sm px-6 shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-sand">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Driftwear Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {/* Payment icon placeholders */}
            <span className="text-xs text-muted-foreground border border-sand/60 rounded-sm px-2 py-1 font-medium">
              VISA
            </span>
            <span className="text-xs text-muted-foreground border border-sand/60 rounded-sm px-2 py-1 font-medium">
              MC
            </span>
            <span className="text-xs text-muted-foreground border border-sand/60 rounded-sm px-2 py-1 font-medium">
              UPI
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground/60 text-center sm:text-right">
            Images: Unsplash / Pexels (demo use only)
          </p>
        </Container>
      </div>
    </footer>
  );
}