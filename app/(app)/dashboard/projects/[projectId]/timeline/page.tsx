import { History } from "lucide-react";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { requireAuthorizedProject } from "@/lib/auth/guards";
import { dashboardService } from "@/lib/dashboard/service";

export default async function ProjectTimelinePage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const { session } = await requireAuthorizedProject(projectId);
  const timeline = await dashboardService.getProjectTimeline(session, projectId);

  return timeline.length ? (
    <ActivityFeed items={timeline} title="Project timeline" />
  ) : (
    <DashboardEmptyState
      icon={<History className="size-5" />}
      title="No client-visible timeline events"
      description="Milestone changes, published reports, approvals, and other traceable events will appear here in chronological order."
    />
  );
}
