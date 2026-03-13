import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:flex-wrap md:items-center">{children}</CardContent>
    </Card>
  );
}
