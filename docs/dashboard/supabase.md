# Supabase

## What Supabase Handles

Supabase provides:

- authentication and sessions
- Postgres schema and relationships
- Row Level Security
- private storage bucket authorization
- deterministic local seed data

## Schema Overview

The dashboard schema covers:

- identity and role tables
- project management entities
- reporting and document entities
- finance entities
- messaging and notification entities
- support and audit entities
- invite tracking

The baseline schema lives in:

- `supabase/migrations/20260313230000_dashboard_schema.sql`
- `supabase/migrations/20260313231000_dashboard_rls.sql`
- `supabase/migrations/20260313232000_portal_invites.sql`

## Auth Linkage

- `profiles.id` references `auth.users.id`
- `handle_new_user()` provisions application records when auth users are created or updated
- the app session layer resolves role and profile data after Supabase auth has identified the user

## RLS Overview

RLS is enabled and forced for user-facing tables. Policies are scoped around:

- self ownership
- project access
- conversation participation
- support thread access
- admin/operations oversight where intentionally allowed

See [authorization-and-rls.md](./authorization-and-rls.md) for the behavior-level explanation.

## Seeds

`supabase/seed.sql` creates:

- multiple users across roles
- real projects across multiple categories
- reports, files, budgets, approvals, conversations, notifications, and support threads
- a pending invite token for local invite flow testing

## Local Versus Production Notes

### Local

- seeded users and data make the dashboard immediately usable
- local reset and invite flows depend on `NEXT_PUBLIC_SITE_URL`

### Production

- public signup is disabled
- invite issuance should be performed by internal operations/admin flows only
- email delivery should use verified sending credentials
