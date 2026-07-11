import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/Reveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-12",
        align === "center" && "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        className
      )}
    >
      <Reveal>
        <h2
          className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl lg:text-5xl text-ink"
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}