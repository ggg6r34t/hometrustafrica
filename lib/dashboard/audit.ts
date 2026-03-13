import type { DashboardSession } from "@/lib/dashboard/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";

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

  if (hasSupabaseAdminEnv()) {
    try {
      const admin = createSupabaseAdminClient();
      await (admin.from("audit_logs" as never) as any).insert({
        actor_user_id: session.userId,
        actor_role: session.role,
        action: event.action,
        target_type: event.targetType,
        target_id: event.targetId || null,
        metadata: event.metadata || {},
        created_at: payload.occurredAt,
      });
    } catch {
      // Preserve the user flow even if audit persistence is temporarily unavailable.
    }
  }

  console.info("[dashboard-audit]", JSON.stringify(payload));
}
