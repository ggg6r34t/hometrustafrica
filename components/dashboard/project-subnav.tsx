"use client";

import { DashboardSectionNav } from "@/components/dashboard/section-nav";

export function ProjectSubnav({ projectId }: { projectId: string }) {
  const items = [
    { href: `/dashboard/projects/${projectId}`, label: "Overview" },
    { href: `/dashboard/projects/${projectId}/timeline`, label: "Timeline" },
    { href: `/dashboard/projects/${projectId}/reports`, label: "Reports" },
    { href: `/dashboard/projects/${projectId}/files`, label: "Files" },
    { href: `/dashboard/projects/${projectId}/budget`, label: "Budget" },
    { href: `/dashboard/projects/${projectId}/team`, label: "Team" },
  ];

  return <DashboardSectionNav ariaLabel="Project sections" items={items} />;
}
