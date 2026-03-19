import Link from "next/link";
import { Search } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AutoSubmitSelect } from "@/components/dashboard/auto-submit-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const PROJECT_STATUS_OPTIONS = [
  { value: "PLANNING", label: "Planning" },
  { value: "ACTIVE", label: "Active" },
  { value: "AT_RISK", label: "At Risk" },
  { value: "ON_HOLD", label: "On Hold" },
  { value: "COMPLETED", label: "Completed" },
  { value: "ARCHIVED", label: "Archived" },
] as const;

const PROJECT_TYPE_OPTIONS = [
  { value: "construction", label: "Construction" },
  { value: "business_setup", label: "Business Setup" },
  { value: "agriculture", label: "Agriculture" },
  { value: "land_development", label: "Land Development" },
  { value: "solar_infrastructure", label: "Solar / Infrastructure" },
  { value: "procurement_logistics", label: "Procurement / Logistics" },
  { value: "other", label: "Other" },
] as const;

const SORT_OPTIONS = [
  { value: "recent", label: "Recent activity" },
  { value: "created", label: "Recently created" },
  { value: "status", label: "Status" },
] as const;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await requireDashboardSession();
  const rawFilters = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
  const selectedStatus =
    typeof rawFilters.status === "string" &&
    PROJECT_STATUS_OPTIONS.some((option) => option.value === rawFilters.status)
      ? rawFilters.status
      : "all";
  const selectedType =
    typeof rawFilters.type === "string" &&
    PROJECT_TYPE_OPTIONS.some((option) => option.value === rawFilters.type)
      ? rawFilters.type
      : "all";
  const selectedSort =
    rawFilters.sort === "created" || rawFilters.sort === "status"
      ? rawFilters.sort
      : "recent";
  const searchTerm =
    typeof rawFilters.q === "string" ? rawFilters.q.trim() : "";
  const filters = {
    ...rawFilters,
    status: selectedStatus === "all" ? undefined : selectedStatus,
    type: selectedType === "all" ? undefined : selectedType,
    sort: selectedSort === "recent" ? undefined : selectedSort,
  };
  const activeFilters = [
    searchTerm ? `Search: ${searchTerm}` : null,
    selectedStatus !== "all"
      ? `Status: ${PROJECT_STATUS_OPTIONS.find((option) => option.value === selectedStatus)?.label ?? selectedStatus}`
      : null,
    selectedType !== "all"
      ? `Project type: ${PROJECT_TYPE_OPTIONS.find((option) => option.value === selectedType)?.label ?? selectedType}`
      : null,
    selectedSort !== "recent"
      ? `Sort: ${SORT_OPTIONS.find((option) => option.value === selectedSort)?.label ?? selectedSort}`
      : null,
  ].filter(Boolean) as string[];
  const projects = await dashboardService.listProjects(session, filters);

  return (
    <div className="space-y-6">
      <FilterBar>
        <div className="w-full space-y-3">
          <form className="flex w-full flex-col gap-4 md:flex-row md:flex-wrap">
            <div className="relative min-w-[16rem] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="q"
                defaultValue={searchTerm}
                placeholder="Search by project name or location"
                className="pl-9"
              />
            </div>
            <AutoSubmitSelect name="status" defaultValue={selectedStatus}>
              <SelectTrigger size="dashboard" className="md:w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {PROJECT_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </AutoSubmitSelect>
            <AutoSubmitSelect name="type" defaultValue={selectedType}>
              <SelectTrigger size="dashboard" className="md:w-52">
                <SelectValue placeholder="Project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All project types</SelectItem>
                {PROJECT_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </AutoSubmitSelect>
            <AutoSubmitSelect name="sort" defaultValue={selectedSort}>
              <SelectTrigger size="dashboard" className="md:w-56">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </AutoSubmitSelect>
          </form>
          {activeFilters.length ? (
            <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-2">
              <span className="text-xs font-semibold text-muted-foreground">
                Active filters:
              </span>
              {activeFilters.map((label) => (
                <span key={label} className="dashboard-chip">
                  {label}
                </span>
              ))}
              <Button variant="ghost" size="dashboard" asChild>
                <Link href="/dashboard/projects">Clear all</Link>
              </Button>
            </div>
          ) : null}
        </div>
      </FilterBar>
      {projects.length ? (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="dashboard-panel">
              <CardContent className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-lg font-semibold text-foreground">
                      {project.name}
                    </p>
                    <StatusBadge
                      label={project.status.replaceAll("_", " ")}
                      tone={
                        project.status === "AT_RISK"
                          ? "danger"
                          : project.health === "healthy"
                            ? "success"
                            : project.health === "watch"
                              ? "warning"
                              : "danger"
                      }
                    />
                    <StatusBadge label={project.type} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.location} · {project.stageLabel}
                  </p>
                  <div className="grid gap-4 text-sm md:grid-cols-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        Completion
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {project.completionPercentage}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        Lead
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {project.leadName || "Assigned internally"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        Last update
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {project.latestUpdateAt || "Awaiting update"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        Next milestone
                      </p>
                      <p className="mt-1 font-medium text-foreground">
                        {project.nextMilestone?.title || "Not scheduled"}
                      </p>
                    </div>
                  </div>
                </div>
                <Button size="dashboard" asChild>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    Open project
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          icon={<Search className="size-5" />}
          title="No projects matched your filters"
          description="Try adjusting your search terms or connect the production project data source to populate the dashboard."
        />
      )}
    </div>
  );
}
