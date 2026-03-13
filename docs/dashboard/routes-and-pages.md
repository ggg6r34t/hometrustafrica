# Routes And Pages

This document lists the current implemented route surface for the dashboard and auth flows.

## Auth Routes

| Route | Purpose | Notes |
| --- | --- | --- |
| `/login` | Email/password sign-in | Invite-only posture. No signup route exists. |
| `/accept-invite` | Invite acceptance and password set | Driven by a `portal_invites` token. |
| `/reset-password` | Request reset or complete reset | Uses Supabase recovery flow. |
| `/logout` | Sign out | Implemented as a route handler. |

## Dashboard Root

| Route | Purpose | Key Data | Notes |
| --- | --- | --- | --- |
| `/dashboard` | Overview of active projects, actions, activity, reports, inbox, and budget snapshots | overview aggregates, notifications, projects | Requires authenticated session. |
| `/dashboard/projects` | Searchable project listing | projects, filters | Scope is role-aware and project-limited. |
| `/dashboard/inbox` | Secure conversation list | conversations, unread counts | Search is query-param driven. |
| `/dashboard/notifications` | Notification center | notifications, read state | Supports mark-all-read and type filtering. |
| `/dashboard/support` | Support entry point | support threads, support request form | Shows open support threads and escalation guidance. |
| `/dashboard/settings` | Settings index | none | Redirects to `/dashboard/settings/profile`. |

## Project Routes

| Route | Purpose | Key Data | Notes |
| --- | --- | --- | --- |
| `/dashboard/projects/[projectId]` | Project overview / mission control | detail, timeline, reports, files, budget, approvals, team | Protected by project authorization guard. |
| `/dashboard/projects/[projectId]/timeline` | Chronological project feed | timeline events | Client-safe items only. |
| `/dashboard/projects/[projectId]/reports` | Report hub | report list, report filters | Filterable by query params. |
| `/dashboard/projects/[projectId]/reports/[reportId]` | Report detail | report sections, attachments | Added during remediation. |
| `/dashboard/projects/[projectId]/files` | Document room | files, category/uploader filters | Supports secure preview and download. |
| `/dashboard/projects/[projectId]/budget` | Financial summary | budget, transactions, approvals | Includes approval queue. |
| `/dashboard/projects/[projectId]/team` | Client-visible team contacts | project contacts | Internal-only data is not exposed. |

## Inbox And Support Detail Routes

| Route | Purpose | Key Data | Notes |
| --- | --- | --- | --- |
| `/dashboard/inbox/[threadId]` | Conversation detail and reply flow | participants, messages | Marks the thread as read when loaded. |
| `/dashboard/support/[threadId]` | Support thread detail and reply flow | support messages | Separate from general inbox for escalation-oriented support. |

## Settings Routes

| Route | Purpose | Notes |
| --- | --- | --- |
| `/dashboard/settings/profile` | Profile data | Name, email, phone, country, contact method |
| `/dashboard/settings/security` | Password and security summary | Password rotation, session/security summary |
| `/dashboard/settings/notifications` | Notification preferences | Email and in-app preference toggles |
| `/dashboard/settings/preferences` | Workspace preferences | Timezone, currency, density |

## Permissions Notes

- All dashboard routes require an authenticated session.
- Project routes also require project-level authorization.
- Database reads are additionally protected by Supabase RLS.
- Route presence does not imply broad access. Visibility remains scoped by role and assignment.
