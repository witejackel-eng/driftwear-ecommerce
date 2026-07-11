"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  fallbackSrc = "/images/collections/linen-edit.jpg",
  priority = false,
  sizes,
}: ImageWithFallbackProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const [useFallback, setUseFallback] = useState(false);

  const handleError = useCallback(() => {
    if (!useFallback) {
      setUseFallback(true);
    } else {
      setState("error");
    }
  }, [useFallback]);

  const displaySrc = useFallback ? fallbackSrc : src;

  if (state === "error") {
    return (
      <div
        className={cn(
          "bg-cream flex items-center justify-center",
          fill ? "absolute inset-0" : "",
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-muted-foreground text-xs">Image unavailable</span>
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", fill ? "absolute inset-0" : "", className)}
      style={!fill ? { width, height } : undefined}
    >
      {state === "loading" && (
        <div className="absolute inset-0 bg-cream animate-pulse" />
      )}
      <Image
        key={src}
        src={displaySrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          "object-cover transition-opacity duration-300",
          state === "loading" ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setState("loaded")}
        onError={handleError}
        priority={priority}
        sizes={sizes}
      />
    </div>
  );
}