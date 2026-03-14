import { Card } from "@/components/ui/card";
import { SecuritySettingsForm } from "@/components/dashboard/forms";
import { emptyDashboardSettings } from "@/lib/dashboard/defaults";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function SettingsSecurityPage() {
  const session = await requireDashboardSession();
  const settings =
    (await dashboardService.getSettings(session)) || emptyDashboardSettings;

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-4 md:grid-cols-3">
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Two-factor readiness
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {settings.security.hasTwoFactorEnabled
              ? "Enabled"
              : "Ready for activation"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Additional account protection for sensitive operational access.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Active sessions
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {settings.security.activeSessionsCount}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Concurrent signed-in sessions currently associated with this
            account.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Last sign-in
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {settings.security.lastSignInAt || "Not available"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Most recent authentication event recorded by the portal.
          </p>
        </Card>
      </div>
      <SecuritySettingsForm settings={settings.security} />
    </div>
  );
}
