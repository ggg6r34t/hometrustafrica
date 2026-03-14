import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { TimelineEvent } from "@/lib/dashboard/types";

export function ActivityFeed({ items, title = "Recent activity" }: { items: TimelineEvent[]; title?: string }) {
  return (
    <Card className="dashboard-panel">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </div>
                <p className="text-xs text-muted-foreground">{format(new Date(item.occurredAt), "MMM d, yyyy 'at' HH:mm")}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {item.actorName} · {item.actorRoleLabel}
              </p>
              {item.attachments?.length ? (
                <div className="flex flex-wrap gap-2">
                  {item.attachments.map((attachment) => (
                    <Link
                      key={attachment.id}
                      href={attachment.href || "#"}
                    className="dashboard-chip border-border/70 bg-background text-foreground hover:border-primary/30 hover:text-primary"
                    >
                      {attachment.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            {index < items.length - 1 ? <Separator className="mt-4" /> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
