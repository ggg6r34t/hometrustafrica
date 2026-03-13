# Server Actions

## Why Server Actions Are Used

The dashboard prefers server actions for mutations so that validation, authorization, audit behavior, and revalidation stay close to the server-side execution path.

## Auth Actions

Implemented in `app/actions/auth.ts`.

### `loginAction`

- validates credentials
- signs in with Supabase
- redirects to `next` or `/dashboard`

### `requestPasswordResetAction`

- validates email
- sends Supabase reset flow email

### `acceptInviteAction`

- validates invite token and password
- activates the invite
- updates profile details
- signs the user in

### `logoutAction`

- signs the user out and redirects to `/login`

### `sendPortalInviteAction`

- internal server-side invite foundation
- restricted to admin/operations roles
- provisions a user and `portal_invites` record
- sends a Resend invite email when configured

## Dashboard Actions

Implemented in `app/actions/dashboard.ts`.

### Settings

- `updateProfileAction`
- `updateSecurityAction`
- `updateNotificationsAction`
- `updatePreferencesAction`

### Communication

- `sendMessageAction`
- `requestSupportAction`
- `replySupportThreadAction`

### Notifications

- `markNotificationsReadAction`

### Approvals

- `resolveApprovalAction`

## Validation Behavior

- Zod schemas validate incoming form data
- actions return structured success/error states for client form feedback

## Authorization Behavior

- most actions begin with `requireDashboardSession()`
- repository methods perform scoped reads before write decisions
- sensitive flows such as invites and approval resolution use server-only clients with explicit checks

## Revalidation Pattern

After mutation, relevant dashboard paths are revalidated so the server-rendered UI stays consistent.
