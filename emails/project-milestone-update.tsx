import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  MutedNote,
  appUrl,
} from "./_components/base-email";

interface ProjectMilestoneUpdateEmailProps {
  fullName: string;
  projectName: string;
  milestoneName: string;
  milestoneStatus: "Submitted" | "Approved" | "Requires review";
}

export const subject = "Project update: Milestone status changed";

export function ProjectMilestoneUpdateEmail({
  fullName,
  projectName,
  milestoneName,
  milestoneStatus,
}: ProjectMilestoneUpdateEmailProps) {
  return (
    <BaseEmail
      previewText={`Milestone update: ${milestoneName}`}
      title="Milestone update"
      intro={`Hello ${fullName}, a milestone status has changed on your project.`}
      actionLabel="Review milestone"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardProjects)}
      actionNote="Review evidence and confirm any required approvals."
      footerNote="Project lifecycle notification"
    >
      <DataBlock label="Project" value={projectName} />
      <DataBlock label="Milestone" value={milestoneName} />
      <DataBlock label="Current status" value={milestoneStatus} />
      <MutedNote>
        Status updates are logged for audit and reporting continuity.
      </MutedNote>
    </BaseEmail>
  );
}

export default ProjectMilestoneUpdateEmail;
