import { AlertTriangle, ReceiptText, Wallet } from "lucide-react";
import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import {
  formatCurrency,
  formatDateLabel,
} from "@/components/dashboard/formatters";
import { ApprovalDecisionForm } from "@/components/dashboard/forms";
import { MetricCard } from "@/components/dashboard/metric-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireAuthorizedProject } from "@/lib/auth/guards";
import { dashboardService } from "@/lib/dashboard/service";

export default async function ProjectBudgetPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
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

  const actionableApprovals = approvals.filter(
    (approval) =>
      approval.status === "pending" &&
      approval.requestedFromUserId === session.userId,
  );
  const registerApprovals = approvals.filter(
    (approval) =>
      !(
        approval.status === "pending" &&
        approval.requestedFromUserId === session.userId
      ),
  );
  const flaggedTransactions = budget.transactions.filter(
    (transaction) => transaction.status === "flagged",
  ).length;
  const pendingTransactions = budget.transactions.filter(
    (transaction) => transaction.status === "pending",
  ).length;

  return (
    <div className="space-y-6">
      <BudgetSummaryCard budget={budget} />
      <div className="grid items-start gap-4 md:grid-cols-3">
        <MetricCard
          label="Transactions logged"
          value={String(budget.transactions.length)}
          detail="All approved, pending, and flagged spend records in this project."
          icon={<ReceiptText className="size-4" />}
        />
        <MetricCard
          label="Pending approvals"
          value={String(budget.pendingApprovalsCount)}
          detail="Budget controls currently awaiting an internal or client decision."
          icon={<Wallet className="size-4" />}
        />
        <MetricCard
          label="Flagged or pending spend"
          value={String(flaggedTransactions + pendingTransactions)}
          detail="Records requiring extra review, confirmation, or supporting evidence."
          icon={<AlertTriangle className="size-4" />}
        />
      </div>

      {actionableApprovals.length ? (
        <Card className="dashboard-panel">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Awaiting your decision
            </CardTitle>
            <CardDescription>
              Review spend-related approvals that currently need client
              confirmation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-6">
            {actionableApprovals.map((approval) => (
              <ApprovalDecisionForm key={approval.id} approval={approval} />
            ))}
          </CardContent>
        </Card>
      ) : null}

      <Card className="dashboard-panel">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Approval register
          </CardTitle>
          <CardDescription>
            Track budget decisions, responsible parties, and decision timing in
            a single audit-friendly queue.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          {registerApprovals.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Approval</TableHead>
                  <TableHead>Requested by</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registerApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell className="pl-6 align-top">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">
                          {approval.title}
                        </p>
                        {approval.description ? (
                          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                            {approval.description}
                          </p>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>{approval.requestedBy}</TableCell>
                    <TableCell>
                      {formatDateLabel(approval.dueAt, "No due date")}
                    </TableCell>
                    <TableCell>
                      {approval.amount && approval.currency
                        ? formatCurrency(approval.amount, approval.currency)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        label={approval.status.replaceAll("_", " ")}
                        tone={
                          approval.status === "approved"
                            ? "success"
                            : approval.status === "rejected"
                              ? "danger"
                              : "warning"
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-6">
              <DashboardEmptyState
                icon={<ReceiptText className="size-5" />}
                title="No approval requests in this budget cycle"
                description="Approval decisions tied to spend controls will appear here when they need review."
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="dashboard-panel">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Recent transactions
          </CardTitle>
          <CardDescription>
            Monitor categorized spend, receipt availability, and review status
            for each budget entry.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          {budget.transactions.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Transaction</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Occurred</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead className="pr-6 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budget.transactions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="pl-6">
                      <p className="font-medium text-foreground">
                        {item.description}
                      </p>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{formatDateLabel(item.occurredAt)}</TableCell>
                    <TableCell>
                      <StatusBadge
                        label={item.status}
                        tone={
                          item.status === "approved"
                            ? "success"
                            : item.status === "flagged"
                              ? "danger"
                              : "warning"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {item.receiptFileId ? "Available" : "Not linked"}
                    </TableCell>
                    <TableCell className="pr-6 text-right font-semibold text-foreground">
                      {formatCurrency(item.amount, budget.currency)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-6">
              <DashboardEmptyState
                icon={<ReceiptText className="size-5" />}
                title="No approved or pending transactions"
                description="Once project spend is recorded, each transaction and receipt trail will appear here."
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
