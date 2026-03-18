"use server";

import { revalidatePath } from "next/cache";
import {
  SupportRequestReceivedEmail,
  subject as supportRequestReceivedSubject,
} from "@/emails/support-request-received";
import { requireDashboardSession } from "@/lib/auth/session";
import { recordAuditEvent } from "@/lib/dashboard/audit";
import { dashboardService } from "@/lib/dashboard/service";
import { sendEmail } from "@/lib/email/send";
import {
  approvalDecisionSchema,
  notificationBulkActionSchema,
  notificationSettingsSchema,
  preferenceSettingsSchema,
  profileSettingsSchema,
  securitySettingsSchema,
  sendMessageSchema,
  supportReplySchema,
  supportRequestSchema,
} from "@/lib/validators/dashboard";

export interface DashboardActionState {
  status: "idle" | "success" | "error";
  message?: string;
}

const idleState: DashboardActionState = { status: "idle" };

function parseBooleanField(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export async function updateProfileAction(
  _previousState: DashboardActionState = idleState,
  formData: FormData,
): Promise<DashboardActionState> {
  const session = await requireDashboardSession();
  const parsed = profileSettingsSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    preferredContactMethod: formData.get("preferredContactMethod"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message || "Invalid profile details.",
    };
  }

  try {
    await dashboardService.updateProfile(session, parsed.data);
    await recordAuditEvent(session, {
      action: "profile.update",
      targetType: "user",
      targetId: session.userId,
    });
    revalidatePath("/dashboard/settings/profile");
    return { status: "success", message: "Profile updated successfully." };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to update profile.",
    };
  }
}

export async function updateSecurityAction(
  _previousState: DashboardActionState = idleState,
  formData: FormData,
): Promise<DashboardActionState> {
  const session = await requireDashboardSession();
  const parsed = securitySettingsSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message || "Invalid security details.",
    };
  }

  try {
    await dashboardService.updateSecurity(session, parsed.data);
    await recordAuditEvent(session, {
      action: "security.password.rotate",
      targetType: "user",
      targetId: session.userId,
    });
    revalidatePath("/dashboard/settings/security");
    return { status: "success", message: "Security settings updated." };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to update security settings.",
    };
  }
}

export async function updateNotificationsAction(
  _previousState: DashboardActionState = idleState,
  formData: FormData,
): Promise<DashboardActionState> {
  const session = await requireDashboardSession();
  const parsed = notificationSettingsSchema.safeParse({
    emailReports: parseBooleanField(formData, "emailReports"),
    emailMilestones: parseBooleanField(formData, "emailMilestones"),
    emailBudgetAlerts: parseBooleanField(formData, "emailBudgetAlerts"),
    emailMessages: parseBooleanField(formData, "emailMessages"),
    inAppReports: parseBooleanField(formData, "inAppReports"),
    inAppMilestones: parseBooleanField(formData, "inAppMilestones"),
    inAppBudgetAlerts: parseBooleanField(formData, "inAppBudgetAlerts"),
    inAppMessages: parseBooleanField(formData, "inAppMessages"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message || "Invalid notification settings.",
    };
  }

  try {
    await dashboardService.updateNotifications(session, parsed.data);
    await recordAuditEvent(session, {
      action: "notifications.preferences.update",
      targetType: "user",
      targetId: session.userId,
    });
    revalidatePath("/dashboard/settings/notifications");
    revalidatePath("/dashboard/notifications");
    return { status: "success", message: "Notification preferences updated." };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to update notifications.",
    };
  }
}

export async function updatePreferencesAction(
  _previousState: DashboardActionState = idleState,
  formData: FormData,
): Promise<DashboardActionState> {
  const session = await requireDashboardSession();
  const parsed = preferenceSettingsSchema.safeParse({
    timezone: formData.get("timezone"),
    currency: formData.get("currency"),
    density: formData.get("density"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message || "Invalid dashboard preferences.",
    };
  }

  try {
    await dashboardService.updatePreferences(session, parsed.data);
    await recordAuditEvent(session, {
      action: "preferences.update",
      targetType: "user",
      targetId: session.userId,
    });
    revalidatePath("/dashboard/settings/preferences");
    return { status: "success", message: "Preferences updated." };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to update preferences.",
    };
  }
}

export async function sendMessageAction(
  _previousState: DashboardActionState = idleState,
  formData: FormData,
): Promise<DashboardActionState> {
  const session = await requireDashboardSession();
  const parsed = sendMessageSchema.safeParse({
    threadId: formData.get("threadId"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message || "Message content is invalid.",
    };
  }

  try {
    await dashboardService.sendMessage(session, parsed.data);
    await recordAuditEvent(session, {
      action: "conversation.message.send",
      targetType: "thread",
      targetId: parsed.data.threadId,
    });
    revalidatePath(`/dashboard/inbox/${parsed.data.threadId}`);
    revalidatePath("/dashboard/inbox");
    return { status: "success", message: "Message sent securely." };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to send message.",
    };
  }
}

export async function resolveApprovalAction(
  _previousState: DashboardActionState = idleState,
  formData: FormData,
): Promise<DashboardActionState> {
  const session = await requireDashboardSession();
  const parsed = approvalDecisionSchema.safeParse({
    approvalId: formData.get("approvalId"),
    decision: formData.get("decision"),
    note: formData.get("note"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message || "Approval decision is invalid.",
    };
  }

  try {
    await dashboardService.resolveApproval(session, parsed.data);
    await recordAuditEvent(session, {
      action: "approval.resolve",
      targetType: "approval",
      targetId: parsed.data.approvalId,
      metadata: { decision: parsed.data.decision },
    });
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/projects");
    revalidatePath("/dashboard/notifications");
    return { status: "success", message: `Approval ${parsed.data.decision}.` };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to update approval.",
    };
  }
}

export async function markNotificationsReadAction(formData: FormData) {
  const session = await requireDashboardSession();
  const values = formData.getAll("notificationIds").map(String);
  const parsed = notificationBulkActionSchema.safeParse({
    notificationIds: values,
  });
  if (!parsed.success) {
    return;
  }

  await dashboardService.markNotificationsRead(
    session,
    parsed.data.notificationIds,
  );
  await recordAuditEvent(session, {
    action: "notifications.mark_read",
    targetType: "notification",
    metadata: { count: parsed.data.notificationIds.length },
  });
  revalidatePath("/dashboard/notifications");
}

export async function requestSupportAction(
  _previousState: DashboardActionState = idleState,
  formData: FormData,
): Promise<DashboardActionState> {
  const session = await requireDashboardSession();
  const parsed = supportRequestSchema.safeParse({
    subject: formData.get("subject"),
    details: formData.get("details"),
    urgency: formData.get("urgency"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message || "Support request is invalid.",
    };
  }

  try {
    const supportRequest = await dashboardService.requestSupport(
      session,
      parsed.data,
    );

    try {
      await sendEmail({
        to: session.email,
        subject: supportRequestReceivedSubject,
        react: SupportRequestReceivedEmail({
          fullName: session.name,
          ticketId: supportRequest.threadId,
          issueCategory: parsed.data.urgency,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (emailError) {
      console.error("[support.request.email]", emailError);
    }

    await recordAuditEvent(session, {
      action: "support.request.create",
      targetType: "support_request",
      metadata: {
        urgency: parsed.data.urgency,
        threadId: supportRequest.threadId,
      },
    });
    revalidatePath("/dashboard/support");
    return { status: "success", message: "Support request submitted." };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to submit support request.",
    };
  }
}

export async function replySupportThreadAction(
  _previousState: DashboardActionState = idleState,
  formData: FormData,
): Promise<DashboardActionState> {
  const session = await requireDashboardSession();
  const parsed = supportReplySchema.safeParse({
    threadId: formData.get("threadId"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message || "Support reply is invalid.",
    };
  }

  try {
    await dashboardService.replySupportThread(session, parsed.data);
    await recordAuditEvent(session, {
      action: "support.thread.reply",
      targetType: "support_thread",
      targetId: parsed.data.threadId,
    });
    revalidatePath("/dashboard/support");
    revalidatePath(`/dashboard/support/${parsed.data.threadId}`);
    return { status: "success", message: "Reply sent securely." };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to send support reply.",
    };
  }
}
