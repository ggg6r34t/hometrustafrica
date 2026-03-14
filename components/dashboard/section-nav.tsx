"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface DashboardSectionNavItem {
  href: string;
  label: string;
}

export function DashboardSectionNav({
  ariaLabel,
  items,
}: {
  ariaLabel: string;
  items: DashboardSectionNavItem[];
}) {
  const pathname = usePathname();

  return (
    <nav className="dashboard-section-nav" aria-label={ariaLabel}>
      {items.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "dashboard-section-link",
              active && "dashboard-section-link-active",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
