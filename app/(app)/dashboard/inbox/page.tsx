import Link from "next/link";
import { MessageSquareMore, Search } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function InboxPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await requireDashboardSession();
  const filters = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );
  const threads = await dashboardService.listConversations(session, filters);

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Inbox"
        title="Secure conversations"
        description="Communicate with HomeTrust Africa operations, project leads, and support in a traceable client portal."
      />
      <FilterBar>
        <form className="flex w-full flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input name="q" defaultValue={filters.q} placeholder="Search subject, project, or message preview" className="pl-9" />
          </div>
          <Button type="submit">Search inbox</Button>
        </form>
      </FilterBar>
      {threads.length ? (
        <div className="grid gap-4">
          {threads.map((thread) => (
            <Card key={thread.id} className="border-border/70 bg-card/95 shadow-sm">
              <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-foreground">{thread.subject}</p>
                    {thread.kind ? (
                      <span className="rounded-full bg-muted px-2 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {thread.kind}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {thread.projectName || "General support"} · {thread.lastMessagePreview || "No messages yet."}
                  </p>
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
