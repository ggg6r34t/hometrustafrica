import { z } from "zod";

export const profileSettingsSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(30),
  country: z.string().trim().min(2).max(80),
  preferredContactMethod: z.enum(["email", "phone", "whatsapp"]),
});

export const securitySettingsSchema = z
  .object({
    currentPassword: z.string().min(8).max(128),
    newPassword: z.string().min(12).max(128),
    confirmPassword: z.string().min(12).max(128),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Password confirmation does not match.",
    path: ["confirmPassword"],
  });

export const notificationSettingsSchema = z.object({
  emailReports: z.boolean(),
  emailMilestones: z.boolean(),
  emailBudgetAlerts: z.boolean(),
  emailMessages: z.boolean(),
  inAppReports: z.boolean(),
  inAppMilestones: z.boolean(),
  inAppBudgetAlerts: z.boolean(),
  inAppMessages: z.boolean(),
});

export const preferenceSettingsSchema = z.object({
  timezone: z.string().trim().min(2).max(80),
  currency: z.string().trim().min(3).max(10),
  density: z.enum(["comfortable", "compact"]),
});

export const sendMessageSchema = z.object({
  threadId: z.string().trim().min(1).max(120),
  body: z.string().trim().min(1).max(5000),
});

export const approvalDecisionSchema = z.object({
  approvalId: z.string().trim().min(1).max(120),
  decision: z.enum(["approved", "rejected"]),
  note: z.string().trim().max(500).optional(),
});

export const notificationBulkActionSchema = z.object({
  notificationIds: z.array(z.string().trim().min(1)).min(1).max(100),
});

export const supportRequestSchema = z.object({
  subject: z.string().trim().min(4).max(120),
  details: z.string().trim().min(10).max(2000),
  urgency: z.enum(["standard", "priority", "urgent"]),
});

export const supportReplySchema = z.object({
  threadId: z.string().trim().min(1).max(120),
  body: z.string().trim().min(1).max(5000),
});

export type ProfileSettingsInput = z.infer<typeof profileSettingsSchema>;
export type SecuritySettingsInput = z.infer<typeof securitySettingsSchema>;
export type NotificationSettingsInput = z.infer<typeof notificationSettingsSchema>;
export type PreferenceSettingsInput = z.infer<typeof preferenceSettingsSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type ApprovalDecisionInput = z.infer<typeof approvalDecisionSchema>;
export type NotificationBulkActionInput = z.infer<typeof notificationBulkActionSchema>;
export type SupportRequestInput = z.infer<typeof supportRequestSchema>;
export type SupportReplyInput = z.infer<typeof supportReplySchema>;
