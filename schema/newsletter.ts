import { z } from "zod";

/**
 * Zod schema for newsletter subscription validation
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .toLowerCase()
    .trim(),
});

export const newsletterBroadcastSchema = z
  .object({
    campaignName: z
      .string()
      .trim()
      .min(3, "Campaign name is required")
      .max(120),
    subject: z.string().trim().min(3, "Subject is required").max(140),
    previewText: z.string().trim().max(160).optional(),
    title: z.string().trim().min(3, "Headline is required").max(120),
    intro: z
      .string()
      .trim()
      .min(10, "Intro must be at least 10 characters")
      .max(500),
    body: z
      .string()
      .trim()
      .min(20, "Body must be at least 20 characters")
      .max(5000),
    ctaLabel: z.string().trim().max(60).optional(),
    ctaUrl: z
      .union([
        z.literal(""),
        z.string().trim().url("CTA URL must be a valid URL"),
      ])
      .optional(),
  })
  .refine(
    (value) =>
      Boolean(value.ctaLabel) === Boolean(value.ctaUrl && value.ctaUrl !== ""),
    {
      message: "CTA label and CTA URL must be provided together.",
      path: ["ctaUrl"],
    },
  );

export const newsletterBroadcastDraftSchema = z.object({
  draftId: z.string().trim().uuid().optional().or(z.literal("")),
  campaignName: z.string().trim().min(1, "Campaign name is required").max(120),
  subject: z.string().trim().min(1, "Subject is required").max(140),
  previewText: z.string().trim().max(160).optional(),
  title: z.string().trim().min(1, "Headline is required").max(120),
  intro: z.string().trim().min(1, "Intro is required").max(500),
  body: z.string().trim().min(1, "Body is required").max(5000),
  ctaLabel: z.string().trim().max(60).optional(),
  ctaUrl: z
    .union([
      z.literal(""),
      z.string().trim().url("CTA URL must be a valid URL"),
    ])
    .optional(),
});

export const newsletterDraftDeleteSchema = z.object({
  draftId: z.string().trim().uuid("Invalid draft id."),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
export type NewsletterBroadcastFormValues = z.infer<
  typeof newsletterBroadcastSchema
>;
export type NewsletterBroadcastDraftValues = z.infer<
  typeof newsletterBroadcastDraftSchema
>;
