export function getSupabaseEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    devUserEmail: process.env.DASHBOARD_DEV_USER_EMAIL || "",
    allowDevImpersonation:
      process.env.DASHBOARD_ALLOW_DEV_IMPERSONATION === "true",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    resendApiKey: process.env.RESEND_API_KEY || "",
    fromEmail: process.env.FROM_EMAIL || "",
    resendNewsletterAudienceId: process.env.RESEND_NEWSLETTER_AUDIENCE_ID || "",
    resendNewsletterAudienceName:
      process.env.RESEND_NEWSLETTER_AUDIENCE_NAME || "",
    supportEmail: process.env.CONTACT_EMAIL || "",
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
