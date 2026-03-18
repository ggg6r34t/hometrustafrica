import type { DashboardRole } from "@/lib/dashboard/types";

export function dashboardRolePriority(role: DashboardRole | string) {
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

export function isPrivilegedDashboardRole(role: DashboardRole) {
  return role === "ADMIN" || role === "OPERATIONS_MANAGER";
}
