import type {
  ConversationDetail,
  ConversationSummary,
  DashboardOverview,
  DashboardRepositoryState,
  DashboardSession,
  DashboardSettings,
  DashboardUser,
  FileItem,
  NotificationItem,
  ProjectBudget,
  ProjectDetail,
  ProjectSummary,
  ReportItem,
  TeamMember,
  TimelineEvent,
} from "@/lib/dashboard/types";
import type {
  NotificationSettingsInput,
  PreferenceSettingsInput,
  ProfileSettingsInput,
  SecuritySettingsInput,
  SendMessageInput,
  SupportRequestInput,
} from "@/lib/validators/dashboard";
import { createSupabaseDashboardRepository } from "@/lib/dashboard/supabaseRepository";
import { hasSupabaseAdminEnv, hasSupabaseBrowserEnv } from "@/lib/supabase/env";

export interface DashboardRepository {
  getState(): Promise<DashboardRepositoryState>;
  getCurrentUser(session: DashboardSession): Promise<DashboardUser | null>;
  getOverview(session: DashboardSession): Promise<DashboardOverview>;
  listProjects(session: DashboardSession, filters?: Record<string, string | undefined>): Promise<ProjectSummary[]>;
  getProjectById(session: DashboardSession, projectId: string): Promise<ProjectDetail | null>;
  getProjectTimeline(session: DashboardSession, projectId: string): Promise<TimelineEvent[]>;
  getProjectReports(session: DashboardSession, projectId: string): Promise<ReportItem[]>;
  getProjectFiles(session: DashboardSession, projectId: string): Promise<FileItem[]>;
  getProjectBudget(session: DashboardSession, projectId: string): Promise<ProjectBudget | null>;
  getProjectTeam(session: DashboardSession, projectId: string): Promise<TeamMember[]>;
  listConversations(session: DashboardSession): Promise<ConversationSummary[]>;
  getConversation(session: DashboardSession, threadId: string): Promise<ConversationDetail | null>;
  listNotifications(session: DashboardSession): Promise<NotificationItem[]>;
  getSettings(session: DashboardSession): Promise<DashboardSettings | null>;
  updateProfile(session: DashboardSession, input: ProfileSettingsInput): Promise<void>;
  updateSecurity(session: DashboardSession, input: SecuritySettingsInput): Promise<void>;
  updateNotifications(session: DashboardSession, input: NotificationSettingsInput): Promise<void>;
  updatePreferences(session: DashboardSession, input: PreferenceSettingsInput): Promise<void>;
  sendMessage(session: DashboardSession, input: SendMessageInput): Promise<void>;
  markNotificationsRead(session: DashboardSession, notificationIds: string[]): Promise<void>;
  requestSupport(session: DashboardSession, input: SupportRequestInput): Promise<void>;
}

class UnconfiguredDashboardRepository implements DashboardRepository {
  async getState() {
    return { configured: false, providerLabel: "No dashboard data provider configured" };
  }

  async getCurrentUser() {
    return null;
  }

  async getOverview() {
    return {
      activeProjects: [],
      recentActivity: [],
      nextActions: [],
      latestReports: [],
      unreadConversations: [],
      pendingApprovalsCount: 0,
      upcomingMilestones: [],
      budgetSnapshots: [],
    };
  }

  async listProjects() {
    return [];
  }

  async getProjectById() {
    return null;
  }

  async getProjectTimeline() {
    return [];
  }

  async getProjectReports() {
    return [];
  }

  async getProjectFiles() {
    return [];
  }

  async getProjectBudget() {
    return null;
  }

  async getProjectTeam() {
    return [];
  }

  async listConversations() {
    return [];
  }

  async getConversation() {
    return null;
  }

  async listNotifications() {
    return [];
  }

  async getSettings() {
    return null;
  }

  async updateProfile() {
    throw new Error("Dashboard data provider is not configured.");
  }

  async updateSecurity() {
    throw new Error("Dashboard data provider is not configured.");
  }

  async updateNotifications() {
    throw new Error("Dashboard data provider is not configured.");
  }

  async updatePreferences() {
    throw new Error("Dashboard data provider is not configured.");
  }

  async sendMessage() {
    throw new Error("Dashboard data provider is not configured.");
  }

  async markNotificationsRead() {
    throw new Error("Dashboard data provider is not configured.");
  }

  async requestSupport() {
    throw new Error("Dashboard data provider is not configured.");
  }
}

export function createDashboardRepository(): DashboardRepository {
  if (hasSupabaseBrowserEnv() && hasSupabaseAdminEnv()) {
    return createSupabaseDashboardRepository();
  }

  return new UnconfiguredDashboardRepository();
}
