"use client";

import Link from "next/link";
import { Fragment, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronsUpDown, LogOut, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatSentenceCaseLabel } from "@/components/dashboard/formatters";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { DashboardSession, ProjectSummary } from "@/lib/dashboard/types";

function labelFromSegment(segment: string) {
  if (segment === "dashboard") {
    return "Overview";
  }

  return formatSentenceCaseLabel(
    segment.replaceAll("-", " ").replaceAll("%20", " "),
  );
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
  const router = useRouter();
  const currentProject = useMemo(
    () => projects.find((project) => pathname.includes(project.id)),
    [pathname, projects],
  );
  const crumbs = useMemo(
    () =>
      pathname
        .split("/")
        .filter(Boolean)
        .map((segment, index, array) => ({
          href: `/${array.slice(0, index + 1).join("/")}`,
          label:
            projects.find((project) => project.id === segment)?.name ||
            labelFromSegment(segment),
        })),
    [pathname, projects],
  );
  const initials = session.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="dashboard-command-bar">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-4 lg:px-8">
        <div className="flex items-start justify-between gap-4 md:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <div className="flex min-w-0 flex-col">
              <p className="text-sm leading-none font-semibold text-muted-foreground">
                Client Portal
              </p>
              <Breadcrumb className="leading-none">
                <BreadcrumbList className="gap-1.5 text-sm">
                  {crumbs.map((crumb, index) => (
                    <Fragment key={crumb.href}>
                      <BreadcrumbItem>
                        {index === crumbs.length - 1 ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={crumb.href}>{crumb.label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < crumbs.length - 1 ? (
                        <BreadcrumbSeparator />
                      ) : null}
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              asChild
              className="relative"
            >
              <Link href="/dashboard/notifications">
                <Bell className="size-4" />
                <span className="sr-only">Open notifications</span>
                {unreadCount ? (
                  <span className="absolute -right-1.5 -top-1.5 inline-flex min-w-5 items-center justify-center rounded-md border border-primary/20 bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    {unreadCount}
                  </span>
                ) : null}
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden min-w-[11rem] justify-between md:inline-flex"
                >
                  <span className="inline-flex items-center gap-3">
                    <Avatar className="size-7 rounded-lg border border-border">
                      <AvatarFallback className="rounded-lg bg-muted text-[11px] font-semibold text-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{session.name}</span>
                  </span>
                  <ChevronsUpDown className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings/profile">
                    Profile settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/logout">
                    <LogOut className="mr-2 size-4" />
                    Sign out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <form
          action="/dashboard/projects"
          className="grid gap-2 md:gap-3 lg:w-fit lg:grid-cols-[minmax(20rem,28rem)_14rem_auto] lg:items-center"
        >
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-10 rounded-lg border-border bg-background pl-9"
              placeholder="Search projects, reports, and files"
              aria-label="Search dashboard"
              name="q"
            />
          </div>
          <Select
            value={currentProject?.id}
            onValueChange={(value) =>
              router.push(`/dashboard/projects/${value}`)
            }
          >
            <SelectTrigger className="h-10 w-full rounded-lg border-border bg-background">
              <SelectValue placeholder="Jump to project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="h-10 px-5">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}
