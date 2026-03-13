# Supabase Dashboard Setup

## Local development

1. Install the Supabase CLI.
2. Start Supabase locally with `supabase start`.
3. Apply schema and seed data with `supabase db reset`.
4. Copy the local Supabase URL, anon key, and service role key into `.env.local`.
5. Set `NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000` and run the app with `npm run dev`.
6. Sign in through `/login` with one of the seeded users below.
7. Use dev impersonation only if you intentionally need a server-side local override.

## Seeded users

- `client.adebayo@hometrust.local`
- `client.okafor@hometrust.local`
- `client.sule@hometrust.local`
- `client.ebi@hometrust.local`
- `team.balogun@hometrust.local`
- `team.onyeka@hometrust.local`
- `ops.adeyemi@hometrust.local`
- `admin@hometrust.local`
- `client.invited@hometrust.local` (pending invite, not yet activated)

All seeded users use the password `HomeTrust123!`.

## Auth strategy

- Production and development both use Supabase Auth cookies with middleware-backed session refresh.
- Invite acceptance happens through `/accept-invite?token=...` using the seeded `portal_invites` data or live invite issuance.
- Dev impersonation is optional and only active when `NODE_ENV=development`, `DASHBOARD_ALLOW_DEV_IMPERSONATION=true`, and `DASHBOARD_DEV_USER_EMAIL` is set.

## Verification

- Run `supabase db reset` and confirm `supabase/seed.sql` loads without errors.
- Sign in at `/login` with `client.adebayo@hometrust.local` / `HomeTrust123!` and verify live data appears.
- Sign in as `team.balogun@hometrust.local` and confirm the project scope changes.
- Open `/accept-invite?token=hometrust-local-invite-token` after seeding to validate the pending invite path locally.
- Run `supabase/tests/dashboard_rls_smoke.sql` against the local database to spot-check RLS behavior.

## Notes

- Storage is configured as a private `project-assets` bucket. The app generates signed URLs server-side after database authorization passes.
- The schema and policies are migration-driven. Use new SQL migrations for future changes rather than editing seed data ad hoc.
