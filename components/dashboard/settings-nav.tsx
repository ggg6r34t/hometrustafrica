"use client";

import { DashboardSectionNav } from "@/components/dashboard/section-nav";

export function SettingsNav() {
  const items = [
    { href: "/dashboard/settings/profile", label: "Profile" },
    { href: "/dashboard/settings/security", label: "Security" },
    { href: "/dashboard/settings/notifications", label: "Notifications" },
    { href: "/dashboard/settings/preferences", label: "Preferences" },
  ];

  return <DashboardSectionNav ariaLabel="Settings sections" items={items} />;
}
