import Link from "next/link";
import { LifeBuoy, PhoneCall, ShieldAlert } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { SupportRequestForm } from "@/components/dashboard/forms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireDashboardSession } from "@/lib/auth/session";
import { dashboardService } from "@/lib/dashboard/service";

export default async function SupportPage() {
  const session = await requireDashboardSession();
  const threads = await dashboardService.listSupportThreads(session);

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Card className="dashboard-panel">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Contact options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p className="inline-flex items-center gap-2">
                <LifeBuoy className="size-4" /> Secure inbox for project and
                support threads
              </p>
              <p className="inline-flex items-center gap-2">
                <PhoneCall className="size-4" /> Callback coordination for
                sensitive or time-bound issues
              </p>
              <p className="inline-flex items-center gap-2">
                <ShieldAlert className="size-4" /> Escalation path for urgent
                financial, legal, or field events
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-panel">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Urgent escalation guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Use urgent support for site incidents, legal blockers, payment
                anomalies, or security concerns requiring same-day attention.
              </p>
              <p>
                If a thread already exists, include the project name, milestone,
                and exact decision needed so the operations team can route
                quickly.
              </p>
              <p>
                For routine follow-up, continue through the{" "}
                <Link
                  href="/dashboard/inbox"
                  className="font-medium text-primary"
                >
                  secure inbox
                </Link>{" "}
                to preserve the project audit trail.
              </p>
            </CardContent>
          </Card>
          <Card className="dashboard-panel">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Open support threads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {threads.length ? (
                threads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/dashboard/support/${thread.id}`}
                    className="dashboard-list-row block"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-foreground">
                        {thread.subject}
                      </p>
                      <span className="text-sm text-muted-foreground">
                        {thread.priority}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {thread.projectName || "General support"} ·{" "}
                      {thread.lastMessagePreview || "No replies yet."}
                    </p>
                  </Link>
                ))
              ) : (
                <DashboardEmptyState
                  icon={<LifeBuoy className="size-5" />}
                  title="No support threads yet"
                  description="Requests you open here will stay visible for follow-up, escalation, and audit history."
                />
              )}
            </CardContent>
          </Card>
        </div>
        <SupportRequestForm />
      </div>
    </div>
  );
}
