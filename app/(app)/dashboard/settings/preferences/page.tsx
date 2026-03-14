import { Card } from "@/components/ui/card";
import { PreferenceSettingsForm } from "@/components/dashboard/forms";
import { emptyDashboardSettings } from "@/lib/dashboard/defaults";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function SettingsPreferencesPage() {
  const session = await requireDashboardSession();
  const settings =
    (await dashboardService.getSettings(session)) || emptyDashboardSettings;

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-4 md:grid-cols-3">
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Timezone
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {settings.preferences.timezone}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Controls how timestamps are presented across reports, inbox, and
            notifications.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Currency
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {settings.preferences.currency}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Used when budgeting and financial reporting values are displayed.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">Density</p>
          <p className="mt-2 font-semibold text-foreground">
            {settings.preferences.density}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Balances information density and reading comfort across the
            workspace.
          </p>
        </Card>
      </div>
      <PreferenceSettingsForm settings={settings.preferences} />
    </div>
  );
}
