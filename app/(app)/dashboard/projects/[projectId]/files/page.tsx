import { FolderOpen } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { DocumentRow } from "@/components/dashboard/document-row";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { Input } from "@/components/ui/input";
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
  const files = await dashboardService.getProjectFiles(session, projectId);
  const filters = await searchParams;

  return (
    <div className="space-y-6">
      <FilterBar>
        <form className="flex w-full flex-col gap-3 md:flex-row md:flex-wrap">
          <Input name="category" defaultValue={typeof filters.category === "string" ? filters.category : ""} placeholder="Category: documents, photos, videos..." className="md:w-72" />
          <Input name="uploadedBy" defaultValue={typeof filters.uploadedBy === "string" ? filters.uploadedBy : ""} placeholder="Uploader" className="md:w-48" />
        </form>
      </FilterBar>
      {files.length ? (
        <div className="grid gap-3">{files.map((file) => <DocumentRow key={file.id} file={file} />)}</div>
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
