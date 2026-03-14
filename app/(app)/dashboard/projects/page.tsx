import Link from "next/link";
import { Search } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await requireDashboardSession();
  const filters = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
  const projects = await dashboardService.listProjects(session, filters);

  return (
    <div className="space-y-6">
      <FilterBar>
        <form className="flex w-full flex-col gap-4 md:flex-row md:flex-wrap">
          <div className="relative min-w-[16rem] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={filters.q}
              placeholder="Search by project name or location"
              className="pl-9"
            />
          </div>
          <Input
            name="status"
            defaultValue={filters.status}
            placeholder="Status filter"
            className="md:w-44"
          />
          <Input
            name="type"
            defaultValue={filters.type}
            placeholder="Project type"
            className="md:w-52"
          />
          <Input
            name="sort"
            defaultValue={filters.sort}
            placeholder="Sort by recent activity"
            className="md:w-48"
          />
          <Button type="submit" size="dashboard">Apply filters</Button>
        </form>
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
                        project.health === "healthy"
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
