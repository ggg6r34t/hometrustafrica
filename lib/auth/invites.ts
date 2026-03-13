import crypto from "node:crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseEnv } from "@/lib/supabase/env";

export interface InviteEmailPayload {
  id: string;
  email: string;
  fullName: string;
  role: "CLIENT" | "TEAM_MEMBER" | "OPERATIONS_MANAGER" | "ADMIN";
  acceptUrl: string;
  invitedByName: string;
  expiresAt: string;
}

export interface PublicInviteDetails {
  id: string;
  email: string;
  fullName: string;
  role: string;
  expiresAt: string;
  acceptedAt: string | null;
  revokedAt: string | null;
}

export function hashInviteToken(rawToken: string) {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

export function createInviteToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export async function getInviteByToken(rawToken: string): Promise<PublicInviteDetails | null> {
  const admin = createSupabaseAdminClient();
  const { data } = await (admin.from("portal_invites" as never) as any)
    .select("id, invited_email, invited_name, invited_role, expires_at, accepted_at, revoked_at")
    .eq("token_hash", hashInviteToken(rawToken))
    .maybeSingle();

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    email: data.invited_email,
    fullName: data.invited_name,
    role: data.invited_role,
    expiresAt: data.expires_at,
    acceptedAt: data.accepted_at,
    revokedAt: data.revoked_at,
  };
}

export function buildInviteUrl(token: string) {
  const env = getSupabaseEnv();
  const url = new URL("/accept-invite", env.siteUrl);
  url.searchParams.set("token", token);
  return url.toString();
}
