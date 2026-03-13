import { ProfileSettingsForm } from "@/components/dashboard/forms";
import { emptyDashboardSettings } from "@/lib/dashboard/defaults";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function SettingsProfilePage() {
  const session = await requireDashboardSession();
  const settings = (await dashboardService.getSettings(session)) || emptyDashboardSettings;
  return <ProfileSettingsForm settings={settings.profile} />;
}
