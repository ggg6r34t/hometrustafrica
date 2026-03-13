import type { ReactNode } from "react";
import { Sidebar, SidebarInset, SidebarProvider, SidebarRail } from "@/components/ui/sidebar";
import { DashboardSidebarNav } from "@/components/dashboard/sidebar-nav";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import type { DashboardSession, NotificationItem, ProjectSummary } from "@/lib/dashboard/types";

export function DashboardAppShell({
  session,
  projects,
  notifications,
  children,
}: {
  session: DashboardSession;
  projects: ProjectSummary[];
  notifications: NotificationItem[];
  children: ReactNode;
}) {
  const unreadCount = notifications.filter((item) => !item.readAt).length;

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="inset">
        <DashboardSidebarNav session={session} projects={projects} />
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="min-h-screen bg-[linear-gradient(180deg,rgba(250,249,245,0.88),rgba(247,248,244,0.96))]">
        <DashboardTopbar session={session} projects={projects} unreadCount={unreadCount} />
        <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
