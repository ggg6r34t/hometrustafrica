import { NotificationSettingsForm } from "@/components/dashboard/forms";
import { emptyDashboardSettings } from "@/lib/dashboard/defaults";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function SettingsNotificationsPage() {
  const session = await requireDashboardSession();
  const settings = (await dashboardService.getSettings(session)) || emptyDashboardSettings;
  return <NotificationSettingsForm settings={settings.notifications} />;
}
