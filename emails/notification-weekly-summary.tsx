import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  appUrl,
} from "./_components/base-email";

interface NotificationWeeklySummaryEmailProps {
  fullName: string;
  period: string;
  activeProjects: string;
  pendingActions: string;
}

export const subject = "Weekly summary: HomeTrust Africa updates";

export function NotificationWeeklySummaryEmail({
  fullName,
  period,
  activeProjects,
  pendingActions,
}: NotificationWeeklySummaryEmailProps) {
  return (
    <BaseEmail
      previewText={`Weekly summary for ${period}`}
      title="Weekly summary"
      intro={`Hello ${fullName}, here is your weekly HomeTrust Africa activity summary.`}
      actionLabel="Review dashboard"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardNotifications)}
      actionNote="Please review pending actions before the next reporting cycle."
      footerNote="General notification"
    >
      <DataBlock label="Period" value={period} />
      <DataBlock label="Active projects" value={activeProjects} />
      <DataBlock label="Pending actions" value={pendingActions} />
    </BaseEmail>
  );
}

export default NotificationWeeklySummaryEmail;
