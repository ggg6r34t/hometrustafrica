import Link from "next/link";
import { MessageSquareMore, Search } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { formatDateLabel } from "@/components/dashboard/formatters";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function InboxPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await requireDashboardSession();
  const filters = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ]),
  );
  const threads = await dashboardService.listConversations(session, filters);
  const unreadThreads = threads.filter(
    (thread) => thread.unreadCount > 0,
  ).length;
  const projectThreads = threads.filter((thread) => thread.projectId).length;
  const latestMessageLabel = threads[0]?.lastMessageAt
    ? formatDateLabel(threads[0].lastMessageAt)
    : "No recent messages";

  return (
    <div className="space-y-6">
      <FilterBar>
        <form className="flex w-full flex-col gap-4 md:flex-row">
          <div className="relative flex-1 md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={filters.q}
              placeholder="Search subject, project, or message preview"
              className="pl-9"
            />
          </div>
          <Button type="submit" size="dashboard">Search inbox</Button>
        </form>
      </FilterBar>
      {threads.length ? (
        <>
          <div className="grid items-start gap-4 md:grid-cols-3">
            <Card className="dashboard-panel-muted p-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Conversation threads
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {threads.length}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest message activity: {latestMessageLabel}
              </p>
            </Card>
            <Card className="dashboard-panel-muted p-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Unread threads
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {unreadThreads}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Threads that currently need review or a response.
              </p>
            </Card>
            <Card className="dashboard-panel-muted p-4">
              <p className="text-sm font-semibold text-muted-foreground">
                Project-linked
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {projectThreads}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Conversations attached directly to active project workstreams.
              </p>
            </Card>
          </div>

          <Card className="dashboard-panel">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Conversation register
              </CardTitle>
              <CardDescription>
                Monitor subject, scope, recent activity, and unread volume
                across all secure threads.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Subject</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Latest activity</TableHead>
                    <TableHead>Unread</TableHead>
                    <TableHead className="pr-6 text-right">Open</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {threads.map((thread) => (
                    <TableRow key={thread.id}>
                      <TableCell className="pl-6 align-top">
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">
                            {thread.subject}
                          </p>
                          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                            {thread.lastMessagePreview || "No messages yet."}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {thread.kind ? (
                          <StatusBadge label={thread.kind} />
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            General
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {thread.projectName || "General support"}
                      </TableCell>
                      <TableCell>
                        {formatDateLabel(
                          thread.lastMessageAt,
                          "No activity yet",
                        )}
                      </TableCell>
                      <TableCell>
                        {thread.unreadCount ? (
                          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-2 py-0.5 text-[11px] font-medium leading-4 text-primary">
                            {thread.unreadCount} unread
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Clear
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <Button variant="ghost" size="dashboard" asChild>
                          <Link href={`/dashboard/inbox/${thread.id}`}>
                            Open
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
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
