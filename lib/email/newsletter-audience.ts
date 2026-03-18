import { Resend } from "resend";
import { getSupabaseEnv } from "@/lib/supabase/env";

export type NewsletterSubscriptionState =
  | "created"
  | "reactivated"
  | "already-subscribed";

interface NewsletterAudienceResult {
  audienceId: string;
  audienceName: string;
  state: NewsletterSubscriptionState;
}

export interface NewsletterAudienceSummary {
  id: string;
  name: string;
  configuredById: boolean;
}

const defaultAudienceName = "HomeTrust Africa Newsletter";

function createResendClient() {
  const env = getSupabaseEnv();

  if (!env.resendApiKey) {
    throw new Error("Resend is not configured.");
  }

  return new Resend(env.resendApiKey);
}

function getNewsletterAudienceConfig() {
  const env = getSupabaseEnv();

  return {
    audienceId: env.resendNewsletterAudienceId.trim(),
    audienceName:
      env.resendNewsletterAudienceName.trim() || defaultAudienceName,
  };
}

function getResendErrorMessage(
  response: { error: { message: string } | null },
  fallback: string,
) {
  return response.error?.message || fallback;
}

async function resolveNewsletterAudience(resend: Resend) {
  const config = getNewsletterAudienceConfig();

  if (config.audienceId) {
    const audience = await resend.segments.get(config.audienceId);

    if (audience.error) {
      throw new Error(
        getResendErrorMessage(
          audience,
          "Configured Resend newsletter audience was not found.",
        ),
      );
    }

    return {
      id: audience.data.id,
      name: audience.data.name,
      configuredById: true,
    };
  }

  const audienceList = await resend.segments.list();

  if (audienceList.error) {
    throw new Error(
      getResendErrorMessage(
        audienceList,
        "Unable to list Resend newsletter audiences.",
      ),
    );
  }

  const existingAudience = audienceList.data.data.find(
    (item) => item.name.toLowerCase() === config.audienceName.toLowerCase(),
  );

  if (existingAudience) {
    return {
      id: existingAudience.id,
      name: existingAudience.name,
      configuredById: false,
    };
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      `Resend newsletter audience \"${config.audienceName}\" was not found. Configure RESEND_NEWSLETTER_AUDIENCE_ID for production.`,
    );
  }

  const createdAudience = await resend.segments.create({
    name: config.audienceName,
  });

  if (createdAudience.error) {
    throw new Error(
      getResendErrorMessage(
        createdAudience,
        "Unable to create Resend newsletter audience.",
      ),
    );
  }

  return {
    id: createdAudience.data.id,
    name: createdAudience.data.name,
    configuredById: false,
  };
}

export async function getNewsletterAudience(): Promise<NewsletterAudienceSummary> {
  const resend = createResendClient();
  return resolveNewsletterAudience(resend);
}

export async function upsertNewsletterAudienceContact(
  email: string,
): Promise<NewsletterAudienceResult> {
  const resend = createResendClient();
  const audience = await resolveNewsletterAudience(resend);
  const existingContact = await resend.contacts.get({
    audienceId: audience.id,
    email,
  });

  if (existingContact.error) {
    if (existingContact.error.name !== "not_found") {
      throw new Error(
        getResendErrorMessage(
          existingContact,
          "Unable to fetch the existing newsletter contact.",
        ),
      );
    }

    const createdContact = await resend.contacts.create({
      audienceId: audience.id,
      email,
      unsubscribed: false,
      properties: {
        subscription_source: "website",
        subscription_channel: "newsletter_form",
        subscribed_at: new Date().toISOString(),
      },
    });

    if (createdContact.error) {
      throw new Error(
        getResendErrorMessage(
          createdContact,
          "Unable to create the newsletter contact.",
        ),
      );
    }

    return {
      audienceId: audience.id,
      audienceName: audience.name,
      state: "created",
    };
  }

  if (existingContact.data.unsubscribed) {
    const reactivatedContact = await resend.contacts.update({
      audienceId: audience.id,
      email,
      unsubscribed: false,
      properties: {
        subscription_source: "website",
        subscription_channel: "newsletter_form",
        resubscribed_at: new Date().toISOString(),
      },
    });

    if (reactivatedContact.error) {
      throw new Error(
        getResendErrorMessage(
          reactivatedContact,
          "Unable to reactivate the newsletter contact.",
        ),
      );
    }

    return {
      audienceId: audience.id,
      audienceName: audience.name,
      state: "reactivated",
    };
  }

  return {
    audienceId: audience.id,
    audienceName: audience.name,
    state: "already-subscribed",
  };
}
