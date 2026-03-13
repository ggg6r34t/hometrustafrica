import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { DashboardSession } from "@/lib/dashboard/types";

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

export async function getDashboardSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return raw ? decodeDashboardSession(raw) : null;
}

export async function requireDashboardSession() {
  const session = await getDashboardSession();
  if (!session) {
    redirect("/contact?intent=client-portal-access");
  }

  return session;
}
