import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { DashboardRepository } from "@/lib/dashboard/repository";
import type {
  ApprovalItem,
  ConversationDetail,
  ConversationSummary,
  DashboardActionItem,
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
  ReportDetail,
  TeamMember,
  SupportThreadDetail,
  SupportThreadSummary,
  TimelineEvent,
} from "@/lib/dashboard/types";
import type {
  ApprovalDecisionInput,
  NotificationSettingsInput,
  PreferenceSettingsInput,
  ProfileSettingsInput,
  SecuritySettingsInput,
  SendMessageInput,
  SupportReplyInput,
  SupportRequestInput,
} from "@/lib/validators/dashboard";
import {
  getSupabaseEnv,
  hasSupabaseAdminEnv,
  hasSupabaseBrowserEnv,
} from "@/lib/supabase/env";

type AnyClient = SupabaseClient<any, "public", any>;

type ProjectRow = {
  id: string;
  client_account_id: string;
  project_type_code: string;
  name: string;
  location_city: string | null;
  location_state: string | null;
  location_country: string;
  status: string;
  health: string;
  completion_percentage: number;
  stage_label: string;
  description: string | null;
  updated_at: string;
  created_at: string;
};

type AssignmentRow = {
  project_id: string;
  user_id: string;
  role: string;
  label: string;
  is_primary: boolean | null;
};

type MilestoneRow = {
  id: string;
  project_id: string;
  title: string;
  due_at: string | null;
  completed_at: string | null;
  status: "pending" | "in_progress" | "completed" | "blocked";
  visible_to_client: boolean;
};

type ReportRow = {
  id: string;
  project_id: string;
  title: string;
  report_type: string;
  reporting_period_label: string;
  summary: string;
  uploaded_at: string;
  uploaded_by: string;
  client_visible: boolean;
};

type ReportSectionRow = {
  id: string;
  report_id: string;
  section_title: string;
  body: string;
  sort_order: number;
};

type FileRow = {
  id: string;
  project_id: string;
  category_code: string;
  name: string;
  description: string | null;
  uploaded_at: string;
  uploaded_by: string;
  size_bytes: number | null;
  mime_type: string | null;
  storage_bucket: string;
  storage_path: string;
  client_visible: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDateLabel(value?: string | null) {
  return value ? dateFormatter.format(new Date(value)) : null;
}

function formatLocation(
  project: Pick<
    ProjectRow,
    "location_city" | "location_state" | "location_country"
  >,
) {
  return [
    project.location_city,
    project.location_state,
    project.location_country,
  ]
    .filter(Boolean)
    .join(", ");
}

function formatBytes(sizeBytes?: number | null) {
  if (!sizeBytes) {
    return null;
  }

  if (sizeBytes < 1024 * 1024) {
    return `${Math.round(sizeBytes / 1024)} KB`;
  }

  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isPreviewableMimeType(mimeType?: string | null) {
  return Boolean(
    mimeType?.startsWith("image/") ||
      mimeType?.startsWith("video/") ||
      mimeType === "application/pdf",
  );
}

function rolePriority(role: string) {
  switch (role) {
    case "ADMIN":
      return 4;
    case "OPERATIONS_MANAGER":
      return 3;
    case "TEAM_MEMBER":
      return 2;
    default:
      return 1;
  }
}

function pickPrimaryRole(roles: string[]) {
  return (
    [...roles].sort(
      (left, right) => rolePriority(right) - rolePriority(left),
    )[0] || "CLIENT"
  );
}

function buildAssignments(projectId: string, assignments: AssignmentRow[]) {
  return assignments
    .filter((assignment) => assignment.project_id === projectId)
    .map((assignment) => ({
      userId: assignment.user_id,
      role: assignment.role as DashboardSession["role"],
      label: assignment.label,
    }));
}

async function getAnonPasswordVerifier() {
  const env = getSupabaseEnv();
  return createClient(env.url, env.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export class SupabaseDashboardRepository implements DashboardRepository {
  async getState(): Promise<DashboardRepositoryState> {
    return {
      configured: hasSupabaseBrowserEnv() && hasSupabaseAdminEnv(),
      providerLabel: "Supabase",
    };
  }

  private async getClients(session: DashboardSession) {
    const admin = createSupabaseAdminClient();
    const queryClient =
      session.authSource === "supabase"
        ? await createSupabaseServerClient()
        : admin;
    const scopedProjectIds =
      session.authSource === "supabase"
        ? null
        : await this.resolveScopedProjectIds(admin, session);

    return { admin, queryClient, scopedProjectIds };
  }

  private async resolveScopedProjectIds(
    admin: AnyClient,
    session: DashboardSession,
  ) {
    if (session.role === "ADMIN" || session.role === "OPERATIONS_MANAGER") {
      const { data } = await admin.from("projects").select("id");
      return (data || []).map((row: { id: string }) => row.id);
    }

    const scopedIds = new Set<string>();
    const [{ data: assignments }, { data: memberships }] = await Promise.all([
      admin
        .from("project_assignments")
        .select("project_id")
        .eq("user_id", session.userId),
      admin
        .from("client_account_members")
        .select("client_account_id")
        .eq("user_id", session.userId),
    ]);

    (assignments || []).forEach((row: { project_id: string }) =>
      scopedIds.add(row.project_id),
    );

    if (memberships?.length) {
      const { data: projects } = await admin
        .from("projects")
        .select("id")
        .in(
          "client_account_id",
          memberships.map(
            (row: { client_account_id: string }) => row.client_account_id,
          ),
        );
      (projects || []).forEach((row: { id: string }) => scopedIds.add(row.id));
    }

    return [...scopedIds];
  }

  private async queryProjects(
    session: DashboardSession,
    filters?: Record<string, string | undefined>,
  ) {
    const { queryClient, scopedProjectIds } = await this.getClients(session);

    if (scopedProjectIds && scopedProjectIds.length === 0) {
      return [];
    }

    let query = queryClient
      .from("projects")
      .select(
        "id, client_account_id, project_type_code, name, location_city, location_state, location_country, status, health, completion_percentage, stage_label, description, updated_at, created_at",
      )
      .order("updated_at", { ascending: false });

    if (scopedProjectIds) {
      query = query.in("id", scopedProjectIds);
    }

    if (filters?.q) {
      query = query.or(
        `name.ilike.%${filters.q}%,location_city.ilike.%${filters.q}%,location_state.ilike.%${filters.q}%`,
      );
    }
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }
    if (filters?.type) {
      query = query.eq("project_type_code", filters.type);
    }
    if (filters?.sort === "created") {
      query = query.order("created_at", { ascending: false });
    } else if (filters?.sort === "status") {
      query = query
        .order("status", { ascending: true })
        .order("updated_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(`Unable to load projects: ${error.message}`);
    }

    return (data || []) as ProjectRow[];
  }

  private async getProjectRelatedRows(
    session: DashboardSession,
    projectIds: string[],
  ) {
    if (!projectIds.length) {
      return {
        assignments: [] as AssignmentRow[],
        milestones: [] as MilestoneRow[],
        contacts: [] as any[],
        timelineEvents: [] as any[],
        reports: [] as ReportRow[],
        approvalRequests: [] as any[],
        projectTypes: [] as any[],
      };
    }

    const { queryClient, scopedProjectIds } = await this.getClients(session);
    const effectiveIds = scopedProjectIds
      ? projectIds.filter((id) => scopedProjectIds.includes(id))
      : projectIds;
    if (!effectiveIds.length) {
      return {
        assignments: [] as AssignmentRow[],
        milestones: [] as MilestoneRow[],
        contacts: [] as any[],
        timelineEvents: [] as any[],
        reports: [] as ReportRow[],
        approvalRequests: [] as any[],
        projectTypes: [] as any[],
      };
    }

    const [
      { data: assignments },
      { data: milestones },
      { data: contacts },
      { data: timelineEvents },
      { data: reports },
      { data: approvalRequests },
      { data: projectTypes },
    ] = await Promise.all([
      queryClient
        .from("project_assignments")
        .select("project_id, user_id, role, label, is_primary")
        .in("project_id", effectiveIds),
      queryClient
        .from("milestones")
        .select(
          "id, project_id, title, due_at, completed_at, status, visible_to_client",
        )
        .in("project_id", effectiveIds),
      queryClient
        .from("project_contacts")
        .select(
          "project_id, full_name, role_label, email, phone, availability_note, is_client_visible",
        )
        .in("project_id", effectiveIds),
      queryClient
        .from("timeline_events")
        .select(
          "id, project_id, event_type, title, summary, actor_user_id, actor_name_override, occurred_at, client_visible",
        )
        .in("project_id", effectiveIds)
        .order("occurred_at", { ascending: false }),
      queryClient
        .from("reports")
        .select(
          "id, project_id, title, report_type, reporting_period_label, summary, uploaded_at, uploaded_by, client_visible",
        )
        .in("project_id", effectiveIds)
        .order("uploaded_at", { ascending: false }),
      queryClient
        .from("approval_requests")
        .select("id, project_id, status, title, description, due_at")
        .in("project_id", effectiveIds),
      queryClient.from("project_types").select("code, label"),
    ]);

    return {
      assignments: (assignments || []) as AssignmentRow[],
      milestones: (milestones || []) as MilestoneRow[],
      contacts: contacts || [],
      timelineEvents: timelineEvents || [],
      reports: (reports || []) as ReportRow[],
      approvalRequests: approvalRequests || [],
      projectTypes: projectTypes || [],
    };
  }

  private async getProfileMap(userIds: string[]) {
    const uniqueIds = [...new Set(userIds)];
    if (!uniqueIds.length) {
      return new Map<string, { full_name: string; email: string }>();
    }

    const admin = createSupabaseAdminClient();
    const { data } = await admin
      .from("profiles")
      .select("id, full_name, email")
      .in("id", uniqueIds);
    return new Map(
      (data || []).map(
        (profile: { id: string; full_name: string; email: string }) => [
          profile.id,
          profile,
        ],
      ),
    );
  }

  private async createSignedFileLinks(
    file: Pick<FileRow, "storage_bucket" | "storage_path" | "mime_type">,
  ) {
    const admin = createSupabaseAdminClient();
    try {
      const { data: signed } = await admin.storage
        .from(file.storage_bucket)
        .createSignedUrl(file.storage_path, 60 * 30);
      return {
        downloadUrl: signed?.signedUrl || null,
        previewUrl: isPreviewableMimeType(file.mime_type)
          ? signed?.signedUrl || null
          : null,
      };
    } catch {
      return { downloadUrl: null, previewUrl: null };
    }
  }

  private async buildFileItems(rows: FileRow[]) {
    const uploaderMap = await this.getProfileMap(
      rows.map((file) => file.uploaded_by),
    );
    return Promise.all(
      rows.map(async (file) => {
        const links = await this.createSignedFileLinks(file);
        return {
          id: file.id,
          projectId: file.project_id,
          name: file.name,
          category: file.category_code as FileItem["category"],
          description: file.description,
          uploadedAt: file.uploaded_at,
          uploadedBy:
            uploaderMap.get(file.uploaded_by)?.full_name || "HomeTrust Africa",
          sizeLabel: formatBytes(file.size_bytes),
          mimeType: file.mime_type,
          downloadUrl: links.downloadUrl,
          previewUrl: links.previewUrl,
        };
      }),
    );
  }

  private async buildProjectSummaries(
    session: DashboardSession,
    projects: ProjectRow[],
  ): Promise<ProjectSummary[]> {
    const related = await this.getProjectRelatedRows(
      session,
      projects.map((project) => project.id),
    );

    return projects.map((project) => {
      const nextMilestone = related.milestones
        .filter(
          (milestone) =>
            milestone.project_id === project.id &&
            milestone.status !== "completed",
        )
        .sort((left, right) =>
          (left.due_at || "").localeCompare(right.due_at || ""),
        )[0];

      const latestTimelineEvent = related.timelineEvents.find(
        (event: any) => event.project_id === project.id,
      );
      const projectManager = related.contacts.find(
        (contact: any) =>
          contact.project_id === project.id &&
          /project manager/i.test(contact.role_label),
      );
      const projectType = related.projectTypes.find(
        (item: any) => item.code === project.project_type_code,
      );

      return {
        id: project.id,
        name: project.name,
        type: (projectType?.label ||
          project.project_type_code) as ProjectSummary["type"],
        location: formatLocation(project),
        status: project.status as ProjectSummary["status"],
        health: project.health as ProjectSummary["health"],
        completionPercentage: project.completion_percentage,
        latestUpdateAt:
          formatDateLabel(
            latestTimelineEvent?.occurred_at || project.updated_at,
          ) || undefined,
        nextMilestone: nextMilestone
          ? {
              id: nextMilestone.id,
              title: nextMilestone.title,
              dueAt: nextMilestone.due_at,
              completedAt: nextMilestone.completed_at,
              status: nextMilestone.status,
            }
          : null,
        leadName: projectManager?.full_name || null,
        stageLabel: project.stage_label,
        assignments: buildAssignments(project.id, related.assignments),
      };
    });
  }

  async getCurrentUser(
    session: DashboardSession,
  ): Promise<DashboardUser | null> {
    const { queryClient } = await this.getClients(session);
    const [{ data: profile }, { data: preferences }] = await Promise.all([
      queryClient
        .from("profiles")
        .select(
          "id, full_name, email, phone, diaspora_country, preferred_contact_method",
        )
        .eq("id", session.userId)
        .maybeSingle(),
      queryClient
        .from("user_preferences")
        .select("timezone, currency_code")
        .eq("user_id", session.userId)
        .maybeSingle(),
    ]);

    if (!profile) {
      return null;
    }

    return {
      id: profile.id,
      role: session.role,
      fullName: profile.full_name,
      email: profile.email,
      phone: profile.phone,
      country: profile.diaspora_country,
      preferredContactMethod: profile.preferred_contact_method,
      timezone: preferences?.timezone,
      currency: preferences?.currency_code,
    };
  }

  async getOverview(session: DashboardSession): Promise<DashboardOverview> {
    const projects = await this.buildProjectSummaries(
      session,
      await this.queryProjects(session),
    );
    const activeProjects = projects
      .filter((project) => !["ARCHIVED", "COMPLETED"].includes(project.status))
      .slice(0, 6);
    const recentActivity = (
      await this.getRecentActivity(
        session,
        activeProjects.map((project) => project.id),
        8,
      )
    ).slice(0, 6);
    const latestReports = await this.getRecentReports(
      session,
      activeProjects.map((project) => project.id),
      4,
    );
    const unreadConversations = (await this.listConversations(session))
      .filter((thread) => thread.unreadCount > 0)
      .slice(0, 4);
    const upcomingMilestones = activeProjects
      .flatMap((project) =>
        project.nextMilestone ? [project.nextMilestone] : [],
      )
      .slice(0, 6);
    const budgetSnapshots = (
      await Promise.all(
        activeProjects
          .slice(0, 4)
          .map((project) => this.getProjectBudget(session, project.id)),
      )
    ).filter(Boolean) as ProjectBudget[];
    const pendingApprovalsCount = budgetSnapshots.reduce(
      (sum, item) => sum + item.pendingApprovalsCount,
      0,
    );

    const nextActions: DashboardActionItem[] = [
      ...activeProjects
        .filter((project) => project.nextMilestone)
        .slice(0, 2)
        .map((project) => ({
          id: `milestone-${project.id}`,
          title: `Review upcoming milestone for ${project.name}`,
          description: `${project.nextMilestone?.title} is the next scheduled checkpoint.`,
          href: `/dashboard/projects/${project.id}/timeline`,
          severity: "medium" as const,
        })),
      ...unreadConversations.slice(0, 2).map((thread) => ({
        id: `conversation-${thread.id}`,
        title: `Respond to ${thread.subject}`,
        description: `${thread.unreadCount} unread message${thread.unreadCount === 1 ? "" : "s"} awaiting review.`,
        href: `/dashboard/inbox/${thread.id}`,
        severity: "low" as const,
      })),
    ];

    return {
      activeProjects,
      recentActivity,
      nextActions,
      latestReports,
      unreadConversations,
      pendingApprovalsCount,
      upcomingMilestones,
      budgetSnapshots,
    };
  }

  async listProjects(
    session: DashboardSession,
    filters?: Record<string, string | undefined>,
  ): Promise<ProjectSummary[]> {
    return this.buildProjectSummaries(
      session,
      await this.queryProjects(session, filters),
    );
  }

  async getProjectById(
    session: DashboardSession,
    projectId: string,
  ): Promise<ProjectDetail | null> {
    const rawProjects = await this.queryProjects(session);
    const projects = await this.buildProjectSummaries(
      session,
      rawProjects.filter((project) => project.id === projectId),
    );
    const project = projects[0];
    if (!project) {
      return null;
    }

    const [timeline, reports, conversations, budget] = await Promise.all([
      this.getProjectTimeline(session, projectId),
      this.getProjectReports(session, projectId),
      this.listConversations(session),
      this.getProjectBudget(session, projectId),
    ]);

    return {
      ...project,
      description:
        rawProjects.find((item) => item.id === projectId)?.description || null,
      latestReportSummary: reports[0]?.summary || null,
      pendingApprovalsCount: budget?.pendingApprovalsCount || 0,
      unreadMessagesCount: conversations
        .filter((conversation) => conversation.projectId === projectId)
        .reduce((sum, conversation) => sum + conversation.unreadCount, 0),
      outstandingActionsCount:
        (budget?.pendingApprovalsCount || 0) +
        timeline.filter((item) => item.type === "approval").length,
    };
  }

  private async getRecentActivity(
    session: DashboardSession,
    projectIds: string[],
    limit = 10,
  ): Promise<TimelineEvent[]> {
    if (!projectIds.length) {
      return [];
    }

    const { queryClient } = await this.getClients(session);
    const { data } = await queryClient
      .from("timeline_events")
      .select(
        "id, project_id, event_type, title, summary, actor_user_id, actor_name_override, occurred_at, client_visible",
      )
      .in("project_id", projectIds)
      .order("occurred_at", { ascending: false })
      .limit(limit);

    const actorIds = [
      ...new Set(
        (data || []).map((row: any) => row.actor_user_id).filter(Boolean),
      ),
    ];
    const profileMap = await this.getProfileMap(actorIds);

    return (data || []).map((event: any) => ({
      id: event.id,
      projectId: event.project_id,
      type: event.event_type,
      title: event.title,
      summary: event.summary,
      actorName:
        event.actor_name_override ||
        profileMap.get(event.actor_user_id)?.full_name ||
        "HomeTrust Africa",
      actorRoleLabel: event.actor_user_id
        ? "Project Team"
        : "Operations Update",
      occurredAt: event.occurred_at,
      clientVisible: event.client_visible,
      attachments: [],
    }));
  }

  async getProjectTimeline(
    session: DashboardSession,
    projectId: string,
  ): Promise<TimelineEvent[]> {
    return this.getRecentActivity(session, [projectId], 50);
  }

  private async getRecentReports(
    session: DashboardSession,
    projectIds: string[],
    limit = 10,
    filters?: Record<string, string | undefined>,
  ) {
    if (!projectIds.length) {
      return [];
    }

    const { queryClient } = await this.getClients(session);
    let reportsQuery = queryClient
      .from("reports")
      .select(
        "id, project_id, title, report_type, reporting_period_label, summary, uploaded_at, uploaded_by, client_visible",
      )
      .in("project_id", projectIds)
      .order("uploaded_at", { ascending: false })
      .limit(limit);

    if (filters?.type) {
      reportsQuery = reportsQuery.eq("report_type", filters.type);
    }
    if (filters?.q) {
      reportsQuery = reportsQuery.or(
        `title.ilike.%${filters.q}%,summary.ilike.%${filters.q}%`,
      );
    }

    const [
      { data: reports },
      { data: reportAttachments },
      { data: mediaAssets },
    ] = await Promise.all([
      reportsQuery,
      queryClient.from("report_attachments").select("report_id, file_id"),
      queryClient.from("media_assets").select("project_id, file_id"),
    ]);

    const uploaderMap = await this.getProfileMap(
      (reports || []).map((report: any) => report.uploaded_by),
    );

    return (reports || []).map((report: any) => ({
      id: report.id,
      projectId: report.project_id,
      title: report.title,
      type: report.report_type,
      reportingPeriodLabel: report.reporting_period_label,
      summary: report.summary,
      uploadedAt: report.uploaded_at,
      uploadedBy:
        uploaderMap.get(report.uploaded_by)?.full_name || "HomeTrust Africa",
      attachmentsCount: (reportAttachments || []).filter(
        (attachment: any) => attachment.report_id === report.id,
      ).length,
      mediaCount: (mediaAssets || []).filter(
        (asset: any) => asset.project_id === report.project_id,
      ).length,
    }));
  }

  async getProjectReports(
    session: DashboardSession,
    projectId: string,
    filters?: Record<string, string | undefined>,
  ) {
    return this.getRecentReports(session, [projectId], 50, filters);
  }

  async getProjectReportById(
    session: DashboardSession,
    projectId: string,
    reportId: string,
  ): Promise<ReportDetail | null> {
    const { queryClient } = await this.getClients(session);
    const [{ data: report }, { data: sections }, { data: reportAttachments }] =
      await Promise.all([
        queryClient
          .from("reports")
          .select(
            "id, project_id, title, report_type, reporting_period_label, summary, uploaded_at, uploaded_by, client_visible",
          )
          .eq("id", reportId)
          .eq("project_id", projectId)
          .maybeSingle(),
        queryClient
          .from("report_sections")
          .select("id, report_id, section_title, body, sort_order")
          .order("sort_order", { ascending: true }),
        queryClient
          .from("report_attachments")
          .select("report_id, file_id")
          .eq("report_id", reportId),
      ]);

    if (!report) {
      return null;
    }

    const uploaderMap = await this.getProfileMap([report.uploaded_by]);
    const attachmentIds = (reportAttachments || []).map(
      (attachment: any) => attachment.file_id,
    );
    const attachmentRows = attachmentIds.length
      ? (
          await queryClient
            .from("files")
            .select(
              "id, project_id, category_code, name, description, uploaded_at, uploaded_by, size_bytes, mime_type, storage_bucket, storage_path, client_visible",
            )
            .in("id", attachmentIds)
            .order("uploaded_at", { ascending: false })
        ).data || []
      : [];

    return {
      id: report.id,
      projectId: report.project_id,
      title: report.title,
      type: report.report_type,
      reportingPeriodLabel: report.reporting_period_label,
      summary: report.summary,
      uploadedAt: report.uploaded_at,
      uploadedBy:
        uploaderMap.get(report.uploaded_by)?.full_name || "HomeTrust Africa",
      attachmentsCount: attachmentIds.length,
      mediaCount: 0,
      sections: ((sections || []) as ReportSectionRow[])
        .filter((section) => section.report_id === report.id)
        .map((section) => ({
          id: section.id,
          title: section.section_title,
          body: section.body,
        })),
      attachments: await this.buildFileItems(
        (attachmentRows || []) as FileRow[],
      ),
    };
  }

  async getProjectFiles(
    session: DashboardSession,
    projectId: string,
    filters?: Record<string, string | undefined>,
  ): Promise<FileItem[]> {
    const { queryClient } = await this.getClients(session);
    let query = queryClient
      .from("files")
      .select(
        "id, project_id, category_code, name, description, uploaded_at, uploaded_by, size_bytes, mime_type, storage_bucket, storage_path, client_visible",
      )
      .eq("project_id", projectId)
      .order("uploaded_at", { ascending: false });

    if (filters?.category) {
      query = query.eq("category_code", filters.category);
    }

    const { data } = await query;
    let rows = (data || []) as FileRow[];
    if (filters?.uploadedBy) {
      const uploaderMap = await this.getProfileMap(
        rows.map((file) => file.uploaded_by),
      );
      rows = rows.filter((file) =>
        (uploaderMap.get(file.uploaded_by)?.full_name || "HomeTrust Africa")
          .toLowerCase()
          .includes(filters.uploadedBy!.toLowerCase()),
      );
    }

    return this.buildFileItems(rows);
  }

  async getProjectBudget(
    session: DashboardSession,
    projectId: string,
  ): Promise<ProjectBudget | null> {
    const { queryClient } = await this.getClients(session);
    const [
      { data: budget },
      { data: categories },
      { data: transactions },
      { data: receipts },
      { data: approvals },
    ] = await Promise.all([
      queryClient
        .from("project_budgets")
        .select("id, project_id, currency_code, allocated_amount, spent_amount")
        .eq("project_id", projectId)
        .maybeSingle(),
      queryClient
        .from("budget_categories")
        .select(
          "id, budget_id, label, allocated_amount, spent_amount, sort_order",
        )
        .order("sort_order", { ascending: true }),
      queryClient
        .from("transactions")
        .select(
          "id, project_id, budget_category_id, description, amount, currency_code, status, occurred_at",
        )
        .eq("project_id", projectId)
        .order("occurred_at", { ascending: false }),
      queryClient
        .from("transaction_receipts")
        .select("transaction_id, receipt_id"),
      queryClient
        .from("approval_requests")
        .select("id, status")
        .eq("project_id", projectId)
        .eq("status", "pending"),
    ]);

    if (!budget) {
      return null;
    }

    const categoryRows = (categories || []).filter(
      (item: any) => item.budget_id === budget.id,
    );

    return {
      projectId,
      currency: budget.currency_code,
      allocated: Number(budget.allocated_amount),
      spent: Number(budget.spent_amount),
      remaining: Number(budget.allocated_amount) - Number(budget.spent_amount),
      pendingApprovalsCount: (approvals || []).length,
      categories: categoryRows.map((category: any) => ({
        label: category.label,
        allocated: Number(category.allocated_amount),
        spent: Number(category.spent_amount),
      })),
      transactions: (transactions || []).map((transaction: any) => ({
        id: transaction.id,
        projectId: transaction.project_id,
        description: transaction.description,
        category:
          categoryRows.find(
            (category: any) => category.id === transaction.budget_category_id,
          )?.label || "General",
        amount: Number(transaction.amount),
        status: transaction.status,
        occurredAt:
          formatDateLabel(transaction.occurred_at) || transaction.occurred_at,
        receiptFileId:
          (receipts || []).find(
            (receipt: any) => receipt.transaction_id === transaction.id,
          )?.receipt_id || null,
      })),
    };
  }

  async getProjectApprovals(
    session: DashboardSession,
    projectId: string,
  ): Promise<ApprovalItem[]> {
    const { queryClient } = await this.getClients(session);
    const [{ data: approvals }, { data: approvalRequests }] = await Promise.all(
      [
        queryClient
          .from("approvals")
          .select(
            "id, project_id, title, description, status, requested_by, requested_from_user_id, due_at",
          )
          .eq("project_id", projectId)
          .order("due_at", { ascending: true }),
        queryClient
          .from("approval_requests")
          .select("approval_id, amount, currency_code")
          .eq("project_id", projectId),
      ],
    );

    const requestByApproval = new Map(
      (approvalRequests || []).map((row: any) => [row.approval_id, row]),
    );
    const profileMap = await this.getProfileMap(
      (approvals || []).map((approval: any) => approval.requested_by),
    );

    return (approvals || []).map((approval: any) => ({
      id: approval.id,
      projectId: approval.project_id,
      title: approval.title,
      description: approval.description,
      status: approval.status,
      dueAt: approval.due_at,
      requestedBy:
        profileMap.get(approval.requested_by)?.full_name || "HomeTrust Africa",
      requestedFromUserId: approval.requested_from_user_id,
      amount: requestByApproval.get(approval.id)?.amount
        ? Number(requestByApproval.get(approval.id)?.amount)
        : null,
      currency: requestByApproval.get(approval.id)?.currency_code || null,
    }));
  }

  async getProjectTeam(
    session: DashboardSession,
    projectId: string,
  ): Promise<TeamMember[]> {
    const { queryClient } = await this.getClients(session);
    const { data } = await queryClient
      .from("project_contacts")
      .select(
        "id, project_id, full_name, role_label, email, phone, availability_note",
      )
      .eq("project_id", projectId)
      .eq("is_client_visible", true);

    return (data || []).map((contact: any) => ({
      id: contact.id,
      fullName: contact.full_name,
      roleLabel: contact.role_label,
      projectId: contact.project_id,
      email: contact.email,
      phone: contact.phone,
      availabilityNote: contact.availability_note,
    }));
  }

  async listConversations(
    session: DashboardSession,
    filters?: Record<string, string | undefined>,
  ): Promise<ConversationSummary[]> {
    const { queryClient } = await this.getClients(session);
    const [
      { data: conversations },
      { data: participants },
      { data: messages },
      { data: projects },
    ] = await Promise.all([
      queryClient
        .from("conversations")
        .select("id, project_id, subject, kind, updated_at")
        .order("updated_at", { ascending: false }),
      queryClient
        .from("conversation_participants")
        .select("conversation_id, user_id, last_read_at"),
      queryClient
        .from("messages")
        .select("id, conversation_id, body, sent_at")
        .order("sent_at", { ascending: false }),
      queryClient.from("projects").select("id, name"),
    ]);

    let rows = (conversations || []).map((conversation: any) => {
      const lastMessage = (messages || []).find(
        (message: any) => message.conversation_id === conversation.id,
      );
      const participant = (participants || []).find(
        (item: any) =>
          item.conversation_id === conversation.id &&
          item.user_id === session.userId,
      );
      const unreadCount = (messages || []).filter(
        (message: any) =>
          message.conversation_id === conversation.id &&
          (!participant?.last_read_at ||
            new Date(message.sent_at) > new Date(participant.last_read_at)),
      ).length;

      return {
        id: conversation.id,
        subject: conversation.subject,
        kind: conversation.kind,
        projectId: conversation.project_id,
        projectName:
          (projects || []).find(
            (project: any) => project.id === conversation.project_id,
          )?.name || null,
        unreadCount,
        lastMessagePreview: lastMessage?.body?.slice(0, 120) || null,
        lastMessageAt:
          formatDateLabel(lastMessage?.sent_at || conversation.updated_at) ||
          null,
      };
    });

    if (filters?.q) {
      const query = filters.q.toLowerCase();
      rows = rows.filter(
        (thread) =>
          thread.subject.toLowerCase().includes(query) ||
          (thread.projectName || "").toLowerCase().includes(query) ||
          (thread.lastMessagePreview || "").toLowerCase().includes(query),
      );
    }

    return rows;
  }

  async getConversation(
    session: DashboardSession,
    threadId: string,
  ): Promise<ConversationDetail | null> {
    const { queryClient } = await this.getClients(session);
    const [{ data: conversation }, { data: participants }, { data: messages }] =
      await Promise.all([
        queryClient
          .from("conversations")
          .select("id, project_id, subject, updated_at")
          .eq("id", threadId)
          .maybeSingle(),
        queryClient
          .from("conversation_participants")
          .select("conversation_id, user_id, last_read_at")
          .eq("conversation_id", threadId),
        queryClient
          .from("messages")
          .select("id, conversation_id, sender_user_id, body, sent_at")
          .eq("conversation_id", threadId)
          .order("sent_at", { ascending: true }),
      ]);

    if (!conversation) {
      return null;
    }

    await queryClient
      .from("conversation_participants")
      .update({ last_read_at: new Date().toISOString() })
      .match({
        conversation_id: threadId,
        user_id: session.userId,
      });

    const profileMap = await this.getProfileMap([
      ...(participants || []).map((participant: any) => participant.user_id),
      ...(messages || []).map((message: any) => message.sender_user_id),
    ]);
    const admin = createSupabaseAdminClient();
    const { data: roleRows } = await admin
      .from("user_roles")
      .select("user_id, role")
      .in("user_id", [
        ...new Set(
          (participants || []).map((participant: any) => participant.user_id),
        ),
      ]);

    const rolesByUser = new Map<string, string[]>();
    (roleRows || []).forEach((row: any) => {
      rolesByUser.set(row.user_id, [
        ...(rolesByUser.get(row.user_id) || []),
        row.role,
      ]);
    });

    const conversationSummaries = await this.listConversations(session);
    const summary = conversationSummaries.find((item) => item.id === threadId);

    return {
      id: conversation.id,
      subject: conversation.subject,
      projectId: conversation.project_id,
      projectName: summary?.projectName || null,
      unreadCount: summary?.unreadCount || 0,
      lastMessagePreview: summary?.lastMessagePreview || null,
      lastMessageAt: summary?.lastMessageAt || null,
      participants: (participants || []).map((participant: any) => ({
        id: participant.user_id,
        fullName:
          profileMap.get(participant.user_id)?.full_name || "HomeTrust Africa",
        roleLabel: pickPrimaryRole(
          rolesByUser.get(participant.user_id) || ["CLIENT"],
        ).replaceAll("_", " "),
      })),
      messages: (messages || []).map((message: any) => ({
        id: message.id,
        threadId: message.conversation_id,
        senderName:
          profileMap.get(message.sender_user_id)?.full_name ||
          "HomeTrust Africa",
        senderRoleLabel: pickPrimaryRole(
          rolesByUser.get(message.sender_user_id) || ["CLIENT"],
        ).replaceAll("_", " "),
        body: message.body,
        sentAt: formatDateLabel(message.sent_at) || message.sent_at,
        isOwnMessage: message.sender_user_id === session.userId,
      })),
    };
  }

  async listNotifications(
    session: DashboardSession,
    filters?: Record<string, string | undefined>,
  ): Promise<NotificationItem[]> {
    const { queryClient } = await this.getClients(session);
    const [{ data: notifications }, { data: reads }, { data: projects }] =
      await Promise.all([
        queryClient
          .from("notifications")
          .select(
            "id, user_id, project_id, type, title, body, href, created_at",
          )
          .eq("user_id", session.userId)
          .order("created_at", { ascending: false }),
        queryClient
          .from("notification_reads")
          .select("notification_id, read_at")
          .eq("user_id", session.userId),
        queryClient.from("projects").select("id, name"),
      ]);

    let rows = (notifications || []).map((notification: any) => ({
      id: notification.id,
      type: notification.type,
      title: notification.title,
      body: notification.body,
      createdAt: notification.created_at,
      readAt:
        (reads || []).find(
          (read: any) => read.notification_id === notification.id,
        )?.read_at || null,
      href: notification.href,
      projectName:
        (projects || []).find(
          (project: any) => project.id === notification.project_id,
        )?.name || null,
    }));

    if (filters?.type) {
      rows = rows.filter((notification) => notification.type === filters.type);
    }

    return rows;
  }

  async listSupportThreads(
    session: DashboardSession,
  ): Promise<SupportThreadSummary[]> {
    const { queryClient } = await this.getClients(session);
    const [{ data: threads }, { data: messages }, { data: projects }] =
      await Promise.all([
        queryClient
          .from("support_threads")
          .select("id, project_id, subject, priority, status, updated_at")
          .order("updated_at", { ascending: false }),
        queryClient
          .from("support_messages")
          .select("support_thread_id, body, created_at")
          .order("created_at", { ascending: false }),
        queryClient.from("projects").select("id, name"),
      ]);

    return (threads || []).map((thread: any) => {
      const latestMessage = (messages || []).find(
        (message: any) => message.support_thread_id === thread.id,
      );
      return {
        id: thread.id,
        subject: thread.subject,
        priority: thread.priority,
        status: thread.status,
        projectId: thread.project_id,
        projectName:
          (projects || []).find(
            (project: any) => project.id === thread.project_id,
          )?.name || null,
        updatedAt: thread.updated_at,
        lastMessagePreview: latestMessage?.body?.slice(0, 140) || null,
      };
    });
  }

  async getSupportThread(
    session: DashboardSession,
    threadId: string,
  ): Promise<SupportThreadDetail | null> {
    const { queryClient } = await this.getClients(session);
    const [{ data: thread }, { data: messages }] = await Promise.all([
      queryClient
        .from("support_threads")
        .select("id, project_id, subject, priority, status, updated_at")
        .eq("id", threadId)
        .maybeSingle(),
      queryClient
        .from("support_messages")
        .select("id, support_thread_id, sender_user_id, body, created_at")
        .eq("support_thread_id", threadId)
        .order("created_at", { ascending: true }),
    ]);

    if (!thread) {
      return null;
    }

    const [threads, projects, profileMap, roleRows] = await Promise.all([
      this.listSupportThreads(session),
      queryClient
        .from("projects")
        .select("id, name")
        .eq("id", thread.project_id)
        .maybeSingle(),
      this.getProfileMap(
        (messages || []).map((message: any) => message.sender_user_id),
      ),
      createSupabaseAdminClient()
        .from("user_roles")
        .select("user_id, role")
        .in("user_id", [
          ...new Set(
            (messages || []).map((message: any) => message.sender_user_id),
          ),
        ]),
    ]);

    const rolesByUser = new Map<string, string[]>();
    (roleRows.data || []).forEach((row: any) => {
      rolesByUser.set(row.user_id, [
        ...(rolesByUser.get(row.user_id) || []),
        row.role,
      ]);
    });

    const summary = threads.find((item) => item.id === threadId);

    return {
      id: thread.id,
      subject: thread.subject,
      priority: thread.priority,
      status: thread.status,
      projectId: thread.project_id,
      projectName: summary?.projectName || projects.data?.name || null,
      updatedAt: thread.updated_at,
      lastMessagePreview: summary?.lastMessagePreview || null,
      messages: (messages || []).map((message: any) => ({
        id: message.id,
        threadId: message.support_thread_id,
        senderName:
          profileMap.get(message.sender_user_id)?.full_name ||
          "HomeTrust Africa",
        senderRoleLabel: pickPrimaryRole(
          rolesByUser.get(message.sender_user_id) || ["CLIENT"],
        ).replaceAll("_", " "),
        body: message.body,
        sentAt: message.created_at,
        isOwnMessage: message.sender_user_id === session.userId,
      })),
    };
  }

  async getSettings(
    session: DashboardSession,
  ): Promise<DashboardSettings | null> {
    const user = await this.getCurrentUser(session);
    if (!user) {
      return null;
    }

    const { queryClient } = await this.getClients(session);
    const [
      { data: notificationPreferences },
      { data: profile },
      { data: userPreferences },
    ] = await Promise.all([
      queryClient
        .from("notification_preferences")
        .select(
          "email_reports, email_milestones, email_budget_alerts, email_messages, in_app_reports, in_app_milestones, in_app_budget_alerts, in_app_messages",
        )
        .eq("user_id", session.userId)
        .maybeSingle(),
      queryClient
        .from("profiles")
        .select("last_sign_in_at, two_factor_enabled")
        .eq("id", session.userId)
        .maybeSingle(),
      queryClient
        .from("user_preferences")
        .select("timezone, currency_code, density")
        .eq("user_id", session.userId)
        .maybeSingle(),
    ]);

    return {
      profile: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || "",
        country: user.country || "",
        preferredContactMethod: user.preferredContactMethod || "email",
      },
      security: {
        hasTwoFactorEnabled: Boolean(profile?.two_factor_enabled),
        activeSessionsCount: 1,
        lastSignInAt: formatDateLabel(profile?.last_sign_in_at),
      },
      notifications: {
        emailReports: notificationPreferences?.email_reports ?? true,
        emailMilestones: notificationPreferences?.email_milestones ?? true,
        emailBudgetAlerts: notificationPreferences?.email_budget_alerts ?? true,
        emailMessages: notificationPreferences?.email_messages ?? true,
        inAppReports: notificationPreferences?.in_app_reports ?? true,
        inAppMilestones: notificationPreferences?.in_app_milestones ?? true,
        inAppBudgetAlerts:
          notificationPreferences?.in_app_budget_alerts ?? true,
        inAppMessages: notificationPreferences?.in_app_messages ?? true,
      },
      preferences: {
        timezone: userPreferences?.timezone || user.timezone || "UTC",
        currency: userPreferences?.currency_code || user.currency || "USD",
        density: userPreferences?.density || "comfortable",
      },
    };
  }

  async updateProfile(
    session: DashboardSession,
    input: ProfileSettingsInput,
  ): Promise<void> {
    const { queryClient, admin } = await this.getClients(session);
    const { error: profileError } = await queryClient
      .from("profiles")
      .update({
        full_name: input.fullName,
        email: input.email,
        phone: input.phone,
        diaspora_country: input.country,
        preferred_contact_method: input.preferredContactMethod,
      })
      .eq("id", session.userId);

    if (profileError) {
      throw new Error(profileError.message);
    }

    if (session.email !== input.email) {
      if (session.authSource === "supabase") {
        const { error } = await queryClient.auth.updateUser({
          email: input.email,
          data: { full_name: input.fullName },
        });
        if (error) {
          throw new Error(error.message);
        }
      } else {
        const { error } = await admin.auth.admin.updateUserById(
          session.userId,
          {
            email: input.email,
            user_metadata: { full_name: input.fullName },
          },
        );
        if (error) {
          throw new Error(error.message);
        }
      }
    }
  }

  async updateSecurity(
    session: DashboardSession,
    input: SecuritySettingsInput,
  ): Promise<void> {
    const verifier = await getAnonPasswordVerifier();
    const { error: verifyError } = await verifier.auth.signInWithPassword({
      email: session.email,
      password: input.currentPassword,
    });
    if (verifyError) {
      throw new Error("Current password is incorrect.");
    }

    if (session.authSource === "supabase") {
      const client = await createSupabaseServerClient();
      const { error } = await client.auth.updateUser({
        password: input.newPassword,
      });
      if (error) {
        throw new Error(error.message);
      }
      return;
    }

    const admin = createSupabaseAdminClient();
    const { error } = await admin.auth.admin.updateUserById(session.userId, {
      password: input.newPassword,
    });
    if (error) {
      throw new Error(error.message);
    }
  }

  async updateNotifications(
    session: DashboardSession,
    input: NotificationSettingsInput,
  ): Promise<void> {
    const { queryClient } = await this.getClients(session);
    const { error } = await queryClient.from("notification_preferences").upsert(
      {
        user_id: session.userId,
        email_reports: input.emailReports,
        email_milestones: input.emailMilestones,
        email_budget_alerts: input.emailBudgetAlerts,
        email_messages: input.emailMessages,
        in_app_reports: input.inAppReports,
        in_app_milestones: input.inAppMilestones,
        in_app_budget_alerts: input.inAppBudgetAlerts,
        in_app_messages: input.inAppMessages,
      },
      { onConflict: "user_id" },
    );
    if (error) {
      throw new Error(error.message);
    }
  }

  async updatePreferences(
    session: DashboardSession,
    input: PreferenceSettingsInput,
  ): Promise<void> {
    const { queryClient } = await this.getClients(session);
    const { error } = await queryClient.from("user_preferences").upsert(
      {
        user_id: session.userId,
        timezone: input.timezone,
        currency_code: input.currency,
        density: input.density,
      },
      { onConflict: "user_id" },
    );
    if (error) {
      throw new Error(error.message);
    }
  }

  async sendMessage(
    session: DashboardSession,
    input: SendMessageInput,
  ): Promise<void> {
    const { queryClient, admin } = await this.getClients(session);
    const [{ error: messageError }, { data: participants }] = await Promise.all(
      [
        queryClient.from("messages").insert({
          conversation_id: input.threadId,
          sender_user_id: session.userId,
          body: input.body,
        }),
        queryClient
          .from("conversation_participants")
          .select("user_id")
          .eq("conversation_id", input.threadId),
      ],
    );

    if (messageError) {
      throw new Error(messageError.message);
    }

    await queryClient
      .from("conversation_participants")
      .update({ last_read_at: new Date().toISOString() })
      .match({
        conversation_id: input.threadId,
        user_id: session.userId,
      });

    const { data: conversation } = await queryClient
      .from("conversations")
      .select("project_id, subject")
      .eq("id", input.threadId)
      .maybeSingle();

    const otherParticipants = (participants || []).filter(
      (participant: any) => participant.user_id !== session.userId,
    );
    if (otherParticipants.length) {
      await (admin.from("notifications" as never) as any).insert(
        otherParticipants.map((participant: any) => ({
          user_id: participant.user_id,
          project_id: conversation?.project_id || null,
          type: "new_message",
          title: `New message in ${conversation?.subject || "conversation"}`,
          body: input.body.slice(0, 140),
          href: `/dashboard/inbox/${input.threadId}`,
        })),
      );
    }
  }

  async resolveApproval(
    session: DashboardSession,
    input: ApprovalDecisionInput,
  ): Promise<void> {
    const { queryClient, admin } = await this.getClients(session);
    const { data: approval } = await queryClient
      .from("approvals")
      .select("id, project_id, title, requested_from_user_id, status")
      .eq("id", input.approvalId)
      .maybeSingle();

    if (!approval) {
      throw new Error("Approval could not be found.");
    }
    if (
      approval.requested_from_user_id &&
      approval.requested_from_user_id !== session.userId &&
      !["ADMIN", "OPERATIONS_MANAGER"].includes(session.role)
    ) {
      throw new Error("You are not authorized to resolve this approval.");
    }

    const timestamp = new Date().toISOString();
    const { error } = await (admin.from("approvals" as never) as any)
      .update({
        status: input.decision,
        approved_at: input.decision === "approved" ? timestamp : null,
        resolved_by: session.userId,
        resolution_note: input.note || null,
        updated_at: timestamp,
      })
      .eq("id", input.approvalId);
    if (error) {
      throw new Error(error.message);
    }

    await (admin.from("approval_requests" as never) as any)
      .update({ status: input.decision, updated_at: timestamp })
      .eq("approval_id", input.approvalId);

    await (admin.from("timeline_events" as never) as any).insert({
      project_id: approval.project_id,
      event_type: "approval",
      title: `${approval.title} ${input.decision === "approved" ? "approved" : "rejected"}`,
      summary:
        input.note || `Approval was ${input.decision} by ${session.name}.`,
      actor_user_id: session.userId,
      client_visible: true,
      related_table: "approvals",
      related_record_id: approval.id,
      occurred_at: timestamp,
    });
  }

  async markNotificationsRead(
    session: DashboardSession,
    notificationIds: string[],
  ): Promise<void> {
    const { queryClient } = await this.getClients(session);
    const { error } = await queryClient.from("notification_reads").upsert(
      notificationIds.map((notificationId) => ({
        notification_id: notificationId,
        user_id: session.userId,
        read_at: new Date().toISOString(),
      })),
      { onConflict: "notification_id,user_id" },
    );
    if (error) {
      throw new Error(error.message);
    }
  }

  async requestSupport(
    session: DashboardSession,
    input: SupportRequestInput,
  ): Promise<{ threadId: string }> {
    const { queryClient, admin } = await this.getClients(session);
    const { data: membership } = await queryClient
      .from("client_account_members")
      .select("client_account_id")
      .eq("user_id", session.userId)
      .limit(1)
      .maybeSingle();

    const { data: thread, error } = await queryClient
      .from("support_threads")
      .insert({
        client_account_id: membership?.client_account_id || null,
        subject: input.subject,
        priority: input.urgency,
        status: "open",
        created_by: session.userId,
      })
      .select("id")
      .single();

    if (error || !thread) {
      throw new Error(error?.message || "Unable to create support thread.");
    }

    await queryClient.from("support_messages").insert({
      support_thread_id: thread.id,
      sender_user_id: session.userId,
      body: input.details,
    });

    const { data: adminUsers } = await admin
      .from("user_roles")
      .select("user_id")
      .in("role", ["ADMIN", "OPERATIONS_MANAGER"]);
    if (adminUsers?.length) {
      await (admin.from("notifications" as never) as any).insert(
        adminUsers.map((row: any) => ({
          user_id: row.user_id,
          type: "security",
          title: `New ${input.urgency} support request`,
          body: input.subject,
          href: "/dashboard/support",
        })),
      );
    }

    return { threadId: thread.id };
  }

  async replySupportThread(
    session: DashboardSession,
    input: SupportReplyInput,
  ): Promise<void> {
    const { queryClient, admin } = await this.getClients(session);
    const { data: thread } = await queryClient
      .from("support_threads")
      .select("id, project_id, subject")
      .eq("id", input.threadId)
      .maybeSingle();

    if (!thread) {
      throw new Error("Support thread could not be found.");
    }

    const { error } = await queryClient.from("support_messages").insert({
      support_thread_id: input.threadId,
      sender_user_id: session.userId,
      body: input.body,
    });
    if (error) {
      throw new Error(error.message);
    }

    await queryClient
      .from("support_threads")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", input.threadId);

    if (session.role === "CLIENT") {
      const { data: adminUsers } = await admin
        .from("user_roles")
        .select("user_id")
        .in("role", ["ADMIN", "OPERATIONS_MANAGER"]);
      if (adminUsers?.length) {
        await (admin.from("notifications" as never) as any).insert(
          adminUsers.map((row: any) => ({
            user_id: row.user_id,
            project_id: thread.project_id || null,
            type: "new_message",
            title: `Support reply in ${thread.subject}`,
            body: input.body.slice(0, 140),
            href: `/dashboard/support/${input.threadId}`,
          })),
        );
      }
    }
  }
}

export function createSupabaseDashboardRepository() {
  return new SupabaseDashboardRepository();
}
