import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  appUrl,
} from "./_components/base-email";

interface OnboardingWelcomeEmailProps {
  fullName: string;
}

export const subject = "Welcome to HomeTrust Africa";

export function OnboardingWelcomeEmail({
  fullName,
}: OnboardingWelcomeEmailProps) {
  return (
    <BaseEmail
      previewText="Welcome to HomeTrust Africa"
      title="Welcome to HomeTrust Africa"
      intro={`Hello ${fullName}, welcome. This email confirms your onboarding has started.`}
      actionLabel="Complete your project brief"
      actionUrl={appUrl(EMAIL_ROUTES.contact)}
      actionNote="Submitting a complete brief helps us assign the right control model quickly."
      footerNote="Client onboarding"
    >
      <DataBlock
        label="Next step"
        value="Submit your project scope, location, timeline, and budget range."
      />
      <DataBlock
        label="Expected response"
        value="You will receive a reviewed next-step plan within 48 hours."
      />
    </BaseEmail>
  );
}

export default OnboardingWelcomeEmail;
