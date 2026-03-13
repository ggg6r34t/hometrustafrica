import { formatCurrency } from "@/components/dashboard/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ProjectBudget } from "@/lib/dashboard/types";

export function BudgetSummaryCard({ budget }: { budget: ProjectBudget }) {
  const percentSpent = budget.allocated > 0 ? Math.min(100, (budget.spent / budget.allocated) * 100) : 0;

  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Budget snapshot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Allocated</p>
            <p className="text-xl font-semibold text-foreground">{formatCurrency(budget.allocated, budget.currency)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Spent</p>
            <p className="text-xl font-semibold text-foreground">{formatCurrency(budget.spent, budget.currency)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-xl font-semibold text-foreground">{formatCurrency(budget.remaining, budget.currency)}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Spend progression</span>
            <span className="font-medium text-foreground">{percentSpent.toFixed(0)}%</span>
          </div>
          <Progress value={percentSpent} className="h-2" />
        </div>
        <div className="space-y-3">
          {budget.categories.map((category) => (
            <div key={category.label} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium text-foreground">{category.label}</p>
                <p className="text-muted-foreground">
                  {formatCurrency(category.spent, budget.currency)} of {formatCurrency(category.allocated, budget.currency)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
