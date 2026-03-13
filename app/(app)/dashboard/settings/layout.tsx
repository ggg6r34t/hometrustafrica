import type { ReactNode } from "react";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { SettingsNav } from "@/components/dashboard/settings-nav";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Settings"
        title="Security, profile, and portal controls"
        description="Manage how HomeTrust Africa communicates with you, how your account is protected, and how your dashboard is personalized."
      />
      <SettingsNav />
      {children}
    </div>
  );
}
