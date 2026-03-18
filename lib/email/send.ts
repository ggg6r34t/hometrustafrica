import { render } from "@react-email/render";
import { Resend } from "resend";
import type { ReactElement } from "react";
import { getSupabaseEnv } from "@/lib/supabase/env";

interface SendEmailInput {
  to: string | string[];
  subject: string;
  react: ReactElement;
  from?: string;
  replyTo?: string;
}

interface SendEmailResult {
  status: "sent" | "skipped";
  attempts: number;
}

const defaultRetryCount = 3;
const retryDelayMs = 400;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendEmail({
  to,
  subject,
  react,
  from,
  replyTo,
}: SendEmailInput): Promise<SendEmailResult> {
  const env = getSupabaseEnv();
  const resendApiKey = env.resendApiKey;
  const fromEmail = from || env.fromEmail || "noreply@hometrustafrica.com";

  if (!resendApiKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[email] RESEND_API_KEY missing. Email send skipped.",
        JSON.stringify({ to, subject }),
      );
      return { status: "skipped", attempts: 0 };
    }

    throw new Error("Email service is not configured.");
  }

  const resend = new Resend(resendApiKey);
  const html = await render(react);
  const text = await render(react, { plainText: true });

  let lastError: unknown;

  for (let attempt = 1; attempt <= defaultRetryCount; attempt += 1) {
    try {
      await resend.emails.send({
        from: fromEmail,
        to,
        subject,
        html,
        text,
        ...(replyTo ? { replyTo } : {}),
      });

      return { status: "sent", attempts: attempt };
    } catch (error) {
      lastError = error;

      if (attempt < defaultRetryCount) {
        await sleep(retryDelayMs * attempt);
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Email delivery failed after retries.");
}
