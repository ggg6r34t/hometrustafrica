import { LifeBuoy } from "lucide-react";
import { SupportReplyForm } from "@/components/dashboard/forms";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
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
