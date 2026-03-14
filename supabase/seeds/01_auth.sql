-- Batch 1: auth-linked records.
-- Run this after provisioning auth users through the Admin API.
-- Recommended command: `npm run seed:auth-users`
-- Test password for all active seeded users: HomeTrust123!

do $$
declare
  missing_emails text[];
begin
  select coalesce(array_agg(seed_email), '{}')
  into missing_emails
  from (
    select unnest(array[
      'client.adebayo@hometrust.local',
      'client.okafor@hometrust.local',
      'client.sule@hometrust.local',
      'client.ebi@hometrust.local',
      'team.balogun@hometrust.local',
      'team.onyeka@hometrust.local',
      'ops.adeyemi@hometrust.local',
      'admin@hometrust.local',
      'client.invited@hometrust.local'
    ]) as seed_email
  ) seeded
  where public.seed_user_uuid(seeded.seed_email) is null;

  if array_length(missing_emails, 1) is not null then
    raise exception
      using message = 'Seed auth users are missing. Run `npm run seed:auth-users` first.',
            detail = 'Missing emails: ' || array_to_string(missing_emails, ', ');
  end if;
end $$;

update public.profiles
set
  phone = case id
    when public.seed_user_uuid('client.adebayo@hometrust.local') then '+44 7700 900100'
    when public.seed_user_uuid('client.okafor@hometrust.local') then '+1 917 555 0142'
    when public.seed_user_uuid('client.sule@hometrust.local') then '+49 151 555 8080'
    when public.seed_user_uuid('client.ebi@hometrust.local') then '+31 620 555 020'
    when public.seed_user_uuid('team.balogun@hometrust.local') then '+234 803 555 1001'
    when public.seed_user_uuid('team.onyeka@hometrust.local') then '+234 803 555 1002'
    when public.seed_user_uuid('ops.adeyemi@hometrust.local') then '+234 803 555 1003'
    when public.seed_user_uuid('admin@hometrust.local') then '+234 803 555 1004'
  end,
  diaspora_country = case id
    when public.seed_user_uuid('client.adebayo@hometrust.local') then 'United Kingdom'
    when public.seed_user_uuid('client.okafor@hometrust.local') then 'United States'
    when public.seed_user_uuid('client.sule@hometrust.local') then 'Germany'
    when public.seed_user_uuid('client.ebi@hometrust.local') then 'Netherlands'
    else 'Nigeria'
  end,
  base_country = 'Nigeria',
  preferred_contact_method = case id
    when public.seed_user_uuid('client.adebayo@hometrust.local') then 'whatsapp'::public.contact_method
    when public.seed_user_uuid('client.okafor@hometrust.local') then 'email'::public.contact_method
    when public.seed_user_uuid('client.sule@hometrust.local') then 'phone'::public.contact_method
    when public.seed_user_uuid('client.ebi@hometrust.local') then 'email'::public.contact_method
    else 'email'::public.contact_method
  end,
  two_factor_enabled = id in (public.seed_user_uuid('ops.adeyemi@hometrust.local'), public.seed_user_uuid('admin@hometrust.local')),
  last_sign_in_at = now() - interval '2 hours'
where id in (
  public.seed_user_uuid('client.adebayo@hometrust.local'),
  public.seed_user_uuid('client.okafor@hometrust.local'),
  public.seed_user_uuid('client.sule@hometrust.local'),
  public.seed_user_uuid('client.ebi@hometrust.local'),
  public.seed_user_uuid('team.balogun@hometrust.local'),
  public.seed_user_uuid('team.onyeka@hometrust.local'),
  public.seed_user_uuid('ops.adeyemi@hometrust.local'),
  public.seed_user_uuid('admin@hometrust.local')
);

insert into public.user_roles (user_id, role)
values
  (public.seed_user_uuid('client.adebayo@hometrust.local'), 'CLIENT'),
  (public.seed_user_uuid('client.okafor@hometrust.local'), 'CLIENT'),
  (public.seed_user_uuid('client.sule@hometrust.local'), 'CLIENT'),
  (public.seed_user_uuid('client.ebi@hometrust.local'), 'CLIENT'),
  (public.seed_user_uuid('team.balogun@hometrust.local'), 'TEAM_MEMBER'),
  (public.seed_user_uuid('team.onyeka@hometrust.local'), 'TEAM_MEMBER'),
  (public.seed_user_uuid('ops.adeyemi@hometrust.local'), 'OPERATIONS_MANAGER'),
  (public.seed_user_uuid('admin@hometrust.local'), 'ADMIN'),
  (public.seed_user_uuid('client.invited@hometrust.local'), 'CLIENT')
on conflict (user_id, role) do nothing;

insert into public.team_memberships (id, user_id, department, title, region, active)
values
  ('90000000-0000-0000-0000-000000000001', public.seed_user_uuid('team.balogun@hometrust.local'), 'Project Delivery', 'Senior Project Manager', 'Lagos', true),
  ('90000000-0000-0000-0000-000000000002', public.seed_user_uuid('team.onyeka@hometrust.local'), 'Field Operations', 'Regional Operations Coordinator', 'South West', true),
  ('90000000-0000-0000-0000-000000000003', public.seed_user_uuid('ops.adeyemi@hometrust.local'), 'Operations', 'Operations Manager', 'National', true)
on conflict (id) do update set title = excluded.title, region = excluded.region, active = excluded.active;
