import type { ReactNode } from "react";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { DashboardSidebarNav } from "@/components/dashboard/sidebar-nav";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import type {
  DashboardSession,
  NotificationItem,
  ProjectSummary,
} from "@/lib/dashboard/types";

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
    <SidebarProvider defaultOpen className="dashboard-shell">
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="dashboard-sidebar border-r border-sidebar-border"
      >
        <DashboardSidebarNav session={session} projects={projects} />
      </Sidebar>
      <SidebarInset className="dashboard-workspace min-h-screen">
        <DashboardTopbar
          session={session}
          projects={projects}
          unreadCount={unreadCount}
        />
        <div className="dashboard-content">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
