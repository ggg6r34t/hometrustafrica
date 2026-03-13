# HomeTrust Africa Dashboard Docs

The HomeTrust Africa dashboard is the authenticated client portal for diaspora users managing real projects back home. It combines project visibility, financial oversight, document access, secure messaging, notifications, and support in one invite-only workspace.

This documentation set is the canonical reference for the dashboard implementation. It is written for founders, product leads, developers, operators, and future contributors who need to understand what the product does today and how it is built.

## Who This Portal Is For

- Diaspora clients tracking active and archived projects
- Internal HomeTrust Africa team members supporting delivery
- Admin and operations stakeholders overseeing access, workflow, and auditability

## What These Docs Cover

- [Product overview](./overview.md)
- [Architecture](./architecture.md)
- [Routes and pages](./routes-and-pages.md)
- [Authentication](./authentication.md)
- [Authorization and RLS](./authorization-and-rls.md)
- [Feature docs](./features/dashboard-overview.md)
- [Data model](./data-model.md)
- [Server actions](./server-actions.md)
- [Supabase implementation](./supabase.md)
- [Local development](./local-development.md)
- [Seed data](./seed-data.md)
- [Operational notes](./operational-notes.md)
- [Known gaps and future improvements](./known-gaps-and-future-improvements.md)

## Implementation Snapshot

- Frontend: Next.js App Router, TypeScript, React Server Components by default, shadcn/ui
- Backend patterns: server actions, server-side route guards, Supabase SSR auth
- Data layer: Supabase Postgres, seeded auth-linked records, Row Level Security
- Auth model: invite-only login with accept-invite and reset-password flows
- Main product route: `/dashboard`

## Recommended Reading Order

1. [overview.md](./overview.md)
2. [architecture.md](./architecture.md)
3. [authentication.md](./authentication.md)
4. [authorization-and-rls.md](./authorization-and-rls.md)
5. [routes-and-pages.md](./routes-and-pages.md)
6. Feature docs for the area you are working on
