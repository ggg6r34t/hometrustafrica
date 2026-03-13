export type DashboardRole = "CLIENT" | "TEAM_MEMBER" | "ADMIN" | "OPERATIONS_MANAGER";

export type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "AT_RISK"
  | "ON_HOLD"
  | "COMPLETED"
  | "ARCHIVED";

export type ProjectHealth = "healthy" | "watch" | "critical";

export type ProjectType =
  | "Construction"
  | "Business Setup"
  | "Agriculture"
  | "Land Development"
  | "Solar / Infrastructure"
  | "Procurement / Logistics"
  | "Other";

export type TimelineEventType =
  | "milestone"
  | "report"
  | "file"
  | "approval"
  | "message"
  | "budget"
  | "assignment"
  | "status";

export type ReportType =
  | "Progress Report"
  | "Site Verification"
  | "Budget Report"
  | "Procurement Report"
  | "Compliance Report"
  | "Inspection Report";

export type FileCategory = "Document" | "Photo" | "Video" | "Receipt" | "Contract";

export type NotificationType =
  | "report_uploaded"
  | "milestone_completed"
  | "approval_needed"
  | "new_message"
  | "budget_threshold"
  | "document_added"
  | "security";

export interface DashboardSession {
  userId: string;
  role: DashboardRole;
  email: string;
  name: string;
  expiresAt: string;
  authSource?: "supabase" | "development_override";
}

export interface DashboardUser {
  id: string;
  role: DashboardRole;
  fullName: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  preferredContactMethod?: "email" | "phone" | "whatsapp" | null;
  timezone?: string | null;
  currency?: string | null;
}

export interface ProjectAssignment {
  userId: string;
  role: DashboardRole;
  label: string;
}

export interface MilestoneSummary {
  id: string;
  title: string;
  dueAt?: string | null;
  completedAt?: string | null;
  status: "pending" | "in_progress" | "completed" | "blocked";
}

export interface ProjectSummary {
  id: string;
  name: string;
  type: ProjectType;
  location: string;
  status: ProjectStatus;
  health: ProjectHealth;
  completionPercentage: number;
  latestUpdateAt?: string | null;
  nextMilestone?: MilestoneSummary | null;
  leadName?: string | null;
  stageLabel: string;
  assignments: ProjectAssignment[];
}

export interface ProjectDetail extends ProjectSummary {
  description?: string | null;
  latestReportSummary?: string | null;
  pendingApprovalsCount: number;
  unreadMessagesCount: number;
  outstandingActionsCount: number;
}

export interface TimelineEvent {
  id: string;
  projectId: string;
  type: TimelineEventType;
  title: string;
  summary: string;
  actorName: string;
  actorRoleLabel: string;
  occurredAt: string;
  attachments?: Array<{ id: string; name: string; href?: string | null }>;
  clientVisible: boolean;
}

export interface ReportItem {
  id: string;
  projectId: string;
  title: string;
  type: ReportType;
  reportingPeriodLabel: string;
  summary: string;
  uploadedAt: string;
  uploadedBy: string;
  attachmentsCount: number;
  mediaCount: number;
}

export interface ReportSectionItem {
  id: string;
  title: string;
  body: string;
}

export interface FileItem {
  id: string;
  projectId: string;
  name: string;
  category: FileCategory;
  description?: string | null;
  uploadedAt: string;
  uploadedBy: string;
  sizeLabel?: string | null;
  mimeType?: string | null;
  downloadUrl?: string | null;
  previewUrl?: string | null;
}

export interface ReportDetail extends ReportItem {
  sections: ReportSectionItem[];
  attachments: FileItem[];
}

export interface BudgetCategory {
  label: string;
  allocated: number;
  spent: number;
}

export interface TransactionItem {
  id: string;
  projectId: string;
  description: string;
  category: string;
  amount: number;
  status: "approved" | "pending" | "flagged";
  occurredAt: string;
  receiptFileId?: string | null;
}

export interface ProjectBudget {
  projectId: string;
  currency: string;
  allocated: number;
  spent: number;
  remaining: number;
  pendingApprovalsCount: number;
  categories: BudgetCategory[];
  transactions: TransactionItem[];
}

export interface ApprovalItem {
  id: string;
  projectId: string;
  title: string;
  description?: string | null;
  status: "pending" | "approved" | "rejected" | "cancelled";
  dueAt?: string | null;
  requestedBy: string;
  requestedFromUserId?: string | null;
  amount?: number | null;
  currency?: string | null;
}

export interface TeamMember {
  id: string;
  fullName: string;
  roleLabel: string;
  projectId: string;
  email?: string | null;
  phone?: string | null;
  availabilityNote?: string | null;
}

export interface ConversationSummary {
  id: string;
  subject: string;
  kind?: "project" | "support" | "general";
  projectId?: string | null;
  projectName?: string | null;
  unreadCount: number;
  lastMessagePreview?: string | null;
  lastMessageAt?: string | null;
}

export interface MessageItem {
  id: string;
  threadId: string;
  senderName: string;
  senderRoleLabel: string;
  body: string;
  sentAt: string;
  isOwnMessage: boolean;
}

export interface ConversationDetail extends ConversationSummary {
  participants: Array<{ id: string; fullName: string; roleLabel: string }>;
  messages: MessageItem[];
}

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  readAt?: string | null;
  href?: string | null;
  projectName?: string | null;
}

export interface SupportMessageItem {
  id: string;
  threadId: string;
  senderName: string;
  senderRoleLabel: string;
  body: string;
  sentAt: string;
  isOwnMessage: boolean;
}

export interface SupportThreadSummary {
  id: string;
  subject: string;
  priority: "standard" | "priority" | "urgent";
  status: "open" | "in_progress" | "closed";
  projectId?: string | null;
  projectName?: string | null;
  updatedAt: string;
  lastMessagePreview?: string | null;
}

export interface SupportThreadDetail extends SupportThreadSummary {
  messages: SupportMessageItem[];
}

export interface DashboardActionItem {
  id: string;
  title: string;
  description: string;
  href: string;
  severity: "low" | "medium" | "high";
}

export interface DashboardOverview {
  activeProjects: ProjectSummary[];
  recentActivity: TimelineEvent[];
  nextActions: DashboardActionItem[];
  latestReports: ReportItem[];
  unreadConversations: ConversationSummary[];
  pendingApprovalsCount: number;
  upcomingMilestones: MilestoneSummary[];
  budgetSnapshots: ProjectBudget[];
}

export interface DashboardSettings {
  profile: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    preferredContactMethod: "email" | "phone" | "whatsapp";
  };
  security: {
    hasTwoFactorEnabled: boolean;
    activeSessionsCount: number;
    lastSignInAt?: string | null;
  };
  notifications: {
    emailReports: boolean;
    emailMilestones: boolean;
    emailBudgetAlerts: boolean;
    emailMessages: boolean;
    inAppReports: boolean;
    inAppMilestones: boolean;
    inAppBudgetAlerts: boolean;
    inAppMessages: boolean;
  };
  preferences: {
    timezone: string;
    currency: string;
    density: "comfortable" | "compact";
  };
}

export interface DashboardRepositoryState {
  configured: boolean;
  providerLabel: string;
}
