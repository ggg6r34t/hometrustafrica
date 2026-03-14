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
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {icon ? <div className="rounded-lg border border-border/70 bg-muted/30 p-2 text-muted-foreground">{icon}</div> : null}
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-3xl font-semibold tracking-tight text-foreground">{value}</div>
        {detail ? <p className="text-sm leading-6 text-muted-foreground">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
