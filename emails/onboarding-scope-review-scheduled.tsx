import { BaseEmail, DataBlock } from "./_components/base-email";

interface OnboardingScopeReviewScheduledEmailProps {
  fullName: string;
  reviewDate: string;
  reviewTime: string;
  timezone: string;
  meetingUrl: string;
}

export const subject = "Scope review scheduled: HomeTrust Africa";

export function OnboardingScopeReviewScheduledEmail({
  fullName,
  reviewDate,
  reviewTime,
  timezone,
  meetingUrl,
}: OnboardingScopeReviewScheduledEmailProps) {
  return (
    <BaseEmail
      previewText="Your scope review is scheduled"
      title="Scope review scheduled"
      intro={`Hello ${fullName}, your scope review session has been scheduled.`}
      actionLabel="Join scope review"
      actionUrl={meetingUrl}
      actionNote="Please join on time with any updated project documents ready."
      footerNote="Client onboarding"
    >
      <DataBlock label="Date" value={reviewDate} />
      <DataBlock label="Time" value={`${reviewTime} (${timezone})`} />
      <DataBlock
        label="Session objective"
        value="Confirm project scope, risk exposure, and recommended control requirements."
      />
    </BaseEmail>
  );
}

export default OnboardingScopeReviewScheduledEmail;
