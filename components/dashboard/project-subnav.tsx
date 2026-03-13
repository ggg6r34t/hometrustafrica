"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function ProjectSubnav({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const items = [
    { href: `/dashboard/projects/${projectId}`, label: "Overview" },
    { href: `/dashboard/projects/${projectId}/timeline`, label: "Timeline" },
    { href: `/dashboard/projects/${projectId}/reports`, label: "Reports" },
    { href: `/dashboard/projects/${projectId}/files`, label: "Files" },
    { href: `/dashboard/projects/${projectId}/budget`, label: "Budget" },
    { href: `/dashboard/projects/${projectId}/team`, label: "Team" },
  ];

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Project sections">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              active
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/20 hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
