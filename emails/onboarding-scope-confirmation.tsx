import {
  BaseEmail,
  DataBlock,
  EMAIL_ROUTES,
  MutedNote,
  appUrl,
} from "./_components/base-email";

interface OnboardingScopeConfirmationEmailProps {
  fullName: string;
  projectName: string;
  scopeVersion: string;
}

export const subject = "Scope confirmed: Next steps for your project";

export function OnboardingScopeConfirmationEmail({
  fullName,
  projectName,
  scopeVersion,
}: OnboardingScopeConfirmationEmailProps) {
  return (
    <BaseEmail
      previewText="Project scope confirmed"
      title="Scope confirmation completed"
      intro={`Hello ${fullName}, your project scope has been reviewed and confirmed.`}
      actionLabel="View confirmation"
      actionUrl={appUrl(EMAIL_ROUTES.dashboardProjects)}
      actionNote="Review the summary and confirm any final updates in the dashboard."
      footerNote="Client onboarding"
    >
      <DataBlock label="Project" value={projectName} />
      <DataBlock label="Scope version" value={scopeVersion} />
      <DataBlock
        label="What happens next"
        value="We proceed to operator verification, milestone setup, and reporting schedule definition."
      />
      <MutedNote>
        Changes requested after confirmation may update timeline and control
        setup.
      </MutedNote>
    </BaseEmail>
  );
}

export default OnboardingScopeConfirmationEmail;
