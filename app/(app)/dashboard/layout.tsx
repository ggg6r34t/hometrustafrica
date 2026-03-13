import type { ReactNode } from "react";
import { DashboardAppShell } from "@/components/dashboard/app-shell";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requireDashboardSession();
  const [projects, notifications] = await Promise.all([
    dashboardService.listProjects(session),
    dashboardService.listNotifications(session),
  ]);

  return (
    <DashboardAppShell session={session} projects={projects} notifications={notifications}>
      {children}
    </DashboardAppShell>
  );
}
