# Local Development

## Prerequisites

- Node.js and project dependencies installed
- Supabase CLI installed
- local `.env.local` populated with Supabase keys

## Local Setup Flow

1. Start Supabase locally with `supabase start`
2. Reset and seed the database with `supabase db reset`
3. Set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000`
4. Run `npm run dev`
5. Open `/login`

## Seeded Login Accounts

All active seeded users use the password `HomeTrust123!`.

- `client.adebayo@hometrust.local`
- `client.okafor@hometrust.local`
- `client.sule@hometrust.local`
- `client.ebi@hometrust.local`
- `team.balogun@hometrust.local`
- `team.onyeka@hometrust.local`
- `ops.adeyemi@hometrust.local`
- `admin@hometrust.local`

## Invite Flow Testing

The local seed includes a pending invite for:

- `client.invited@hometrust.local`

Use:

- `/accept-invite?token=hometrust-local-invite-token`

to test the invite activation flow after seeding.

## Optional Dev Impersonation

Dev impersonation is still available, but only when:

- `NODE_ENV=development`
- `DASHBOARD_ALLOW_DEV_IMPERSONATION=true`
- `DASHBOARD_DEV_USER_EMAIL` is set

This is for local debugging only and is not the primary development flow anymore.

## Troubleshooting

### Login fails

- confirm local Supabase is running
- confirm `.env.local` points to the local stack
- confirm `auth.users` was seeded through `supabase db reset`

### Invite page says token is invalid

- confirm the new `portal_invites` migration has been applied
- confirm the token matches the seeded local token exactly

### Files do not preview

- the metadata may exist even if the storage object is not present
- signed URL generation also requires valid storage configuration

See the existing [docs/SUPABASE_DASHBOARD_SETUP.md](../SUPABASE_DASHBOARD_SETUP.md) for the low-level Supabase setup notes that predate this documentation set.
