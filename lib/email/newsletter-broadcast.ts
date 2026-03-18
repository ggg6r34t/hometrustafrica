import { render } from "@react-email/render";
import { Resend } from "resend";
import { NewsletterBroadcastEmail } from "@/emails/newsletter-broadcast";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { getNewsletterAudience } from "@/lib/email/newsletter-audience";

export interface NewsletterBroadcastInput {
  campaignName: string;
  subject: string;
  previewText?: string;
  title: string;
  intro: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

function getResendErrorMessage(
  response: { error: { message: string } | null },
  fallback: string,
) {
  return response.error?.message || fallback;
}

export async function sendNewsletterBroadcast(input: NewsletterBroadcastInput) {
  const env = getSupabaseEnv();

  if (!env.resendApiKey) {
    throw new Error("Resend is not configured.");
  }

  const resend = new Resend(env.resendApiKey);
  const audience = await getNewsletterAudience();
  const react = NewsletterBroadcastEmail(input);
  const [html, text] = await Promise.all([
    render(react),
    render(react, { plainText: true }),
  ]);
  const from = env.fromEmail || "newsletter@hometrustafrica.com";
  const response = await resend.broadcasts.create({
    name: input.campaignName,
    from,
    subject: input.subject,
    previewText: input.previewText,
    replyTo: env.supportEmail || from,
    segmentId: audience.id,
    react,
    html,
    text,
  });

  if (response.error) {
    throw new Error(
      getResendErrorMessage(response, "Unable to create newsletter broadcast."),
    );
  }

  return {
    broadcastId: response.data.id,
    audienceId: audience.id,
    audienceName: audience.name,
  };
}
