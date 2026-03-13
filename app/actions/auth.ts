"use server";

import { redirect } from "next/navigation";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { PortalInviteEmail } from "@/emails/portal-invite";
import { recordAuditEvent } from "@/lib/dashboard/audit";
import { createInviteToken, hashInviteToken } from "@/lib/auth/invites";
import { getDashboardHomePath, requireDashboardSession } from "@/lib/auth/session";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseEnv, hasSupabaseAdminEnv, hasSupabaseBrowserEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  acceptInviteSchema,
  loginSchema,
  passwordResetRequestSchema,
} from "@/lib/validators/auth";

export interface AuthActionState {
  status: "idle" | "success" | "error";
  message?: string;
}

const idleState: AuthActionState = { status: "idle" };

function normalizeNext(nextValue?: string | null) {
  if (!nextValue || !nextValue.startsWith("/")) {
    return getDashboardHomePath();
  }
  return nextValue;
}

export async function loginAction(
  _previousState: AuthActionState = idleState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message || "Invalid sign-in details." };
  }

  try {
    const client = await createSupabaseServerClient();
    const { error } = await client.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    if (error) {
      return { status: "error", message: "Email or password is incorrect." };
    }
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Unable to sign in." };
  }

  redirect(normalizeNext(parsed.data.next));
}

export async function requestPasswordResetAction(
  _previousState: AuthActionState = idleState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = passwordResetRequestSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message || "Enter a valid email address." };
  }

  try {
    const client = await createSupabaseServerClient();
    const env = getSupabaseEnv();
    const { error } = await client.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${env.siteUrl}/reset-password`,
    });
    if (error) {
      throw error;
    }

    return {
      status: "success",
      message: "If that email is active in the portal, a reset link has been sent.",
    };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Unable to send reset email." };
  }
}

export async function acceptInviteAction(
  _previousState: AuthActionState = idleState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = acceptInviteSchema.safeParse({
    token: formData.get("token"),
    fullName: formData.get("fullName"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message || "Invite details are invalid." };
  }

  try {
    const admin = createSupabaseAdminClient();
    const { data: invite } = await (admin.from("portal_invites" as never) as any)
      .select("id, auth_user_id, invited_email, expires_at, accepted_at, revoked_at")
      .eq("token_hash", hashInviteToken(parsed.data.token))
      .maybeSingle();

    if (!invite) {
      return { status: "error", message: "This invite link is invalid." };
    }
    if (invite.accepted_at) {
      return { status: "error", message: "This invite has already been used." };
    }
    if (invite.revoked_at) {
      return { status: "error", message: "This invite has been revoked." };
    }
    if (new Date(invite.expires_at).getTime() <= Date.now()) {
      return { status: "error", message: "This invite has expired." };
    }
    if (!invite.auth_user_id) {
      return { status: "error", message: "This invite is not linked to a portal user yet." };
    }

    const { error: updateUserError } = await admin.auth.admin.updateUserById(invite.auth_user_id, {
      password: parsed.data.password,
      email_confirm: true,
      user_metadata: {
        full_name: parsed.data.fullName,
      },
    });
    if (updateUserError) {
      throw updateUserError;
    }

    const { error: profileError } = await (admin.from("profiles" as never) as any)
      .update({ full_name: parsed.data.fullName, email: invite.invited_email })
      .eq("id", invite.auth_user_id);
    if (profileError) {
      throw profileError;
    }

    const { error: inviteError } = await (admin.from("portal_invites" as never) as any)
      .update({
        accepted_at: new Date().toISOString(),
      })
      .eq("id", invite.id);
    if (inviteError) {
      throw inviteError;
    }

    const client = await createSupabaseServerClient();
    const { error: signInError } = await client.auth.signInWithPassword({
      email: invite.invited_email,
      password: parsed.data.password,
    });
    if (signInError) {
      throw signInError;
    }
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Unable to accept invite." };
  }

  redirect(getDashboardHomePath());
}

export async function logoutAction() {
  const client = await createSupabaseServerClient();
  await client.auth.signOut();
  redirect("/login");
}

function isAdminLike(role: string) {
  return role === "ADMIN" || role === "OPERATIONS_MANAGER";
}

export interface SendPortalInviteInput {
  email: string;
  fullName: string;
  role: "CLIENT" | "TEAM_MEMBER" | "OPERATIONS_MANAGER" | "ADMIN";
  clientAccountId?: string | null;
  projectId?: string | null;
}

export async function sendPortalInviteAction(input: SendPortalInviteInput) {
  const session = await requireDashboardSession();
  if (!isAdminLike(session.role)) {
    throw new Error("Only operations users can issue portal invites.");
  }
  if (!hasSupabaseAdminEnv() || !hasSupabaseBrowserEnv()) {
    throw new Error("Supabase invite infrastructure is not configured.");
  }

  const admin = createSupabaseAdminClient();
  const rawToken = createInviteToken();
  const tokenHash = hashInviteToken(rawToken);
  const env = getSupabaseEnv();

  const { data: createdUser, error: createError } = await admin.auth.admin.createUser({
    email: input.email.trim().toLowerCase(),
    email_confirm: true,
    user_metadata: {
      full_name: input.fullName,
      role: input.role,
    },
  });

  if (createError && !/already registered/i.test(createError.message)) {
    throw new Error(createError.message);
  }

  let authUserId = createdUser.user?.id || null;
  if (!authUserId) {
    const { data: usersData, error: listError } = await admin.auth.admin.listUsers();
    if (listError) {
      throw new Error(listError.message);
    }
    authUserId =
      usersData.users.find((user) => user.email?.toLowerCase() === input.email.trim().toLowerCase())?.id || null;
  }
  if (!authUserId) {
    throw new Error("Unable to provision the invited user.");
  }

  const { data: insertedInvite, error: inviteError } = await (admin.from("portal_invites" as never) as any)
    .insert({
      invited_email: input.email.trim().toLowerCase(),
      invited_name: input.fullName,
      invited_role: input.role,
      auth_user_id: authUserId,
      invited_by_user_id: session.userId,
      client_account_id: input.clientAccountId || null,
      project_id: input.projectId || null,
      token_hash: tokenHash,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      invited_at: new Date().toISOString(),
      last_sent_at: new Date().toISOString(),
      delivery_metadata: {},
    })
    .select("id, expires_at")
    .single();
  if (inviteError || !insertedInvite) {
    throw new Error(inviteError?.message || "Unable to create invite record.");
  }

  const acceptUrl = new URL("/accept-invite", env.siteUrl);
  acceptUrl.searchParams.set("token", rawToken);

  const resendApiKey = env.resendApiKey;
  const fromEmail = env.fromEmail;
  const html = await render(
    PortalInviteEmail({
      fullName: input.fullName,
      invitedByName: session.name,
      acceptUrl: acceptUrl.toString(),
      expiresAt: new Date(insertedInvite.expires_at).toLocaleString("en-US"),
    }),
  );

  if (resendApiKey && fromEmail) {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: fromEmail,
      to: input.email,
      subject: "Your HomeTrust Africa portal invitation",
      html,
    });
  } else {
    console.info(
      "[portal-invite]",
      JSON.stringify({
        acceptUrl: acceptUrl.toString(),
        email: input.email,
      }),
    );
  }

  await recordAuditEvent(session, {
    action: "portal.invite.send",
    targetType: "portal_invite",
    targetId: insertedInvite.id,
    metadata: {
      email: input.email,
      role: input.role,
    },
  });

  return {
    inviteId: insertedInvite.id,
    acceptUrl: acceptUrl.toString(),
    delivery: resendApiKey && fromEmail ? "email" : "manual",
  };
}
