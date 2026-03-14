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
      </CardHeader>
      <CardContent className="pt-6">
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
            <Select
              name="preferredContactMethod"
              defaultValue={settings.preferredContactMethod}
            >
              <SelectTrigger
                id="preferredContactMethod"
                size="dashboard"
                className="w-full rounded-lg border-border bg-background"
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

  return (
    <Card className="dashboard-panel">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          Notification controls
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-6">
          {rows.map(([name, label, checked]) => (
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
              <Checkbox id={name} name={name} defaultChecked={checked} />
            </div>
          ))}
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
      </CardHeader>
      <CardContent className="pt-6">
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
              placeholder="Share an update, ask a question, or confirm an approval request."
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
      </CardHeader>
      <CardContent className="pt-6">
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" />
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
          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Textarea id="details" name="details" rows={6} />
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
          placeholder="Optional note for the operations team"
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
              placeholder="Confirm next steps, request a callback, or share any supporting details."
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
