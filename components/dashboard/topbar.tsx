"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { DashboardSession, ProjectSummary } from "@/lib/dashboard/types";

function labelFromSegment(segment: string) {
  if (segment === "dashboard") {
    return "Overview";
  }

  return segment
    .replaceAll("-", " ")
    .replaceAll("%20", " ")
    .replace(/\b\w/g, (value) => value.toUpperCase());
}

export function DashboardTopbar({
  session,
  projects,
  unreadCount,
}: {
  session: DashboardSession;
  projects: ProjectSummary[];
  unreadCount: number;
}) {
  const pathname = usePathname();
  const crumbs = useMemo(
    () =>
      pathname
        .split("/")
        .filter(Boolean)
        .map((segment, index, array) => ({
          href: `/${array.slice(0, index + 1).join("/")}`,
          label: projects.find((project) => project.id === segment)?.name || labelFromSegment(segment),
        })),
    [pathname, projects],
  );

  return (
    <div className="sticky top-0 z-20 border-b border-border/70 bg-background/92 px-4 py-4 backdrop-blur-xl md:px-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden" />
            <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
              {crumbs.map((crumb, index) => (
                <span key={crumb.href} className="inline-flex items-center gap-2">
                  {index > 0 ? <ChevronRight className="size-4" /> : null}
                  <Link href={crumb.href} className={index === crumbs.length - 1 ? "font-medium text-foreground" : "hover:text-foreground"}>
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/notifications">
                <Bell className="size-4" />
                Alerts {unreadCount ? `(${unreadCount})` : ""}
              </Link>
            </Button>
            <div className="hidden rounded-full border border-border bg-white/85 px-3 py-2 text-sm text-muted-foreground md:block">
              {session.name}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search projects, reports, and files" aria-label="Search dashboard" />
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Projects in scope: {projects.length}</span>
            <Separator orientation="vertical" className="hidden h-5 md:block" />
            <Link href="/dashboard/inbox" className="font-medium text-primary">Open inbox</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
