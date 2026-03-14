"use client";

import { useActionState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ApprovalItem, DashboardSettings } from "@/lib/dashboard/types";

const initialState: DashboardActionState = { status: "idle" };

function ActionFeedback({ state }: { state: DashboardActionState }) {
  if (state.status === "idle") {
    return null;
  }

  return (
    <p
      className={
        state.status === "success"
          ? "text-sm text-emerald-700"
          : "text-sm text-rose-700"
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
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Profile details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={settings.fullName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={settings.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={settings.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                defaultValue={settings.country}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferredContactMethod">
              Preferred contact method
            </Label>
            <select
              id="preferredContactMethod"
              name="preferredContactMethod"
              defaultValue={settings.preferredContactMethod}
               className="dashboard-field"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
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
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Password and session controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Two-factor readiness
            </p>
            <p className="font-medium text-foreground">
              {settings.hasTwoFactorEnabled
                ? "Enabled"
                : "Ready for activation"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active sessions</p>
            <p className="font-medium text-foreground">
              {settings.activeSessionsCount}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last sign-in</p>
            <p className="font-medium text-foreground">
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
            <Button type="submit" disabled={pending}>
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

  return (
    <Card className="dashboard-panel">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Notification controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          {rows.map(([name, label, checked]) => (
            <label
              key={name}
              className="dashboard-list-row flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-medium text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground">
                  Applies immediately to your secure portal preferences.
                </p>
              </div>
              <input
                type="checkbox"
                name={name}
                defaultChecked={checked}
                className="size-4 rounded border-border text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              />
            </label>
          ))}
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
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
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Workspace preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                name="timezone"
                defaultValue={settings.timezone}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                name="currency"
                defaultValue={settings.currency}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="density">Density</Label>
              <select
                id="density"
                name="density"
                defaultValue={settings.density}
                 className="dashboard-field"
              >
                <option value="comfortable">Comfortable</option>
                <option value="compact">Compact</option>
              </select>
            </div>
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
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
      <CardContent className="p-4">
        <form action={action} className="space-y-4">
          <input type="hidden" name="threadId" value={threadId} />
          <div className="space-y-2">
            <Label htmlFor="body">Secure message</Label>
            <Textarea
              id="body"
              name="body"
              rows={5}
              placeholder="Share an update, ask a question, or confirm an approval request."
            />
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
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
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Request a callback or escalation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency</Label>
            <select
              id="urgency"
              name="urgency"
               className="dashboard-field"
            >
              <option value="standard">Standard</option>
              <option value="priority">Priority</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Textarea id="details" name="details" rows={6} />
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
              Submit request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function ApprovalDecisionForm({ approval }: { approval: ApprovalItem }) {
  const [state, action, pending] = useActionState(resolveApprovalAction, initialState);

  return (
    <form action={action} className="dashboard-panel space-y-4 p-4">
      <input type="hidden" name="approvalId" value={approval.id} />
      <div className="space-y-1">
        <p className="font-medium text-foreground">{approval.title}</p>
        <p className="text-sm text-muted-foreground">{approval.description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
        <Textarea name="note" rows={2} placeholder="Optional note for the operations team" />
        <Button type="submit" name="decision" value="approved" disabled={pending}>
          Approve
        </Button>
        <Button type="submit" name="decision" value="rejected" variant="outline" disabled={pending}>
          Reject
        </Button>
      </div>
      <ActionFeedback state={state} />
    </form>
  );
}

export function SupportReplyForm({ threadId }: { threadId: string }) {
  const [state, action, pending] = useActionState(replySupportThreadAction, initialState);

  return (
    <Card className="dashboard-panel">
      <CardContent className="p-4">
        <form action={action} className="space-y-4">
          <input type="hidden" name="threadId" value={threadId} />
          <div className="space-y-2">
            <Label htmlFor="support-body">Reply securely</Label>
            <Textarea
              id="support-body"
              name="body"
              rows={4}
              placeholder="Confirm next steps, request a callback, or share any supporting details."
            />
          </div>
          <ActionFeedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
              Send reply
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
