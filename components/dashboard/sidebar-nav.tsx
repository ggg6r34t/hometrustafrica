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

function isPathWithin(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function matchesProjectSection(pathname: string, section: string) {
  return new RegExp(`^/dashboard/projects/[^/]+/${section}(?:/.*)?$`).test(
    pathname,
  );
}

function matchesProjectWorkspace(pathname: string) {
  return (
    pathname === "/dashboard/projects" ||
    /^\/dashboard\/projects\/[^/]+(?:\/timeline)?$/.test(pathname)
  );
}

export function DashboardSidebarNav({
  session,
  projects,
  unreadCount,
}: {
  session: DashboardSession;
  projects: ProjectSummary[];
  unreadCount: number;
}) {
  const pathname = usePathname();
  const initials = session.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const nameParts = session.name.trim().split(/\s+/).filter(Boolean);
  const displayName =
    nameParts.length > 1
      ? `${nameParts[0]} ${nameParts[nameParts.length - 1][0]}.`
      : nameParts[0] || session.name;
  const unreadCountLabel = unreadCount > 9 ? "9+" : String(unreadCount);
  const activeProjectId =
    pathname.match(/^\/dashboard\/projects\/([^/]+)/)?.[1] ?? null;
  const defaultProject = projects[0];
  const currentProject =
    projects.find((project) => project.id === activeProjectId) ??
    defaultProject;
  const deliveryBase = currentProject
    ? `/dashboard/projects/${currentProject.id}`
    : "/dashboard/projects";

  const sections = [
    {
      label: "Dashboard",
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
          active: matchesProjectWorkspace(pathname),
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
          active: matchesProjectSection(pathname, "reports"),
        },
        {
          href: `${deliveryBase}/files`,
          label: "Files",
          icon: FolderOpenDot,
          active: matchesProjectSection(pathname, "files"),
        },
        {
          href: `${deliveryBase}/budget`,
          label: "Budget",
          icon: Wallet,
          active: matchesProjectSection(pathname, "budget"),
        },
        {
          href: `${deliveryBase}/team`,
          label: "Team",
          icon: Users2,
          active: matchesProjectSection(pathname, "team"),
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
          active: isPathWithin(pathname, "/dashboard/inbox"),
        },
        {
          href: "/dashboard/notifications",
          label: "Notifications",
          icon: Bell,
          active: isPathWithin(pathname, "/dashboard/notifications"),
        },
        {
          href: "/dashboard/support",
          label: "Support",
          icon: LifeBuoy,
          active: isPathWithin(pathname, "/dashboard/support"),
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
          active: isPathWithin(pathname, "/dashboard/settings"),
        },
      ],
    },
  ];

  return (
    <>
      <SidebarHeader className="gap-4 px-4 py-4">
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
                      className="h-9 rounded-lg px-3 text-sm font-medium"
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
                    isActive={isPathWithin(
                      pathname,
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
      <SidebarFooter className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex h-11 items-center gap-2 rounded-xl px-3 transition-colors hover:bg-sidebar-accent/50 group-data-[collapsible=icon]:justify-center">
              <Link
                href="/dashboard/settings/profile"
                title={session.name}
                className="flex min-w-0 flex-1 items-center gap-2"
              >
                <Avatar className="size-7 rounded-lg border border-border">
                  <AvatarFallback className="rounded-lg bg-muted text-[11px] font-semibold text-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="min-w-0 truncate group-data-[collapsible=icon]:hidden">
                  {displayName}
                </span>
              </Link>
              <div className="flex shrink-0 items-center group-data-[collapsible=icon]:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction className="static size-6 translate-y-0 rounded-full hover:bg-transparent hover:text-sidebar-foreground [&>svg]:size-3.5">
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">Open account menu</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    side="right"
                    className="w-56"
                  >
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

                <Link
                  href="/dashboard/notifications"
                  className="-ml-0.5 text-sidebar-foreground ring-sidebar-ring relative inline-flex size-6 items-center justify-center rounded-full outline-hidden transition-colors hover:bg-transparent hover:text-sidebar-foreground focus-visible:ring-2"
                >
                  <Bell className="size-3.5" />
                  {unreadCount ? (
                    <span className="absolute right-1.5 top-3 inline-flex h-3.5 min-w-3.5 translate-x-0 -translate-y-1/2 items-center justify-center rounded-full bg-primary px-1 text-[7px] font-semibold leading-none text-primary-foreground ring-2 ring-sidebar">
                      {unreadCountLabel}
                    </span>
                  ) : null}
                  <span className="sr-only">Open notifications</span>
                </Link>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
