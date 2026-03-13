# Data Model

## Core Identity Entities

### `profiles`

Application profile metadata linked one-to-one with `auth.users`.

### `user_roles`

Stores dashboard roles and enables role-priority resolution.

### `client_accounts` and `client_account_members`

Model the client organization/account level and link client users to their scoped projects.

## Project Domain

### `projects`

Top-level project records with type, status, health, budget, and location context.

### `project_assignments`

Links internal or client users to specific projects.

### `project_contacts`

Client-facing people and responsibilities for a project.

### `milestones`

Structured checkpoints with due dates, completion state, and client visibility.

### `timeline_events`

Chronological operational feed entries.

### `approvals` and `approval_requests`

Approval domain objects and request metadata used for client decisions and spend governance.

## Reporting And Files

### `reports`

High-level published report records.

### `report_sections`

Ordered long-form content blocks for a report.

### `files`

Document room metadata tied to storage objects.

### `report_attachments`

Join table linking files to reports.

### `receipts`, `contracts`, `media_assets`

Specialized metadata tables layered on top of `files`.

## Finance

### `project_budgets`

Project-level budget container.

### `budget_categories`

Structured financial breakdown rows.

### `transactions`

Spend entries and financial milestones.

### `transaction_receipts`

Join table between transactions and receipt records.

## Messaging And Notifications

### `conversations`

Thread-level communication records.

### `conversation_participants`

Membership and read-state tracking.

### `messages`

Individual conversation messages.

### `notifications` and `notification_reads`

Event notifications and read-state tracking.

## Support And Audit

### `support_threads`

Support and escalation cases.

### `support_messages`

Messages inside a support thread.

### `audit_logs`

Audit trail for important platform events.

### `portal_invites`

Invite issuance and acceptance traceability for invite-only access.
