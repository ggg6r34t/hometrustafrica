create table if not exists public.newsletter_broadcast_drafts (
  id uuid primary key default gen_random_uuid(),
  campaign_name text not null check (char_length(trim(campaign_name)) between 3 and 120),
  subject text not null check (char_length(trim(subject)) between 3 and 140),
  preview_text text check (preview_text is null or char_length(trim(preview_text)) <= 160),
  title text not null check (char_length(trim(title)) between 3 and 120),
  intro text not null check (char_length(trim(intro)) between 10 and 500),
  body text not null check (char_length(trim(body)) between 20 and 5000),
  cta_label text check (cta_label is null or char_length(trim(cta_label)) <= 60),
  cta_url text,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  last_tested_by uuid references public.profiles(id) on delete set null,
  last_tested_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint newsletter_broadcast_drafts_cta_pair check (
    (cta_label is null and cta_url is null)
    or (cta_label is not null and cta_url is not null)
  )
);

create index if not exists newsletter_broadcast_drafts_updated_at_idx
  on public.newsletter_broadcast_drafts (updated_at desc);

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_newsletter_broadcast_drafts_updated_at'
  ) then
    create trigger set_newsletter_broadcast_drafts_updated_at
    before update on public.newsletter_broadcast_drafts
    for each row
    execute function public.set_current_timestamp_updated_at();
  end if;
end $$;

alter table public.newsletter_broadcast_drafts enable row level security;
alter table public.newsletter_broadcast_drafts force row level security;

create policy "newsletter_broadcast_drafts_select_adminish"
on public.newsletter_broadcast_drafts
for select to authenticated
using (public.is_adminish());

create policy "newsletter_broadcast_drafts_insert_adminish"
on public.newsletter_broadcast_drafts
for insert to authenticated
with check (public.is_adminish());

create policy "newsletter_broadcast_drafts_update_adminish"
on public.newsletter_broadcast_drafts
for update to authenticated
using (public.is_adminish())
with check (public.is_adminish());

create policy "newsletter_broadcast_drafts_delete_adminish"
on public.newsletter_broadcast_drafts
for delete to authenticated
using (public.is_adminish());