import type { ReactNode } from "react";
import { ProjectSubnav } from "@/components/dashboard/project-subnav";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { requireAuthorizedProject } from "@/lib/auth/guards";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const { project } = await requireAuthorizedProject(projectId);
  const healthTone = project.health === "healthy" ? "success" : project.health === "watch" ? "warning" : "danger";

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow={project.type}
        title={project.name}
        description={`${project.location} · ${project.stageLabel}`}
        actions={<StatusBadge label={project.status.replaceAll("_", " ")} tone={healthTone} />}
      />
      <ProjectSubnav projectId={project.id} />
      {children}
    </div>
  );
}
