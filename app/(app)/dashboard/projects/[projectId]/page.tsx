import {
  AlertTriangle,
  FileText,
  FolderOpenDot,
  MessageSquareText,
} from "lucide-react";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { ApprovalDecisionForm } from "@/components/dashboard/forms";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ReportCard } from "@/components/dashboard/report-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { TeamMemberCard } from "@/components/dashboard/team-member-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuthorizedProject } from "@/lib/auth/guards";
import { dashboardService } from "@/lib/dashboard/service";

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const { session, project } = await requireAuthorizedProject(projectId);
  const [timeline, reports, files, budget, team, approvals] = await Promise.all(
    [
      dashboardService.getProjectTimeline(session, projectId),
      dashboardService.getProjectReports(session, projectId),
      dashboardService.getProjectFiles(session, projectId),
      dashboardService.getProjectBudget(session, projectId),
      dashboardService.getProjectTeam(session, projectId),
      dashboardService.getProjectApprovals(session, projectId),
    ],
  );

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Completion"
          value={`${project.completionPercentage}%`}
          detail="Overall execution progress"
          icon={<FolderOpenDot className="size-4" />}
        />
        <MetricCard
          label="Pending approvals"
          value={String(project.pendingApprovalsCount)}
          detail="Awaiting client or ops confirmation"
          icon={<AlertTriangle className="size-4" />}
        />
        <MetricCard
          label="Unread messages"
          value={String(project.unreadMessagesCount)}
          detail="Secure thread activity"
          icon={<MessageSquareText className="size-4" />}
        />
        <MetricCard
          label="Outstanding actions"
          value={String(project.outstandingActionsCount)}
          detail="Tasks needing attention"
          icon={<FileText className="size-4" />}
        />
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        {timeline.length ? (
          <ActivityFeed
            items={timeline.slice(0, 6)}
            title="Recent timeline activity"
          />
        ) : (
          <DashboardEmptyState
            icon={<FolderOpenDot className="size-5" />}
            title="Project activity will appear here"
            description="Milestones, reports, approvals, and key updates become visible once client-safe records are published."
          />
        )}

        <div className="space-y-6">
          {budget ? <BudgetSummaryCard budget={budget} /> : null}
          <Card className="dashboard-panel">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Latest report
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reports[0] ? (
                <ReportCard report={reports[0]} />
              ) : (
                <DashboardEmptyState
                  icon={<FileText className="size-5" />}
                  title="No published reports yet"
                  description="The reports hub will list progress, budget, compliance, and inspection summaries here."
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-2">
        <Card className="dashboard-panel">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Client approvals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {approvals.length ? (
              approvals.map((approval) =>
                approval.status === "pending" &&
                approval.requestedFromUserId === session.userId ? (
                  <ApprovalDecisionForm key={approval.id} approval={approval} />
                ) : (
                  <div key={approval.id} className="dashboard-list-row">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-medium text-foreground">
                        {approval.title}
                      </p>
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
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {approval.description}
                    </p>
                  </div>
                ),
              )
            ) : (
              <DashboardEmptyState
                icon={<AlertTriangle className="size-5" />}
                title="No approvals are currently pending"
                description="Budget, legal, and execution approvals will appear here when client action is required."
              />
            )}
          </CardContent>
        </Card>
        <Card className="dashboard-panel">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Recent files and media
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {files.slice(0, 4).map((file) => (
              <div key={file.id} className="dashboard-list-row">
                <p className="font-medium text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {file.category} · {file.uploadedAt}
                </p>
              </div>
            ))}
            {!files.length ? (
              <DashboardEmptyState
                icon={<FolderOpenDot className="size-5" />}
                title="Document room is empty"
                description="Photos, contracts, receipts, and documents will appear here once shared with the client."
              />
            ) : null}
          </CardContent>
        </Card>
        <Card className="dashboard-panel">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-sm font-semibold text-muted-foreground">
              Assigned team
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {team.length ? (
              team.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))
            ) : (
              <DashboardEmptyState
                icon={<MessageSquareText className="size-5" />}
                title="No client-facing team members listed"
                description="Project owner, coordinator, and specialist contacts appear here when published to the client portal."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
