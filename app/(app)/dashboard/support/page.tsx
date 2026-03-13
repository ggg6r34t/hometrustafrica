import Link from "next/link";
import { LifeBuoy, PhoneCall, ShieldAlert } from "lucide-react";
import { SupportRequestForm } from "@/components/dashboard/forms";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Support"
        title="Operational support and escalation"
        description="Reach the HomeTrust Africa operations team for standard requests, urgent project issues, or client confidence checks."
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader><CardTitle className="text-base font-semibold">Contact options</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p className="inline-flex items-center gap-2"><LifeBuoy className="size-4" /> Secure inbox for project and support threads</p>
              <p className="inline-flex items-center gap-2"><PhoneCall className="size-4" /> Callback coordination for sensitive or time-bound issues</p>
              <p className="inline-flex items-center gap-2"><ShieldAlert className="size-4" /> Escalation path for urgent financial, legal, or field events</p>
            </CardContent>
          </Card>
          <Card className="border-border/70 bg-card/95 shadow-sm">
            <CardHeader><CardTitle className="text-base font-semibold">Urgent escalation guidance</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Use urgent support for site incidents, legal blockers, payment anomalies, or security concerns requiring same-day attention.</p>
              <p>If a thread already exists, include the project name, milestone, and exact decision needed so the operations team can route quickly.</p>
              <p>
                For routine follow-up, continue through the <Link href="/dashboard/inbox" className="font-medium text-primary">secure inbox</Link> to preserve the project audit trail.
              </p>
            </CardContent>
          </Card>
        </div>
        <SupportRequestForm />
      </div>
    </div>
  );
}
