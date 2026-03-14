import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("dashboard-page-header", className)}>
      <div className="space-y-3">
        {eyebrow ? <p className="dashboard-page-eyebrow">{eyebrow}</p> : null}
        <div className="space-y-2">
          <h1 className="dashboard-page-title">{title}</h1>
          <p className="dashboard-page-description">{description}</p>
        </div>
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
