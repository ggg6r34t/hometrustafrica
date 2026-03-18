import Link from "next/link";
import { FileImage, FileText, Paperclip, Search } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatDateLabel } from "@/components/dashboard/formatters";
import { MetricCard } from "@/components/dashboard/metric-card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const REPORT_TYPE_OPTIONS = [
  "Progress Report",
  "Site Verification",
  "Budget Report",
  "Procurement Report",
  "Compliance Report",
  "Inspection Report",
] as const;

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
  const selectedType =
    typeof filters.type === "string" &&
    REPORT_TYPE_OPTIONS.includes(
      filters.type as (typeof REPORT_TYPE_OPTIONS)[number],
    )
      ? filters.type
      : "all";
  const normalizedFilters = Object.fromEntries(
    Object.entries(filters).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
  normalizedFilters.type = selectedType === "all" ? undefined : selectedType;
  const searchTerm =
    typeof normalizedFilters.q === "string" ? normalizedFilters.q.trim() : "";
  const activeFilters = [
    searchTerm ? `Search: ${searchTerm}` : null,
    selectedType !== "all" ? `Report type: ${selectedType}` : null,
  ].filter(Boolean) as string[];
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
        <div className="w-full space-y-3">
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
            <Select name="type" defaultValue={selectedType}>
              <SelectTrigger size="dashboard" className="md:w-52">
                <SelectValue placeholder="Report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All report types</SelectItem>
                {REPORT_TYPE_OPTIONS.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" size="dashboard">
              Apply filters
            </Button>
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
                <Link href={`/dashboard/projects/${projectId}/reports`}>
                  Clear all
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </FilterBar>
      {reports.length ? (
        <>
          <div className="grid items-start gap-4 md:grid-cols-3">
            <MetricCard
              label="Published reports"
              value={String(reports.length)}
              detail={`Latest publication: ${latestPublishedLabel}`}
              icon={<FileText className="size-4" />}
            />
            <MetricCard
              label="Supporting attachments"
              value={String(attachmentsCount)}
              detail="Files linked across all published reports."
              icon={<Paperclip className="size-4" />}
            />
            <MetricCard
              label="Media evidence"
              value={String(mediaCount)}
              detail="Images and videos available in report evidence packs."
              icon={<FileImage className="size-4" />}
            />
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
                        <Button variant="ghost" size="dashboard" asChild>
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
