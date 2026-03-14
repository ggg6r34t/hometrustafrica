import Link from "next/link";
import { Bell } from "lucide-react";
import { markNotificationsReadAction } from "@/app/actions/dashboard";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { formatDateLabel } from "@/components/dashboard/formatters";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await requireDashboardSession();
  const filters = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
  const notifications = await dashboardService.listNotifications(
    session,
    filters,
  );
  const unreadCount = notifications.filter(
    (notification) => !notification.readAt,
  ).length;
  const actionLinkedCount = notifications.filter((notification) =>
    Boolean(notification.href),
  ).length;
  const latestPublishedLabel = notifications[0]
    ? formatDateLabel(notifications[0].createdAt)
    : "No alerts yet";

  return (
    <div className="space-y-6">
      <FilterBar>
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <form className="flex w-full flex-col gap-4 md:flex-row">
            <Input
              name="type"
              defaultValue={filters.type}
              placeholder="Filter by type, e.g. new_message"
              className="md:w-64"
            />
            <Button type="submit" variant="outline" size="dashboard">
              Filter
            </Button>
          </form>
          {unreadCount ? (
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
              <Button type="submit" variant="outline" size="dashboard">
                Mark unread as read
              </Button>
            </form>
          ) : null}
        </div>
      </FilterBar>
      {notifications.length ? (
        <>
          <div className="grid items-start gap-4 md:grid-cols-3">
            <Card className="dashboard-panel-muted p-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Total notifications
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {notifications.length}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest system activity: {latestPublishedLabel}
              </p>
            </Card>
            <Card className="dashboard-panel-muted p-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Unread alerts
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {unreadCount}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Items that have not yet been acknowledged in the portal.
              </p>
            </Card>
            <Card className="dashboard-panel-muted p-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Linked actions
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {actionLinkedCount}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Notifications that point to a report, message, or action page.
              </p>
            </Card>
          </div>

          <Card className="dashboard-panel">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Notification register
              </CardTitle>
              <CardDescription>
                Track operational alerts, affected projects, timestamps, and any
                linked follow-up destination.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Notification</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6 text-right">Open</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="pl-6 align-top">
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">
                            {notification.title}
                          </p>
                          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                            {notification.body}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          label={notification.type.replaceAll("_", " ")}
                          tone={notification.readAt ? "neutral" : "success"}
                        />
                      </TableCell>
                      <TableCell>
                        {notification.projectName || "Workspace-wide"}
                      </TableCell>
                      <TableCell>
                        {formatDateLabel(notification.createdAt)}
                      </TableCell>
                      <TableCell>
                        {notification.readAt ? (
                          <span className="text-sm text-muted-foreground">
                            Read
                          </span>
                        ) : (
                           <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-2 py-0.5 text-[11px] font-medium leading-4 text-primary">
                             Unread
                           </span>
                        )}
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        {notification.href ? (
                          notification.href.startsWith("/") ? (
                            <Button variant="ghost" size="dashboard" asChild>
                              <Link href={notification.href}>Open</Link>
                            </Button>
                          ) : (
                            <Button variant="ghost" size="dashboard" asChild>
                              <a
                                href={notification.href}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Open
                              </a>
                            </Button>
                          )
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            No link
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
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
