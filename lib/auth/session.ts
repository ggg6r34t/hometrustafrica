import crypto from "node:crypto";
import { redirect } from "next/navigation";
import type { DashboardSession } from "@/lib/dashboard/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseEnv, hasSupabaseAdminEnv, hasSupabaseBrowserEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const SESSION_COOKIE_NAME = "hometrust_portal_session";

function getSessionSecret() {
  return process.env.DASHBOARD_SESSION_SECRET || process.env.AUTH_SECRET || "";
}

function timingSafeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

function signPayload(payload: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
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

function resolvePrimaryRole(roles: Array<{ role: string }>) {
  return [...roles]
    .sort((left, right) => rolePriority(right.role) - rolePriority(left.role))[0]
    ?.role as DashboardSession["role"] | undefined;
}

export function encodeDashboardSession(session: DashboardSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

export function decodeDashboardSession(rawCookieValue: string): DashboardSession | null {
  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }

  const [payload, signature] = rawCookieValue.split(".");
  if (!payload || !signature) {
    return null;
  }

  if (!timingSafeEqual(signature, signPayload(payload))) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as DashboardSession;
    if (!parsed.userId || !parsed.role || !parsed.email || !parsed.name || !parsed.expiresAt) {
      return null;
    }

    if (new Date(parsed.expiresAt).getTime() <= Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

async function getSupabaseBackedDashboardSession(): Promise<DashboardSession | null> {
  if (!hasSupabaseBrowserEnv()) {
    return null;
  }

  const client = await createSupabaseServerClient();
  const [{ data: authUserResult }, { data: sessionResult }] = await Promise.all([
    client.auth.getUser(),
    client.auth.getSession(),
  ]);

  const user = authUserResult.user;
  if (!user) {
    return null;
  }

  const [{ data: profile }, { data: roles }] = await Promise.all([
    client.from("profiles").select("id, full_name, email").eq("id", user.id).maybeSingle(),
    client.from("user_roles").select("role").eq("user_id", user.id),
  ]);

  const primaryRole = resolvePrimaryRole(roles || []);

  return {
    userId: user.id,
    role: primaryRole || "CLIENT",
    email: profile?.email || user.email || "",
    name: profile?.full_name || (typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : user.email || "HomeTrust User"),
    expiresAt: sessionResult.session?.expires_at
      ? new Date(sessionResult.session.expires_at * 1000).toISOString()
      : new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    authSource: "supabase",
  };
}

async function getDevelopmentOverrideSession(): Promise<DashboardSession | null> {
  const env = getSupabaseEnv();
  if (
    process.env.NODE_ENV === "production" ||
    !env.allowDevImpersonation ||
    !env.devUserEmail ||
    !hasSupabaseAdminEnv()
  ) {
    return null;
  }

  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("profiles")
    .select("id, full_name, email")
    .eq("email", env.devUserEmail)
    .maybeSingle();
  const profile = data as { id: string; full_name: string; email: string } | null;

  if (!profile) {
    return null;
  }

  const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", profile.id);

  return {
    userId: profile.id,
    role: resolvePrimaryRole(roles || []) || "CLIENT",
    email: profile.email,
    name: profile.full_name,
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    authSource: "development_override",
  };
}

async function getLegacyCookieSession(): Promise<DashboardSession | null> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const decoded = raw ? decodeDashboardSession(raw) : null;
  return decoded ? { ...decoded, authSource: "legacy_cookie" } : null;
}

export async function getDashboardSession() {
  return (
    (await getSupabaseBackedDashboardSession()) ||
    (await getDevelopmentOverrideSession()) ||
    (await getLegacyCookieSession())
  );
}

export async function requireDashboardSession() {
  const session = await getDashboardSession();
  if (!session) {
    redirect("/contact?intent=client-portal-access");
  }

  return session;
}
