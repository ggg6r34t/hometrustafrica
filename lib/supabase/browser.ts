import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const env = getSupabaseEnv();
  if (!env.url || !env.anonKey) {
    throw new Error("Supabase browser environment variables are not configured.");
  }

  browserClient = createBrowserClient(env.url, env.anonKey);
  return browserClient;
}
