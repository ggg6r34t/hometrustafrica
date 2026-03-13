import type { DashboardSettings } from "@/lib/dashboard/types";

export const emptyDashboardSettings: DashboardSettings = {
  profile: {
    fullName: "",
    email: "",
    phone: "",
    country: "",
    preferredContactMethod: "email",
  },
  security: {
    hasTwoFactorEnabled: false,
    activeSessionsCount: 0,
    lastSignInAt: null,
  },
  notifications: {
    emailReports: true,
    emailMilestones: true,
    emailBudgetAlerts: true,
    emailMessages: true,
    inAppReports: true,
    inAppMilestones: true,
    inAppBudgetAlerts: true,
    inAppMessages: true,
  },
  preferences: {
    timezone: "UTC",
    currency: "USD",
    density: "comfortable",
  },
};
