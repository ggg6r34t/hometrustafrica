import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  appUrl,
} from "./_components/base-email";

interface CommunicationReplyNotificationEmailProps {
  fullName: string;
  replierName: string;
  threadTitle: string;
  projectName: string;
}

export const subject = "Reply received: Project conversation update";

export function CommunicationReplyNotificationEmail({
  fullName,
  replierName,
  threadTitle,
  projectName,
}: CommunicationReplyNotificationEmailProps) {
  return (
    <BaseEmail
      previewText={`Reply received in ${projectName}`}
      title="Conversation reply received"
      intro={`Hello ${fullName}, a reply has been posted in one of your conversations.`}
      actionLabel="View conversation"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardInbox)}
      actionNote="Review the latest reply to keep project communication current."
      footerNote="Communication notification"
    >
      <DataBlock label="Replied by" value={replierName} />
      <DataBlock label="Project" value={projectName} />
      <DataBlock label="Thread" value={threadTitle} />
    </BaseEmail>
  );
}

export default CommunicationReplyNotificationEmail;
