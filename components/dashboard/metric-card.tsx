import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail?: string;
  icon?: ReactNode;
}) {
  return (
    <Card className="dashboard-panel gap-0">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          {label}
        </CardTitle>
        {icon ? (
          <div className="rounded-lg border border-border/70 bg-background p-2 text-muted-foreground">
            {icon}
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-[2rem] font-semibold tracking-[-0.03em] text-foreground">
          {value}
        </div>
        {detail ? (
          <p className="text-sm leading-6 text-muted-foreground">{detail}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
