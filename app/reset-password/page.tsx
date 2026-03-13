import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordResetCompleteForm, PasswordResetRequestForm } from "@/components/auth/forms";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const code = typeof params.code === "string" ? params.code : undefined;
  const tokenHash = typeof params.token_hash === "string" ? params.token_hash : undefined;
  const type = typeof params.type === "string" ? params.type : undefined;
  const isRecoveryMode = Boolean(code || (tokenHash && type === "recovery"));

  return (
    <AuthShell
      eyebrow="Password recovery"
      title={isRecoveryMode ? "Choose a new password" : "Request a secure reset link"}
      description="Password recovery is handled through your verified portal email and secure Supabase-authenticated sessions."
    >
      {isRecoveryMode ? (
        <PasswordResetCompleteForm code={code} tokenHash={tokenHash} type={type} />
      ) : (
        <PasswordResetRequestForm />
      )}
    </AuthShell>
  );
}
