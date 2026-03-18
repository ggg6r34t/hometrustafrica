import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  MutedNote,
  appUrl,
} from "./_components/base-email";

interface ContactConfirmationEmailProps {
  name: string;
}

export const subject = "Project review request received: HomeTrust Africa";

export const ContactConfirmationEmail = ({
  name,
}: ContactConfirmationEmailProps) => {
  return (
    <BaseEmail
      previewText="Project review request received"
      title={`Request received, ${name}`}
      intro="We have received your project review request and queued it for assessment."
      actionLabel="Share additional project details"
      actionUrl={appUrl(EMAIL_ROUTES.contact)}
      actionNote="If your brief changes, update us before review is completed."
      footerNote="Client onboarding notification"
    >
      <DataBlock
        label="What happens next"
        value="We review your brief within 48 hours and send a recommended next-step plan."
      />
      <DataBlock
        label="What to expect"
        value="A clear response on project fit, control requirements, and immediate next actions."
      />
      <MutedNote>For urgent updates, reply directly to this email.</MutedNote>
    </BaseEmail>
  );
};

export default ContactConfirmationEmail;
