import { ReceiptText, Wallet } from "lucide-react";
import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { formatCurrency } from "@/components/dashboard/formatters";
import { ApprovalDecisionForm } from "@/components/dashboard/forms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuthorizedProject } from "@/lib/auth/guards";
import { dashboardService } from "@/lib/dashboard/service";

export default async function ProjectBudgetPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const { session } = await requireAuthorizedProject(projectId);
  const [budget, approvals] = await Promise.all([
    dashboardService.getProjectBudget(session, projectId),
    dashboardService.getProjectApprovals(session, projectId),
  ]);

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
      <Card className="dashboard-panel">
        <CardHeader><CardTitle className="text-base font-semibold">Approval queue</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {approvals.length ? (
            approvals.map((approval) =>
              approval.status === "pending" && approval.requestedFromUserId === session.userId ? (
                <ApprovalDecisionForm key={approval.id} approval={approval} />
              ) : (
                <div key={approval.id} className="dashboard-list-row">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-foreground">{approval.title}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{approval.status}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{approval.description}</p>
                </div>
              ),
            )
          ) : (
            <DashboardEmptyState
              icon={<ReceiptText className="size-5" />}
              title="No approval requests in this budget cycle"
              description="Approval decisions tied to spend controls will appear here when they need review."
            />
          )}
        </CardContent>
      </Card>
      <Card className="dashboard-panel">
        <CardHeader><CardTitle className="text-base font-semibold">Recent transactions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {budget.transactions.length ? (
            budget.transactions.map((item) => (
              <div key={item.id} className="dashboard-list-row flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
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
