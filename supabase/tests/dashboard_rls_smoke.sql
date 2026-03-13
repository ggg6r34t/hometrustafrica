-- Run after `supabase db reset` to sanity-check project scoping manually.
-- Example:
--   supabase db reset
--   psql postgresql://postgres:postgres@127.0.0.1:54322/postgres -f supabase/tests/dashboard_rls_smoke.sql

begin;

set local role authenticated;

select set_config('request.jwt.claim.sub', '11111111-1111-1111-1111-111111111111', true);
select 'client_project_count' as check_name, count(*) as result from public.projects;
select 'client_lekki_visible' as check_name, count(*) as result from public.projects where id = 'b1000000-0000-0000-0000-000000000001';
select 'client_kaduna_visible' as check_name, count(*) as result from public.projects where id = 'b1000000-0000-0000-0000-000000000005';

select set_config('request.jwt.claim.sub', '55555555-5555-5555-5555-555555555555', true);
select 'team_project_count' as check_name, count(*) as result from public.projects;
select 'team_unrelated_project_visible' as check_name, count(*) as result from public.projects where id = 'b1000000-0000-0000-0000-000000000006';

select set_config('request.jwt.claim.sub', '88888888-8888-8888-8888-888888888888', true);
select 'admin_project_count' as check_name, count(*) as result from public.projects;

rollback;
