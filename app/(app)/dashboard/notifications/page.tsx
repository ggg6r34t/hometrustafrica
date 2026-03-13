import { Bell } from "lucide-react";
import { markNotificationsReadAction } from "@/app/actions/dashboard";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { NotificationItem } from "@/components/dashboard/notification-item";
import { Button } from "@/components/ui/button";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function NotificationsPage() {
  const session = await requireDashboardSession();
  const notifications = await dashboardService.listNotifications(session);

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Notifications"
        title="Notification center"
        description="Track report uploads, milestone changes, approvals, budget alerts, and security notices from one place."
        actions={
          notifications.length ? (
            <form action={markNotificationsReadAction}>
              {notifications
                .filter((item) => !item.readAt)
                .map((item) => (
                  <input
                    key={item.id}
                    type="hidden"
                    name="notificationIds"
                    value={item.id}
                  />
                ))}
              <Button type="submit" variant="outline">
                Mark unread as read
              </Button>
            </form>
          ) : null
        }
      />
      {notifications.length ? (
        <div className="grid gap-3">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          icon={<Bell className="size-5" />}
          title="No notifications yet"
          description="Report activity, approvals, messages, and operational alerts will appear here once available."
        />
      )}
    </div>
  );
}
