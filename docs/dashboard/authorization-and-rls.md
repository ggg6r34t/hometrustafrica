# Authorization And RLS

## Roles

The current system recognizes these application roles:

- `CLIENT`
- `TEAM_MEMBER`
- `OPERATIONS_MANAGER`
- `ADMIN`

Role priority is resolved in the database and mirrored in the app session model.

## Authorization Model

Authorization happens in two layers:

### 1. App-layer guards

- `requireDashboardSession()` blocks unauthenticated access
- `requireAuthorizedProject(projectId)` blocks project access when the user is out of scope
- server actions verify authenticated session and, where needed, role or target ownership

### 2. Database-layer RLS

Row Level Security is enabled and forced on user-facing tables. This protects browser/database access even if application code is bypassed.

## Project Scoping Rules

### Client

Clients can access:

- projects linked through `client_account_members`
- client-visible milestones, timeline events, reports, files, approvals, and support data for those projects
- conversations and notifications where they are participants or recipients
- their own settings and preference records

Clients cannot access:

- unrelated projects
- internal-only project contacts
- non-client-visible timeline/report/file rows
- other users’ notifications or support threads

### Team member

Team members can access:

- projects they are assigned to
- scoped project records allowed by `user_can_edit_project`
- conversations they participate in

### Operations manager / admin

These roles have broader oversight through explicit policies and helper functions such as `is_adminish()`. They do not rely on public wildcard read/write access.

## Important Helper Functions

The base schema defines helper functions used in RLS, including:

- `current_app_role()`
- `is_adminish()`
- `user_has_project_access(uuid)`
- `user_can_edit_project(uuid)`
- `user_has_conversation_access(uuid)`
- `user_has_support_access(uuid)`
- `user_can_access_storage_object(bucket, path)`

## Tables Protected By RLS

Core protected tables include:

- profiles and role tables
- projects and project-related entities
- reports, report sections, files, receipts, contracts, media assets
- budgets, transactions, approval requests
- conversations, messages, notification tables
- support threads and support messages
- audit logs
- portal invites

## Storage Authorization

Files are stored in a private `project-assets` bucket. Storage object access is controlled by a database function that maps the bucket object back to a `files` row and verifies project scope.

## Practical Security Notes

- The app often uses the request-scoped Supabase client for reads so RLS is active.
- Admin client usage is reserved for server-only flows such as invite provisioning, audit persistence, signed URLs, and specific secured mutations.
- The current implementation is intentionally server-trusting, not client-trusting.
