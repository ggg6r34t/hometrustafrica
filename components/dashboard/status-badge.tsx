import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger";
  className?: string;
}

const toneClasses: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  neutral: "border-border/80 bg-muted/30 text-foreground",
  success: "border-emerald-200/80 bg-emerald-50/80 text-emerald-800",
  warning: "border-amber-200/80 bg-amber-50/80 text-amber-800",
  danger: "border-rose-200/80 bg-rose-50/80 text-rose-800",
};

export function StatusBadge({ label, tone = "neutral", className }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]", toneClasses[tone], className)}>
      {label}
    </Badge>
  );
}
