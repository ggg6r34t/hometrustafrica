import { DataBlock, BaseEmail, MutedNote } from "./_components/base-email";

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  country: string;
  projectType: string;
  message: string;
}

export const subject = "New project inquiry";

export const ContactFormEmail = ({
  name,
  email,
  phone,
  country,
  projectType,
  message,
}: ContactFormEmailProps) => {
  return (
    <BaseEmail
      previewText={`New project inquiry: ${name}`}
      title="Support request received"
      intro="A new project inquiry has been submitted through the contact form."
      actionLabel="Reply to requester"
      actionUrl={`mailto:${email}`}
      actionNote="Respond within one business day and confirm next step ownership."
      footerNote="Internal notification · Client intake workflow"
    >
      <DataBlock label="Requester" value={name} />
      <DataBlock
        label="Email"
        value={<a href={`mailto:${email}`}>{email}</a>}
      />
      {phone ? (
        <DataBlock label="Phone" value={<a href={`tel:${phone}`}>{phone}</a>} />
      ) : null}
      <DataBlock label="Country" value={country} />
      <DataBlock label="Project type" value={projectType} />
      <DataBlock label="Project brief" value={message} />
      <MutedNote>
        Record this request in project intake tracking before responding.
      </MutedNote>
    </BaseEmail>
  );
};

export default ContactFormEmail;
