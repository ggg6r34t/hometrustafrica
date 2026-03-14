import { formatCurrency } from "@/components/dashboard/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ProjectBudget } from "@/lib/dashboard/types";

export function BudgetSummaryCard({ budget }: { budget: ProjectBudget }) {
  const percentSpent =
    budget.allocated > 0
      ? Math.min(100, (budget.spent / budget.allocated) * 100)
      : 0;

  return (
    <Card className="dashboard-panel">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          Budget snapshot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="dashboard-panel-muted p-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Allocated
            </p>
            <p className="text-xl font-semibold text-foreground">
              {formatCurrency(budget.allocated, budget.currency)}
            </p>
          </div>
          <div className="dashboard-panel-muted p-4">
            <p className="text-sm font-semibold text-muted-foreground">Spent</p>
            <p className="text-xl font-semibold text-foreground">
              {formatCurrency(budget.spent, budget.currency)}
            </p>
          </div>
          <div className="dashboard-panel-muted p-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Remaining
            </p>
            <p className="text-xl font-semibold text-foreground">
              {formatCurrency(budget.remaining, budget.currency)}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Spend progression</span>
            <span className="font-medium text-foreground">
              {percentSpent.toFixed(0)}%
            </span>
          </div>
          <Progress value={percentSpent} className="h-1.5 rounded-md" />
        </div>
        <div className="space-y-3 border-t border-border pt-4">
          {budget.categories.map((category) => (
            <div
              key={category.label}
              className="flex items-center justify-between text-sm"
            >
              <div>
                <p className="font-medium text-foreground">{category.label}</p>
                <p className="text-muted-foreground">
                  {formatCurrency(category.spent, budget.currency)} of{" "}
                  {formatCurrency(category.allocated, budget.currency)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
