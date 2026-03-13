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
      title={isRecoveryMode ? "Set a new password" : "Request a password reset"}
      description="Recovery links are only issued to verified portal email addresses linked to your HomeTrust Africa account."
    >
      {isRecoveryMode ? (
        <PasswordResetCompleteForm code={code} tokenHash={tokenHash} type={type} />
      ) : (
        <PasswordResetRequestForm />
      )}
    </AuthShell>
  );
}
