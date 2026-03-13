import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const client = await createSupabaseServerClient();
  await client.auth.signOut();
  return NextResponse.redirect(new URL("/login", request.url));
}
