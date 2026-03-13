import Link from "next/link";
import { MessageSquareMore } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function InboxPage() {
  const session = await requireDashboardSession();
  const threads = await dashboardService.listConversations(session);

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Inbox"
        title="Secure conversations"
        description="Communicate with HomeTrust Africa operations, project leads, and support in a traceable client portal."
      />
      {threads.length ? (
        <div className="grid gap-4">
          {threads.map((thread) => (
            <Card key={thread.id} className="border-border/70 bg-card/95 shadow-sm">
              <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-foreground">{thread.subject}</p>
                  <p className="text-sm text-muted-foreground">{thread.projectName || "General support"} · {thread.lastMessagePreview || "No messages yet."}</p>
                </div>
                <div className="flex items-center gap-3">
                  {thread.unreadCount ? <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">{thread.unreadCount} unread</span> : null}
                  <Link href={`/dashboard/inbox/${thread.id}`} className="text-sm font-medium text-primary">Open thread</Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          icon={<MessageSquareMore className="size-5" />}
          title="No active conversations"
          description="Project-specific and support threads will appear here once messaging is enabled for your account."
        />
      )}
    </div>
  );
}
