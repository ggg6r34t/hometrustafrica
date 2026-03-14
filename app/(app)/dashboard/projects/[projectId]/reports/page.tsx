import Link from "next/link";
import { FileText, Search } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatDateLabel } from "@/components/dashboard/formatters";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    Object.entries(filters).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
  const reports = await dashboardService.getProjectReports(
    session,
    projectId,
    normalizedFilters,
  );
  const attachmentsCount = reports.reduce(
    (sum, report) => sum + report.attachmentsCount,
    0,
  );
  const mediaCount = reports.reduce(
    (sum, report) => sum + report.mediaCount,
    0,
  );
  const latestPublishedLabel = reports[0]
    ? formatDateLabel(reports[0].uploadedAt)
    : "No reports yet";

  return (
    <div className="space-y-6">
      <FilterBar>
        <form className="flex w-full flex-col gap-4 md:flex-row md:flex-wrap">
          <div className="relative min-w-[16rem] flex-1 md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={typeof filters.q === "string" ? filters.q : ""}
              placeholder="Search title or summary"
              className="pl-9"
            />
          </div>
          <Input
            name="type"
            defaultValue={typeof filters.type === "string" ? filters.type : ""}
            placeholder="Report type"
            className="md:w-52"
          />
          <Button type="submit">Apply filters</Button>
        </form>
      </FilterBar>
      {reports.length ? (
        <>
          <div className="grid items-start gap-4 md:grid-cols-3">
            <Card className="dashboard-panel-muted p-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Published reports
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {reports.length}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest publication: {latestPublishedLabel}
              </p>
            </Card>
            <Card className="dashboard-panel-muted p-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Supporting attachments
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {attachmentsCount}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Files linked across all published reports.
              </p>
            </Card>
            <Card className="dashboard-panel-muted p-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Media evidence
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {mediaCount}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Images and videos available in report evidence packs.
              </p>
            </Card>
          </div>

          <Card className="dashboard-panel">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Published reports
              </CardTitle>
              <CardDescription>
                Review reporting periods, supporting assets, and the latest
                published summaries in one register.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Report</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reporting period</TableHead>
                    <TableHead>Uploaded by</TableHead>
                    <TableHead>Assets</TableHead>
                    <TableHead className="pr-6 text-right">Open</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="pl-6 align-top">
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">
                            {report.title}
                          </p>
                          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                            {report.summary}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge label={report.type} />
                      </TableCell>
                      <TableCell>{report.reportingPeriodLabel}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">
                            {report.uploadedBy}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDateLabel(report.uploadedAt)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          <p>{report.attachmentsCount} attachments</p>
                          <p>{report.mediaCount} media items</p>
                        </div>
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={`/dashboard/projects/${projectId}/reports/${report.id}`}
                          >
                            Open
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
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
