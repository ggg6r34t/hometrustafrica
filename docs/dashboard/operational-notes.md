# Operational Notes

## Why This Portal Matters Operationally

HomeTrust Africa is a trust business. The dashboard is not just a UI layer; it is part of the operating model that reassures clients that field execution, documentation, budget tracking, and communication are being handled seriously.

## Trust-Critical Behaviors

- project-scoped access control
- client-visible versus internal-only record separation
- signed file access rather than public bucket access
- auditable support and messaging trails
- approval traces that can be reviewed after the fact

## Audit Implications

The current implementation records audit events for important actions such as:

- profile and preference updates
- security updates
- message sends
- support requests and support replies
- approval resolution
- portal invite issuance

## Operational Readiness Notes

- the portal now supports real invite-only access and seeded local auth
- the data model is ready for future internal tools even though the internal UI is intentionally limited in this phase
- support and project conversations remain separate domains, which helps future SLA and escalation modeling

## Future Internal Expansion

The current codebase is positioned for future internal expansion in areas such as:

- richer invite issuance/admin tools
- team-side report and file publishing UI
- assignment management
- project status change tooling
- finance workflow operations
