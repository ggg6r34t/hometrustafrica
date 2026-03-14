import { Download, FileImage, FileText, FolderOpen, ReceiptText, Search } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { FilePreviewDialog } from "@/components/dashboard/file-preview-dialog";
import { formatDateLabel } from "@/components/dashboard/formatters";
import { MetricCard } from "@/components/dashboard/metric-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
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

export default async function ProjectFilesPage({
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
  const files = await dashboardService.getProjectFiles(
    session,
    projectId,
    normalizedFilters,
  );
  const documentCount = files.filter((file) =>
    ["Document", "Contract", "Receipt"].includes(file.category),
  ).length;
  const mediaCount = files.filter((file) =>
    ["Photo", "Video"].includes(file.category),
  ).length;
  const latestUploadedLabel = files[0]
    ? formatDateLabel(files[0].uploadedAt)
    : "No files yet";

  return (
    <div className="space-y-6">
      <FilterBar>
        <form className="flex w-full flex-col gap-4 md:flex-row md:flex-wrap">
          <div className="relative min-w-[16rem] flex-1 md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={typeof filters.q === "string" ? filters.q : ""}
              placeholder="Search file name or description"
              className="pl-9"
            />
          </div>
          <Input
            name="category"
            defaultValue={
              typeof filters.category === "string" ? filters.category : ""
            }
            placeholder="Category: documents, photos, videos..."
            className="md:w-72"
          />
          <Input
            name="uploadedBy"
            defaultValue={
              typeof filters.uploadedBy === "string" ? filters.uploadedBy : ""
            }
            placeholder="Uploader"
            className="md:w-48"
          />
          <Button type="submit" size="dashboard">Apply filters</Button>
        </form>
      </FilterBar>
      {files.length ? (
        <>
          <div className="grid items-start gap-4 md:grid-cols-3">
            <MetricCard
              label="Shared files"
              value={String(files.length)}
              detail={`Latest upload: ${latestUploadedLabel}`}
              icon={<FileText className="size-4" />}
            />
            <MetricCard
              label="Documents and receipts"
              value={String(documentCount)}
              detail="Contracts, documents, and receipt evidence available to the client."
              icon={<ReceiptText className="size-4" />}
            />
            <MetricCard
              label="Media assets"
              value={String(mediaCount)}
              detail="Photo and video evidence from the secure document room."
              icon={<FileImage className="size-4" />}
            />
          </div>

          <Card className="dashboard-panel">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Document room
              </CardTitle>
              <CardDescription>
                Browse client-visible records, evidence, and downloads from a
                single secure register.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">File</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Uploaded by</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="pr-6 text-right">Access</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="pl-6 align-top">
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">
                            {file.name}
                          </p>
                          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                            {file.description ||
                              `${file.category} shared through the secure document room.`}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge label={file.category} />
                      </TableCell>
                      <TableCell>{file.uploadedBy}</TableCell>
                      <TableCell>{formatDateLabel(file.uploadedAt)}</TableCell>
                      <TableCell>{file.sizeLabel || "-"}</TableCell>
                      <TableCell className="pr-6">
                        <div className="flex justify-end gap-2">
                          <FilePreviewDialog file={file} />
                          {file.downloadUrl ? (
                            <Button size="dashboard" asChild>
                              <a
                                href={file.downloadUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Download className="size-4" />
                                Download
                              </a>
                            </Button>
                          ) : (
                            <Button size="dashboard" disabled>
                              <Download className="size-4" />
                              Download
                            </Button>
                          )}
                        </div>
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
          icon={<FolderOpen className="size-5" />}
          title="No client-visible files available"
          description="Secure documents, receipts, photos, videos, and contracts will appear here once authorized for the client portal."
        />
      )}
    </div>
  );
}
