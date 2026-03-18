import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  appUrl,
} from "./_components/base-email";

interface CommunicationNewMessageEmailProps {
  fullName: string;
  senderName: string;
  projectName: string;
  messageSnippet: string;
}

export const subject = "New message received: HomeTrust Africa workspace";

export function CommunicationNewMessageEmail({
  fullName,
  senderName,
  projectName,
  messageSnippet,
}: CommunicationNewMessageEmailProps) {
  return (
    <BaseEmail
      previewText={`New message from ${senderName}`}
      title="New message received"
      intro={`Hello ${fullName}, you have a new message on your project workspace.`}
      actionLabel="Open messages"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardInbox)}
      actionNote="Please review and respond if action is required."
      footerNote="Communication notification"
    >
      <DataBlock label="From" value={senderName} />
      <DataBlock label="Project" value={projectName} />
      <DataBlock label="Message preview" value={messageSnippet} />
    </BaseEmail>
  );
}

export default CommunicationNewMessageEmail;
