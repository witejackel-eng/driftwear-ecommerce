"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { storeConfig } from "@/lib/store-config";
import { cn } from "@/lib/utils";

const shopLinks = [
  { label: "New", href: "/shop?sort=newest" },
  { label: "Women", href: "/shop/women" },
  { label: "Men", href: "/shop/men" },
  { label: "Best Sellers", href: "/shop/best-sellers" },
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

const NL_STORAGE_KEY = "driftwear_nl_subscribed";

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-deep-ink mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "text-[13px] text-muted-brown transition-colors duration-150",
                "hover:text-clay",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-ink rounded-sm"
              )}
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
  const [email, setEmail] = useState("");
  const [nlState, setNlState] = useState<
    "idle" | "submitting" | "success" | "error"
  >(() => {
    if (typeof window === "undefined") return "idle";
    try {
      return localStorage.getItem(NL_STORAGE_KEY) === "true" ? "success" : "idle";
    } catch {
      return "idle";
    }
  });
  const [errorMsg, setErrorMsg] = useState("");

  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = email.trim();

      // Basic email validation
      if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setNlState("error");
        setErrorMsg("Please enter a valid email address.");
        return;
      }

      setNlState("submitting");

      // Simulate a brief delay, then save to localStorage
      setTimeout(() => {
        try {
          localStorage.setItem(NL_STORAGE_KEY, "true");
          localStorage.setItem("driftwear_nl_email", trimmed);
        } catch {
          // no-op
        }
        setNlState("success");
        setEmail("");
      }, 400);
    },
    [email]
  );

  return (
    <footer className="bg-warm-paper" role="contentinfo">
      <div className="mx-auto max-w-[var(--container-wide)] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5"
              aria-label="Driftwear Studio — Home"
            >
              <span className="font-[family-name:var(--font-instrument-serif)] text-2xl text-deep-ink leading-none tracking-[-0.01em]">
                Driftwear
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-brown font-medium mt-2">
                Studio
              </span>
            </Link>
            <p className="mt-4 text-[13px] text-muted-brown max-w-xs leading-relaxed">
              Soft everyday clothing made for warm days and slow mornings. Designed in India with care for fabric, fit, and the planet.
            </p>
          </div>

          {/* Link columns */}
          <FooterLinkGroup title="Shop" links={shopLinks} />
          <FooterLinkGroup title="Help" links={helpLinks} />
          <FooterLinkGroup title="Company" links={companyLinks} />
        </div>

        {/* Newsletter */}
        <Separator className="my-12 bg-light-sand" />

        <div className="max-w-md">
          {nlState === "success" ? (
            <div>
              <p className="font-[family-name:var(--font-instrument-serif)] text-xl text-deep-ink mb-1">
                You&apos;re in.
              </p>
              <p className="text-[13px] text-muted-brown">
                We&apos;ll send warm words to your inbox — nothing noisy.
              </p>
            </div>
          ) : (
            <>
              <p className="font-[family-name:var(--font-instrument-serif)] text-xl text-deep-ink mb-1">
                Good clothes. Better inbox.
              </p>
              <p className="text-[13px] text-muted-brown mb-4">
                New drops, warm stories, and the occasional good deal. No spam, ever.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-2"
                noValidate
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (nlState === "error") setNlState("idle");
                  }}
                  placeholder="Your email address"
                  className={cn(
                    "bg-offwhite border-light-sand focus-visible:border-deep-ink flex-1",
                    "font-[family-name:var(--font-inter)]",
                    nlState === "error" && "border-clay focus-visible:border-clay"
                  )}
                  autoComplete="email"
                  disabled={nlState === "submitting"}
                />
                <Button
                  type="submit"
                  disabled={nlState === "submitting"}
                  className={cn(
                    "bg-deep-ink text-offwhite hover:bg-deep-ink/90 rounded-sm px-6 shrink-0",
                    "font-[family-name:var(--font-inter)] text-[13px] tracking-[0.02em]",
                    "disabled:opacity-60"
                  )}
                >
                  {nlState === "submitting" ? "Subscribing\u2026" : "Subscribe"}
                </Button>
              </form>
              {nlState === "error" && errorMsg && (
                <p className="text-xs text-clay mt-2" role="alert">
                  {errorMsg}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-light-sand">
        <div className="mx-auto max-w-[var(--container-wide)] px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-muted-brown">
            &copy; {currentYear} Driftwear Studio. All rights reserved.
          </p>

          {storeConfig.isDemo && (
            <p className="text-[10px] text-muted-brown/60 italic">
              Demo store &mdash; no real orders are processed
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}