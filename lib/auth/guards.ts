import { notFound } from "next/navigation";
import { requireDashboardSession } from "@/lib/auth/session";
import { canAccessProject } from "@/lib/permissions/dashboard";
import { dashboardService } from "@/lib/dashboard/service";

export async function requireAuthorizedProject(projectId: string) {
  const session = await requireDashboardSession();
  const project = await dashboardService.getProjectById(session, projectId);

  if (!project || !canAccessProject(session, project)) {
    notFound();
  }

  return { session, project };
}
