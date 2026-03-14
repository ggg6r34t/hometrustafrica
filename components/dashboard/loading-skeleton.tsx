import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="h-12 w-72 rounded-lg" />
        <Skeleton className="h-4 w-[32rem] rounded-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-36 rounded-xl border border-border/50"
          />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Skeleton className="h-[26rem] rounded-xl border border-border/50" />
        <Skeleton className="h-[26rem] rounded-xl border border-border/50" />
      </div>
    </div>
  );
}
