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
    <p className={success ? "flex items-center gap-2 text-sm text-emerald-700" : "flex items-center gap-2 text-sm text-rose-700"}>
      <Icon className="size-4" />
      {state.message}
    </p>
  );
}

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <Card className="border-border/70 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold">Sign in to your portal</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <form action={action} className="space-y-4">
          <input type="hidden" name="next" value={next || ""} />
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <Feedback state={state} />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a href="/reset-password" className="text-sm font-medium text-primary">
              Need to reset your password?
            </a>
            <Button type="submit" disabled={pending}>
              {pending ? "Signing in..." : "Sign in securely"}
            </Button>
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
  const [state, action, pending] = useActionState(acceptInviteAction, initialState);

  return (
    <Card className="border-border/70 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold">Accept portal invitation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-0">
        <div className="rounded-2xl border border-border/70 bg-muted/40 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{email}</p>
          <p className="mt-1">Set your password to activate secure access to your HomeTrust Africa workspace.</p>
        </div>
        <form action={action} className="space-y-4">
          <input type="hidden" name="token" value={token} />
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" defaultValue={fullName} required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" autoComplete="new-password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required />
            </div>
          </div>
          <Feedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
              {pending ? "Activating..." : "Activate portal access"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function PasswordResetRequestForm() {
  const [state, action, pending] = useActionState(requestPasswordResetAction, initialState);

  return (
    <Card className="border-border/70 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold">Reset your password</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Portal email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <Feedback state={state} />
          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
              {pending ? "Sending..." : "Send reset link"}
            </Button>
          </div>
        </form>
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
  const [status, setStatus] = useState<"verifying" | "ready" | "error" | "saving" | "saved">("verifying");
  const [message, setMessage] = useState<string>("Validating your secure reset link...");
  const isRecoveryFlow = useMemo(() => Boolean(code || (tokenHash && type === "recovery")), [code, tokenHash, type]);

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
          const { error } = await client.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" });
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
          setMessage(error instanceof Error ? error.message : "Unable to validate your reset link.");
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
      setMessage(fixedParsed.error.issues[0]?.message || "Password details are invalid.");
      return;
    }

    try {
      setStatus("saving");
      setMessage("Updating your password...");
      const client = createSupabaseBrowserClient();
      const { error } = await client.auth.updateUser({ password: fixedParsed.data.password });
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
      setMessage(error instanceof Error ? error.message : "Unable to update password.");
    }
  }

  return (
    <Card className="border-border/70 bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold">Create a new password</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-0">
        {status === "verifying" ? (
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/40 p-4 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            {message}
          </div>
        ) : null}
        {status !== "ready" && status !== "saving" ? (
          <p className={status === "saved" ? "text-sm text-emerald-700" : "text-sm text-rose-700"}>{message}</p>
        ) : null}
        {status === "ready" || status === "saving" ? (
          <form action={onSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <Input id="password" name="password" type="password" autoComplete="new-password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={status === "saving"}>
                {status === "saving" ? "Updating..." : "Update password"}
              </Button>
            </div>
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}
