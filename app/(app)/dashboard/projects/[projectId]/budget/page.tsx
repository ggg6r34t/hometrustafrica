import { ReceiptText, Wallet } from "lucide-react";
import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { formatCurrency } from "@/components/dashboard/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuthorizedProject } from "@/lib/auth/guards";
import { dashboardService } from "@/lib/dashboard/service";

export default async function ProjectBudgetPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const { session } = await requireAuthorizedProject(projectId);
  const budget = await dashboardService.getProjectBudget(session, projectId);

  if (!budget) {
    return (
      <DashboardEmptyState
        icon={<Wallet className="size-5" />}
        title="Budget tracking is not available yet"
        description="Allocated spend, receipts, approvals, and transaction summaries appear here when connected to the production finance data source."
      />
    );
  }

  return (
    <div className="space-y-6">
      <BudgetSummaryCard budget={budget} />
      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardHeader><CardTitle className="text-base font-semibold">Recent transactions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {budget.transactions.length ? (
            budget.transactions.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 rounded-xl border border-border/70 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.description}</p>
                  <p className="text-sm text-muted-foreground">{item.category} · {item.occurredAt} · {item.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatCurrency(item.amount, budget.currency)}</p>
                  <p className="text-sm text-muted-foreground">{item.receiptFileId ? "Receipt available" : "No receipt linked"}</p>
                </div>
              </div>
            ))
          ) : (
            <DashboardEmptyState
              icon={<ReceiptText className="size-5" />}
              title="No approved or pending transactions"
              description="Once project spend is recorded, each transaction and receipt trail will appear here."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
