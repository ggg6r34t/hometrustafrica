import { Card } from "@/components/ui/card";
import { NotificationSettingsForm } from "@/components/dashboard/forms";
import { emptyDashboardSettings } from "@/lib/dashboard/defaults";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function SettingsNotificationsPage() {
  const session = await requireDashboardSession();
  const settings =
    (await dashboardService.getSettings(session)) || emptyDashboardSettings;
  const emailEnabled = [
    settings.notifications.emailReports,
    settings.notifications.emailMilestones,
    settings.notifications.emailBudgetAlerts,
    settings.notifications.emailMessages,
  ].filter(Boolean).length;
  const inAppEnabled = [
    settings.notifications.inAppReports,
    settings.notifications.inAppMilestones,
    settings.notifications.inAppBudgetAlerts,
    settings.notifications.inAppMessages,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-4 md:grid-cols-3">
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Email alerts enabled
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
            {emailEnabled}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Out of four available email notification categories.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            In-app alerts enabled
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
            {inAppEnabled}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Portal notifications currently active for operational events.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Coverage
          </p>
          <p className="mt-2 font-semibold text-foreground">
            Reports, milestones, budgets, messages
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Fine-tune which event categories should reach you and how.
          </p>
        </Card>
      </div>
      <NotificationSettingsForm settings={settings.notifications} />
    </div>
  );
}
