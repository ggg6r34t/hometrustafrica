import { redirect } from "next/navigation";
import type { DashboardSession } from "@/lib/dashboard/types";
import { dashboardRolePriority } from "@/lib/dashboard/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  getSupabaseEnv,
  hasSupabaseAdminEnv,
  hasSupabaseBrowserEnv,
} from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function resolvePrimaryRole(roles: Array<{ role: string }>) {
  return [...roles].sort(
    (left, right) =>
      dashboardRolePriority(right.role) - dashboardRolePriority(left.role),
  )[0]?.role as DashboardSession["role"] | undefined;
}

async function getSupabaseBackedDashboardSession(): Promise<DashboardSession | null> {
  if (!hasSupabaseBrowserEnv()) {
    return null;
  }

  const client = await createSupabaseServerClient();
  const [{ data: authUserResult }, { data: sessionResult }] = await Promise.all(
    [client.auth.getUser(), client.auth.getSession()],
  );

  const user = authUserResult.user;
  if (!user) {
    return null;
  }

  const [{ data: profile }, { data: roles }] = await Promise.all([
    client
      .from("profiles")
      .select("id, full_name, email")
      .eq("id", user.id)
      .maybeSingle(),
    client.from("user_roles").select("role").eq("user_id", user.id),
  ]);

  const primaryRole = resolvePrimaryRole(roles || []);

  return {
    userId: user.id,
    role: primaryRole || "CLIENT",
    email: profile?.email || user.email || "",
    name:
      profile?.full_name ||
      (typeof user.user_metadata.full_name === "string"
        ? user.user_metadata.full_name
        : user.email || "HomeTrust User"),
    expiresAt: sessionResult.session?.expires_at
      ? new Date(sessionResult.session.expires_at * 1000).toISOString()
      : new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    authSource: "supabase",
  };
}

async function getDevelopmentOverrideSession(): Promise<DashboardSession | null> {
  const env = getSupabaseEnv();
  if (
    process.env.NODE_ENV !== "development" ||
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
  const profile = data as {
    id: string;
    full_name: string;
    email: string;
  } | null;

  if (!profile) {
    return null;
  }

  const { data: roles } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", profile.id);

  return {
    userId: profile.id,
    role: resolvePrimaryRole(roles || []) || "CLIENT",
    email: profile.email,
    name: profile.full_name,
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    authSource: "development_override",
  };
}

export async function getDashboardSession() {
  return (
    (await getSupabaseBackedDashboardSession()) ||
    (await getDevelopmentOverrideSession())
  );
}

export function getDashboardHomePath() {
  return "/dashboard";
}

export async function requireDashboardSession() {
  const session = await getDashboardSession();
  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function requireDashboardRoles(roles: DashboardSession["role"][]) {
  const session = await requireDashboardSession();

  if (!roles.includes(session.role)) {
    redirect("/dashboard");
  }

  return session;
}
