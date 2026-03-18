# Email Orphan Templates TODO

Last updated: 2026-03-18

This file tracks templates in `emails/` that are still **not triggered by live code paths**.
Use this as a backlog for future orchestration work.

## Definition

An email template is considered **orphaned** when:

- it exists in `emails/`,
- exports `subject`/component correctly,
- but is not imported and sent from an action/service/job that can run in production.

## Current Orphaned Templates

## Execution Board

Use this table as the working tracker. Suggested status values: `Backlog`, `Ready`, `In Progress`, `Blocked`, `Done`.

| Template                                       | Domain            | Priority | Status             | Owner      | Target Sprint | Primary Missing Orchestration                           |
| ---------------------------------------------- | ----------------- | -------- | ------------------ | ---------- | ------------- | ------------------------------------------------------- |
| `emails/support-response.tsx`                  | Support           | P1       | Backlog            | Unassigned | TBD           | Trigger on support reply write path + recipient routing |
| `emails/communication-new-message.tsx`         | Communication     | P1       | Backlog            | Unassigned | TBD           | Outbound notify on new message events                   |
| `emails/communication-reply-notification.tsx`  | Communication     | P1       | Backlog            | Unassigned | TBD           | Outbound notify on reply events                         |
| `emails/project-created.tsx`                   | Project Lifecycle | P2       | Backlog            | Unassigned | TBD           | Canonical project-created event producer                |
| `emails/project-kickoff.tsx`                   | Project Lifecycle | P2       | Backlog            | Unassigned | TBD           | Kickoff event producer + routing                        |
| `emails/project-milestone-update.tsx`          | Project Lifecycle | P2       | Backlog            | Unassigned | TBD           | Milestone status change event + dedupe                  |
| `emails/project-report-available.tsx`          | Project Lifecycle | P2       | Backlog            | Unassigned | TBD           | Report publish event + recipient mapping                |
| `emails/project-budget-update.tsx`             | Project Lifecycle | P2       | Backlog            | Unassigned | TBD           | Budget threshold/breach event strategy                  |
| `emails/project-risk-escalation.tsx`           | Project Lifecycle | P2       | Backlog            | Unassigned | TBD           | Risk escalation event + urgency routing                 |
| `emails/onboarding-scope-review-scheduled.tsx` | Onboarding        | P2       | Backlog            | Unassigned | TBD           | Onboarding review-scheduled event                       |
| `emails/onboarding-scope-confirmation.tsx`     | Onboarding        | P2       | Backlog            | Unassigned | TBD           | Onboarding scope-confirmed event                        |
| `emails/notification-activity-update.tsx`      | Notifications     | P3       | Backlog            | Unassigned | TBD           | Activity event fanout policy                            |
| `emails/notification-weekly-summary.tsx`       | Notifications     | P3       | Backlog            | Unassigned | TBD           | Scheduled digest job + aggregation                      |
| `emails/auth-password-reset.tsx`               | Auth              | P3       | Blocked (Decision) | Unassigned | TBD           | Product decision: Supabase-hosted vs app-hosted reset   |

### Auth

1. `emails/auth-password-reset.tsx`

- Why orphaned now:
  - Password reset flow currently relies on Supabase hosted reset email (`client.auth.resetPasswordForEmail`) in `app/actions/auth.ts`.
  - No custom reset token + custom email dispatch path is implemented.
- What is needed:
  - Decide ownership of reset email (Supabase-hosted vs app-hosted).
  - If app-hosted: implement reset token issuance, storage, expiry, verification endpoint, and custom send via `sendEmail`.
  - Update auth UX to consume custom reset link lifecycle.

### Communication

2. `emails/communication-new-message.tsx`
3. `emails/communication-reply-notification.tsx`

- Why orphaned now:
  - Conversation messages are persisted and in-app notifications are created, but no outbound email trigger is attached in the message flow.
- What is needed:
  - Add outbound email orchestration in message/reply write path (likely repository/service layer after successful insert).
  - Resolve recipients (all participants except sender) with preference checks.
  - Prevent duplicates on retries (idempotency key per message + recipient).

### Notifications

4. `emails/notification-activity-update.tsx`
5. `emails/notification-weekly-summary.tsx`

- Why orphaned now:
  - In-app notification data exists, but no email fanout/scheduler is implemented.
- What is needed:
  - Define trigger policy:
    - activity-update: event-driven immediate or batched,
    - weekly-summary: scheduled digest job.
  - Add user preference gating (frequency, channel opt-in).
  - Add scheduler/cron worker for weekly summaries.
  - Add digest aggregation query logic.

### Onboarding

6. `emails/onboarding-scope-review-scheduled.tsx`
7. `emails/onboarding-scope-confirmation.tsx`

- Why orphaned now:
  - No explicit onboarding orchestration workflow currently emits these state transitions.
- What is needed:
  - Define onboarding state model/events (review scheduled, scope confirmed).
  - Emit those events from the responsible flow (admin/dashboard action or backoffice process).
  - Send corresponding template after transactional state commit.

### Project Lifecycle

8. `emails/project-created.tsx`
9. `emails/project-kickoff.tsx`
10. `emails/project-milestone-update.tsx`
11. `emails/project-report-available.tsx`
12. `emails/project-budget-update.tsx`
13. `emails/project-risk-escalation.tsx`

- Why orphaned now:
  - Project entities and timeline/report/budget data exist, but no email event bus/orchestrator currently emits lifecycle notifications.
- What is needed:
  - Define canonical project events and producers (create, kickoff, milestone status change, report publish, budget threshold breach, risk escalation).
  - Add recipient resolution by project membership + role.
  - Add preference/policy gating to avoid noise.
  - Add safe deduping for repeat updates.

### Support

14. `emails/support-response.tsx`

- Why orphaned now:
  - Support request confirmation is wired, but support **reply** email is not sent when thread responses are posted.
- What is needed:
  - Hook send in support reply flow after message insert.
  - Determine recipient logic (client receives operator replies; operator team receives client replies if desired).
  - Add idempotency + error isolation so support message submission cannot fail due to email errors.

## Prerequisites for Wiring (Cross-Cutting)

Before wiring more templates, align these orchestration concerns:

- **Event ownership**: action vs service vs repository vs async job.
- **Recipient resolution**: explicit rules per template.
- **Preferences**: email opt-in/frequency checks per user.
- **Idempotency**: prevent duplicate sends during retries.
- **Observability**: structured logs + audit metadata + failure capture.
- **Delivery isolation**: non-critical emails should not roll back core writes.

## Recommended Implementation Order

1. `support-response` (lowest orchestration complexity, high user value).
2. `communication-new-message` + `communication-reply-notification`.
3. Project lifecycle notifications (event model required).
4. Onboarding scope notifications.
5. Notification digests (`notification-weekly-summary`) with scheduler.
6. `auth-password-reset` only if moving away from Supabase hosted reset email.

## Definition of Done for Each Template

- Imported from live code path.
- Sent via shared `lib/email/send.ts` utility.
- Subject constant used (no hardcoded subject in sender).
- Recipient and preference rules documented.
- Retry/idempotency strategy documented.
- Build passes and template export passes.
