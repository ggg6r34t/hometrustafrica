import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import type { NotificationItem as NotificationItemType } from "@/lib/dashboard/types";

export function NotificationItem({
  notification,
}: {
  notification: NotificationItemType;
}) {
  return (
    <Card className="dashboard-panel">
      <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-foreground">
              {notification.title}
            </p>
            <StatusBadge
              label={notification.type.replaceAll("_", " ")}
              tone={notification.readAt ? "neutral" : "success"}
            />
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            {notification.body}
          </p>
          <p className="text-sm text-muted-foreground">
            {notification.projectName ? `${notification.projectName} · ` : ""}
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        {notification.href ? (
          <Link
            href={notification.href}
            className="text-sm font-medium text-primary"
          >
            Open
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
