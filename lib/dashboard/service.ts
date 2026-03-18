import { createDashboardRepository } from "@/lib/dashboard/repository";
import type { DashboardSession } from "@/lib/dashboard/types";

const repository = createDashboardRepository();

export const dashboardService = {
  getRepositoryState() {
    return repository.getState();
  },
  getCurrentUser(session: DashboardSession) {
    return repository.getCurrentUser(session);
  },
  getOverview(session: DashboardSession) {
    return repository.getOverview(session);
  },
  listProjects(
    session: DashboardSession,
    filters?: Record<string, string | undefined>,
  ) {
    return repository.listProjects(session, filters);
  },
  getProjectById(session: DashboardSession, projectId: string) {
    return repository.getProjectById(session, projectId);
  },
  getProjectTimeline(session: DashboardSession, projectId: string) {
    return repository.getProjectTimeline(session, projectId);
  },
  getProjectReports(
    session: DashboardSession,
    projectId: string,
    filters?: Record<string, string | undefined>,
  ) {
    return repository.getProjectReports(session, projectId, filters);
  },
  getProjectReportById(
    session: DashboardSession,
    projectId: string,
    reportId: string,
  ) {
    return repository.getProjectReportById(session, projectId, reportId);
  },
  getProjectFiles(
    session: DashboardSession,
    projectId: string,
    filters?: Record<string, string | undefined>,
  ) {
    return repository.getProjectFiles(session, projectId, filters);
  },
  getProjectBudget(session: DashboardSession, projectId: string) {
    return repository.getProjectBudget(session, projectId);
  },
  getProjectApprovals(session: DashboardSession, projectId: string) {
    return repository.getProjectApprovals(session, projectId);
  },
  getProjectTeam(session: DashboardSession, projectId: string) {
    return repository.getProjectTeam(session, projectId);
  },
  listConversations(
    session: DashboardSession,
    filters?: Record<string, string | undefined>,
  ) {
    return repository.listConversations(session, filters);
  },
  getConversation(session: DashboardSession, threadId: string) {
    return repository.getConversation(session, threadId);
  },
  listNotifications(
    session: DashboardSession,
    filters?: Record<string, string | undefined>,
  ) {
    return repository.listNotifications(session, filters);
  },
  listSupportThreads(session: DashboardSession) {
    return repository.listSupportThreads(session);
  },
  getSupportThread(session: DashboardSession, threadId: string) {
    return repository.getSupportThread(session, threadId);
  },
  getSettings(session: DashboardSession) {
    return repository.getSettings(session);
  },
  updateProfile: repository.updateProfile.bind(repository),
  updateSecurity: repository.updateSecurity.bind(repository),
  updateNotifications: repository.updateNotifications.bind(repository),
  updatePreferences: repository.updatePreferences.bind(repository),
  sendMessage: repository.sendMessage.bind(repository),
  resolveApproval: repository.resolveApproval.bind(repository),
  markNotificationsRead: repository.markNotificationsRead.bind(repository),
  requestSupport: repository.requestSupport.bind(repository),
  replySupportThread: repository.replySupportThread.bind(repository),
};
