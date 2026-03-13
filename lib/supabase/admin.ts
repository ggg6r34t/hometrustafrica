import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

let adminClient: ReturnType<typeof createClient> | null = null;

export function createSupabaseAdminClient() {
  if (adminClient) {
    return adminClient;
  }

  const env = getSupabaseEnv();
  if (!env.url || !env.serviceRoleKey) {
    throw new Error("Supabase service role environment variables are not configured.");
  }

  adminClient = createClient(env.url, env.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return adminClient;
}
