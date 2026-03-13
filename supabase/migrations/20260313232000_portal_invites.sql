create table if not exists public.portal_invites (
  id uuid primary key default gen_random_uuid(),
  invited_email text not null,
  invited_name text not null,
  invited_role public.app_role not null default 'CLIENT',
  auth_user_id uuid references public.profiles(id) on delete set null,
  invited_by_user_id uuid references public.profiles(id) on delete set null,
  client_account_id uuid references public.client_accounts(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  token_hash text not null unique,
  invited_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz not null,
  last_sent_at timestamptz,
  accepted_at timestamptz,
  revoked_at timestamptz,
  delivery_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (expires_at > invited_at)
);

create index if not exists idx_portal_invites_email_status on public.portal_invites(invited_email, accepted_at, revoked_at);
create index if not exists idx_portal_invites_auth_user on public.portal_invites(auth_user_id);
create index if not exists idx_portal_invites_project on public.portal_invites(project_id, expires_at desc);

alter table public.portal_invites enable row level security;
alter table public.portal_invites force row level security;

create policy "portal_invites_select_admin_or_target" on public.portal_invites
for select to authenticated
using (
  public.is_adminish()
  or invited_by_user_id = auth.uid()
  or auth_user_id = auth.uid()
);

create policy "portal_invites_manage_admin" on public.portal_invites
for all to authenticated
using (public.is_adminish())
with check (public.is_adminish());

drop trigger if exists set_portal_invites_updated_at on public.portal_invites;
create trigger set_portal_invites_updated_at
before update on public.portal_invites
for each row execute procedure public.set_current_timestamp_updated_at();
