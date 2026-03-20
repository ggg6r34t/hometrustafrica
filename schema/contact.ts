import { z } from "zod";

/**
 * Zod schema for contact form validation
 */
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const phoneRegex =
          /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
        return phoneRegex.test(val.replace(/\s/g, ""));
      },
      {
        message: "Enter a valid phone number with country code",
      }
    ),
  country: z
    .string()
    .min(1, "Country of residence is required")
    .refine((val) => val !== "diaspora" && val !== "africa", {
      message: "Choose a valid country",
    }),
  projectType: z
    .string()
    .min(1, "Project category is required")
    .refine(
      (val) =>
        ["residential", "commercial", "business", "agricultural", "general"].includes(
          val
        ),
      {
        message: "Choose a valid project category",
      }
    ),
  message: z
    .string()
    .min(1, "Project brief is required")
    .min(10, "Provide enough detail for an initial review (at least 10 characters)")
    .max(5000, "Message must be less than 5000 characters")
    .trim(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

