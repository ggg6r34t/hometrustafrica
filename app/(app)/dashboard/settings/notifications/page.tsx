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
      <NotificationSettingsForm settings={settings.notifications} />
    </div>
  );
}
