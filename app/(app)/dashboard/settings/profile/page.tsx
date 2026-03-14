import { Card } from "@/components/ui/card";
import { ProfileSettingsForm } from "@/components/dashboard/forms";
import { emptyDashboardSettings } from "@/lib/dashboard/defaults";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function SettingsProfilePage() {
  const session = await requireDashboardSession();
  const settings =
    (await dashboardService.getSettings(session)) || emptyDashboardSettings;

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-4 md:grid-cols-3">
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Account holder
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {settings.profile.fullName}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Primary identity shown across secure client interactions.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Preferred channel
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {settings.profile.preferredContactMethod}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Used when operations teams coordinate updates and follow-up.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Location
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {settings.profile.country || "Not set"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Supports region-specific communication and service coordination.
          </p>
        </Card>
      </div>
      <ProfileSettingsForm settings={settings.profile} />
    </div>
  );
}
