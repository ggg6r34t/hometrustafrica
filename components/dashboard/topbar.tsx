"use client";

import Link from "next/link";
import { Fragment, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
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

export function DashboardTopbar({ projects }: { projects: ProjectSummary[] }) {
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
  return (
    <div className="dashboard-command-bar">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-3 px-4 py-3 md:px-6 md:py-4 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex min-w-0 items-start gap-4 md:items-center">
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
          <form
            action="/dashboard/projects"
            className="grid gap-2 md:gap-3 lg:w-full lg:max-w-xl lg:grid-cols-[minmax(13rem,1fr)_11rem_auto] lg:items-center"
          >
            <div className="relative min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="rounded-lg border-border bg-background pl-9"
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
              <SelectTrigger
                size="dashboard"
                className="w-full rounded-lg border-border bg-background"
              >
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
            <Button type="submit" size="dashboard">
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
