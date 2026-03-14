"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BriefcaseBusiness,
  CircleHelp,
  FileText,
  FolderOpenDot,
  FolderKanban,
  LifeBuoy,
  LogOut,
  MessageSquareText,
  MoreHorizontal,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  Users2,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuAction,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import type { DashboardSession, ProjectSummary } from "@/lib/dashboard/types";

export function DashboardSidebarNav({
  session,
  projects,
}: {
  session: DashboardSession;
  projects: ProjectSummary[];
}) {
  const pathname = usePathname();
  const initials = session.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const defaultProject = projects[0];
  const deliveryBase = defaultProject
    ? `/dashboard/projects/${defaultProject.id}`
    : "/dashboard/projects";

  const sections = [
    {
      label: "Workspace",
      items: [
        {
          href: "/dashboard",
          label: "Overview",
          icon: PanelsTopLeft,
          active: pathname === "/dashboard",
        },
        {
          href: "/dashboard/projects",
          label: "Projects",
          icon: FolderKanban,
          active:
            pathname === "/dashboard/projects" ||
            pathname.startsWith("/dashboard/projects/"),
        },
      ],
    },
    {
      label: "Delivery",
      items: [
        {
          href: `${deliveryBase}/reports`,
          label: "Reports",
          icon: FileText,
          active: pathname.includes("/reports"),
        },
        {
          href: `${deliveryBase}/files`,
          label: "Files",
          icon: FolderOpenDot,
          active: pathname.includes("/files"),
        },
        {
          href: `${deliveryBase}/budget`,
          label: "Budget",
          icon: Wallet,
          active: pathname.includes("/budget"),
        },
        {
          href: `${deliveryBase}/team`,
          label: "Team",
          icon: Users2,
          active: pathname.includes("/team"),
        },
      ],
    },
    {
      label: "Communications",
      items: [
        {
          href: "/dashboard/inbox",
          label: "Inbox",
          icon: MessageSquareText,
          active: pathname.startsWith("/dashboard/inbox"),
        },
        {
          href: "/dashboard/notifications",
          label: "Notifications",
          icon: Bell,
          active: pathname.startsWith("/dashboard/notifications"),
        },
        {
          href: "/dashboard/support",
          label: "Support",
          icon: LifeBuoy,
          active: pathname.startsWith("/dashboard/support"),
        },
      ],
    },
    {
      label: "Administration",
      items: [
        {
          href: "/dashboard/settings/profile",
          label: "Settings",
          icon: Settings,
          active: pathname.startsWith("/dashboard/settings"),
        },
      ],
    },
  ];

  return (
    <>
      <SidebarHeader className="gap-4 px-4 py-5">
        <Link
          href="/dashboard"
          className="dashboard-brand-tile flex min-h-0 items-center gap-4"
        >
          <div className="flex size-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              HomeTrust Africa
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Client operations portal
            </p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      className="h-10 rounded-lg px-3 text-sm font-medium"
                    >
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
        ))}

        <SidebarSeparator className="mx-4" />

        <SidebarGroup>
          <SidebarGroupLabel>Project access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.slice(0, 5).map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.includes(
                      `/dashboard/projects/${project.id}`,
                    )}
                    size="sm"
                    className="h-9 rounded-lg px-3 text-xs font-medium"
                  >
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <BriefcaseBusiness />
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {!projects.length ? (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    size="sm"
                    className="h-9 rounded-lg px-3 text-xs font-medium"
                  >
                    <Link href="/dashboard/projects">
                      <CircleHelp />
                      <span>No projects yet</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : null}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              tooltip={session.name}
              className="h-11 rounded-xl px-3 pr-10"
            >
              <Link href="/dashboard/settings/profile">
                <Avatar className="size-7 rounded-lg border border-border">
                  <AvatarFallback className="rounded-lg bg-muted text-[11px] font-semibold text-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{session.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction className="right-2 top-1/2 -translate-y-1/2 rounded-full">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Open account menu</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="right" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings/profile">
                    Profile settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/logout">
                    <LogOut className="mr-2 size-4" />
                    Sign out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
