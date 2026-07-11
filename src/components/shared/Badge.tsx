import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "best-seller" | "sale" | "last-call";

interface ProductBadgeProps {
  variant: BadgeVariant;
  className?: string;
  percentage?: number;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: "bg-faded-olive text-white",
  "best-seller": "bg-deep-ink text-white",
  sale: "bg-clay text-white",
  "last-call": "bg-clay text-white",
};

const variantLabels: Record<BadgeVariant, string> = {
  new: "New",
  "best-seller": "Best Seller",
  sale: "Sale",
  "last-call": "Last Call",
};

export function ProductBadge({ variant, className, percentage }: ProductBadgeProps) {
  const label =
    variant === "sale" && percentage
      ? `${percentage}% Off`
      : variantLabels[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}