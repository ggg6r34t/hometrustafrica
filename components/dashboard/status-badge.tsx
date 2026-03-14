import { Badge } from "@/components/ui/badge";
import { formatSentenceCaseLabel } from "@/components/dashboard/formatters";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger";
  className?: string;
}

const toneClasses: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  neutral: "border-border bg-muted/25 text-foreground",
  success: "border-primary/20 bg-primary/8 text-foreground",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-rose-200 bg-rose-50 text-rose-900",
};

export function StatusBadge({
  label,
  tone = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md px-2.5 py-1 text-[13px] font-medium tracking-normal",
        toneClasses[tone],
        className,
      )}
    >
      {formatSentenceCaseLabel(label)}
    </Badge>
  );
}
