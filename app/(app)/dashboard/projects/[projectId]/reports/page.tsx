import { FileText } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { ReportCard } from "@/components/dashboard/report-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireAuthorizedProject } from "@/lib/auth/guards";
import { dashboardService } from "@/lib/dashboard/service";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ProjectReportsPage({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: SearchParams;
}) {
  const { projectId } = await params;
  const { session } = await requireAuthorizedProject(projectId);
  const filters = await searchParams;
  const normalizedFilters = Object.fromEntries(
    Object.entries(filters).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );
  const reports = await dashboardService.getProjectReports(session, projectId, normalizedFilters);

  return (
    <div className="space-y-6">
      <FilterBar>
        <form className="flex w-full flex-col gap-4 md:flex-row md:flex-wrap">
          <Input name="q" defaultValue={typeof filters.q === "string" ? filters.q : ""} placeholder="Search title or summary" className="md:w-64" />
          <Input name="type" defaultValue={typeof filters.type === "string" ? filters.type : ""} placeholder="Report type" className="md:w-52" />
          <Button type="submit">Apply filters</Button>
        </form>
      </FilterBar>
      {reports.length ? (
        <div className="grid gap-4">{reports.map((report) => <ReportCard key={report.id} report={report} />)}</div>
      ) : (
        <DashboardEmptyState
          icon={<FileText className="size-5" />}
          title="No reports published for this project"
          description="Progress, verification, procurement, compliance, and budget reports will appear here when shared."
        />
      )}
    </div>
  );
}
