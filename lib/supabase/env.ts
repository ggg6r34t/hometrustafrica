export function getSupabaseEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    devUserEmail: process.env.DASHBOARD_DEV_USER_EMAIL || "",
    allowDevImpersonation: process.env.DASHBOARD_ALLOW_DEV_IMPERSONATION === "true",
  };
}

export function hasSupabaseBrowserEnv() {
  const env = getSupabaseEnv();
  return Boolean(env.url && env.anonKey);
}

export function hasSupabaseAdminEnv() {
  const env = getSupabaseEnv();
  return Boolean(env.url && env.serviceRoleKey);
}
