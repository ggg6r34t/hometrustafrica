import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  MutedNote,
  appUrl,
} from "./_components/base-email";

interface NotificationActivityUpdateEmailProps {
  fullName: string;
  projectName: string;
  activityType: string;
  activityTime: string;
}

export const subject = "Activity update: HomeTrust Africa workspace";

export function NotificationActivityUpdateEmail({
  fullName,
  projectName,
  activityType,
  activityTime,
}: NotificationActivityUpdateEmailProps) {
  return (
    <BaseEmail
      previewText={`Activity update: ${activityType}`}
      title="Activity update"
      intro={`Hello ${fullName}, there is a new activity update in your workspace.`}
      actionLabel="View activity"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardNotifications)}
      actionNote="Review the update to ensure decisions remain aligned."
      footerNote="General notification"
    >
      <DataBlock label="Project" value={projectName} />
      <DataBlock label="Activity" value={activityType} />
      <DataBlock label="Time" value={activityTime} />
      <MutedNote>
        Notification frequency can be managed in your account preferences.
      </MutedNote>
    </BaseEmail>
  );
}

export default NotificationActivityUpdateEmail;
