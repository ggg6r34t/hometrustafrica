import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <Card className="dashboard-panel">
      <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:flex-wrap md:items-center md:gap-3 md:p-5">
        {children}
      </CardContent>
    </Card>
  );
}
