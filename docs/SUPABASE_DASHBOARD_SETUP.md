# Supabase Dashboard Setup

## Local development

1. Install the Supabase CLI.
2. Start Supabase locally with `supabase start`.
3. Apply schema and seed data with `supabase db reset`.
4. Copy the local Supabase URL, anon key, and service role key into `.env.local`.
5. Keep `DASHBOARD_ALLOW_DEV_IMPERSONATION=true` and set `DASHBOARD_DEV_USER_EMAIL` to one of the seeded users.
6. Run the app with `npm run dev`.

## Seeded users

- `client.adebayo@hometrust.local`
- `client.okafor@hometrust.local`
- `client.sule@hometrust.local`
- `client.ebi@hometrust.local`
- `team.balogun@hometrust.local`
- `team.onyeka@hometrust.local`
- `ops.adeyemi@hometrust.local`
- `admin@hometrust.local`

All seeded users use the password `HomeTrust123!`.

## Auth strategy

- Production expects Supabase Auth cookies and uses the SSR server client.
- Local and preview environments can use `DASHBOARD_DEV_USER_EMAIL` to safely impersonate one seeded user server-side when browser auth is not wired yet.
- The dev impersonation path is disabled automatically when `NODE_ENV=production`.

## Verification

- Run `supabase db reset` and confirm `supabase/seed.sql` loads without errors.
- Open `/dashboard` with `DASHBOARD_DEV_USER_EMAIL=client.adebayo@hometrust.local` and verify live data appears.
- Switch `DASHBOARD_DEV_USER_EMAIL` to `team.balogun@hometrust.local` and confirm the project scope changes.
- Run `supabase/tests/dashboard_rls_smoke.sql` against the local database to spot-check RLS behavior.

## Notes

- Storage is configured as a private `project-assets` bucket. The app generates signed URLs server-side after database authorization passes.
- The schema and policies are migration-driven. Use new SQL migrations for future changes rather than editing seed data ad hoc.
