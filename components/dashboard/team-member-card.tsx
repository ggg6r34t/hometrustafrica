import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { TeamMember } from "@/lib/dashboard/types";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="dashboard-panel">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-11 rounded-lg border border-border">
            <AvatarFallback className="rounded-lg bg-muted text-sm font-semibold text-foreground">
              {member.fullName
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{member.fullName}</p>
            <p className="text-sm text-muted-foreground">{member.roleLabel}</p>
          </div>
        </div>
        <div className="space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
          {member.email ? (
            <p className="inline-flex items-center gap-2">
              <Mail className="size-4" /> {member.email}
            </p>
          ) : null}
          {member.phone ? (
            <p className="inline-flex items-center gap-2">
              <Phone className="size-4" /> {member.phone}
            </p>
          ) : null}
          {member.availabilityNote ? <p>{member.availabilityNote}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
