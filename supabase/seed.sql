-- HomeTrust Africa local and preview seed data.
-- Test password for all seeded users: HomeTrust123!
-- Recommended dev impersonation user: client.adebayo@hometrust.local

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmed_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
values
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', 'client.adebayo@hometrust.local', crypt('HomeTrust123!', gen_salt('bf')), now(), now(), now() - interval '2 hours', '{"provider":"email","providers":["email"]}', '{"full_name":"Kunle Adebayo","role":"CLIENT"}', now() - interval '60 days', now()),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', 'client.okafor@hometrust.local', crypt('HomeTrust123!', gen_salt('bf')), now(), now(), now() - interval '1 day', '{"provider":"email","providers":["email"]}', '{"full_name":"Chioma Okafor","role":"CLIENT"}', now() - interval '54 days', now()),
  ('00000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'authenticated', 'authenticated', 'client.sule@hometrust.local', crypt('HomeTrust123!', gen_salt('bf')), now(), now(), now() - interval '5 hours', '{"provider":"email","providers":["email"]}', '{"full_name":"Amina Sule","role":"CLIENT"}', now() - interval '45 days', now()),
  ('00000000-0000-0000-0000-000000000000', '44444444-4444-4444-4444-444444444444', 'authenticated', 'authenticated', 'client.ebi@hometrust.local', crypt('HomeTrust123!', gen_salt('bf')), now(), now(), now() - interval '18 hours', '{"provider":"email","providers":["email"]}', '{"full_name":"Ebi Hart","role":"CLIENT"}', now() - interval '38 days', now()),
  ('00000000-0000-0000-0000-000000000000', '55555555-5555-5555-5555-555555555555', 'authenticated', 'authenticated', 'team.balogun@hometrust.local', crypt('HomeTrust123!', gen_salt('bf')), now(), now(), now() - interval '30 minutes', '{"provider":"email","providers":["email"]}', '{"full_name":"Tunde Balogun","role":"TEAM_MEMBER"}', now() - interval '120 days', now()),
  ('00000000-0000-0000-0000-000000000000', '66666666-6666-6666-6666-666666666666', 'authenticated', 'authenticated', 'team.onyeka@hometrust.local', crypt('HomeTrust123!', gen_salt('bf')), now(), now(), now() - interval '3 hours', '{"provider":"email","providers":["email"]}', '{"full_name":"Ngozi Onyeka","role":"TEAM_MEMBER"}', now() - interval '118 days', now()),
  ('00000000-0000-0000-0000-000000000000', '77777777-7777-7777-7777-777777777777', 'authenticated', 'authenticated', 'ops.adeyemi@hometrust.local', crypt('HomeTrust123!', gen_salt('bf')), now(), now(), now() - interval '45 minutes', '{"provider":"email","providers":["email"]}', '{"full_name":"Folake Adeyemi","role":"OPERATIONS_MANAGER"}', now() - interval '180 days', now()),
  ('00000000-0000-0000-0000-000000000000', '88888888-8888-8888-8888-888888888888', 'authenticated', 'authenticated', 'admin@hometrust.local', crypt('HomeTrust123!', gen_salt('bf')), now(), now(), now() - interval '20 minutes', '{"provider":"email","providers":["email"]}', '{"full_name":"HomeTrust Admin","role":"ADMIN"}', now() - interval '240 days', now())
on conflict (id) do update
set email = excluded.email,
    raw_user_meta_data = excluded.raw_user_meta_data,
    updated_at = now();

insert into auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
values
  ('aaaaaaaa-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', jsonb_build_object('sub', '11111111-1111-1111-1111-111111111111', 'email', 'client.adebayo@hometrust.local'), 'email', 'client.adebayo@hometrust.local', now() - interval '2 hours', now(), now()),
  ('aaaaaaaa-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', jsonb_build_object('sub', '22222222-2222-2222-2222-222222222222', 'email', 'client.okafor@hometrust.local'), 'email', 'client.okafor@hometrust.local', now() - interval '1 day', now(), now()),
  ('aaaaaaaa-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', jsonb_build_object('sub', '33333333-3333-3333-3333-333333333333', 'email', 'client.sule@hometrust.local'), 'email', 'client.sule@hometrust.local', now() - interval '5 hours', now(), now()),
  ('aaaaaaaa-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', jsonb_build_object('sub', '44444444-4444-4444-4444-444444444444', 'email', 'client.ebi@hometrust.local'), 'email', 'client.ebi@hometrust.local', now() - interval '18 hours', now(), now()),
  ('aaaaaaaa-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', jsonb_build_object('sub', '55555555-5555-5555-5555-555555555555', 'email', 'team.balogun@hometrust.local'), 'email', 'team.balogun@hometrust.local', now() - interval '30 minutes', now(), now()),
  ('aaaaaaaa-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', jsonb_build_object('sub', '66666666-6666-6666-6666-666666666666', 'email', 'team.onyeka@hometrust.local'), 'email', 'team.onyeka@hometrust.local', now() - interval '3 hours', now(), now()),
  ('aaaaaaaa-7777-7777-7777-777777777777', '77777777-7777-7777-7777-777777777777', jsonb_build_object('sub', '77777777-7777-7777-7777-777777777777', 'email', 'ops.adeyemi@hometrust.local'), 'email', 'ops.adeyemi@hometrust.local', now() - interval '45 minutes', now(), now()),
  ('aaaaaaaa-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', jsonb_build_object('sub', '88888888-8888-8888-8888-888888888888', 'email', 'admin@hometrust.local'), 'email', 'admin@hometrust.local', now() - interval '20 minutes', now(), now())
on conflict (id) do update set updated_at = now();

update public.profiles
set
  phone = case id
    when '11111111-1111-1111-1111-111111111111' then '+44 7700 900100'
    when '22222222-2222-2222-2222-222222222222' then '+1 917 555 0142'
    when '33333333-3333-3333-3333-333333333333' then '+49 151 555 8080'
    when '44444444-4444-4444-4444-444444444444' then '+31 620 555 020'
    when '55555555-5555-5555-5555-555555555555' then '+234 803 555 1001'
    when '66666666-6666-6666-6666-666666666666' then '+234 803 555 1002'
    when '77777777-7777-7777-7777-777777777777' then '+234 803 555 1003'
    when '88888888-8888-8888-8888-888888888888' then '+234 803 555 1004'
  end,
  diaspora_country = case id
    when '11111111-1111-1111-1111-111111111111' then 'United Kingdom'
    when '22222222-2222-2222-2222-222222222222' then 'United States'
    when '33333333-3333-3333-3333-333333333333' then 'Germany'
    when '44444444-4444-4444-4444-444444444444' then 'Netherlands'
    else 'Nigeria'
  end,
  base_country = 'Nigeria',
  preferred_contact_method = case id
    when '11111111-1111-1111-1111-111111111111' then 'whatsapp'
    when '22222222-2222-2222-2222-222222222222' then 'email'
    when '33333333-3333-3333-3333-333333333333' then 'phone'
    when '44444444-4444-4444-4444-444444444444' then 'email'
    else 'email'
  end,
  two_factor_enabled = id in ('77777777-7777-7777-7777-777777777777', '88888888-8888-8888-8888-888888888888'),
  last_sign_in_at = now() - interval '2 hours'
where id in (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555',
  '66666666-6666-6666-6666-666666666666',
  '77777777-7777-7777-7777-777777777777',
  '88888888-8888-8888-8888-888888888888'
);

insert into public.user_roles (user_id, role)
values
  ('11111111-1111-1111-1111-111111111111', 'CLIENT'),
  ('22222222-2222-2222-2222-222222222222', 'CLIENT'),
  ('33333333-3333-3333-3333-333333333333', 'CLIENT'),
  ('44444444-4444-4444-4444-444444444444', 'CLIENT'),
  ('55555555-5555-5555-5555-555555555555', 'TEAM_MEMBER'),
  ('66666666-6666-6666-6666-666666666666', 'TEAM_MEMBER'),
  ('77777777-7777-7777-7777-777777777777', 'OPERATIONS_MANAGER'),
  ('88888888-8888-8888-8888-888888888888', 'ADMIN')
on conflict (user_id, role) do nothing;

insert into public.team_memberships (id, user_id, department, title, region, active)
values
  ('90000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'Project Delivery', 'Senior Project Manager', 'Lagos', true),
  ('90000000-0000-0000-0000-000000000002', '66666666-6666-6666-6666-666666666666', 'Field Operations', 'Regional Operations Coordinator', 'South West', true),
  ('90000000-0000-0000-0000-000000000003', '77777777-7777-7777-7777-777777777777', 'Operations', 'Operations Manager', 'National', true)
on conflict (id) do update set title = excluded.title, region = excluded.region, active = excluded.active;

insert into public.client_accounts (id, legal_name, display_name, primary_country)
values
  ('a1000000-0000-0000-0000-000000000001', 'Adebayo Family Projects Ltd', 'Adebayo Family Projects', 'Nigeria'),
  ('a1000000-0000-0000-0000-000000000002', 'Okafor Holdings Advisory', 'Okafor Holdings', 'Nigeria'),
  ('a1000000-0000-0000-0000-000000000003', 'Northern Growth Collective', 'Northern Growth Collective', 'Nigeria')
on conflict (id) do update set display_name = excluded.display_name;

insert into public.client_account_members (id, client_account_id, user_id, is_primary)
values
  ('a2000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', true),
  ('a2000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', true),
  ('a2000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', '33333333-3333-3333-3333-333333333333', true),
  ('a2000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', '44444444-4444-4444-4444-444444444444', false)
on conflict (client_account_id, user_id) do update set is_primary = excluded.is_primary;

insert into public.projects (
  id, client_account_id, project_type_code, name, slug, description, location_city, location_state, location_country,
  site_address, status, health, stage_label, completion_percentage, currency_code, overall_budget,
  start_date, target_completion_date, created_by, created_at, updated_at
)
values
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'construction', 'Lekki Duplex Build', 'lekki-duplex-build', 'Four-bedroom duplex with guest suite, perimeter security, and remote oversight for weekly progress assurance.', 'Lekki', 'Lagos', 'Nigeria', 'Admiralty Way Extension, Lekki Phase 1', 'ACTIVE', 'healthy', 'Finishing and MEP', 72, 'USD', 185000, current_date - 240, current_date + 95, '77777777-7777-7777-7777-777777777777', now() - interval '7 months', now() - interval '3 hours'),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'land_development', 'Abeokuta Land Title and Site Prep', 'abeokuta-land-title-site-prep', 'Land regularization, fencing, and early civil works ahead of phased residential development.', 'Abeokuta', 'Ogun', 'Nigeria', 'Kobape Corridor, Abeokuta', 'AT_RISK', 'watch', 'Documentation and access road', 34, 'USD', 54000, current_date - 140, current_date + 120, '77777777-7777-7777-7777-777777777777', now() - interval '5 months', now() - interval '2 days'),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'business_setup', 'Enugu Retail Launch', 'enugu-retail-launch', 'Neighborhood pharmacy launch with licensing, interior fit-out, and POS/stock readiness.', 'Enugu', 'Enugu', 'Nigeria', 'GRA Phase II, Enugu', 'ACTIVE', 'healthy', 'Pre-opening readiness', 61, 'USD', 78000, current_date - 165, current_date + 45, '77777777-7777-7777-7777-777777777777', now() - interval '4 months', now() - interval '6 hours'),
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'agriculture', 'Oyo Cassava Expansion', 'oyo-cassava-expansion', 'Farm expansion program covering irrigation, mechanization, and aggregation shed delivery.', 'Iseyin', 'Oyo', 'Nigeria', 'Akinmorin Cluster, Oyo State', 'ACTIVE', 'watch', 'Irrigation and storage package', 49, 'USD', 132000, current_date - 210, current_date + 110, '77777777-7777-7777-7777-777777777777', now() - interval '6 months', now() - interval '8 hours'),
  ('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000003', 'solar_infrastructure', 'Kaduna Solar Mini-Grid', 'kaduna-solar-mini-grid', 'Community solar deployment with transformer upgrade, smart metering, and commissioning oversight.', 'Zaria', 'Kaduna', 'Nigeria', 'Kufena Community Cluster, Zaria', 'ACTIVE', 'critical', 'Procurement and civil mobilization', 28, 'USD', 246000, current_date - 120, current_date + 180, '88888888-8888-8888-8888-888888888888', now() - interval '3 months', now() - interval '4 hours'),
  ('b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000003', 'procurement_logistics', 'Port Harcourt Logistics Fleet Procurement', 'port-harcourt-logistics-fleet-procurement', 'Fleet purchase, inspection, branding, and dispatch workflow for a new regional logistics operation.', 'Port Harcourt', 'Rivers', 'Nigeria', 'Trans-Amadi Industrial Layout, Port Harcourt', 'PLANNING', 'healthy', 'Vendor diligence and approvals', 18, 'USD', 99000, current_date - 45, current_date + 150, '88888888-8888-8888-8888-888888888888', now() - interval '6 weeks', now() - interval '1 day')
on conflict (id) do update
set name = excluded.name, status = excluded.status, health = excluded.health, stage_label = excluded.stage_label, completion_percentage = excluded.completion_percentage, updated_at = excluded.updated_at;

insert into public.project_assignments (id, project_id, user_id, role, label, is_primary)
values
  ('b2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'CLIENT', 'Client Sponsor', true),
  ('b2000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'TEAM_MEMBER', 'Project Manager', true),
  ('b2000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', 'TEAM_MEMBER', 'Field Operations', false),
  ('b2000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'CLIENT', 'Land Owner', true),
  ('b2000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000002', '55555555-5555-5555-5555-555555555555', 'TEAM_MEMBER', 'Project Manager', true),
  ('b2000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'CLIENT', 'Business Owner', true),
  ('b2000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000003', '55555555-5555-5555-5555-555555555555', 'TEAM_MEMBER', 'Launch Coordinator', true),
  ('b2000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000004', '33333333-3333-3333-3333-333333333333', 'CLIENT', 'Principal Client', true),
  ('b2000000-0000-0000-0000-000000000009', 'b1000000-0000-0000-0000-000000000004', '66666666-6666-6666-6666-666666666666', 'TEAM_MEMBER', 'Operations Coordinator', true),
  ('b2000000-0000-0000-0000-000000000010', 'b1000000-0000-0000-0000-000000000005', '33333333-3333-3333-3333-333333333333', 'CLIENT', 'Infrastructure Sponsor', true),
  ('b2000000-0000-0000-0000-000000000011', 'b1000000-0000-0000-0000-000000000005', '77777777-7777-7777-7777-777777777777', 'OPERATIONS_MANAGER', 'Operations Lead', true),
  ('b2000000-0000-0000-0000-000000000012', 'b1000000-0000-0000-0000-000000000006', '44444444-4444-4444-4444-444444444444', 'CLIENT', 'Procurement Lead', true),
  ('b2000000-0000-0000-0000-000000000013', 'b1000000-0000-0000-0000-000000000006', '77777777-7777-7777-7777-777777777777', 'OPERATIONS_MANAGER', 'Operations Lead', true)
on conflict (project_id, user_id, label) do update set role = excluded.role, is_primary = excluded.is_primary;

insert into public.project_contacts (id, project_id, full_name, role_label, email, phone, availability_note, is_client_visible)
values
  ('b3000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Tunde Balogun', 'Project Manager', 'team.balogun@hometrust.local', '+234 803 555 1001', 'Available weekdays for escalation checkpoints.', true),
  ('b3000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Ngozi Onyeka', 'Field Operations Lead', 'team.onyeka@hometrust.local', '+234 803 555 1002', 'Coordinates weekly site verification and media uploads.', true),
  ('b3000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002', 'Tunde Balogun', 'Project Manager', 'team.balogun@hometrust.local', '+234 803 555 1001', 'Managing legal counsel coordination and contractor access.', true),
  ('b3000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000003', 'Tunde Balogun', 'Launch Coordinator', 'team.balogun@hometrust.local', '+234 803 555 1001', 'Supports licensing, fit-out, and supplier onboarding.', true),
  ('b3000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000004', 'Ngozi Onyeka', 'Operations Coordinator', 'team.onyeka@hometrust.local', '+234 803 555 1002', 'Coordinates field procurement and storage shed inspection.', true),
  ('b3000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000005', 'Folake Adeyemi', 'Operations Lead', 'ops.adeyemi@hometrust.local', '+234 803 555 1003', 'Handling supplier remediation and milestone recovery plan.', true),
  ('b3000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000006', 'Folake Adeyemi', 'Operations Lead', 'ops.adeyemi@hometrust.local', '+234 803 555 1003', 'Driving vendor diligence and board-ready approval packs.', true)
on conflict (id) do update set role_label = excluded.role_label, availability_note = excluded.availability_note;

insert into public.milestones (id, project_id, title, description, due_at, completed_at, status, sort_order, visible_to_client, created_by)
values
  ('c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Structural frame completed', 'Concrete frame and upper slab signed off by engineer.', now() - interval '40 days', now() - interval '39 days', 'completed', 1, true, '55555555-5555-5555-5555-555555555555'),
  ('c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Electrical first-fix', 'Containment, conduit routing, and backup power wiring.', now() + interval '9 days', null, 'in_progress', 2, true, '55555555-5555-5555-5555-555555555555'),
  ('c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002', 'Governor consent filing', 'Legal bundle resubmitted after survey amendment.', now() + interval '14 days', null, 'blocked', 1, true, '55555555-5555-5555-5555-555555555555'),
  ('c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000003', 'NAFDAC and state permit pack', 'All operating permits assembled for final filing.', now() + interval '6 days', null, 'in_progress', 1, true, '55555555-5555-5555-5555-555555555555'),
  ('c1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000004', 'Irrigation lines installed', 'Solar-assisted pump line and main trenching package.', now() + interval '18 days', null, 'pending', 1, true, '66666666-6666-6666-6666-666666666666'),
  ('c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000005', 'Transformer vendor replacement', 'Reissue RFQ after the first vendor missed compliance documentation.', now() + interval '12 days', null, 'blocked', 1, true, '77777777-7777-7777-7777-777777777777'),
  ('c1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000006', 'Fleet inspection shortlist', 'Three vendors shortlisted for physical inspection and pricing review.', now() + interval '10 days', null, 'pending', 1, true, '77777777-7777-7777-7777-777777777777')
on conflict (id) do update set status = excluded.status, due_at = excluded.due_at, completed_at = excluded.completed_at;

insert into public.timeline_events (id, project_id, event_type, title, summary, actor_user_id, actor_name_override, client_visible, related_table, related_record_id, occurred_at)
values
  ('c2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'report', 'Weekly site verification uploaded', 'Drone stills and slab quality notes were uploaded after the Tuesday inspection.', '66666666-6666-6666-6666-666666666666', null, true, 'reports', null, now() - interval '8 hours'),
  ('c2000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'milestone', 'Electrical first-fix moved to in progress', 'Backup power routing approved and MEP contractor mobilized.', '55555555-5555-5555-5555-555555555555', null, true, 'milestones', 'c1000000-0000-0000-0000-000000000002', now() - interval '2 days'),
  ('c2000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002', 'approval', 'Survey amendment requires client review', 'Legal counsel flagged a boundary note that needs acknowledgement before refiling.', '55555555-5555-5555-5555-555555555555', null, true, 'approval_requests', null, now() - interval '1 day'),
  ('c2000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000003', 'status', 'Permit timeline held steady', 'Local inspection completed with no material findings. Licensing pack remains on schedule.', '55555555-5555-5555-5555-555555555555', null, true, 'projects', 'b1000000-0000-0000-0000-000000000003', now() - interval '6 hours'),
  ('c2000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000004', 'budget', 'Cold storage spend posted', 'Initial shed steel and panel procurement has been approved and logged against the storage package.', '66666666-6666-6666-6666-666666666666', null, true, 'transactions', null, now() - interval '12 hours'),
  ('c2000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000005', 'status', 'Transformer vendor remediation underway', 'Operations has paused release to the original vendor pending compliance replacement.', '77777777-7777-7777-7777-777777777777', null, true, 'projects', 'b1000000-0000-0000-0000-000000000005', now() - interval '4 hours'),
  ('c2000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000006', 'assignment', 'Procurement board review scheduled', 'Internal review panel scheduled vendor inspection scoring for next week.', '88888888-8888-8888-8888-888888888888', null, true, 'projects', 'b1000000-0000-0000-0000-000000000006', now() - interval '26 hours')
on conflict (id) do update set summary = excluded.summary, occurred_at = excluded.occurred_at;

insert into public.reports (id, project_id, title, report_type, reporting_period_label, summary, uploaded_by, uploaded_at, client_visible)
values
  ('c3000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Lekki Weekly Progress Report', 'Progress Report', 'Week of 10 March 2026', 'Interior blockwork is complete on both floors and MEP first-fix is tracking to the revised sequence.', '55555555-5555-5555-5555-555555555555', now() - interval '8 hours', true),
  ('c3000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003', 'Retail Launch Readiness Summary', 'Compliance Report', 'March 2026', 'Regulatory paperwork is 85% complete and the final interior snag list is down to eight minor items.', '55555555-5555-5555-5555-555555555555', now() - interval '1 day', true),
  ('c3000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004', 'Cassava Expansion Spend and Field Update', 'Budget Report', 'February 2026', 'Seed procurement and shed materials are within tolerance, but irrigation timing is now dependent on trench access.', '66666666-6666-6666-6666-666666666666', now() - interval '12 hours', true),
  ('c3000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000005', 'Mini-Grid Procurement Risk Memo', 'Procurement Report', 'March 2026', 'Transformer selection has been escalated after the first shortlisted vendor failed documentation review.', '77777777-7777-7777-7777-777777777777', now() - interval '5 hours', true)
on conflict (id) do update set summary = excluded.summary, uploaded_at = excluded.uploaded_at;

insert into public.report_sections (id, report_id, section_title, body, sort_order)
values
  ('c3100000-0000-0000-0000-000000000001', 'c3000000-0000-0000-0000-000000000001', 'Site progress', 'MEP first-fix commenced in the east wing and waterproofing passed spot checks around the terrace slab.', 1),
  ('c3100000-0000-0000-0000-000000000002', 'c3000000-0000-0000-0000-000000000001', 'Client decisions', 'Bathroom fixture confirmation is needed before final procurement release next week.', 2),
  ('c3100000-0000-0000-0000-000000000003', 'c3000000-0000-0000-0000-000000000004', 'Risk note', 'Vendor two has adequate pricing but incomplete compliance records; vendor three remains viable with a later delivery window.', 1)
on conflict (id) do update set body = excluded.body;

insert into public.files (id, project_id, category_code, name, description, storage_bucket, storage_path, mime_type, size_bytes, uploaded_by, uploaded_at, client_visible)
values
  ('d1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Photo', 'Lekki slab inspection - north elevation', 'Drone capture showing terrace slab and scaffold clearance.', 'project-assets', 'b1000000-0000-0000-0000-000000000001/photos/lekki-slab-north.jpg', 'image/jpeg', 1450000, '66666666-6666-6666-6666-666666666666', now() - interval '8 hours', true),
  ('d1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Contract', 'Electrical contractor variation', 'Approved variation order for backup power and conduit routing.', 'project-assets', 'b1000000-0000-0000-0000-000000000001/contracts/electrical-variation.pdf', 'application/pdf', 820000, '55555555-5555-5555-5555-555555555555', now() - interval '3 days', true),
  ('d1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003', 'Document', 'Retail launch permit pack', 'Combined permit tracker and filing receipts.', 'project-assets', 'b1000000-0000-0000-0000-000000000003/documents/permit-pack.pdf', 'application/pdf', 550000, '55555555-5555-5555-5555-555555555555', now() - interval '1 day', true),
  ('d1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000004', 'Receipt', 'Cold storage steel deposit receipt', 'Initial payment receipt for cold storage fabrication package.', 'project-assets', 'b1000000-0000-0000-0000-000000000004/receipts/cold-storage-deposit.pdf', 'application/pdf', 240000, '66666666-6666-6666-6666-666666666666', now() - interval '12 hours', true),
  ('d1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000005', 'Video', 'Transformer yard walkthrough', 'Short video from the proposed transformer vendor yard inspection.', 'project-assets', 'b1000000-0000-0000-0000-000000000005/videos/vendor-yard.mp4', 'video/mp4', 7400000, '77777777-7777-7777-7777-777777777777', now() - interval '5 hours', true),
  ('d1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000006', 'Document', 'Fleet vendor comparison matrix', 'Scoring matrix covering vehicle age, service history, and delivery timeline.', 'project-assets', 'b1000000-0000-0000-0000-000000000006/documents/vendor-matrix.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 310000, '77777777-7777-7777-7777-777777777777', now() - interval '1 day', true)
on conflict (id) do update set name = excluded.name, uploaded_at = excluded.uploaded_at;

insert into public.report_attachments (id, report_id, file_id)
values
  ('d1100000-0000-0000-0000-000000000001', 'c3000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000001'),
  ('d1100000-0000-0000-0000-000000000002', 'c3000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000002'),
  ('d1100000-0000-0000-0000-000000000003', 'c3000000-0000-0000-0000-000000000002', 'd1000000-0000-0000-0000-000000000003'),
  ('d1100000-0000-0000-0000-000000000004', 'c3000000-0000-0000-0000-000000000003', 'd1000000-0000-0000-0000-000000000004'),
  ('d1100000-0000-0000-0000-000000000005', 'c3000000-0000-0000-0000-000000000004', 'd1000000-0000-0000-0000-000000000005')
on conflict (report_id, file_id) do nothing;

insert into public.receipts (id, project_id, file_id, vendor_name, receipt_number, receipt_date, amount, currency_code, uploaded_by)
values
  ('d1200000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000004', 'd1000000-0000-0000-0000-000000000004', 'Ibadan Cold Chain Fabricators', 'ICCF-2403-09', current_date - 1, 18500, 'USD', '66666666-6666-6666-6666-666666666666')
on conflict (id) do update set amount = excluded.amount;

insert into public.contracts (id, project_id, file_id, counterparty_name, effective_date, expires_at, status)
values
  ('d1300000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000002', 'PrimeVolt Electrics Ltd', current_date - 3, current_date + 60, 'active')
on conflict (id) do update set status = excluded.status;

insert into public.media_assets (id, project_id, file_id, media_kind, captured_at, caption)
values
  ('d1400000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'd1000000-0000-0000-0000-000000000001', 'photo', now() - interval '8 hours', 'North elevation after slab pour cleanup'),
  ('d1400000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000005', 'd1000000-0000-0000-0000-000000000005', 'video', now() - interval '5 hours', 'Vendor yard walkthrough showing stock condition')
on conflict (id) do update set caption = excluded.caption;

insert into public.project_budgets (id, project_id, budget_name, currency_code, allocated_amount, spent_amount, reserved_amount, contingency_amount)
values
  ('e1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Lekki Main Budget', 'USD', 185000, 132000, 15000, 10000),
  ('e1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003', 'Retail Launch Budget', 'USD', 78000, 47400, 6200, 4000),
  ('e1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004', 'Cassava Expansion Budget', 'USD', 132000, 68150, 8900, 12000),
  ('e1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000005', 'Mini-Grid Budget', 'USD', 246000, 68800, 18000, 20000),
  ('e1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000006', 'Fleet Procurement Budget', 'USD', 99000, 17750, 6500, 8000)
on conflict (project_id) do update set spent_amount = excluded.spent_amount, reserved_amount = excluded.reserved_amount;

insert into public.budget_categories (id, budget_id, label, allocated_amount, spent_amount, sort_order)
values
  ('e1100000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'Structure and shell', 98000, 98000, 1),
  ('e1100000-0000-0000-0000-000000000002', 'e1000000-0000-0000-0000-000000000001', 'MEP and finishing', 62000, 24000, 2),
  ('e1100000-0000-0000-0000-000000000003', 'e1000000-0000-0000-0000-000000000003', 'Storage shed', 42000, 18500, 1),
  ('e1100000-0000-0000-0000-000000000004', 'e1000000-0000-0000-0000-000000000004', 'Electrical equipment', 130000, 31200, 1),
  ('e1100000-0000-0000-0000-000000000005', 'e1000000-0000-0000-0000-000000000005', 'Vehicle purchase deposits', 72000, 17750, 1)
on conflict (budget_id, label) do update set spent_amount = excluded.spent_amount;

insert into public.transactions (id, project_id, budget_category_id, description, vendor_name, amount, currency_code, status, occurred_at, created_by, notes)
values
  ('e2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'e1100000-0000-0000-0000-000000000002', 'Electrical materials first release', 'PrimeVolt Electrics Ltd', 12500, 'USD', 'approved', now() - interval '3 days', '55555555-5555-5555-5555-555555555555', 'Released after revised BOQ confirmation'),
  ('e2000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003', null, 'Shop fitting final carpentry tranche', 'EastGate Joinery', 8600, 'USD', 'approved', now() - interval '4 days', '55555555-5555-5555-5555-555555555555', 'Final tranche before snag close-out'),
  ('e2000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004', 'e1100000-0000-0000-0000-000000000003', 'Cold storage steel deposit', 'Ibadan Cold Chain Fabricators', 18500, 'USD', 'approved', now() - interval '1 day', '66666666-6666-6666-6666-666666666666', 'Deposit posted against storage package'),
  ('e2000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000005', 'e1100000-0000-0000-0000-000000000004', 'Transformer vendor advance request', 'NorthGrid Energy Ltd', 22000, 'USD', 'pending', now() - interval '10 hours', '77777777-7777-7777-7777-777777777777', 'Held pending replacement vendor diligence'),
  ('e2000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000006', 'e1100000-0000-0000-0000-000000000005', 'Fleet inspection travel and deposits', 'PH Fleet Hub', 17750, 'USD', 'approved', now() - interval '2 days', '77777777-7777-7777-7777-777777777777', 'Inspection trip and reservation fees')
on conflict (id) do update set status = excluded.status, occurred_at = excluded.occurred_at;

insert into public.transaction_receipts (id, transaction_id, receipt_id)
values
  ('e2100000-0000-0000-0000-000000000001', 'e2000000-0000-0000-0000-000000000003', 'd1200000-0000-0000-0000-000000000001')
on conflict (transaction_id, receipt_id) do nothing;

insert into public.approvals (id, project_id, title, description, status, client_visible, requested_by, requested_from_user_id, due_at)
values
  ('e3000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'Survey amendment acknowledgement', 'Please confirm the revised boundary note before legal counsel resubmits the filing.', 'pending', true, '55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', now() + interval '3 days'),
  ('e3000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000005', 'Replacement transformer vendor shortlist', 'Operations needs approval to issue RFQ to the replacement shortlist.', 'pending', true, '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', now() + interval '4 days')
on conflict (id) do update set status = excluded.status, due_at = excluded.due_at;

insert into public.approval_requests (id, project_id, transaction_id, approval_id, title, description, status, client_visible, requested_by, requested_for_user_id, amount, currency_code, due_at)
values
  ('e3100000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', null, 'e3000000-0000-0000-0000-000000000001', 'Approve survey amendment refile', 'Boundary annotation has changed; client acknowledgement is required before the legal refile.', 'pending', true, '55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', null, 'USD', now() + interval '3 days'),
  ('e3100000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000005', 'e2000000-0000-0000-0000-000000000004', 'e3000000-0000-0000-0000-000000000002', 'Approve replacement transformer RFQ', 'Original vendor failed documentation review; approve release to replacement shortlist.', 'pending', true, '77777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 22000, 'USD', now() + interval '4 days')
on conflict (id) do update set status = excluded.status, due_at = excluded.due_at;

insert into public.conversations (id, project_id, subject, kind, created_by, created_at, updated_at)
values
  ('f1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Lekki weekly execution thread', 'project', '55555555-5555-5555-5555-555555555555', now() - interval '30 days', now() - interval '2 hours'),
  ('f1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 'Land documentation escalation', 'project', '55555555-5555-5555-5555-555555555555', now() - interval '12 days', now() - interval '1 day'),
  ('f1000000-0000-0000-0000-000000000003', null, 'General support and account coordination', 'support', '77777777-7777-7777-7777-777777777777', now() - interval '20 days', now() - interval '5 hours')
on conflict (id) do update set updated_at = excluded.updated_at;

insert into public.conversation_participants (id, conversation_id, user_id, last_read_at)
values
  ('f1100000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', now() - interval '1 day'),
  ('f1100000-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', now() - interval '2 hours'),
  ('f1100000-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', now() - interval '8 hours'),
  ('f1100000-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', now() - interval '2 days'),
  ('f1100000-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000002', '55555555-5555-5555-5555-555555555555', now() - interval '1 day'),
  ('f1100000-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', now() - interval '5 days'),
  ('f1100000-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000003', '77777777-7777-7777-7777-777777777777', now() - interval '5 hours')
on conflict (conversation_id, user_id) do update set last_read_at = excluded.last_read_at;

insert into public.messages (id, conversation_id, sender_user_id, body, sent_at)
values
  ('f1200000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'We uploaded the latest site verification report this morning. MEP routing has started and the electrical contractor is mobilized for the first-fix window.', now() - interval '10 hours'),
  ('f1200000-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Please keep me posted if fixture selections need final approval this week. I can respond same-day.', now() - interval '9 hours'),
  ('f1200000-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000002', '55555555-5555-5555-5555-555555555555', 'Legal counsel flagged the boundary annotation. We need your acknowledgement before we can proceed with the refile.', now() - interval '1 day'),
  ('f1200000-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000003', '77777777-7777-7777-7777-777777777777', 'Your dashboard notifications are active. Use this thread for billing, support, or callback coordination.', now() - interval '5 hours')
on conflict (id) do update set body = excluded.body, sent_at = excluded.sent_at;

insert into public.notifications (id, user_id, project_id, conversation_id, type, title, body, href, created_at)
values
  ('g1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'b1000000-0000-0000-0000-000000000001', null, 'report_uploaded', 'New Lekki report available', 'The weekly progress report and site media are ready for review.', '/dashboard/projects/b1000000-0000-0000-0000-000000000001/reports', now() - interval '8 hours'),
  ('g1000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'b1000000-0000-0000-0000-000000000002', null, 'approval_needed', 'Survey amendment requires approval', 'Please review the land filing update so counsel can re-submit.', '/dashboard/projects/b1000000-0000-0000-0000-000000000002/budget', now() - interval '1 day'),
  ('g1000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'b1000000-0000-0000-0000-000000000003', null, 'milestone_completed', 'Permit inspection passed', 'The retail launch compliance inspection completed without material findings.', '/dashboard/projects/b1000000-0000-0000-0000-000000000003/timeline', now() - interval '6 hours'),
  ('g1000000-0000-0000-0000-000000000004', '33333333-3333-3333-3333-333333333333', 'b1000000-0000-0000-0000-000000000005', null, 'budget_threshold', 'Procurement risk flagged', 'Transformer procurement remains blocked pending a replacement vendor approval.', '/dashboard/projects/b1000000-0000-0000-0000-000000000005/budget', now() - interval '4 hours'),
  ('g1000000-0000-0000-0000-000000000005', '44444444-4444-4444-4444-444444444444', 'b1000000-0000-0000-0000-000000000006', null, 'document_added', 'Vendor comparison matrix added', 'The fleet vendor scoring workbook is now in your secure document room.', '/dashboard/projects/b1000000-0000-0000-0000-000000000006/files', now() - interval '1 day'),
  ('g1000000-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', null, 'f1000000-0000-0000-0000-000000000001', 'new_message', 'New message in Lekki weekly execution thread', 'Fixture approvals may be needed this week.', '/dashboard/inbox/f1000000-0000-0000-0000-000000000001', now() - interval '9 hours')
on conflict (id) do update set created_at = excluded.created_at, body = excluded.body;

insert into public.notification_reads (id, notification_id, user_id, read_at)
values
  ('g1100000-0000-0000-0000-000000000001', 'g1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', now() - interval '6 hours'),
  ('g1100000-0000-0000-0000-000000000002', 'g1000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', now() - interval '2 hours')
on conflict (notification_id, user_id) do update set read_at = excluded.read_at;

insert into public.support_threads (id, client_account_id, project_id, subject, priority, status, created_by, assigned_to, created_at, updated_at)
values
  ('h1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'Land title timing reassurance', 'priority', 'open', '11111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', now() - interval '2 days', now() - interval '1 day'),
  ('h1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000005', 'Mini-grid procurement callback request', 'urgent', 'in_progress', '33333333-3333-3333-3333-333333333333', '77777777-7777-7777-7777-777777777777', now() - interval '12 hours', now() - interval '4 hours')
on conflict (id) do update set status = excluded.status, updated_at = excluded.updated_at;

insert into public.support_messages (id, support_thread_id, sender_user_id, body, created_at)
values
  ('h1100000-0000-0000-0000-000000000001', 'h1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Please confirm whether the survey amendment introduces any long-term title risk beyond the timing delay.', now() - interval '2 days'),
  ('h1100000-0000-0000-0000-000000000002', 'h1000000-0000-0000-0000-000000000001', '77777777-7777-7777-7777-777777777777', 'No long-term title risk is expected. We are escalating directly with counsel and will keep the dashboard updated once the filing window is confirmed.', now() - interval '1 day'),
  ('h1100000-0000-0000-0000-000000000003', 'h1000000-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', 'I would like a callback before we approve the replacement transformer vendor shortlist.', now() - interval '12 hours')
on conflict (id) do update set body = excluded.body, created_at = excluded.created_at;

insert into public.audit_logs (id, actor_user_id, actor_role, action, target_type, target_id, metadata, created_at)
values
  ('i1000000-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'TEAM_MEMBER', 'report.publish', 'report', 'c3000000-0000-0000-0000-000000000001', '{"projectId":"b1000000-0000-0000-0000-000000000001"}', now() - interval '8 hours'),
  ('i1000000-0000-0000-0000-000000000002', '77777777-7777-7777-7777-777777777777', 'OPERATIONS_MANAGER', 'support.request.respond', 'support_thread', 'h1000000-0000-0000-0000-000000000001', '{"priority":"priority"}', now() - interval '1 day')
on conflict (id) do update set metadata = excluded.metadata, created_at = excluded.created_at;
