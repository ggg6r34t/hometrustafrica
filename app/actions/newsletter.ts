"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { rateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { NewsletterWelcomeEmail } from "@/emails/newsletter-welcome";

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

export async function subscribeNewsletter(
  email: string
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

    // Send welcome email using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.FROM_EMAIL || "newsletter@hometrustafrica.com";

    if (!resendApiKey) {
      // In development, log instead of failing
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "RESEND_API_KEY not set. Email sending disabled. Set RESEND_API_KEY in .env.local to enable email sending."
        );
      } else {
        throw new Error("Email service not configured");
      }
    } else {
      const resend = new Resend(resendApiKey);

      // Render welcome email template
      const welcomeEmailHtml = await render(
        NewsletterWelcomeEmail({
          email: trimmedEmail,
        })
      );

      // Send welcome email to subscriber
      await resend.emails.send({
        from: fromEmail,
        to: trimmedEmail,
        subject: "Welcome to HomeTrust Africa Newsletter",
        html: welcomeEmailHtml,
      });
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
