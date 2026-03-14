import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimelineEvent } from "@/lib/dashboard/types";

export function ActivityFeed({
  items,
  title = "Recent activity",
}: {
  items: TimelineEvent[];
  title?: string;
}) {
  return (
    <Card className="dashboard-panel">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        {items.map((item, index) => (
          <div key={item.id} className={index === 0 ? "pb-5" : "py-5"}>
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.summary}
                  </p>
                </div>
                <p className="text-sm font-semibold text-muted-foreground">
                  {item.actorName} · {item.actorRoleLabel}
                </p>
                {item.attachments?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {item.attachments.map((attachment) => (
                      <Link
                        key={attachment.id}
                        href={attachment.href || "#"}
                        className="dashboard-chip border-border bg-background text-foreground hover:border-primary/20 hover:text-foreground"
                      >
                        {attachment.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground md:text-right">
                {format(new Date(item.occurredAt), "MMM d, yyyy 'at' HH:mm")}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
