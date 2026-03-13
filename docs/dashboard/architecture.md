# Architecture

## High-Level System Shape

The dashboard is a Next.js App Router application backed by Supabase. Rendering is server-first, access control is enforced both in application code and in the database, and the UI is organized around reusable dashboard components.

## Frontend Structure

### Route groups

- Public marketing pages live under route groups such as `(marketing)` and `(legal)`
- Authenticated product pages live under `app/(app)/dashboard`
- Auth routes live at:
  - `/login`
  - `/accept-invite`
  - `/reset-password`
  - `/logout`

### App shell

The dashboard shell is assembled in the dashboard layout and shared components:

- persistent sidebar navigation
- top bar with breadcrumbs, search, alerts, and project switcher
- nested layouts for project detail and settings areas

The main shell component is `components/dashboard/app-shell.tsx`.

## Backend and Data Layer

### Session and auth

- Supabase SSR cookies are the primary session source
- middleware refreshes auth state for protected and auth routes
- server-side session resolution maps `auth.users` to dashboard roles through `profiles` and `user_roles`

### Repository and service pattern

The dashboard uses a clear service boundary:

- `lib/dashboard/repository.ts` defines the contract
- `lib/dashboard/service.ts` is the application-facing facade
- `lib/dashboard/supabaseRepository.ts` is the concrete data adapter

This keeps route code focused on composition and permission-aware page behavior.

### Server actions

Mutations are handled through server actions rather than API-route-heavy patterns. These actions validate input with Zod, require an authenticated session where appropriate, and usually revalidate affected routes after mutation.

## Supabase Role In The Architecture

Supabase is used for:

- Auth user identity and session handling
- Postgres schema for domain entities
- Row Level Security for browser-facing data protection
- private file metadata and storage authorization checks
- reproducible local development through SQL migrations and seed data

## Route Layout Summary

- `/dashboard` provides client overview and action-required summaries
- `/dashboard/projects` and nested project routes provide project-specific oversight
- `/dashboard/inbox` and `/dashboard/support` handle secure communication
- `/dashboard/settings/*` handles account controls

See [routes-and-pages.md](./routes-and-pages.md) for the full route map.
