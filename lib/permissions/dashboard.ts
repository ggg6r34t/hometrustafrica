import type { DashboardRole, DashboardSession, ProjectAssignment, ProjectSummary } from "@/lib/dashboard/types";

const elevatedRoles: DashboardRole[] = ["ADMIN", "OPERATIONS_MANAGER"];

export function isElevatedRole(role: DashboardRole) {
  return elevatedRoles.includes(role);
}

export function canAccessProject(
  session: DashboardSession,
  project: Pick<ProjectSummary, "assignments">,
) {
  if (isElevatedRole(session.role)) {
    return true;
  }

  return project.assignments.some(
    (assignment: ProjectAssignment) =>
      assignment.userId === session.userId && assignment.role === session.role,
  );
}

export function canWriteProject(session: DashboardSession, project: Pick<ProjectSummary, "assignments">) {
  if (isElevatedRole(session.role)) {
    return true;
  }

  return project.assignments.some(
    (assignment) => assignment.userId === session.userId && assignment.role === "TEAM_MEMBER",
  );
}

export function canManageOwnSettings(session: DashboardSession, userId: string) {
  return session.userId === userId || isElevatedRole(session.role);
}
