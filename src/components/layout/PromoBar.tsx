"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const PROMO_MESSAGE = "Free shipping on orders over \u20B92,999";
const STORAGE_KEY = "driftwear_promo_dismissed";

function getInitialVisibility(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "true";
  } catch {
    return true;
  }
}

export function PromoBar() {
  const [isVisible, setIsVisible] = useState(getInitialVisibility);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // no-op
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "relative bg-deep-ink text-offwhite z-[var(--z-promo)]"
      )}
      role="banner"
      aria-label="Promotional announcement"
    >
      <div className="flex items-center justify-center h-9 px-10">
        <p className="text-[11px] sm:text-xs font-medium tracking-[0.06em] text-center">
          {PROMO_MESSAGE}
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-sm",
          "hover:bg-white/10 transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offwhite"
        )}
        aria-label="Dismiss announcement"
      >
        <X className="h-3 w-3 text-offwhite/70" />
      </button>
    </div>
  );
}