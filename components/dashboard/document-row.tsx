import { format } from "date-fns";
import { Download } from "lucide-react";
import { FilePreviewDialog } from "@/components/dashboard/file-preview-dialog";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FileItem } from "@/lib/dashboard/types";

export function DocumentRow({ file }: { file: FileItem }) {
  return (
    <Card className="dashboard-panel">
      <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-semibold text-foreground">{file.name}</p>
            <StatusBadge label={file.category} tone="neutral" />
          </div>
          {file.description ? (
            <p className="text-sm leading-6 text-muted-foreground">
              {file.description}
            </p>
          ) : null}
          <p className="text-sm text-muted-foreground">
            Uploaded by {file.uploadedBy} on{" "}
            {format(new Date(file.uploadedAt), "MMM d, yyyy")}
            {file.sizeLabel ? ` · ${file.sizeLabel}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilePreviewDialog file={file} />
          <Button size="sm" asChild disabled={!file.downloadUrl}>
            <a href={file.downloadUrl || "#"} target="_blank" rel="noreferrer">
              <Download className="size-4" />
              Secure download
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
