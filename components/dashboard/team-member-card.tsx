import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { TeamMember } from "@/lib/dashboard/types";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center gap-3">
          <Avatar className="size-11">
            <AvatarFallback>{member.fullName.split(" ").map((part) => part[0]).slice(0, 2).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{member.fullName}</p>
            <p className="text-sm text-muted-foreground">{member.roleLabel}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          {member.email ? <p className="inline-flex items-center gap-2"><Mail className="size-4" /> {member.email}</p> : null}
          {member.phone ? <p className="inline-flex items-center gap-2"><Phone className="size-4" /> {member.phone}</p> : null}
          {member.availabilityNote ? <p>{member.availabilityNote}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
