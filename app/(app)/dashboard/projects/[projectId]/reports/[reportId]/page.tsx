import Link from "next/link";
import { FileText, Paperclip } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { formatDateLabel } from "@/components/dashboard/formatters";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { DocumentRow } from "@/components/dashboard/document-row";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireAuthorizedProject } from "@/lib/auth/guards";
import { dashboardService } from "@/lib/dashboard/service";

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; reportId: string }>;
}) {
  const { projectId, reportId } = await params;
  const { session, project } = await requireAuthorizedProject(projectId);
  const report = await dashboardService.getProjectReportById(
    session,
    projectId,
    reportId,
  );

  if (!report) {
    return (
      <DashboardEmptyState
        icon={<FileText className="size-5" />}
        title="Report not found"
        description="This report may have been removed or is not available in your current project scope."
      />
    );
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow={project.name}
        title={report.title}
        description={`${report.type} · ${report.reportingPeriodLabel} · Uploaded by ${report.uploadedBy}`}
        actions={
          <Link
            href={`/dashboard/projects/${projectId}/reports`}
            className="text-sm font-medium text-primary"
          >
            Back to reports
          </Link>
        }
      />
      <div className="grid items-start gap-4 md:grid-cols-3">
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Reporting period
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {report.reportingPeriodLabel}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Structured for client visibility and audit review.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Published by
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {report.uploadedBy}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Uploaded on {formatDateLabel(report.uploadedAt)}.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Evidence pack
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {report.attachments.length} linked files
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supporting documents and media for this published report.
          </p>
        </Card>
      </div>
      <Card className="dashboard-panel">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Executive summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-7 text-muted-foreground">
            {report.summary}
          </p>
        </CardContent>
      </Card>
      <div className="grid items-start gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {report.sections.length ? (
            report.sections.map((section) => (
              <Card key={section.id} className="dashboard-panel">
                <CardHeader className="border-b border-border pb-4">
                  <CardTitle className="text-base font-semibold">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {section.body}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <DashboardEmptyState
              icon={<FileText className="size-5" />}
              title="No structured sections were published"
              description="This report currently only includes its executive summary and supporting attachments."
            />
          )}
        </div>
        <Card className="dashboard-panel">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Paperclip className="size-4" /> Attachments
            </CardTitle>
            <CardDescription>
              Supporting files and evidence linked directly to this published
              report.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {report.attachments.length ? (
              report.attachments.map((file) => (
                <DocumentRow key={file.id} file={file} />
              ))
            ) : (
              <DashboardEmptyState
                icon={<Paperclip className="size-5" />}
                title="No attachments linked"
                description="Supporting files, contracts, and media linked to this report will appear here."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
