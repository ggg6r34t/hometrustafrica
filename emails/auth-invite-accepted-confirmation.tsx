import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  MutedNote,
  appUrl,
} from "./_components/base-email";

interface AuthInviteAcceptedConfirmationEmailProps {
  fullName: string;
  acceptedAt: string;
}

export const subject = "Access confirmed: HomeTrust Africa portal";

export function AuthInviteAcceptedConfirmationEmail({
  fullName,
  acceptedAt,
}: AuthInviteAcceptedConfirmationEmailProps) {
  return (
    <BaseEmail
      previewText="Portal access confirmed"
      title="Portal access confirmed"
      intro={`Hello ${fullName}, your HomeTrust Africa portal access has been successfully activated.`}
      actionLabel="Open dashboard"
      actionUrl={appUrl(EMAIL_ROUTES.login)}
      actionNote="Use your credentials to continue into the dashboard."
      footerNote="Account notification"
    >
      <DataBlock label="Accepted at" value={acceptedAt} />
      <MutedNote>
        If you did not complete this action, reset your password immediately.
      </MutedNote>
    </BaseEmail>
  );
}

export default AuthInviteAcceptedConfirmationEmail;
