import type { DashboardSession } from "@/lib/dashboard/types";

export interface AuditEventInput {
  action: string;
  targetType: string;
  targetId?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
}

export async function recordAuditEvent(session: DashboardSession, event: AuditEventInput) {
  const payload = {
    actorUserId: session.userId,
    actorRole: session.role,
    occurredAt: new Date().toISOString(),
    ...event,
  };

  console.info("[dashboard-audit]", JSON.stringify(payload));
}
