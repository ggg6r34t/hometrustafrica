# Feature: Dashboard Overview

## Purpose

The overview page is the client’s operational landing page. It provides a high-signal summary of what matters now without forcing the user to visit every project page first.

## What It Shows

- active projects
- recent activity
- action-required items
- latest reports
- unread conversations
- pending approvals count
- upcoming milestones
- budget snapshots

## Key User Value

- immediate clarity on project portfolio health
- fast routing into the next important task
- confidence that the platform is active and current

## Data Dependencies

- `projects`
- `timeline_events`
- `reports`
- `conversations` and `messages`
- `project_budgets`
- `approval_requests`

## Permissions

Every item on the overview is derived from already-scoped entities. Clients only see projects and related data they are authorized to access.

## Edge Cases

- Empty states are rendered when no recent activity, reports, or unread threads exist.
- If the repository is unconfigured, the UI shows a configuration warning rather than fabricated data.
