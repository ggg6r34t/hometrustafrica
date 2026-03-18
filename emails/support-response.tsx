import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  MutedNote,
  appUrl,
} from "./_components/base-email";

interface SupportResponseEmailProps {
  fullName: string;
  ticketId: string;
  responderName: string;
  responseSummary: string;
}

export const subject = "Support update: HomeTrust Africa response posted";

export function SupportResponseEmail({
  fullName,
  ticketId,
  responderName,
  responseSummary,
}: SupportResponseEmailProps) {
  return (
    <BaseEmail
      previewText={`Support response for ticket ${ticketId}`}
      title="Support response posted"
      intro={`Hello ${fullName}, a support response has been posted for your request.`}
      actionLabel="Review response"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardSupport)}
      actionNote="Reply if additional clarification is required."
      footerNote="Support notification"
    >
      <DataBlock label="Ticket ID" value={ticketId} />
      <DataBlock label="Responder" value={responderName} />
      <DataBlock label="Response summary" value={responseSummary} />
      <MutedNote>
        For urgent incidents, include your ticket ID in all follow-up messages.
      </MutedNote>
    </BaseEmail>
  );
}

export default SupportResponseEmail;
