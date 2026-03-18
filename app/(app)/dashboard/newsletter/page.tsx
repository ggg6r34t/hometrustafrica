import { Mail, Send, ShieldCheck } from "lucide-react";
import { NewsletterBroadcastForm } from "@/components/dashboard/forms";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireDashboardRoles } from "@/lib/auth/session";
import { getNewsletterAudience } from "@/lib/email/newsletter-audience";
import {
  listNewsletterBroadcastDrafts,
  type NewsletterBroadcastDraftRecord,
} from "@/lib/email/newsletter-drafts";

export default async function DashboardNewsletterPage() {
  await requireDashboardRoles(["ADMIN", "OPERATIONS_MANAGER"]);

  let audienceDetails: {
    id: string;
    name: string;
    configuredById: boolean;
  } | null = null;
  let audienceError: string | null = null;
  let drafts: NewsletterBroadcastDraftRecord[] = [];

  try {
    audienceDetails = await getNewsletterAudience();
  } catch (error) {
    audienceError =
      error instanceof Error
        ? error.message
        : "Unable to resolve the newsletter audience.";
  }

  try {
    drafts = await listNewsletterBroadcastDrafts();
  } catch {
    drafts = [];
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Operations"
        title="Newsletter Broadcasts"
        description="Send newsletter campaigns from the dashboard. Unsubscribed contacts are excluded automatically."
      />

      <div className="grid items-start gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Card className="dashboard-panel">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Delivery controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-1.5 size-3.5 shrink-0" />
                <p>
                  Campaign sends honor subscriber opt-out preferences
                  automatically.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="mt-1.5 size-3.5 shrink-0" />
                <p>
                  Use this panel for marketing and newsletter communications
                  only.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Send className="mt-1.5 size-3.5 shrink-0" />
                <p>
                  Use operational notification flows for account, support, and
                  transactional communications.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-panel">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                Subscriber list
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {audienceDetails ? (
                <>
                  <div className="dashboard-panel-muted rounded-xl p-4">
                    <p className="font-medium text-foreground">
                      {audienceDetails.name}
                    </p>
                    <p className="mt-1 break-all text-xs text-muted-foreground">
                      {audienceDetails.id}
                    </p>
                  </div>
                  <p>
                    List source:{" "}
                    {audienceDetails.configuredById
                      ? "System configuration"
                      : "Workspace default"}
                  </p>
                </>
              ) : (
                <div className="dashboard-panel-muted rounded-xl p-4 text-destructive">
                  {audienceError}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <NewsletterBroadcastForm
          disabled={Boolean(audienceError)}
          savedDrafts={drafts}
        />
      </div>
    </div>
  );
}
