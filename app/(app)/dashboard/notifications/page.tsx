import { Bell } from "lucide-react";
import { markNotificationsReadAction } from "@/app/actions/dashboard";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { NotificationItem } from "@/components/dashboard/notification-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function NotificationsPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await requireDashboardSession();
  const filters = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );
  const notifications = await dashboardService.listNotifications(session, filters);

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
      <FilterBar>
        <form className="flex w-full flex-col gap-4 md:flex-row">
          <Input name="type" defaultValue={filters.type} placeholder="Filter by type, e.g. new_message" className="md:w-64" />
          <Button type="submit" variant="outline">Filter</Button>
        </form>
      </FilterBar>
      {notifications.length ? (
        <div className="grid gap-4">
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
