import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "best-seller" | "sale";

interface ProductBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: "bg-olive text-white",
  "best-seller": "bg-navy text-white",
  sale: "bg-terracotta text-white",
};

const variantLabels: Record<BadgeVariant, string> = {
  new: "New",
  "best-seller": "Best Seller",
  sale: "Sale",
};

export function ProductBadge({ variant, className }: ProductBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
    >
      {variantLabels[variant]}
    </span>
  );
}