"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  FolderKanban,
  LifeBuoy,
  LogOut,
  MessageSquareText,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
} from "lucide-react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { DashboardSession, ProjectSummary } from "@/lib/dashboard/types";

const primaryNav = [
  { href: "/dashboard", label: "Overview", icon: PanelsTopLeft },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/inbox", label: "Inbox", icon: MessageSquareText },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
];

export function DashboardSidebarNav({
  session,
  projects,
}: {
  session: DashboardSession;
  projects: ProjectSummary[];
}) {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="gap-4 px-4 py-6">
        <Link href="/dashboard" className="dashboard-panel flex min-h-0 items-center gap-4 px-4 py-4">
          <div className="flex size-10 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">HomeTrust Africa</p>
            <p className="text-xs text-muted-foreground">Secure client operations portal</p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.slice(0, 6).map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild isActive={pathname.includes(`/dashboard/projects/${project.id}`)} size="sm">
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <FolderKanban />
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4">
        <div className="dashboard-panel p-3">
          <p className="text-sm font-medium text-foreground">{session.name}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{session.role.replaceAll("_", " ")}</p>
          <p className="mt-1 text-xs text-muted-foreground">{session.email}</p>
          <Link href="/logout" className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-primary">
            <LogOut className="size-3.5" />
            Sign out
          </Link>
        </div>
      </SidebarFooter>
    </>
  );
}
