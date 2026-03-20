"use client";

import { useActionState, useEffect, useState } from "react";
import {
  deleteNewsletterDraftAction,
  saveNewsletterDraftAction,
  sendNewsletterBroadcastAction,
  sendNewsletterTestAction,
  type NewsletterBroadcastActionState,
  type NewsletterDraftActionState,
} from "@/app/actions/newsletter";
import {
  replySupportThreadAction,
  resolveApprovalAction,
  requestSupportAction,
  sendMessageAction,
  updateNotificationsAction,
  updatePreferencesAction,
  updateProfileAction,
  updateSecurityAction,
  type DashboardActionState,
} from "@/app/actions/dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { NewsletterBroadcastDraftRecord } from "@/lib/email/newsletter-drafts";
import type { ApprovalItem, DashboardSettings } from "@/lib/dashboard/types";

const initialState: DashboardActionState = { status: "idle" };
const initialNewsletterBroadcastState: NewsletterBroadcastActionState = {
  status: "idle",
};
const initialNewsletterDraftState: NewsletterDraftActionState = {
  status: "idle",
};
const newsletterDraftStorageKey = "dashboard-newsletter-broadcast-draft";
const initialNewsletterDraft = {
  campaignName: "",
  subject: "",
  previewText: "",
  title: "",
  intro: "",
  body: "",
  ctaLabel: "",
  ctaUrl: "",
};

function ActionFeedback({
  state,
}: {
  state: { status: "idle" | "success" | "error"; message?: string };
}) {
  if (state.status === "idle") {
    return null;
  }

  return (
    <p
      className={
        state.status === "success"
          ? "text-sm font-medium text-primary"
          : "text-sm font-medium text-destructive"
      }
    >
      {state.message}
    </p>
  );
}

export function ProfileSettingsForm({
  settings,
}: {
  settings: DashboardSettings["profile"];
}) {
  const [state, action, pending] = useActionState(
    updateProfileAction,
    initialState,
  );

  return (
    <Card className="dashboard-panel">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          Profile details
        </CardTitle>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Keep your contact record current so HomeTrust Africa can route updates
          and approvals correctly.
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-6">
          <div className="rounded-xl border border-border/70 bg-muted/15 p-5">
            <p className="text-sm font-semibold text-foreground">
              Identity and contact
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              These details are used across project communications and approvals.
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={settings.fullName}
                  placeholder="Enter your full legal name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={settings.email}
                  placeholder="Enter the email used for portal access"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={settings.phone}
                  placeholder="Include country code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={settings.country}
                  placeholder="Country of residence"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-background p-5">
            <Label htmlFor="preferredContactMethod">
              Preferred contact method
            </Label>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose the channel to use when an update needs your attention.
            </p>
            <Select
              name="preferredContactMethod"
              defaultValue={settings.preferredContactMethod}
            >
              <SelectTrigger
                id="preferredContactMethod"
                size="dashboard"
                className="mt-4 w-full rounded-lg border-border bg-background md:max-w-[calc(50%-0.5rem)]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" size="dashboard" disabled={pending}>
              Save profile
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function SecuritySettingsForm({
  settings,
}: {
  settings: DashboardSettings["security"];
}) {
  const [state, action, pending] = useActionState(
    updateSecurityAction,
    initialState,
  );

  return (
    <Card className="dashboard-panel">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          Password and session controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="dashboard-panel-muted p-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Two-factor readiness
            </p>
            <p className="mt-2 font-medium text-foreground">
              {settings.hasTwoFactorEnabled
                ? "Enabled"
                : "Ready for activation"}
            </p>
          </div>
          <div className="dashboard-panel-muted p-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Active sessions
            </p>
            <p className="mt-2 font-medium text-foreground">
              {settings.activeSessionsCount}
            </p>
          </div>
          <div className="dashboard-panel-muted p-4">
            <p className="text-sm font-semibold text-muted-foreground">
              Last sign-in
            </p>
            <p className="mt-2 font-medium text-foreground">
              {settings.lastSignInAt || "Not available"}
            </p>
          </div>
        </div>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
              />
            </div>
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" size="dashboard" disabled={pending}>
              Update security
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function NotificationSettingsForm({
  settings,
}: {
  settings: DashboardSettings["notifications"];
}) {
  const [state, action, pending] = useActionState(
    updateNotificationsAction,
    initialState,
  );
  const rows = [
    ["emailReports", "Email report alerts", settings.emailReports],
    ["emailMilestones", "Email milestone alerts", settings.emailMilestones],
    ["emailBudgetAlerts", "Email budget alerts", settings.emailBudgetAlerts],
    ["emailMessages", "Email message alerts", settings.emailMessages],
    ["inAppReports", "In-app report alerts", settings.inAppReports],
    ["inAppMilestones", "In-app milestone alerts", settings.inAppMilestones],
    ["inAppBudgetAlerts", "In-app budget alerts", settings.inAppBudgetAlerts],
    ["inAppMessages", "In-app message alerts", settings.inAppMessages],
  ] as const;
  const emailRows = rows.filter(([name]) => name.startsWith("email"));
  const inAppRows = rows.filter(([name]) => name.startsWith("inApp"));

  return (
    <Card className="dashboard-panel">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          Notification controls
        </CardTitle>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Decide how project activity should reach you across email and the
          secure portal.
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Email notifications
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Use email for items that need attention outside the portal.
              </p>
            </div>
            {emailRows.map(([name, label, checked]) => (
              <div
                key={name}
                className="dashboard-list-row flex items-center justify-between gap-4"
              >
                <div>
                  <Label htmlFor={name} className="font-medium text-foreground">
                    {label}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Applies immediately to your secure portal preferences.
                  </p>
                </div>
                <Switch id={name} name={name} defaultChecked={checked} />
              </div>
            ))}
          </div>
          <div className="space-y-3 border-t border-border/70 pt-6">
            <div>
              <p className="text-sm font-semibold text-foreground">
                In-app notifications
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Use in-app alerts to review updates while working inside the
                portal.
              </p>
            </div>
            {inAppRows.map(([name, label, checked]) => (
              <div
                key={name}
                className="dashboard-list-row flex items-center justify-between gap-4"
              >
                <div>
                  <Label htmlFor={name} className="font-medium text-foreground">
                    {label}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Applies immediately to your secure portal preferences.
                  </p>
                </div>
                <Switch id={name} name={name} defaultChecked={checked} />
              </div>
            ))}
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" size="dashboard" disabled={pending}>
              Save notifications
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function PreferenceSettingsForm({
  settings,
}: {
  settings: DashboardSettings["preferences"];
}) {
  const [state, action, pending] = useActionState(
    updatePreferencesAction,
    initialState,
  );

  return (
    <Card className="dashboard-panel">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          Workspace preferences
        </CardTitle>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Keep the workspace aligned with your operating region and preferred
          reading density.
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                name="timezone"
                defaultValue={settings.timezone}
                placeholder="e.g. Europe/Amsterdam"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                name="currency"
                defaultValue={settings.currency}
                placeholder="e.g. USD"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="density">Density</Label>
              <Select name="density" defaultValue={settings.density}>
                <SelectTrigger
                  id="density"
                  size="dashboard"
                  className="w-full rounded-lg border-border bg-background"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            These preferences affect how project information is formatted inside
            your workspace.
          </p>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" size="dashboard" disabled={pending}>
              Save preferences
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function MessageComposer({ threadId }: { threadId: string }) {
  const [state, action, pending] = useActionState(
    sendMessageAction,
    initialState,
  );

  return (
    <Card className="dashboard-panel">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          Send secure message
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-4">
          <input type="hidden" name="threadId" value={threadId} />
          <div className="space-y-2">
            <Label htmlFor="body">Secure message</Label>
            <Textarea
              id="body"
              name="body"
              rows={5}
              placeholder="Share the update, decision, or question that needs review."
            />
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" size="dashboard" disabled={pending}>
              Send message
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function SupportRequestForm() {
  const [state, action, pending] = useActionState(
    requestSupportAction,
    initialState,
  );

  return (
    <Card className="dashboard-panel">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          Request a callback or escalation
        </CardTitle>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Use this form when a project issue needs direct support, a callback,
          or faster review.
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-6">
          <div className="rounded-xl border border-border/70 bg-muted/15 p-5">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Summarize the issue or decision required"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select name="urgency" defaultValue="standard">
                  <SelectTrigger
                    id="urgency"
                    size="dashboard"
                    className="w-full rounded-lg border-border bg-background"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <p className="text-sm text-muted-foreground">
              Include the project context, any time-sensitive impact, and the
              response you need from the team.
            </p>
            <Textarea
              id="details"
              name="details"
              rows={6}
              placeholder="Describe the project context, timeline impact, and the support you need."
            />
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" size="dashboard" disabled={pending}>
              Submit request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function ApprovalDecisionForm({ approval }: { approval: ApprovalItem }) {
  const [state, action, pending] = useActionState(
    resolveApprovalAction,
    initialState,
  );

  return (
    <form action={action} className="dashboard-panel space-y-4 p-5">
      <input type="hidden" name="approvalId" value={approval.id} />
      <div className="space-y-2">
        <p className="font-semibold text-foreground">{approval.title}</p>
        <p className="text-sm leading-6 text-muted-foreground">
          {approval.description}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
        <Textarea
          name="note"
          rows={2}
          placeholder="Add context for the operations team, if needed"
        />
        <Button
          size="dashboard"
          type="submit"
          name="decision"
          value="approved"
          disabled={pending}
        >
          Approve
        </Button>
        <Button
          size="dashboard"
          type="submit"
          name="decision"
          value="rejected"
          variant="outline"
          disabled={pending}
        >
          Reject
        </Button>
      </div>
      <ActionFeedback state={state} />
    </form>
  );
}

export function SupportReplyForm({ threadId }: { threadId: string }) {
  const [state, action, pending] = useActionState(
    replySupportThreadAction,
    initialState,
  );

  return (
    <Card className="dashboard-panel">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          Reply securely
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-4">
          <input type="hidden" name="threadId" value={threadId} />
          <div className="space-y-2">
            <Label htmlFor="support-body">Reply securely</Label>
            <Textarea
              id="support-body"
              name="body"
              rows={4}
              placeholder="Confirm next steps, outstanding risks, or the support you need."
            />
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" size="dashboard" disabled={pending}>
              Send reply
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function NewsletterBroadcastForm({
  disabled = false,
  savedDrafts,
}: {
  disabled?: boolean;
  savedDrafts: NewsletterBroadcastDraftRecord[];
}) {
  const [sendState, sendAction, sendPending] = useActionState(
    sendNewsletterBroadcastAction,
    initialNewsletterBroadcastState,
  );
  const [saveState, saveAction, savePending] = useActionState(
    saveNewsletterDraftAction,
    initialNewsletterDraftState,
  );
  const [testState, testAction, testPending] = useActionState(
    sendNewsletterTestAction,
    initialNewsletterDraftState,
  );
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteNewsletterDraftAction,
    initialNewsletterDraftState,
  );
  const [draft, setDraft] = useState(initialNewsletterDraft);
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState("");
  const isBusy = sendPending || savePending || testPending || deletePending;

  useEffect(() => {
    try {
      const rawDraft = window.localStorage.getItem(newsletterDraftStorageKey);
      if (!rawDraft) {
        setDraftLoaded(true);
        return;
      }

      const parsedDraft = JSON.parse(rawDraft) as Partial<
        typeof initialNewsletterDraft
      > & { reviewConfirmed?: boolean };

      setDraft({
        campaignName: parsedDraft.campaignName || "",
        subject: parsedDraft.subject || "",
        previewText: parsedDraft.previewText || "",
        title: parsedDraft.title || "",
        intro: parsedDraft.intro || "",
        body: parsedDraft.body || "",
        ctaLabel: parsedDraft.ctaLabel || "",
        ctaUrl: parsedDraft.ctaUrl || "",
      });
      setReviewConfirmed(Boolean(parsedDraft.reviewConfirmed));
    } catch {
      window.localStorage.removeItem(newsletterDraftStorageKey);
    } finally {
      setDraftLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!draftLoaded) {
      return;
    }

    window.localStorage.setItem(
      newsletterDraftStorageKey,
      JSON.stringify({
        ...draft,
        reviewConfirmed,
      }),
    );
  }, [draft, draftLoaded, reviewConfirmed]);

  useEffect(() => {
    if (sendState.status !== "success") {
      return;
    }

    setDraft(initialNewsletterDraft);
    setReviewConfirmed(false);
    setCurrentDraftId("");
    window.localStorage.removeItem(newsletterDraftStorageKey);
  }, [sendState.status]);

  useEffect(() => {
    if (saveState.status === "success" && saveState.draftId) {
      setCurrentDraftId(saveState.draftId);
    }
  }, [saveState.draftId, saveState.status]);

  useEffect(() => {
    if (
      deleteState.status === "success" &&
      deleteState.draftId === currentDraftId
    ) {
      setCurrentDraftId("");
    }
  }, [currentDraftId, deleteState.draftId, deleteState.status]);

  function updateDraftField(
    field: keyof typeof initialNewsletterDraft,
    value: string,
  ) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
  }

  function clearDraft() {
    setDraft(initialNewsletterDraft);
    setReviewConfirmed(false);
    setCurrentDraftId("");
    window.localStorage.removeItem(newsletterDraftStorageKey);
  }

  function restoreSharedDraft(savedDraft: NewsletterBroadcastDraftRecord) {
    setDraft({
      campaignName: savedDraft.campaignName,
      subject: savedDraft.subject,
      previewText: savedDraft.previewText,
      title: savedDraft.title,
      intro: savedDraft.intro,
      body: savedDraft.body,
      ctaLabel: savedDraft.ctaLabel,
      ctaUrl: savedDraft.ctaUrl,
    });
    setCurrentDraftId(savedDraft.id);
    setReviewConfirmed(false);
  }

  const previewBodyParagraphs = draft.body
    .split(/\r?\n\s*\r?\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="grid items-start gap-6 2xl:grid-cols-[1.05fr_0.95fr]">
      <Card className="dashboard-panel">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Compose broadcast
          </CardTitle>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Structure the campaign clearly before review so the preview and send
            flow stay predictable.
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={sendAction} className="space-y-6">
            <input
              type="hidden"
              name="reviewConfirmed"
              value={reviewConfirmed ? "on" : ""}
            />
            <input type="hidden" name="draftId" value={currentDraftId} />
            <div className="space-y-4 rounded-xl border border-border/70 bg-muted/15 p-5">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Campaign setup
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Define how the campaign should appear in the inbox and in the
                  email header.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign name</Label>
                  <Input
                    id="campaignName"
                    name="campaignName"
                    placeholder="Q2 2026 client operations update"
                    disabled={disabled || isBusy}
                    value={draft.campaignName}
                    onChange={(event) =>
                      updateDraftField("campaignName", event.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject line</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project reporting and platform updates from HomeTrust Africa"
                    disabled={disabled || isBusy}
                    value={draft.subject}
                    onChange={(event) =>
                      updateDraftField("subject", event.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="previewText">Preview text</Label>
                <Input
                  id="previewText"
                  name="previewText"
                  placeholder="Short inbox preview shown before the email is opened"
                  disabled={disabled || isBusy}
                  value={draft.previewText}
                  onChange={(event) =>
                    updateDraftField("previewText", event.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-4 rounded-xl border border-border/70 bg-background p-5">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Message content
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Keep the message clear, scannable, and aligned with the update
                  you are sending.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Headline</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Quarterly operational update"
                    disabled={disabled || isBusy}
                    value={draft.title}
                    onChange={(event) =>
                      updateDraftField("title", event.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intro">Intro</Label>
                  <Input
                    id="intro"
                    name="intro"
                    placeholder="This edition covers recent reporting, project visibility, and platform improvements."
                    disabled={disabled || isBusy}
                    value={draft.intro}
                    onChange={(event) =>
                      updateDraftField("intro", event.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Body</Label>
                <Textarea
                  id="body"
                  name="body"
                  rows={10}
                  placeholder="Draft the campaign body here. Use blank lines to separate paragraphs."
                  disabled={disabled || isBusy}
                  value={draft.body}
                  onChange={(event) =>
                    updateDraftField("body", event.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-4 rounded-xl border border-border/70 bg-background p-5">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Call to action
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add a CTA only if the update should direct clients to a
                  specific next step.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ctaLabel">CTA label</Label>
                  <Input
                    id="ctaLabel"
                    name="ctaLabel"
                    placeholder="Review project updates"
                    disabled={disabled || isBusy}
                    value={draft.ctaLabel}
                    onChange={(event) =>
                      updateDraftField("ctaLabel", event.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaUrl">CTA URL</Label>
                  <Input
                    id="ctaUrl"
                    name="ctaUrl"
                    placeholder="Paste the full destination URL"
                    disabled={disabled || isBusy}
                    value={draft.ctaUrl}
                    onChange={(event) =>
                      updateDraftField("ctaUrl", event.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="reviewConfirmed"
                  checked={reviewConfirmed}
                  onCheckedChange={(checked) =>
                    setReviewConfirmed(checked === true)
                  }
                  disabled={disabled || isBusy}
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="reviewConfirmed"
                    className="font-medium text-foreground"
                  >
                    Review complete
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Confirm that the preview, links, and campaign copy have been
                    reviewed before sending to the full audience.
                  </p>
                </div>
              </div>
            </div>
            <ActionFeedback state={sendState} />
            <ActionFeedback state={saveState} />
            <ActionFeedback state={testState} />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {draftLoaded
                  ? "This draft autosaves locally in your browser. Use Save shared draft to keep it available across devices."
                  : "Loading saved draft..."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="dashboard"
                  onClick={clearDraft}
                  disabled={disabled || isBusy}
                >
                  Clear draft
                </Button>
                <Button
                  type="submit"
                  formAction={saveAction}
                  variant="outline"
                  size="dashboard"
                  disabled={disabled || isBusy}
                >
                  Save shared draft
                </Button>
                <Button
                  type="submit"
                  formAction={testAction}
                  variant="outline"
                  size="dashboard"
                  disabled={disabled || isBusy}
                >
                  Send test email
                </Button>
                <Button
                  type="submit"
                  size="dashboard"
                  disabled={disabled || isBusy || !reviewConfirmed}
                >
                  Send broadcast
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="dashboard-panel sticky top-6">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Live preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Inbox preview
            </p>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {draft.subject || "Subject line preview"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {draft.previewText ||
                draft.intro ||
                "Preview text will appear here."}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background shadow-sm">
            <div className="border-b border-border px-6 py-4">
              <p className="text-sm font-semibold text-foreground">
                HomeTrust Africa
              </p>
            </div>
            <div className="space-y-4 px-6 py-6">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                {draft.title || "Campaign headline preview"}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {draft.intro || "Campaign introduction will appear here."}
              </p>
              {previewBodyParagraphs.length ? (
                previewBodyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-6 text-foreground/90"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">
                  Write the body with blank lines between paragraphs to preview
                  the campaign layout.
                </p>
              )}
              {draft.ctaLabel && draft.ctaUrl ? (
                <div className="space-y-2 pt-2">
                  <Button type="button" size="dashboard" disabled>
                    {draft.ctaLabel}
                  </Button>
                  <p className="break-all text-xs text-muted-foreground">
                    {draft.ctaUrl}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="border-t border-border px-6 py-4 text-xs text-muted-foreground">
              Campaign: {draft.campaignName || "Untitled campaign"}
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-background px-6 py-5 shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                Shared drafts
              </p>
              <p className="text-sm text-muted-foreground">
                Restore shared drafts to resume work on any device.
              </p>
            </div>
            <ActionFeedback state={deleteState} />
            {savedDrafts.length ? (
              <div className="space-y-3">
                {savedDrafts.map((savedDraft) => (
                  <div
                    key={savedDraft.id}
                    className="rounded-xl border border-border/70 bg-muted/20 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">
                          {savedDraft.campaignName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {savedDraft.subject}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Updated{" "}
                          {new Date(savedDraft.updatedAt).toLocaleString()}
                        </p>
                        {savedDraft.lastTestedAt ? (
                          <p className="text-xs text-muted-foreground">
                            Last test sent{" "}
                            {new Date(savedDraft.lastTestedAt).toLocaleString()}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="dashboard"
                          onClick={() => restoreSharedDraft(savedDraft)}
                          disabled={disabled || isBusy}
                        >
                          Restore
                        </Button>
                        <form action={deleteAction}>
                          <input
                            type="hidden"
                            name="draftId"
                            value={savedDraft.id}
                          />
                          <Button
                            type="submit"
                            variant="outline"
                            size="dashboard"
                            disabled={disabled || isBusy}
                          >
                            Delete
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No shared drafts saved yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
