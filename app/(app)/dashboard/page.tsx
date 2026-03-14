import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  FileText,
  FolderKanban,
  MessageSquareText,
  Wallet,
} from "lucide-react";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { formatCurrency } from "@/components/dashboard/formatters";
import { MetricCard } from "@/components/dashboard/metric-card";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { ReportCard } from "@/components/dashboard/report-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function DashboardOverviewPage() {
  const session = await requireDashboardSession();
  const [overview, repositoryState] = await Promise.all([
    dashboardService.getOverview(session),
    dashboardService.getRepositoryState(),
  ]);

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Client dashboard"
        title={`Welcome back, ${session.name.split(" ")[0]}`}
        description="Review live projects, approvals, reports, and secure communications in one operational workspace."
        actions={
          <Button asChild>
            <Link href="/dashboard/projects">
              Open projects
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      {!repositoryState.configured ? (
        <Card className="rounded-2xl border border-accent/40 bg-accent/10">
          <CardContent className="flex gap-4 p-4 text-sm text-amber-900">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <p>
              Dashboard access controls are live, but the secure project data provider is not configured yet. Connect the production repository adapter to render live client records, reports, files, and messages.
            </p>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active projects" value={String(overview.activeProjects.length)} icon={<FolderKanban className="size-4" />} />
        <MetricCard label="Pending approvals" value={String(overview.pendingApprovalsCount)} icon={<AlertTriangle className="size-4" />} />
        <MetricCard label="Unread messages" value={String(overview.unreadConversations.reduce((sum, item) => sum + item.unreadCount, 0))} icon={<MessageSquareText className="size-4" />} />
        <MetricCard
          label="Budget tracked"
          value={
            overview.budgetSnapshots[0]
              ? formatCurrency(
                  overview.budgetSnapshots.reduce((sum, item) => sum + item.allocated, 0),
                  overview.budgetSnapshots[0].currency,
                )
              : "$0"
          }
          icon={<Wallet className="size-4" />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        {overview.recentActivity.length ? (
          <ActivityFeed items={overview.recentActivity} title="Latest updates" />
        ) : (
          <DashboardEmptyState
            icon={<Bell className="size-5" />}
            title="No recent activity yet"
            description="Once the operations team posts a milestone, report, or budget event, it will appear here."
          />
        )}
        <Card className="dashboard-panel">
          <CardHeader><CardTitle className="text-base font-semibold">Action required</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {overview.nextActions.length ? (
              overview.nextActions.map((item) => (
                <Link key={item.id} href={item.href} className="dashboard-list-row block">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </Link>
              ))
            ) : (
              <DashboardEmptyState
                icon={<ArrowRight className="size-5" />}
                title="No outstanding actions"
                description="Approvals, unread messages, and requested confirmations will appear here."
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="dashboard-panel">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Latest reports</CardTitle>
            <Button variant="ghost" asChild><Link href="/dashboard/projects">Browse all</Link></Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {overview.latestReports.length ? (
              overview.latestReports.map((report) => <ReportCard key={report.id} report={report} />)
            ) : (
              <DashboardEmptyState
                icon={<FileText className="size-5" />}
                title="No reports available"
                description="Verified progress, compliance, and budget reports will be published here."
              />
            )}
          </CardContent>
        </Card>
        <Card className="dashboard-panel">
          <CardHeader><CardTitle className="text-base font-semibold">Unread conversations</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {overview.unreadConversations.length ? (
              overview.unreadConversations.map((thread) => (
                <Link key={thread.id} href={`/dashboard/inbox/${thread.id}`} className="dashboard-list-row block">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-foreground">{thread.subject}</p>
                    <span className="dashboard-chip border-primary/20 bg-primary/10 text-primary normal-case tracking-normal">{thread.unreadCount} unread</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{thread.lastMessagePreview || "No preview available."}</p>
                </Link>
              ))
            ) : (
              <DashboardEmptyState
                icon={<MessageSquareText className="size-5" />}
                title="Inbox is clear"
                description="New project and support conversations will appear here."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
