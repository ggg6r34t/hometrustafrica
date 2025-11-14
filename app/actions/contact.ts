"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { sanitizeFormData } from "@/lib/security";
import { rateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { ContactFormEmail } from "@/emails/contact-form";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation";

/**
 * Server Action for handling contact form submissions
 *
 * Production-ready with:
 * - Input sanitization and validation
 * - Rate limiting
 * - Error handling
 * - Security best practices
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  projectType: string;
  message: string;
}

export interface ActionResult {
  success: boolean;
  message: string;
  error?: string;
  rateLimitInfo?: {
    remaining: number;
    resetAt: number;
  };
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ActionResult> {
  try {
    // Rate limiting
    const headersList = await headers();
    const clientId = getClientIdentifier(headersList);
    const rateLimitResult = rateLimit(clientId, 5, 60000); // 5 requests per minute

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

    // Sanitize and validate input
    const sanitized = sanitizeFormData({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    if (!sanitized.isValid) {
      return {
        success: false,
        message:
          sanitized.errors[0] || "Please check your input and try again.",
      };
    }

    // Validate required fields
    if (!data.country || !data.projectType) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    // Additional validation
    if (sanitized.name.length > 100) {
      return {
        success: false,
        message: "Name must be less than 100 characters.",
      };
    }

    if (sanitized.message.length > 5000) {
      return {
        success: false,
        message: "Message must be less than 5000 characters.",
      };
    }

    // Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || "info@hometrustafrica.com";
    const fromEmail = process.env.FROM_EMAIL || "contact@hometrustafrica.com";

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

      // Render email templates
      const inquiryEmailHtml = await render(
        ContactFormEmail({
          name: sanitized.name,
          email: sanitized.email,
          phone: sanitized.phone || undefined,
          country: data.country,
          projectType: data.projectType,
          message: sanitized.message,
        })
      );

      const confirmationEmailHtml = await render(
        ContactConfirmationEmail({
          name: sanitized.name,
        })
      );

      // Send email to admin
      await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        replyTo: sanitized.email,
        subject: `New Project Inquiry from ${sanitized.name}`,
        html: inquiryEmailHtml,
      });

      // Send confirmation email to user
      await resend.emails.send({
        from: fromEmail,
        to: sanitized.email,
        subject: "We've received your project inquiry - HomeTrust Africa",
        html: confirmationEmailHtml,
      });
    }

    // Log submission (use proper logging service in production)
    if (process.env.NODE_ENV === "development") {
      console.log("Contact form submission:", {
        name: sanitized.name,
        email: sanitized.email,
        country: data.country,
        projectType: data.projectType,
        timestamp: new Date().toISOString(),
      });
    }

    return {
      success: true,
      message:
        "Thank you! We've received your message and will contact you within 24 hours.",
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
        section: "contact-form",
      },
      extra: {
        formData: {
          name: data.name,
          email: data.email,
          country: data.country,
          projectType: data.projectType,
        },
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
