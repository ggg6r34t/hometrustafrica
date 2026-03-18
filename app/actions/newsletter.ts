"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NewsletterBroadcastEmail } from "@/emails/newsletter-broadcast";
import { rateLimit, getClientIdentifier } from "@/lib/rate-limit";
import {
  NewsletterWelcomeEmail,
  subject as newsletterWelcomeSubject,
} from "@/emails/newsletter-welcome";
import { requireDashboardRoles } from "@/lib/auth/session";
import { recordAuditEvent } from "@/lib/dashboard/audit";
import { sendNewsletterBroadcast } from "@/lib/email/newsletter-broadcast";
import {
  deleteNewsletterBroadcastDraft,
  markNewsletterBroadcastDraftTested,
  saveNewsletterBroadcastDraft,
} from "@/lib/email/newsletter-drafts";
import { sendEmail } from "@/lib/email/send";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { upsertNewsletterAudienceContact } from "@/lib/email/newsletter-audience";
import {
  newsletterBroadcastDraftSchema,
  newsletterBroadcastSchema,
  newsletterDraftDeleteSchema,
} from "@/schema/newsletter";

/**
 * Server Action for handling newsletter subscriptions
 *
 * Production-ready with:
 * - Input validation
 * - Rate limiting
 * - Error handling
 * - Security best practices
 */

export interface NewsletterActionResult {
  success: boolean;
  message: string;
  error?: string;
  rateLimitInfo?: {
    remaining: number;
    resetAt: number;
  };
}

export interface NewsletterBroadcastActionState {
  status: "idle" | "success" | "error";
  message?: string;
}

export interface NewsletterDraftActionState {
  status: "idle" | "success" | "error";
  message?: string;
  draftId?: string;
}

const idleBroadcastState: NewsletterBroadcastActionState = { status: "idle" };
const idleDraftState: NewsletterDraftActionState = { status: "idle" };

function getNewsletterDraftPayload(formData: FormData) {
  const readValue = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  return {
    draftId: readValue("draftId"),
    campaignName: readValue("campaignName"),
    subject: readValue("subject"),
    previewText: readValue("previewText"),
    title: readValue("title"),
    intro: readValue("intro"),
    body: readValue("body"),
    ctaLabel: readValue("ctaLabel"),
    ctaUrl: readValue("ctaUrl"),
  };
}

export async function subscribeNewsletter(
  email: string,
): Promise<NewsletterActionResult> {
  try {
    // Basic email validation
    if (!email || typeof email !== "string") {
      return {
        success: false,
        message: "Email is required.",
      };
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // Rate limiting
    const headersList = await headers();
    const clientId = getClientIdentifier(headersList);
    const rateLimitResult = rateLimit(clientId, 3, 60000); // 3 requests per minute

    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetAt);
      return {
        success: false,
        message: `Too many requests. Please try again after ${resetDate.toLocaleTimeString()}.`,
        rateLimitInfo: {
          remaining: rateLimitResult.remaining,
          resetAt: rateLimitResult.resetAt,
        },
      };
    }

    const env = getSupabaseEnv();
    const fromEmail = env.fromEmail || "newsletter@hometrustafrica.com";

    if (!env.resendApiKey) {
      // In development, log instead of failing
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "RESEND_API_KEY not set. Audience sync and email sending disabled. Set RESEND_API_KEY in .env.local to enable newsletter subscriptions.",
        );
      } else {
        throw new Error("Email service not configured");
      }
    } else {
      const subscription = await upsertNewsletterAudienceContact(trimmedEmail);

      if (subscription.state !== "already-subscribed") {
        await sendEmail({
          from: fromEmail,
          to: trimmedEmail,
          subject: newsletterWelcomeSubject,
          react: NewsletterWelcomeEmail({
            email: trimmedEmail,
          }),
        });
      }

      if (process.env.NODE_ENV === "development") {
        console.log("Newsletter audience sync:", {
          email: trimmedEmail,
          audienceId: subscription.audienceId,
          audienceName: subscription.audienceName,
          state: subscription.state,
        });
      }

      if (subscription.state === "already-subscribed") {
        return {
          success: true,
          message: "You are already subscribed to our newsletter.",
          rateLimitInfo: {
            remaining: rateLimitResult.remaining,
            resetAt: rateLimitResult.resetAt,
          },
        };
      }
    }

    // Log subscription (use proper logging service in production)
    if (process.env.NODE_ENV === "development") {
      console.log("Newsletter subscription:", {
        email: trimmedEmail,
        timestamp: new Date().toISOString(),
      });
    }

    return {
      success: true,
      message: "Successfully subscribed to our newsletter!",
      rateLimitInfo: {
        remaining: rateLimitResult.remaining,
        resetAt: rateLimitResult.resetAt,
      },
    };
  } catch (error) {
    // Log error to Sentry
    const { captureException } = await import("@sentry/nextjs");
    captureException(error, {
      tags: {
        section: "newsletter",
      },
      extra: {
        email:
          typeof email === "string"
            ? email.trim().toLowerCase()
            : email || "unknown",
      },
    });

    // Don't expose internal error details to users
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      error:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Unknown error"
          : undefined,
    };
  }
}

export async function sendNewsletterBroadcastAction(
  _previousState: NewsletterBroadcastActionState = idleBroadcastState,
  formData: FormData,
): Promise<NewsletterBroadcastActionState> {
  const session = await requireDashboardRoles(["ADMIN", "OPERATIONS_MANAGER"]);
  const reviewConfirmed = formData.get("reviewConfirmed") === "on";

  if (!reviewConfirmed) {
    return {
      status: "error",
      message: "Review the draft preview and confirm before sending.",
    };
  }

  const parsed = newsletterBroadcastSchema.safeParse({
    ...getNewsletterDraftPayload(formData),
    previewText: formData.get("previewText") || undefined,
    ctaLabel: formData.get("ctaLabel") || undefined,
    ctaUrl: formData.get("ctaUrl") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message || "Newsletter campaign is invalid.",
    };
  }

  try {
    const broadcast = await sendNewsletterBroadcast({
      ...parsed.data,
      previewText: parsed.data.previewText || undefined,
      ctaLabel: parsed.data.ctaLabel || undefined,
      ctaUrl: parsed.data.ctaUrl || undefined,
    });

    await recordAuditEvent(session, {
      action: "newsletter.broadcast.send",
      targetType: "newsletter_broadcast",
      targetId: broadcast.broadcastId,
      metadata: {
        audienceId: broadcast.audienceId,
        audienceName: broadcast.audienceName,
        subject: parsed.data.subject,
        campaignName: parsed.data.campaignName,
      },
    });

    revalidatePath("/dashboard/newsletter");

    return {
      status: "success",
      message: `Newsletter broadcast queued to ${broadcast.audienceName}.`,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to send newsletter broadcast.",
    };
  }
}

export async function saveNewsletterDraftAction(
  _previousState: NewsletterDraftActionState = idleDraftState,
  formData: FormData,
): Promise<NewsletterDraftActionState> {
  const session = await requireDashboardRoles(["ADMIN", "OPERATIONS_MANAGER"]);
  const parsed = newsletterBroadcastDraftSchema.safeParse(
    getNewsletterDraftPayload(formData),
  );

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message || "Newsletter draft is invalid.",
    };
  }

  try {
    const draft = await saveNewsletterBroadcastDraft(session.userId, {
      draftId: parsed.data.draftId || undefined,
      campaignName: parsed.data.campaignName,
      subject: parsed.data.subject,
      previewText: parsed.data.previewText || undefined,
      title: parsed.data.title,
      intro: parsed.data.intro,
      body: parsed.data.body,
      ctaLabel: parsed.data.ctaLabel || undefined,
      ctaUrl: parsed.data.ctaUrl || undefined,
    });

    await recordAuditEvent(session, {
      action: parsed.data.draftId
        ? "newsletter.draft.update"
        : "newsletter.draft.create",
      targetType: "newsletter_draft",
      targetId: draft.id,
      metadata: {
        campaignName: draft.campaignName,
        subject: draft.subject,
      },
    });

    revalidatePath("/dashboard/newsletter");

    return {
      status: "success",
      message: "Shared draft saved.",
      draftId: draft.id,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to save newsletter draft.",
    };
  }
}

export async function deleteNewsletterDraftAction(
  _previousState: NewsletterDraftActionState = idleDraftState,
  formData: FormData,
): Promise<NewsletterDraftActionState> {
  const session = await requireDashboardRoles(["ADMIN", "OPERATIONS_MANAGER"]);
  const parsed = newsletterDraftDeleteSchema.safeParse({
    draftId: formData.get("draftId"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message || "Invalid draft selection.",
    };
  }

  try {
    await deleteNewsletterBroadcastDraft(parsed.data.draftId);

    await recordAuditEvent(session, {
      action: "newsletter.draft.delete",
      targetType: "newsletter_draft",
      targetId: parsed.data.draftId,
    });

    revalidatePath("/dashboard/newsletter");

    return {
      status: "success",
      message: "Shared draft deleted.",
      draftId: parsed.data.draftId,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to delete newsletter draft.",
    };
  }
}

export async function sendNewsletterTestAction(
  _previousState: NewsletterDraftActionState = idleDraftState,
  formData: FormData,
): Promise<NewsletterDraftActionState> {
  const session = await requireDashboardRoles(["ADMIN", "OPERATIONS_MANAGER"]);
  const parsed = newsletterBroadcastSchema.safeParse({
    ...getNewsletterDraftPayload(formData),
    previewText: formData.get("previewText") || undefined,
    ctaLabel: formData.get("ctaLabel") || undefined,
    ctaUrl: formData.get("ctaUrl") || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ||
        "Newsletter test campaign is invalid.",
    };
  }

  try {
    await sendEmail({
      to: session.email,
      subject: `[Test] ${parsed.data.subject}`,
      react: NewsletterBroadcastEmail({
        subject: parsed.data.subject,
        previewText: parsed.data.previewText || undefined,
        title: parsed.data.title,
        intro: parsed.data.intro,
        body: parsed.data.body,
        ctaLabel: parsed.data.ctaLabel || undefined,
        ctaUrl: parsed.data.ctaUrl || undefined,
      }),
    });

    const draftId =
      typeof formData.get("draftId") === "string" && formData.get("draftId")
        ? String(formData.get("draftId"))
        : undefined;

    if (draftId) {
      await markNewsletterBroadcastDraftTested(draftId, session.userId);
    }

    await recordAuditEvent(session, {
      action: "newsletter.broadcast.test_send",
      targetType: "newsletter_broadcast",
      targetId: draftId,
      metadata: {
        recipient: session.email,
        subject: parsed.data.subject,
      },
    });

    revalidatePath("/dashboard/newsletter");

    return {
      status: "success",
      message: `Test email sent to ${session.email}.`,
      draftId,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to send test email.",
    };
  }
}
