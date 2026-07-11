"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
  activeTrigger?: string;
}

function SubcategoryColumn({
  title,
  parentHref,
  subcategories,
  onClose,
}: {
  title: string;
  parentHref: string;
  subcategories: NonNullable<NavItem["children"]>;
  onClose: () => void;
}) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-brown mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5" role="list">
        {subcategories.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onClose}
              className={cn(
                "block text-[13px] text-deep-ink/80 transition-colors duration-150",
                "hover:text-clay"
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="pt-2">
          <Link
            href={parentHref}
            onClick={onClose}
            className={cn(
              "inline-block text-[13px] font-medium text-deep-ink transition-colors duration-150",
              "hover:text-clay"
            )}
          >
            Shop All {title}&ensp;&rarr;
          </Link>
        </li>
      </ul>
    </div>
  );
}

export function MegaMenu({ open, onClose, activeTrigger }: MegaMenuProps) {
  const womenItem = navItems.find((n) => n.label === "Women");
  const menItem = navItems.find((n) => n.label === "Men");

  const showWomen = activeTrigger === "Women";
  const showMen = activeTrigger === "Men";
  const showBoth = !activeTrigger;

  if (!open) return null;

  const columns: React.ReactNode[] = [];

  if ((showWomen || showBoth) && womenItem?.children) {
    columns.push(
      <SubcategoryColumn
        key="women"
        title="Women"
        parentHref="/shop/women"
        subcategories={womenItem.children}
        onClose={onClose}
      />
    );
  }

  if ((showMen || showBoth) && menItem?.children) {
    columns.push(
      <SubcategoryColumn
        key="men"
        title="Men"
        parentHref="/shop/men"
        subcategories={menItem.children}
        onClose={onClose}
      />
    );
  }

  if (columns.length === 0) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="absolute left-0 right-0 top-full z-[var(--z-mega-menu)] bg-offwhite border-b border-light-sand"
        >
          <div className="mx-auto max-w-[var(--container-wide)] px-4 sm:px-6 lg:px-8 py-8">
            <div
              className={cn(
                "grid gap-10",
                columns.length === 1
                  ? "grid-cols-1 max-w-xs"
                  : "grid-cols-1 sm:grid-cols-2 max-w-2xl"
              )}
            >
              {columns}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}