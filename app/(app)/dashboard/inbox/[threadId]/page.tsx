import { MessageSquareMore } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { MessageComposer } from "@/components/dashboard/forms";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function InboxThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
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
      <Card className="dashboard-panel">
        <CardContent className="space-y-4 p-6">
          {thread.messages.length ? (
            thread.messages.map((message) => (
              <div key={message.id} className={`dashboard-thread-bubble ${message.isOwnMessage ? "dashboard-thread-bubble-own" : "dashboard-thread-bubble-other"}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-foreground">{message.senderName}</p>
                  <p className="text-xs text-muted-foreground">{message.sentAt}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{message.senderRoleLabel}</p>
                <p className="mt-3 text-sm leading-6 text-foreground">{message.body}</p>
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
