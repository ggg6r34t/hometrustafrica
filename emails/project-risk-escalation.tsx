import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  MutedNote,
  appUrl,
} from "./_components/base-email";

interface ProjectRiskEscalationEmailProps {
  fullName: string;
  projectName: string;
  riskType: string;
  escalationReason: string;
  requiredAction: string;
}

export const subject = "Action required: Project risk escalation";

export function ProjectRiskEscalationEmail({
  fullName,
  projectName,
  riskType,
  escalationReason,
  requiredAction,
}: ProjectRiskEscalationEmailProps) {
  return (
    <BaseEmail
      previewText={`Risk escalation: ${projectName}`}
      title="Project risk escalation"
      intro={`Hello ${fullName}, a project risk has crossed an escalation threshold.`}
      actionLabel="Review escalation"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardProjects)}
      actionNote="Immediate review is recommended to prevent compounding impact."
      footerNote="Project lifecycle notification"
    >
      <DataBlock label="Project" value={projectName} />
      <DataBlock label="Risk type" value={riskType} />
      <DataBlock label="Escalation reason" value={escalationReason} />
      <DataBlock label="Required action" value={requiredAction} />
      <MutedNote>
        This escalation was triggered under the agreed governance framework.
      </MutedNote>
    </BaseEmail>
  );
}

export default ProjectRiskEscalationEmail;
