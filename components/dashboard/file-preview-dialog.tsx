"use client";

import { Download, Eye } from "lucide-react";
import { formatDateLabel } from "@/components/dashboard/formatters";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { FileItem } from "@/lib/dashboard/types";

export function FilePreviewDialog({ file }: { file: FileItem }) {
  if (!file.previewUrl) {
    return (
      <Button variant="outline" size="dashboard" asChild disabled>
        <span>
          <Eye className="size-4" />
          Preview
        </span>
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="dashboard">
          <Eye className="size-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-1.5rem)] max-w-5xl overflow-hidden rounded-xl border border-border p-0 sm:max-h-[calc(100vh-3rem)]">
        <DialogHeader className="border-b border-border px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4 pr-8">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-semibold text-foreground">
                {file.name}
              </DialogTitle>
              <DialogDescription>
                {file.category} preview shared through the secure document room.
              </DialogDescription>
            </div>
            <StatusBadge label={file.category} />
          </div>
          <div className="grid gap-4 pt-2 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Uploaded by
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {file.uploadedBy}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Uploaded
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {formatDateLabel(file.uploadedAt)}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                File size
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {file.sizeLabel || "Not available"}
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="min-h-0 overflow-auto bg-muted/20 px-6 py-6">
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            {file.mimeType?.startsWith("image/") ? (
              <img
                src={file.previewUrl}
                alt={file.name}
                className="max-h-[60vh] w-full object-contain sm:max-h-[65vh]"
              />
            ) : file.mimeType?.startsWith("video/") ? (
              <video controls className="max-h-[60vh] w-full sm:max-h-[65vh]">
                <source
                  src={file.previewUrl}
                  type={file.mimeType || undefined}
                />
              </video>
            ) : (
              <iframe
                src={file.previewUrl}
                title={file.name}
                className="h-[60vh] w-full sm:h-[65vh]"
              />
            )}
          </div>
        </div>
        {file.downloadUrl ? (
          <div className="flex justify-end border-t border-border px-6 py-4">
            <Button size="dashboard" asChild>
              <a href={file.downloadUrl} target="_blank" rel="noreferrer">
                <Download className="size-4" />
                Secure download
              </a>
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
