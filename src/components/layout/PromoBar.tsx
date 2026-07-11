"use client";

import { useState, useCallback } from "react";
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

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // no-op
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "relative bg-deep-ink text-offwhite z-[var(--z-promo)]",
        "h-[34px] sm:h-[36px] flex items-center"
      )}
      role="banner"
      aria-label="Promotional announcement"
    >
      {/* Text — perfectly centered with padding to avoid close button */}
      <p className="flex-1 text-center text-[11px] sm:text-xs font-medium tracking-[0.06em] text-offwhite pr-12 sm:pr-14 select-none">
        {PROMO_MESSAGE}
      </p>

      {/* Close button — safe spacing from edge, 44px min touch target */}
      <button
        onClick={handleDismiss}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2",
          "flex items-center justify-center w-11 h-11 -mr-2",
          "rounded-sm hover:bg-white/10 transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offwhite"
        )}
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5 text-offwhite/80" />
      </button>
    </div>
  );
}