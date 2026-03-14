-- Batch 0: shared helpers for local and preview seed data.

create or replace function public.seed_user_uuid(user_email text)
returns uuid
language sql
stable
as $$
  select id
  from auth.users
  where email = user_email
  limit 1
$$;
