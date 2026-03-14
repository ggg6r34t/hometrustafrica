import { LifeBuoy } from "lucide-react";
import { SupportReplyForm } from "@/components/dashboard/forms";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { formatDateLabel } from "@/components/dashboard/formatters";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function SupportThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  const session = await requireDashboardSession();
  const thread = await dashboardService.getSupportThread(session, threadId);

  if (!thread) {
    return (
      <DashboardEmptyState
        icon={<LifeBuoy className="size-5" />}
        title="Support thread not found"
        description="This support conversation may no longer exist or may not be available to your account."
      />
    );
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow={thread.projectName || "Support"}
        title={thread.subject}
        description={`Priority: ${thread.priority} · Status: ${thread.status.replaceAll("_", " ")}`}
      />
      <div className="grid items-start gap-4 md:grid-cols-3">
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Priority
          </p>
          <div className="mt-2">
            <StatusBadge
              label={thread.priority}
              tone={
                thread.priority === "urgent"
                  ? "danger"
                  : thread.priority === "priority"
                    ? "warning"
                    : "neutral"
              }
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Escalation level assigned to this support request.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Case status
          </p>
          <div className="mt-2">
            <StatusBadge
              label={thread.status.replaceAll("_", " ")}
              tone={
                thread.status === "closed"
                  ? "neutral"
                  : thread.status === "in_progress"
                    ? "warning"
                    : "success"
              }
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Current routing state of the support workflow.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Last updated
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {formatDateLabel(thread.updatedAt)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Latest recorded support activity in this thread.
          </p>
        </Card>
      </div>
      <Card className="dashboard-panel">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Support log
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {thread.messages.map((message) => (
            <div
              key={message.id}
              className={`dashboard-thread-bubble ${message.isOwnMessage ? "dashboard-thread-bubble-own" : "dashboard-thread-bubble-other"}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-foreground">
                  {message.senderName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {message.sentAt}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {message.senderRoleLabel}
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground">
                {message.body}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
      <SupportReplyForm threadId={thread.id} />
    </div>
  );
}
