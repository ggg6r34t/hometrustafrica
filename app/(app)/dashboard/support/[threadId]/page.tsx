import { LifeBuoy } from "lucide-react";
import { SupportReplyForm } from "@/components/dashboard/forms";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function SupportThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
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
      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardContent className="space-y-4 p-5">
          {thread.messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-2xl border p-4 ${message.isOwnMessage ? "ml-auto max-w-3xl border-primary/20 bg-primary/5" : "max-w-3xl border-border/70 bg-background"}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-foreground">{message.senderName}</p>
                <p className="text-xs text-muted-foreground">{message.sentAt}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{message.senderRoleLabel}</p>
              <p className="mt-3 text-sm leading-6 text-foreground">{message.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <SupportReplyForm threadId={thread.id} />
    </div>
  );
}
