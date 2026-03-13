import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

const dashboardPrefix = "/dashboard";
const authRoutes = new Set(["/login", "/accept-invite", "/reset-password"]);

function buildLoginRedirect(request: NextRequest) {
  const next = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const url = new URL("/login", request.url);
  if (next && next !== "/login") {
    url.searchParams.set("next", next);
  }
  return url;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, user } = await updateSupabaseSession(request);

  if (pathname.startsWith(dashboardPrefix) && !user) {
    return NextResponse.redirect(buildLoginRedirect(request));
  }

  if (authRoutes.has(pathname) && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/accept-invite", "/reset-password"],
};
