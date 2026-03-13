create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('CLIENT', 'TEAM_MEMBER', 'OPERATIONS_MANAGER', 'ADMIN');
  end if;
  if not exists (select 1 from pg_type where typname = 'project_status') then
    create type public.project_status as enum ('PLANNING', 'ACTIVE', 'AT_RISK', 'ON_HOLD', 'COMPLETED', 'ARCHIVED');
  end if;
  if not exists (select 1 from pg_type where typname = 'project_health') then
    create type public.project_health as enum ('healthy', 'watch', 'critical');
  end if;
  if not exists (select 1 from pg_type where typname = 'milestone_status') then
    create type public.milestone_status as enum ('pending', 'in_progress', 'completed', 'blocked');
  end if;
  if not exists (select 1 from pg_type where typname = 'timeline_event_type') then
    create type public.timeline_event_type as enum ('milestone', 'report', 'file', 'approval', 'message', 'budget', 'assignment', 'status');
  end if;
  if not exists (select 1 from pg_type where typname = 'report_type') then
    create type public.report_type as enum ('Progress Report', 'Site Verification', 'Budget Report', 'Procurement Report', 'Compliance Report', 'Inspection Report');
  end if;
  if not exists (select 1 from pg_type where typname = 'file_category') then
    create type public.file_category as enum ('Document', 'Photo', 'Video', 'Receipt', 'Contract');
  end if;
  if not exists (select 1 from pg_type where typname = 'approval_status') then
    create type public.approval_status as enum ('pending', 'approved', 'rejected', 'cancelled');
  end if;
  if not exists (select 1 from pg_type where typname = 'transaction_status') then
    create type public.transaction_status as enum ('approved', 'pending', 'flagged');
  end if;
  if not exists (select 1 from pg_type where typname = 'conversation_kind') then
    create type public.conversation_kind as enum ('project', 'support', 'general');
  end if;
  if not exists (select 1 from pg_type where typname = 'notification_type') then
    create type public.notification_type as enum ('report_uploaded', 'milestone_completed', 'approval_needed', 'new_message', 'budget_threshold', 'document_added', 'security');
  end if;
  if not exists (select 1 from pg_type where typname = 'contact_method') then
    create type public.contact_method as enum ('email', 'phone', 'whatsapp');
  end if;
  if not exists (select 1 from pg_type where typname = 'preference_density') then
    create type public.preference_density as enum ('comfortable', 'compact');
  end if;
  if not exists (select 1 from pg_type where typname = 'support_priority') then
    create type public.support_priority as enum ('standard', 'priority', 'urgent');
  end if;
end $$;

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.role_priority(target_role public.app_role)
returns integer
language sql
immutable
as $$
  select case target_role
    when 'ADMIN' then 4
    when 'OPERATIONS_MANAGER' then 3
    when 'TEAM_MEMBER' then 2
    else 1
  end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  diaspora_country text,
  base_country text,
  preferred_contact_method public.contact_method not null default 'email',
  avatar_url text,
  two_factor_enabled boolean not null default false,
  last_sign_in_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, role)
);

create table if not exists public.client_accounts (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  display_name text not null,
  primary_country text not null,
  status text not null default 'active' check (status in ('active', 'inactive', 'prospect')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.client_account_members (
  id uuid primary key default gen_random_uuid(),
  client_account_id uuid not null references public.client_accounts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  unique (client_account_id, user_id)
);

create table if not exists public.team_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  department text not null,
  title text not null,
  region text,
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, department, title)
);

create table if not exists public.user_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  timezone text not null default 'UTC',
  currency_code text not null default 'USD' check (char_length(currency_code) between 3 and 10),
  density public.preference_density not null default 'comfortable',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.notification_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  email_reports boolean not null default true,
  email_milestones boolean not null default true,
  email_budget_alerts boolean not null default true,
  email_messages boolean not null default true,
  in_app_reports boolean not null default true,
  in_app_milestones boolean not null default true,
  in_app_budget_alerts boolean not null default true,
  in_app_messages boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_types (
  code text primary key,
  label text not null unique,
  category text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_account_id uuid not null references public.client_accounts(id) on delete restrict,
  project_type_code text not null references public.project_types(code) on delete restrict,
  name text not null,
  slug text not null unique,
  description text,
  location_city text,
  location_state text,
  location_country text not null default 'Nigeria',
  site_address text,
  status public.project_status not null default 'PLANNING',
  health public.project_health not null default 'healthy',
  stage_label text not null,
  completion_percentage integer not null default 0 check (completion_percentage between 0 and 100),
  currency_code text not null default 'USD' check (char_length(currency_code) between 3 and 10),
  overall_budget numeric(14,2) not null default 0 check (overall_budget >= 0),
  start_date date,
  target_completion_date date,
  archived_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_assignments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null,
  label text not null,
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  unique (project_id, user_id, label)
);

create table if not exists public.project_contacts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  full_name text not null,
  role_label text not null,
  email text,
  phone text,
  availability_note text,
  is_client_visible boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_status_history (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  previous_status public.project_status,
  new_status public.project_status not null,
  changed_by uuid references public.profiles(id) on delete set null,
  note text,
  changed_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  due_at timestamptz,
  completed_at timestamptz,
  status public.milestone_status not null default 'pending',
  sort_order integer not null default 0,
  visible_to_client boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.timeline_events (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  event_type public.timeline_event_type not null,
  title text not null,
  summary text not null,
  actor_user_id uuid references public.profiles(id) on delete set null,
  actor_name_override text,
  client_visible boolean not null default true,
  related_table text,
  related_record_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  status public.approval_status not null default 'pending',
  client_visible boolean not null default true,
  requested_by uuid references public.profiles(id) on delete set null,
  requested_from_user_id uuid references public.profiles(id) on delete set null,
  due_at timestamptz,
  approved_at timestamptz,
  resolved_by uuid references public.profiles(id) on delete set null,
  resolution_note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  report_type public.report_type not null,
  reporting_period_label text not null,
  summary text not null,
  uploaded_by uuid not null references public.profiles(id) on delete restrict,
  uploaded_at timestamptz not null default timezone('utc', now()),
  client_visible boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.report_sections (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  section_title text not null,
  body text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.file_categories (
  code public.file_category primary key,
  label text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  category_code public.file_category not null references public.file_categories(code) on delete restrict,
  name text not null,
  description text,
  storage_bucket text not null default 'project-assets',
  storage_path text not null,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  uploaded_by uuid not null references public.profiles(id) on delete restrict,
  uploaded_at timestamptz not null default timezone('utc', now()),
  client_visible boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (storage_bucket, storage_path)
);

create table if not exists public.report_attachments (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  file_id uuid not null references public.files(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  unique (report_id, file_id)
);

create table if not exists public.receipts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  file_id uuid not null unique references public.files(id) on delete cascade,
  vendor_name text not null,
  receipt_number text,
  receipt_date date,
  amount numeric(14,2) not null check (amount >= 0),
  currency_code text not null default 'USD',
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  file_id uuid not null unique references public.files(id) on delete cascade,
  counterparty_name text not null,
  effective_date date,
  expires_at date,
  status text not null default 'active' check (status in ('draft', 'active', 'expired', 'terminated')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  file_id uuid not null unique references public.files(id) on delete cascade,
  media_kind text not null check (media_kind in ('photo', 'video')),
  captured_at timestamptz,
  caption text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.project_budgets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects(id) on delete cascade,
  budget_name text not null,
  currency_code text not null default 'USD',
  allocated_amount numeric(14,2) not null default 0 check (allocated_amount >= 0),
  spent_amount numeric(14,2) not null default 0 check (spent_amount >= 0),
  reserved_amount numeric(14,2) not null default 0 check (reserved_amount >= 0),
  contingency_amount numeric(14,2) not null default 0 check (contingency_amount >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.budget_categories (
  id uuid primary key default gen_random_uuid(),
  budget_id uuid not null references public.project_budgets(id) on delete cascade,
  label text not null,
  allocated_amount numeric(14,2) not null default 0 check (allocated_amount >= 0),
  spent_amount numeric(14,2) not null default 0 check (spent_amount >= 0),
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (budget_id, label)
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  budget_category_id uuid references public.budget_categories(id) on delete set null,
  description text not null,
  vendor_name text,
  amount numeric(14,2) not null check (amount >= 0),
  currency_code text not null default 'USD',
  status public.transaction_status not null default 'pending',
  occurred_at timestamptz not null default timezone('utc', now()),
  created_by uuid references public.profiles(id) on delete set null,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.transaction_receipts (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.transactions(id) on delete cascade,
  receipt_id uuid not null references public.receipts(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  unique (transaction_id, receipt_id)
);

create table if not exists public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  transaction_id uuid references public.transactions(id) on delete set null,
  approval_id uuid references public.approvals(id) on delete set null,
  title text not null,
  description text,
  status public.approval_status not null default 'pending',
  client_visible boolean not null default true,
  requested_by uuid references public.profiles(id) on delete set null,
  requested_for_user_id uuid references public.profiles(id) on delete set null,
  amount numeric(14,2) check (amount is null or amount >= 0),
  currency_code text,
  due_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  subject text not null,
  kind public.conversation_kind not null default 'project',
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.conversation_participants (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  last_read_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  unique (conversation_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_user_id uuid not null references public.profiles(id) on delete restrict,
  body text not null,
  sent_at timestamptz not null default timezone('utc', now()),
  edited_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.message_attachments (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  file_id uuid not null references public.files(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  unique (message_id, file_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete cascade,
  type public.notification_type not null,
  title text not null,
  body text not null,
  href text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.notification_reads (
  id uuid primary key default gen_random_uuid(),
  notification_id uuid not null references public.notifications(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  read_at timestamptz not null default timezone('utc', now()),
  unique (notification_id, user_id)
);

create table if not exists public.support_threads (
  id uuid primary key default gen_random_uuid(),
  client_account_id uuid references public.client_accounts(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  subject text not null,
  priority public.support_priority not null default 'standard',
  status text not null default 'open' check (status in ('open', 'in_progress', 'closed')),
  created_by uuid not null references public.profiles(id) on delete restrict,
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  support_thread_id uuid not null references public.support_threads(id) on delete cascade,
  sender_user_id uuid not null references public.profiles(id) on delete restrict,
  body text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.profiles(id) on delete set null,
  actor_role public.app_role,
  action text not null,
  target_type text not null,
  target_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_role public.app_role;
begin
  target_role := coalesce((new.raw_user_meta_data ->> 'role')::public.app_role, 'CLIENT');

  insert into public.profiles (id, full_name, email, preferred_contact_method, last_sign_in_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email,
    'email',
    new.last_sign_in_at
  )
  on conflict (id) do update
  set full_name = excluded.full_name,
      email = excluded.email,
      last_sign_in_at = excluded.last_sign_in_at,
      updated_at = timezone('utc', now());

  insert into public.user_roles (user_id, role)
  values (new.id, target_role)
  on conflict (user_id, role) do nothing;

  insert into public.user_preferences (user_id) values (new.id)
  on conflict (user_id) do nothing;

  insert into public.notification_preferences (user_id) values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert or update on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select case
    when auth.uid() is null then null
    else (
      select role
      from public.user_roles
      where user_id = auth.uid()
      order by public.role_priority(role) desc
      limit 1
    )
  end;
$$;

create or replace function public.is_adminish()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role in ('ADMIN', 'OPERATIONS_MANAGER')
  );
$$;

create or replace function public.user_has_project_access(target_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    auth.uid() is not null
    and (
      public.is_adminish()
      or exists (
        select 1
        from public.project_assignments
        where project_id = target_project_id
          and user_id = auth.uid()
      )
      or exists (
        select 1
        from public.projects p
        join public.client_account_members cam on cam.client_account_id = p.client_account_id
        where p.id = target_project_id
          and cam.user_id = auth.uid()
      )
    );
$$;

create or replace function public.user_can_edit_project(target_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    auth.uid() is not null
    and (
      public.is_adminish()
      or exists (
        select 1
        from public.project_assignments
        where project_id = target_project_id
          and user_id = auth.uid()
          and role in ('TEAM_MEMBER', 'OPERATIONS_MANAGER', 'ADMIN')
      )
    );
$$;

create or replace function public.user_has_conversation_access(target_conversation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    auth.uid() is not null
    and (
      public.is_adminish()
      or exists (
        select 1
        from public.conversation_participants
        where conversation_id = target_conversation_id
          and user_id = auth.uid()
      )
    );
$$;

create or replace function public.user_has_support_access(target_thread_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    auth.uid() is not null
    and (
      public.is_adminish()
      or exists (
        select 1
        from public.support_threads st
        where st.id = target_thread_id
          and (st.created_by = auth.uid() or st.assigned_to = auth.uid())
      )
      or exists (
        select 1
        from public.support_threads st
        join public.client_account_members cam on cam.client_account_id = st.client_account_id
        where st.id = target_thread_id
          and cam.user_id = auth.uid()
      )
    );
$$;

create or replace function public.user_has_notification_access(target_notification_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.notifications
    where id = target_notification_id
      and user_id = auth.uid()
  );
$$;

create or replace function public.user_can_access_storage_object(target_bucket text, target_path text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.files f
    where f.storage_bucket = target_bucket
      and f.storage_path = target_path
      and public.user_has_project_access(f.project_id)
      and (
        coalesce(public.current_app_role() <> 'CLIENT', false)
        or f.client_visible
      )
  );
$$;

grant execute on function public.current_app_role() to authenticated;
grant execute on function public.is_adminish() to authenticated;
grant execute on function public.user_has_project_access(uuid) to authenticated;
grant execute on function public.user_can_edit_project(uuid) to authenticated;
grant execute on function public.user_has_conversation_access(uuid) to authenticated;
grant execute on function public.user_has_support_access(uuid) to authenticated;
grant execute on function public.user_has_notification_access(uuid) to authenticated;
grant execute on function public.user_can_access_storage_object(text, text) to authenticated;

create index if not exists idx_user_roles_user_id on public.user_roles(user_id);
create index if not exists idx_client_account_members_user_id on public.client_account_members(user_id);
create index if not exists idx_projects_client_account on public.projects(client_account_id);
create index if not exists idx_projects_status on public.projects(status, updated_at desc);
create index if not exists idx_project_assignments_project_user on public.project_assignments(project_id, user_id);
create index if not exists idx_project_contacts_project on public.project_contacts(project_id);
create index if not exists idx_project_status_history_project on public.project_status_history(project_id, changed_at desc);
create index if not exists idx_milestones_project_due on public.milestones(project_id, due_at);
create index if not exists idx_timeline_events_project_occurred on public.timeline_events(project_id, occurred_at desc);
create index if not exists idx_reports_project_uploaded on public.reports(project_id, uploaded_at desc);
create index if not exists idx_files_project_uploaded on public.files(project_id, uploaded_at desc);
create index if not exists idx_project_budgets_project on public.project_budgets(project_id);
create index if not exists idx_budget_categories_budget on public.budget_categories(budget_id, sort_order);
create index if not exists idx_transactions_project_occurred on public.transactions(project_id, occurred_at desc);
create index if not exists idx_approval_requests_project_status on public.approval_requests(project_id, status);
create index if not exists idx_conversations_project_updated on public.conversations(project_id, updated_at desc);
create index if not exists idx_conversation_participants_user on public.conversation_participants(user_id, conversation_id);
create index if not exists idx_messages_conversation_sent on public.messages(conversation_id, sent_at desc);
create index if not exists idx_notifications_user_created on public.notifications(user_id, created_at desc);
create index if not exists idx_notification_reads_user on public.notification_reads(user_id, notification_id);
create index if not exists idx_support_threads_client_created on public.support_threads(client_account_id, created_at desc);
create index if not exists idx_support_messages_thread_created on public.support_messages(support_thread_id, created_at asc);
create index if not exists idx_audit_logs_actor_created on public.audit_logs(actor_user_id, created_at desc);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at before update on public.profiles for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_client_accounts_updated_at on public.client_accounts;
create trigger set_client_accounts_updated_at before update on public.client_accounts for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_user_preferences_updated_at on public.user_preferences;
create trigger set_user_preferences_updated_at before update on public.user_preferences for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_notification_preferences_updated_at on public.notification_preferences;
create trigger set_notification_preferences_updated_at before update on public.notification_preferences for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at before update on public.projects for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_project_contacts_updated_at on public.project_contacts;
create trigger set_project_contacts_updated_at before update on public.project_contacts for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_milestones_updated_at on public.milestones;
create trigger set_milestones_updated_at before update on public.milestones for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_approvals_updated_at on public.approvals;
create trigger set_approvals_updated_at before update on public.approvals for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_reports_updated_at on public.reports;
create trigger set_reports_updated_at before update on public.reports for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_report_sections_updated_at on public.report_sections;
create trigger set_report_sections_updated_at before update on public.report_sections for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_files_updated_at on public.files;
create trigger set_files_updated_at before update on public.files for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_project_budgets_updated_at on public.project_budgets;
create trigger set_project_budgets_updated_at before update on public.project_budgets for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_budget_categories_updated_at on public.budget_categories;
create trigger set_budget_categories_updated_at before update on public.budget_categories for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_transactions_updated_at on public.transactions;
create trigger set_transactions_updated_at before update on public.transactions for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_approval_requests_updated_at on public.approval_requests;
create trigger set_approval_requests_updated_at before update on public.approval_requests for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_conversations_updated_at on public.conversations;
create trigger set_conversations_updated_at before update on public.conversations for each row execute procedure public.set_current_timestamp_updated_at();
drop trigger if exists set_support_threads_updated_at on public.support_threads;
create trigger set_support_threads_updated_at before update on public.support_threads for each row execute procedure public.set_current_timestamp_updated_at();

insert into public.project_types (code, label, category)
values
  ('construction', 'Construction', 'Built Environment'),
  ('business_setup', 'Business Setup', 'Business Operations'),
  ('agriculture', 'Agriculture', 'Agribusiness'),
  ('land_development', 'Land Development', 'Built Environment'),
  ('solar_infrastructure', 'Solar / Infrastructure', 'Infrastructure'),
  ('procurement_logistics', 'Procurement / Logistics', 'Operations'),
  ('other', 'Other', 'General')
on conflict (code) do update set label = excluded.label, category = excluded.category;

insert into public.file_categories (code, label)
values
  ('Document', 'Document'),
  ('Photo', 'Photo'),
  ('Video', 'Video'),
  ('Receipt', 'Receipt'),
  ('Contract', 'Contract')
on conflict (code) do update set label = excluded.label;

insert into storage.buckets (id, name, public, file_size_limit)
values ('project-assets', 'project-assets', false, 52428800)
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit;
