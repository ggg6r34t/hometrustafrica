"use client";

import { Download, Eye } from "lucide-react";
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
      <Button variant="outline" size="sm" asChild disabled>
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
        <Button variant="outline" size="sm">
          <Eye className="size-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{file.name}</DialogTitle>
          <DialogDescription>
            {file.category} preview shared through the secure document room.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-muted/30">
          {file.mimeType?.startsWith("image/") ? (
            <img src={file.previewUrl} alt={file.name} className="max-h-[70vh] w-full object-contain" />
          ) : file.mimeType?.startsWith("video/") ? (
            <video controls className="max-h-[70vh] w-full">
              <source src={file.previewUrl} type={file.mimeType || undefined} />
            </video>
          ) : (
            <iframe src={file.previewUrl} title={file.name} className="h-[70vh] w-full" />
          )}
        </div>
        {file.downloadUrl ? (
          <div className="flex justify-end">
            <Button asChild>
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
