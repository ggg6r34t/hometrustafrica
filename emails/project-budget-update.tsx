import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  MutedNote,
  appUrl,
} from "./_components/base-email";

interface ProjectBudgetUpdateEmailProps {
  fullName: string;
  projectName: string;
  currentSpend: string;
  approvedBudget: string;
  variance: string;
}

export const subject = "Budget update: Spend status changed";

export function ProjectBudgetUpdateEmail({
  fullName,
  projectName,
  currentSpend,
  approvedBudget,
  variance,
}: ProjectBudgetUpdateEmailProps) {
  return (
    <BaseEmail
      previewText={`Budget update: ${projectName}`}
      title="Budget update"
      intro={`Hello ${fullName}, the budget status for your project has been updated.`}
      actionLabel="Review budget status"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardProjects)}
      actionNote="Confirm if corrective action or approval updates are required."
      footerNote="Project lifecycle notification"
    >
      <DataBlock label="Project" value={projectName} />
      <DataBlock label="Current spend" value={currentSpend} />
      <DataBlock label="Approved budget" value={approvedBudget} />
      <DataBlock label="Variance" value={variance} />
      <MutedNote>
        Budget updates are linked to milestone progress and approval status.
      </MutedNote>
    </BaseEmail>
  );
}

export default ProjectBudgetUpdateEmail;
