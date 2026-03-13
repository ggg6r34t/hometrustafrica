import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { AcceptInviteForm } from "@/components/auth/forms";
import { getInviteByToken } from "@/lib/auth/invites";

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const invite = token ? await getInviteByToken(token) : null;

  return (
    <AuthShell
      eyebrow="Portal invitation"
      title="Activate your secure HomeTrust Africa access"
      description="Your invitation links your identity to authorized projects, reports, documents, and conversations. Set your password to complete activation."
    >
      {invite && !invite.acceptedAt && !invite.revokedAt && new Date(invite.expiresAt).getTime() > Date.now() ? (
        <AcceptInviteForm token={token} email={invite.email} fullName={invite.fullName} />
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">This invitation is no longer valid</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            The invite may have expired, already been used, or been revoked by HomeTrust Africa operations.
          </p>
          <Link href="/login" className="text-sm font-medium text-primary">
            Return to sign in
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
