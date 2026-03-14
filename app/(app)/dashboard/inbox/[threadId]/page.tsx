import { MessageSquareMore } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { formatDateLabel } from "@/components/dashboard/formatters";
import { MessageComposer } from "@/components/dashboard/forms";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function InboxThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  const session = await requireDashboardSession();
  const thread = await dashboardService.getConversation(session, threadId);

  if (!thread) {
    return (
      <DashboardEmptyState
        icon={<MessageSquareMore className="size-5" />}
        title="Conversation not found"
        description="This thread may not exist, may no longer be accessible, or may not be linked to your account."
      />
    );
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow={thread.projectName || "Support"}
        title={thread.subject}
        description={`Participants: ${thread.participants.map((participant) => participant.fullName).join(", ")}`}
      />
      <div className="grid items-start gap-4 md:grid-cols-3">
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Participants
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
            {thread.participants.length}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Visible contacts in this secure conversation.
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Conversation type
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {thread.kind
              ? thread.kind.charAt(0).toUpperCase() + thread.kind.slice(1)
              : "General"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {thread.projectName || "Not linked to a specific project."}
          </p>
        </Card>
        <Card className="dashboard-panel-muted p-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Latest activity
          </p>
          <p className="mt-2 font-semibold text-foreground">
            {formatDateLabel(thread.lastMessageAt, "No activity yet")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Chronological record of secure client and operations messages.
          </p>
        </Card>
      </div>
      <Card className="dashboard-panel">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Conversation log
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {thread.messages.length ? (
            thread.messages.map((message) => (
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
            ))
          ) : (
            <DashboardEmptyState
              icon={<MessageSquareMore className="size-5" />}
              title="No messages in this thread"
              description="When secure messages are exchanged, they will appear here in chronological order."
            />
          )}
        </CardContent>
      </Card>
      <MessageComposer threadId={thread.id} />
    </div>
  );
}
