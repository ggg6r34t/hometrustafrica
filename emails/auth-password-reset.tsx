import { BaseEmail, DataBlock, MutedNote } from "./_components/base-email";

interface AuthPasswordResetEmailProps {
  fullName: string;
  resetUrl: string;
  expiresAt: string;
}

export const subject = "Action required: Reset your HomeTrust Africa password";

export function AuthPasswordResetEmail({
  fullName,
  resetUrl,
  expiresAt,
}: AuthPasswordResetEmailProps) {
  return (
    <BaseEmail
      previewText="Password reset requested"
      title="Password reset requested"
      intro={`Hello ${fullName}, we received a request to reset your HomeTrust Africa password.`}
      actionLabel="Reset password"
      actionUrl={resetUrl}
      actionNote="This link is single-use and should not be shared."
      footerNote="Security notification"
    >
      <DataBlock label="Link expiry" value={expiresAt} />
      <MutedNote>
        If you did not request this reset, ignore this email. Your current
        password remains active.
      </MutedNote>
    </BaseEmail>
  );
}

export default AuthPasswordResetEmail;
