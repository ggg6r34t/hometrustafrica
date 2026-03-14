"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SettingsNav() {
  const pathname = usePathname();
  const items = [
    { href: "/dashboard/settings/profile", label: "Profile" },
    { href: "/dashboard/settings/security", label: "Security" },
    { href: "/dashboard/settings/notifications", label: "Notifications" },
    { href: "/dashboard/settings/preferences", label: "Preferences" },
  ];

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Settings sections">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
              active
                ? "border-primary/25 bg-primary/10 text-primary"
                : "border-border/70 bg-background text-muted-foreground hover:border-primary/20 hover:bg-muted/30 hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
