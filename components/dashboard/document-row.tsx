import { format } from "date-fns";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { FileItem } from "@/lib/dashboard/types";
import { StatusBadge } from "@/components/dashboard/status-badge";

export function DocumentRow({ file }: { file: FileItem }) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-medium text-foreground">{file.name}</p>
            <StatusBadge label={file.category} tone="neutral" />
          </div>
          <p className="text-sm text-muted-foreground">
            Uploaded by {file.uploadedBy} on {format(new Date(file.uploadedAt), "MMM d, yyyy")}
            {file.sizeLabel ? ` · ${file.sizeLabel}` : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild disabled={!file.previewUrl}>
            <a href={file.previewUrl || "#"}>
              <Eye className="size-4" />
              Preview
            </a>
          </Button>
          <Button size="sm" asChild disabled={!file.downloadUrl}>
            <a href={file.downloadUrl || "#"}>
              <Download className="size-4" />
              Secure download
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
