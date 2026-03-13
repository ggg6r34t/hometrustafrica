import type { ReactNode } from "react";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(46,125,80,0.12),_transparent_32%),linear-gradient(180deg,#f6f5ef_0%,#f1f1eb_100%)] px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">{eyebrow}</p>
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">{title}</h1>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">{description}</p>
          </div>
          <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-white/80 p-4">
              <p className="font-medium text-foreground">Invite-only access</p>
              <p className="mt-1">Accounts are provisioned by HomeTrust Africa operations.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-white/80 p-4">
              <p className="font-medium text-foreground">Project-scoped security</p>
              <p className="mt-1">Every report, file, and message is authorized server side.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-white/80 p-4">
              <p className="font-medium text-foreground">Traceable operations</p>
              <p className="mt-1">Milestones, approvals, and client communications stay auditable.</p>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] border border-border/70 bg-white/92 p-6 shadow-[0_24px_80px_rgba(18,33,23,0.08)] md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
