import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/supabase/env";

export async function createSupabaseServerClient() {
  const env = getSupabaseEnv();
  if (!env.url || !env.anonKey) {
    throw new Error("Supabase browser environment variables are not configured.");
  }

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components may attempt cookie writes during render.
          // Supabase recommends swallowing these and relying on middleware/actions.
        }
      },
    },
  });
}
