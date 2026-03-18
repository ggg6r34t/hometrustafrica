import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  appUrl,
} from "./_components/base-email";

interface ProjectReportAvailableEmailProps {
  fullName: string;
  projectName: string;
  reportPeriod: string;
  reportType: string;
}

export const subject = "Report available: Project progress update";

export function ProjectReportAvailableEmail({
  fullName,
  projectName,
  reportPeriod,
  reportType,
}: ProjectReportAvailableEmailProps) {
  return (
    <BaseEmail
      previewText={`Report available: ${projectName}`}
      title="Project report available"
      intro={`Hello ${fullName}, a new report is available for review.`}
      actionLabel="View report"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardProjects)}
      actionNote="Review decisions required and confirm any pending approvals."
      footerNote="Project lifecycle notification"
    >
      <DataBlock label="Project" value={projectName} />
      <DataBlock label="Report type" value={reportType} />
      <DataBlock label="Report period" value={reportPeriod} />
    </BaseEmail>
  );
}

export default ProjectReportAvailableEmail;
