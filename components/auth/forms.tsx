"use client";

import { useEffect, useMemo, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import {
  acceptInviteAction,
  loginAction,
  requestPasswordResetAction,
  type AuthActionState,
} from "@/app/actions/auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { passwordResetCompleteSchema } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = { status: "idle" };

function Feedback({ state }: { state: AuthActionState }) {
  if (state.status === "idle") {
    return null;
  }

  const success = state.status === "success";
  const Icon = success ? CheckCircle2 : AlertTriangle;

  return (
    <div
      className={
        success
          ? "flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-primary"
          : "flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-destructive"
      }
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <p className="text-sm font-medium leading-relaxed">{state.message}</p>
    </div>
  );
}

function AuthInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      className={[
        "h-12 rounded-xl border-border/70 bg-white shadow-none transition-all duration-200",
        "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/15",
        props.className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="mb-4 h-px w-10 bg-primary/55" />
        <CardTitle className="text-[1.6rem] font-semibold tracking-tight text-[#0f1720]">
          Sign in
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-0">
        <p className="max-w-sm text-sm leading-7 text-muted-foreground">
          Use the email address issued to your account.
        </p>
        <form action={action} className="space-y-4">
          <input type="hidden" name="next" value={next || ""} />
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground/84"
            >
              Email
            </Label>
            <AuthInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground/84"
            >
              Password
            </Label>
            <AuthInput
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <Feedback state={state} />
          <div className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full px-8 shadow-none"
              disabled={pending}
            >
              {pending ? "Signing in..." : "Sign in"}
            </Button>
            <a
              href="/reset-password"
              className="text-center text-sm text-foreground/58 underline-offset-4 hover:text-foreground hover:underline"
            >
              Reset password
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function AcceptInviteForm({
  token,
  email,
  fullName,
}: {
  token: string;
  email: string;
  fullName: string;
}) {
  const [state, action, pending] = useActionState(
    acceptInviteAction,
    initialState,
  );

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="mb-4 h-px w-10 bg-primary/55" />
        <CardTitle className="text-[1.6rem] font-semibold tracking-tight text-[#0f1720]">
          Accept invitation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-0">
        <div className="rounded-2xl border border-border/70 bg-white p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{email}</p>
        </div>
        <form action={action} className="space-y-4">
          <input type="hidden" name="token" value={token} />
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <AuthInput
              id="fullName"
              name="fullName"
              defaultValue={fullName}
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <AuthInput
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <AuthInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
              />
            </div>
          </div>
          <Feedback state={state} />
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full px-8 shadow-none"
            disabled={pending}
          >
            {pending ? "Activating..." : "Activate access"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function PasswordResetRequestForm() {
  const [state, action, pending] = useActionState(
    requestPasswordResetAction,
    initialState,
  );
  const isSuccess = state.status === "success";

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="mb-4 h-px w-10 bg-primary/55" />
        <CardTitle className="text-[1.6rem] font-semibold tracking-tight text-[#0f1720]">
          Reset password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-0">
        {isSuccess ? (
          <div className="space-y-5">
            <Feedback state={state} />
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Check your inbox and open the secure link to continue.
            </p>
            <a
              href="/login"
              className="block text-sm text-foreground/58 underline-offset-4 hover:text-foreground hover:underline"
            >
              Return to sign in
            </a>
          </div>
        ) : (
          <>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Enter your invited portal email and we will send a secure recovery
              link.
            </p>
            <form action={action} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground/84"
                >
                  Email
                </Label>
                <AuthInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <Feedback state={state} />
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full px-8 shadow-none"
                disabled={pending}
              >
                {pending ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function PasswordResetCompleteForm({
  code,
  tokenHash,
  type,
}: {
  code?: string;
  tokenHash?: string;
  type?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<
    "verifying" | "ready" | "error" | "saving" | "saved"
  >("verifying");
  const [message, setMessage] = useState<string>(
    "Validating your secure reset link...",
  );
  const isRecoveryFlow = useMemo(
    () => Boolean(code || (tokenHash && type === "recovery")),
    [code, tokenHash, type],
  );

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      if (!isRecoveryFlow) {
        setStatus("error");
        setMessage("This password reset link is invalid or incomplete.");
        return;
      }

      try {
        const client = createSupabaseBrowserClient();
        if (code) {
          const { error } = await client.auth.exchangeCodeForSession(code);
          if (error) {
            throw error;
          }
        } else if (tokenHash) {
          const { error } = await client.auth.verifyOtp({
            token_hash: tokenHash,
            type: "recovery",
          });
          if (error) {
            throw error;
          }
        }

        if (!cancelled) {
          setStatus("ready");
          setMessage("Set a new password for your portal account.");
        }
      } catch (error) {
        if (!cancelled) {
          setStatus("error");
          setMessage(
            error instanceof Error
              ? error.message
              : "Unable to validate your reset link.",
          );
        }
      }
    }

    void verify();
    return () => {
      cancelled = true;
    };
  }, [code, tokenHash, isRecoveryFlow]);

  async function onSubmit(formData: FormData) {
    const fixedParsed = passwordResetCompleteSchema.safeParse({
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!fixedParsed.success) {
      setStatus("error");
      setMessage(
        fixedParsed.error.issues[0]?.message || "Password details are invalid.",
      );
      return;
    }

    try {
      setStatus("saving");
      setMessage("Updating your password...");
      const client = createSupabaseBrowserClient();
      const { error } = await client.auth.updateUser({
        password: fixedParsed.data.password,
      });
      if (error) {
        throw error;
      }
      await client.auth.signOut();
      setStatus("saved");
      setMessage("Password updated. Redirecting you to sign in.");
      router.push("/login?reset=success");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Unable to update password.",
      );
    }
  }

  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="mb-4 h-px w-10 bg-primary/55" />
        <CardTitle className="text-[1.6rem] font-semibold tracking-tight text-[#0f1720]">
          Create a new password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-0">
        <p className="max-w-sm text-sm leading-7 text-muted-foreground">
          Choose a strong password for your HomeTrust Africa portal account.
        </p>
        {status === "verifying" ? (
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white p-4 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            {message}
          </div>
        ) : null}
        {status !== "ready" && status !== "saving" ? (
          <p
            className={
              status === "saved"
                ? "text-sm text-emerald-700"
                : "text-sm text-rose-700"
            }
          >
            {message}
          </p>
        ) : null}
        {status === "ready" || status === "saving" ? (
          <form action={onSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <AuthInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <AuthInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full px-8 shadow-none"
              disabled={status === "saving"}
            >
              {status === "saving" ? "Updating..." : "Update password"}
            </Button>
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}
