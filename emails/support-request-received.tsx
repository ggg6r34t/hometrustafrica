import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  appUrl,
} from "./_components/base-email";

interface SupportRequestReceivedEmailProps {
  fullName: string;
  ticketId: string;
  issueCategory: string;
  submittedAt: string;
}

export const subject = "Support request received: HomeTrust Africa";

export function SupportRequestReceivedEmail({
  fullName,
  ticketId,
  issueCategory,
  submittedAt,
}: SupportRequestReceivedEmailProps) {
  return (
    <BaseEmail
      previewText={`Support request received: ${ticketId}`}
      title="Support request received"
      intro={`Hello ${fullName}, we have received your support request and assigned it for review.`}
      actionLabel="View support status"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardSupport)}
      actionNote="Keep this ticket ID for follow-up communication."
      footerNote="Support notification"
    >
      <DataBlock label="Ticket ID" value={ticketId} />
      <DataBlock label="Category" value={issueCategory} />
      <DataBlock label="Submitted" value={submittedAt} />
    </BaseEmail>
  );
}

export default SupportRequestReceivedEmail;
