import { FileText } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { ReportCard } from "@/components/dashboard/report-card";
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
  const reports = await dashboardService.getProjectReports(session, projectId);
  const filters = await searchParams;

  return (
    <div className="space-y-6">
      <FilterBar>
        <form className="flex w-full flex-col gap-3 md:flex-row md:flex-wrap">
          <Input name="type" defaultValue={typeof filters.type === "string" ? filters.type : ""} placeholder="Report type" className="md:w-52" />
          <Input name="dateRange" defaultValue={typeof filters.dateRange === "string" ? filters.dateRange : ""} placeholder="Date range" className="md:w-48" />
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
