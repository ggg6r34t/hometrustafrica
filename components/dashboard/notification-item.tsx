import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import type { NotificationItem as NotificationItemType } from "@/lib/dashboard/types";
import { StatusBadge } from "@/components/dashboard/status-badge";

export function NotificationItem({ notification }: { notification: NotificationItemType }) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium text-foreground">{notification.title}</p>
            <StatusBadge label={notification.type.replaceAll("_", " ")} tone={notification.readAt ? "neutral" : "success"} />
          </div>
          <p className="text-sm text-muted-foreground">{notification.body}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {notification.projectName ? `${notification.projectName} · ` : ""}
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </div>
        {notification.href ? (
          <Link href={notification.href} className="text-sm font-medium text-primary">
            Open
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
