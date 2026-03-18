import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  appUrl,
} from "./_components/base-email";

interface ProjectKickoffEmailProps {
  fullName: string;
  projectName: string;
  kickoffDate: string;
  kickoffOwner: string;
}

export const subject = "Project kickoff confirmed: HomeTrust Africa";

export function ProjectKickoffEmail({
  fullName,
  projectName,
  kickoffDate,
  kickoffOwner,
}: ProjectKickoffEmailProps) {
  return (
    <BaseEmail
      previewText={`Kickoff confirmed: ${projectName}`}
      title="Project kickoff confirmed"
      intro={`Hello ${fullName}, kickoff has been confirmed and execution controls are active.`}
      actionLabel="Review kickoff details"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardProjects)}
      actionNote="Please confirm milestone ownership and reporting cadence."
      footerNote="Project lifecycle notification"
    >
      <DataBlock label="Project" value={projectName} />
      <DataBlock label="Kickoff date" value={kickoffDate} />
      <DataBlock label="Kickoff owner" value={kickoffOwner} />
    </BaseEmail>
  );
}

export default ProjectKickoffEmail;
