# Authentication

## Auth Model

The dashboard uses an invite-only authentication model. There is no public self-signup route.

## Implemented Flows

### Login

- Route: `/login`
- Method: email + password
- Server action: `loginAction`
- Behavior:
  - validates email and password
  - signs in through Supabase SSR server client
  - redirects to the requested `next` destination or `/dashboard`

### Accept invite

- Route: `/accept-invite`
- Entry point: emailed invite link or seeded local invite link
- Server action: `acceptInviteAction`
- Behavior:
  - validates invite token against `portal_invites`
  - rejects expired, revoked, or already accepted invites
  - sets the invited user’s password
  - updates the user profile name
  - signs the user in and redirects to `/dashboard`

### Reset password

- Route: `/reset-password`
- Two states:
  - request a reset link
  - complete reset after Supabase recovery validation
- Behavior:
  - request uses `resetPasswordForEmail`
  - completion verifies the recovery session client-side and updates the password

### Logout

- Route: `/logout`
- Behavior:
  - signs out through Supabase
  - redirects to `/login`

## Session Handling

- Middleware refreshes Supabase auth cookies on protected and auth routes.
- `lib/auth/session.ts` resolves the dashboard session from Supabase auth and profile/role tables.
- Local dev impersonation still exists, but only when `NODE_ENV=development` and the explicit environment flags are enabled.

## Redirect Rules

- Unauthenticated users trying to access `/dashboard/**` are redirected to `/login?next=...`
- Authenticated users visiting `/login`, `/accept-invite`, or `/reset-password` are redirected to `/dashboard`
- Dashboard pages also guard server-side through `requireDashboardSession()`

## Auth/Post-Invite Linkage

`auth.users` is linked to dashboard domain identity through:

- `profiles.id -> auth.users.id`
- `user_roles.user_id -> profiles.id`
- optional `client_account_members` and `project_assignments` rows that determine scope

See [authorization-and-rls.md](./authorization-and-rls.md) for the access model on top of authentication.
