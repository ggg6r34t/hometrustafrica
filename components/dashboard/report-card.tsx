import Link from "next/link";
import { format } from "date-fns";
import { FileText, ImageIcon, Paperclip } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ReportItem } from "@/lib/dashboard/types";
import { StatusBadge } from "@/components/dashboard/status-badge";

export function ReportCard({ report }: { report: ReportItem }) {
  return (
    <Card className="dashboard-panel">
      <CardContent className="space-y-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-base font-semibold text-foreground">
              {report.title}
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              {report.summary}
            </p>
          </div>
          <StatusBadge label={report.type} tone="neutral" />
        </div>
        <div className="grid gap-4 border-y border-border py-4 text-sm text-muted-foreground md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">
              Reporting period
            </p>
            <p>{report.reportingPeriodLabel}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">
              Uploaded by
            </p>
            <p>{report.uploadedBy}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">
              Uploaded
            </p>
            <p>{format(new Date(report.uploadedAt), "MMM d, yyyy")}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Paperclip className="size-3.5" /> {report.attachmentsCount}{" "}
            attachments
          </span>
          <span className="inline-flex items-center gap-1">
            <ImageIcon className="size-3.5" /> {report.mediaCount} media items
          </span>
          <Link
            href={`/dashboard/projects/${report.projectId}/reports/${report.id}`}
            className="inline-flex items-center gap-1 font-medium text-primary"
          >
            <FileText className="size-3.5" /> Open report hub
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
