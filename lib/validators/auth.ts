import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid portal email address."),
  password: z.string().min(8).max(128),
  next: z.string().trim().optional(),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().trim().email("Enter a valid portal email address."),
});

export const passwordResetCompleteSchema = z
  .object({
    password: z.string().min(12).max(128),
    confirmPassword: z.string().min(12).max(128),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password confirmation does not match.",
    path: ["confirmPassword"],
  });

export const acceptInviteSchema = z
  .object({
    token: z.string().trim().min(20).max(255),
    fullName: z.string().trim().min(2).max(120),
    password: z.string().min(12).max(128),
    confirmPassword: z.string().min(12).max(128),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password confirmation does not match.",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetCompleteInput = z.infer<typeof passwordResetCompleteSchema>;
export type AcceptInviteInput = z.infer<typeof acceptInviteSchema>;
