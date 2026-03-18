import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  MutedNote,
  appUrl,
} from "./_components/base-email";

interface AuthLoginAlertEmailProps {
  fullName: string;
  loginTime: string;
  device: string;
  location: string;
}

export const subject = "Security alert: New HomeTrust Africa login";

export function AuthLoginAlertEmail({
  fullName,
  loginTime,
  device,
  location,
}: AuthLoginAlertEmailProps) {
  return (
    <BaseEmail
      previewText="New account login detected"
      title="New login detected"
      intro={`Hello ${fullName}, your account was accessed from a new session.`}
      actionLabel="Review account security"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardSettings)}
      actionNote="Use this option if this activity was not recognized."
      footerNote="Security notification"
    >
      <DataBlock label="Time" value={loginTime} />
      <DataBlock label="Device" value={device} />
      <DataBlock label="Location" value={location} />
      <MutedNote>If this login was expected, no action is required.</MutedNote>
    </BaseEmail>
  );
}

export default AuthLoginAlertEmail;
