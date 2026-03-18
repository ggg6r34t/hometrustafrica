import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  appUrl,
} from "./_components/base-email";

interface ProjectCreatedEmailProps {
  fullName: string;
  projectName: string;
  projectId: string;
  createdAt: string;
}

export const subject = "Project created: HomeTrust Africa";

export function ProjectCreatedEmail({
  fullName,
  projectName,
  projectId,
  createdAt,
}: ProjectCreatedEmailProps) {
  return (
    <BaseEmail
      previewText={`Project created: ${projectName}`}
      title="Project record created"
      intro={`Hello ${fullName}, your project has been created in the HomeTrust Africa system.`}
      actionLabel="View project"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardProjects)}
      actionNote="Review project details and confirm assigned stakeholders."
      footerNote="Project lifecycle notification"
    >
      <DataBlock label="Project" value={projectName} />
      <DataBlock label="Project ID" value={projectId} />
      <DataBlock label="Created at" value={createdAt} />
    </BaseEmail>
  );
}

export default ProjectCreatedEmail;
