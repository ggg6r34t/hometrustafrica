import { Users } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { TeamMemberCard } from "@/components/dashboard/team-member-card";
import { requireAuthorizedProject } from "@/lib/auth/guards";
import { dashboardService } from "@/lib/dashboard/service";

export default async function ProjectTeamPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const { session } = await requireAuthorizedProject(projectId);
  const team = await dashboardService.getProjectTeam(session, projectId);

  return team.length ? (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {team.map((member) => <TeamMemberCard key={member.id} member={member} />)}
    </div>
  ) : (
    <DashboardEmptyState
      icon={<Users className="size-5" />}
      title="No team contacts published"
      description="Client-visible project manager, coordinator, field supervisor, and specialist contacts appear here when assigned."
    />
  );
}
