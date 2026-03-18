import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  appUrl,
} from "./_components/base-email";

interface NewsletterWelcomeEmailProps {
  email: string;
}

export const subject = "Welcome to HomeTrust Africa Newsletter";

export const NewsletterWelcomeEmail = ({
  email,
}: NewsletterWelcomeEmailProps) => {
  return (
    <BaseEmail
      previewText="Subscription confirmed: HomeTrust Africa updates"
      title="Welcome to HomeTrust Africa updates"
      intro="Your subscription is active. You will now receive platform and operational updates."
      actionLabel="Request a project review"
      actionUrl={appUrl(EMAIL_ROUTES.contact)}
      actionNote="Use this option when you are ready to discuss an active project."
      footerNote={`Subscription address: ${email}`}
    >
      <DataBlock
        label="Update focus"
        value="Platform improvements, project governance insights, and operational updates relevant to diaspora execution."
      />
      <DataBlock
        label="Frequency"
        value="Periodic communications. You can unsubscribe at any time."
      />
    </BaseEmail>
  );
};

export default NewsletterWelcomeEmail;
