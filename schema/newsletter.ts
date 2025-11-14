import { z } from "zod";

/**
 * Zod schema for newsletter subscription validation
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
