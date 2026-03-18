import { DataBlock, BaseEmail, MutedNote } from "./_components/base-email";

interface PortalInviteEmailProps {
  fullName: string;
  invitedByName: string;
  acceptUrl: string;
  expiresAt: string;
}

export const subject = "Action required: Accept your HomeTrust Africa invite";

export function PortalInviteEmail({
  fullName,
  invitedByName,
  acceptUrl,
  expiresAt,
}: PortalInviteEmailProps) {
  return (
    <BaseEmail
      previewText="Action required: Accept your secure portal invite"
      title="You have been invited to HomeTrust Africa"
      intro={`Hello ${fullName}, ${invitedByName} has invited you to your secure HomeTrust Africa portal.`}
      actionLabel="Accept invite"
      actionUrl={acceptUrl}
      actionNote="You will set your password and complete access setup."
      footerNote="This is an operational access email."
    >
      <DataBlock label="Invitation expires" value={expiresAt} />
      <MutedNote>
        If you did not expect this invitation, do not click the link. Contact
        support immediately.
      </MutedNote>
      <MutedNote>For security, do not forward this email.</MutedNote>
    </BaseEmail>
  );
}

export default PortalInviteEmail;
