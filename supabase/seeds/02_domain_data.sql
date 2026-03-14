-- Batch 2: dashboard domain data.
-- Run this after 00_helpers.sql and 01_auth.sql.

insert into public.client_accounts (id, legal_name, display_name, primary_country)
values
  ('a1000000-0000-0000-0000-000000000001', 'Adebayo Family Projects Ltd', 'Adebayo Family Projects', 'Nigeria'),
  ('a1000000-0000-0000-0000-000000000002', 'Okafor Holdings Advisory', 'Okafor Holdings', 'Nigeria'),
  ('a1000000-0000-0000-0000-000000000003', 'Northern Growth Collective', 'Northern Growth Collective', 'Nigeria')
on conflict (id) do update set display_name = excluded.display_name;

insert into public.client_account_members (id, client_account_id, user_id, is_primary)
values
  ('a2000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', public.seed_user_uuid('client.adebayo@hometrust.local'), true),
  ('a2000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', public.seed_user_uuid('client.okafor@hometrust.local'), true),
  ('a2000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', public.seed_user_uuid('client.sule@hometrust.local'), true),
  ('a2000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', public.seed_user_uuid('client.ebi@hometrust.local'), false),
  ('a2000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002', public.seed_user_uuid('client.invited@hometrust.local'), false)
on conflict (client_account_id, user_id) do update set is_primary = excluded.is_primary;

insert into public.projects (
  id, client_account_id, project_type_code, name, slug, description, location_city, location_state, location_country,
  site_address, status, health, stage_label, completion_percentage, currency_code, overall_budget,
  start_date, target_completion_date, created_by, created_at, updated_at
)
values
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'construction', 'Lekki Duplex Build', 'lekki-duplex-build', 'Four-bedroom duplex with guest suite, perimeter security, and remote oversight for weekly progress assurance.', 'Lekki', 'Lagos', 'Nigeria', 'Admiralty Way Extension, Lekki Phase 1', 'ACTIVE', 'healthy', 'Finishing and MEP', 72, 'USD', 185000, current_date - 240, current_date + 95, public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '7 months', now() - interval '3 hours'),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'land_development', 'Abeokuta Land Title and Site Prep', 'abeokuta-land-title-site-prep', 'Land regularization, fencing, and early civil works ahead of phased residential development.', 'Abeokuta', 'Ogun', 'Nigeria', 'Kobape Corridor, Abeokuta', 'AT_RISK', 'watch', 'Documentation and access road', 34, 'USD', 54000, current_date - 140, current_date + 120, public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '5 months', now() - interval '2 days'),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'business_setup', 'Enugu Retail Launch', 'enugu-retail-launch', 'Neighborhood pharmacy launch with licensing, interior fit-out, and POS/stock readiness.', 'Enugu', 'Enugu', 'Nigeria', 'GRA Phase II, Enugu', 'ACTIVE', 'healthy', 'Pre-opening readiness', 61, 'USD', 78000, current_date - 165, current_date + 45, public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '4 months', now() - interval '6 hours'),
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'agriculture', 'Oyo Cassava Expansion', 'oyo-cassava-expansion', 'Farm expansion program covering irrigation, mechanization, and aggregation shed delivery.', 'Iseyin', 'Oyo', 'Nigeria', 'Akinmorin Cluster, Oyo State', 'ACTIVE', 'watch', 'Irrigation and storage package', 49, 'USD', 132000, current_date - 210, current_date + 110, public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '6 months', now() - interval '8 hours'),
  ('b1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000003', 'solar_infrastructure', 'Kaduna Solar Mini-Grid', 'kaduna-solar-mini-grid', 'Community solar deployment with transformer upgrade, smart metering, and commissioning oversight.', 'Zaria', 'Kaduna', 'Nigeria', 'Kufena Community Cluster, Zaria', 'ACTIVE', 'critical', 'Procurement and civil mobilization', 28, 'USD', 246000, current_date - 120, current_date + 180, public.seed_user_uuid('admin@hometrust.local'), now() - interval '3 months', now() - interval '4 hours'),
  ('b1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000003', 'procurement_logistics', 'Port Harcourt Logistics Fleet Procurement', 'port-harcourt-logistics-fleet-procurement', 'Fleet purchase, inspection, branding, and dispatch workflow for a new regional logistics operation.', 'Port Harcourt', 'Rivers', 'Nigeria', 'Trans-Amadi Industrial Layout, Port Harcourt', 'PLANNING', 'healthy', 'Vendor diligence and approvals', 18, 'USD', 99000, current_date - 45, current_date + 150, public.seed_user_uuid('admin@hometrust.local'), now() - interval '6 weeks', now() - interval '1 day')
on conflict (id) do update
set name = excluded.name, status = excluded.status, health = excluded.health, stage_label = excluded.stage_label, completion_percentage = excluded.completion_percentage, updated_at = excluded.updated_at;

insert into public.project_assignments (id, project_id, user_id, role, label, is_primary)
values
  ('b2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', public.seed_user_uuid('client.adebayo@hometrust.local'), 'CLIENT', 'Client Sponsor', true),
  ('b2000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', public.seed_user_uuid('team.balogun@hometrust.local'), 'TEAM_MEMBER', 'Project Manager', true),
  ('b2000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', public.seed_user_uuid('team.onyeka@hometrust.local'), 'TEAM_MEMBER', 'Field Operations', false),
  ('b2000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000002', public.seed_user_uuid('client.adebayo@hometrust.local'), 'CLIENT', 'Land Owner', true),
  ('b2000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000002', public.seed_user_uuid('team.balogun@hometrust.local'), 'TEAM_MEMBER', 'Project Manager', true),
  ('b2000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000003', public.seed_user_uuid('client.okafor@hometrust.local'), 'CLIENT', 'Business Owner', true),
  ('b2000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000003', public.seed_user_uuid('team.balogun@hometrust.local'), 'TEAM_MEMBER', 'Launch Coordinator', true),
  ('b2000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000004', public.seed_user_uuid('client.sule@hometrust.local'), 'CLIENT', 'Principal Client', true),
  ('b2000000-0000-0000-0000-000000000009', 'b1000000-0000-0000-0000-000000000004', public.seed_user_uuid('team.onyeka@hometrust.local'), 'TEAM_MEMBER', 'Operations Coordinator', true),
  ('b2000000-0000-0000-0000-000000000010', 'b1000000-0000-0000-0000-000000000005', public.seed_user_uuid('client.sule@hometrust.local'), 'CLIENT', 'Infrastructure Sponsor', true),
  ('b2000000-0000-0000-0000-000000000011', 'b1000000-0000-0000-0000-000000000005', public.seed_user_uuid('ops.adeyemi@hometrust.local'), 'OPERATIONS_MANAGER', 'Operations Lead', true),
  ('b2000000-0000-0000-0000-000000000012', 'b1000000-0000-0000-0000-000000000006', public.seed_user_uuid('client.ebi@hometrust.local'), 'CLIENT', 'Procurement Lead', true),
  ('b2000000-0000-0000-0000-000000000013', 'b1000000-0000-0000-0000-000000000006', public.seed_user_uuid('ops.adeyemi@hometrust.local'), 'OPERATIONS_MANAGER', 'Operations Lead', true)
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
  ('c1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Structural frame completed', 'Concrete frame and upper slab signed off by engineer.', now() - interval '40 days', now() - interval '39 days', 'completed', 1, true, public.seed_user_uuid('team.balogun@hometrust.local')),
  ('c1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Electrical first-fix', 'Containment, conduit routing, and backup power wiring.', now() + interval '9 days', null, 'in_progress', 2, true, public.seed_user_uuid('team.balogun@hometrust.local')),
  ('c1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002', 'Governor consent filing', 'Legal bundle resubmitted after survey amendment.', now() + interval '14 days', null, 'blocked', 1, true, public.seed_user_uuid('team.balogun@hometrust.local')),
  ('c1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000003', 'NAFDAC and state permit pack', 'All operating permits assembled for final filing.', now() + interval '6 days', null, 'in_progress', 1, true, public.seed_user_uuid('team.balogun@hometrust.local')),
  ('c1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000004', 'Irrigation lines installed', 'Solar-assisted pump line and main trenching package.', now() + interval '18 days', null, 'pending', 1, true, public.seed_user_uuid('team.onyeka@hometrust.local')),
  ('c1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000005', 'Transformer vendor replacement', 'Reissue RFQ after the first vendor missed compliance documentation.', now() + interval '12 days', null, 'blocked', 1, true, public.seed_user_uuid('ops.adeyemi@hometrust.local')),
  ('c1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000006', 'Fleet inspection shortlist', 'Three vendors shortlisted for physical inspection and pricing review.', now() + interval '10 days', null, 'pending', 1, true, public.seed_user_uuid('ops.adeyemi@hometrust.local'))
on conflict (id) do update set status = excluded.status, due_at = excluded.due_at, completed_at = excluded.completed_at;

insert into public.timeline_events (id, project_id, event_type, title, summary, actor_user_id, actor_name_override, client_visible, related_table, related_record_id, occurred_at)
values
  ('c2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'report', 'Weekly site verification uploaded', 'Drone stills and slab quality notes were uploaded after the Tuesday inspection.', public.seed_user_uuid('team.onyeka@hometrust.local'), null, true, 'reports', null, now() - interval '8 hours'),
  ('c2000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'milestone', 'Electrical first-fix moved to in progress', 'Backup power routing approved and MEP contractor mobilized.', public.seed_user_uuid('team.balogun@hometrust.local'), null, true, 'milestones', 'c1000000-0000-0000-0000-000000000002', now() - interval '2 days'),
  ('c2000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002', 'approval', 'Survey amendment requires client review', 'Legal counsel flagged a boundary note that needs acknowledgement before refiling.', public.seed_user_uuid('team.balogun@hometrust.local'), null, true, 'approval_requests', null, now() - interval '1 day'),
  ('c2000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000003', 'status', 'Permit timeline held steady', 'Local inspection completed with no material findings. Licensing pack remains on schedule.', public.seed_user_uuid('team.balogun@hometrust.local'), null, true, 'projects', 'b1000000-0000-0000-0000-000000000003', now() - interval '6 hours'),
  ('c2000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000004', 'budget', 'Cold storage spend posted', 'Initial shed steel and panel procurement has been approved and logged against the storage package.', public.seed_user_uuid('team.onyeka@hometrust.local'), null, true, 'transactions', null, now() - interval '12 hours'),
  ('c2000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000005', 'status', 'Transformer vendor remediation underway', 'Operations has paused release to the original vendor pending compliance replacement.', public.seed_user_uuid('ops.adeyemi@hometrust.local'), null, true, 'projects', 'b1000000-0000-0000-0000-000000000005', now() - interval '4 hours'),
  ('c2000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000006', 'assignment', 'Procurement board review scheduled', 'Internal review panel scheduled vendor inspection scoring for next week.', public.seed_user_uuid('admin@hometrust.local'), null, true, 'projects', 'b1000000-0000-0000-0000-000000000006', now() - interval '26 hours')
on conflict (id) do update set summary = excluded.summary, occurred_at = excluded.occurred_at;

insert into public.reports (id, project_id, title, report_type, reporting_period_label, summary, uploaded_by, uploaded_at, client_visible)
values
  ('c3000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Lekki Weekly Progress Report', 'Progress Report', 'Week of 10 March 2026', 'Interior blockwork is complete on both floors and MEP first-fix is tracking to the revised sequence.', public.seed_user_uuid('team.balogun@hometrust.local'), now() - interval '8 hours', true),
  ('c3000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003', 'Retail Launch Readiness Summary', 'Compliance Report', 'March 2026', 'Regulatory paperwork is 85% complete and the final interior snag list is down to eight minor items.', public.seed_user_uuid('team.balogun@hometrust.local'), now() - interval '1 day', true),
  ('c3000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004', 'Cassava Expansion Spend and Field Update', 'Budget Report', 'February 2026', 'Seed procurement and shed materials are within tolerance, but irrigation timing is now dependent on trench access.', public.seed_user_uuid('team.onyeka@hometrust.local'), now() - interval '12 hours', true),
  ('c3000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000005', 'Mini-Grid Procurement Risk Memo', 'Procurement Report', 'March 2026', 'Transformer selection has been escalated after the first shortlisted vendor failed documentation review.', public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '5 hours', true)
on conflict (id) do update set summary = excluded.summary, uploaded_at = excluded.uploaded_at;

insert into public.report_sections (id, report_id, section_title, body, sort_order)
values
  ('c3100000-0000-0000-0000-000000000001', 'c3000000-0000-0000-0000-000000000001', 'Site progress', 'MEP first-fix commenced in the east wing and waterproofing passed spot checks around the terrace slab.', 1),
  ('c3100000-0000-0000-0000-000000000002', 'c3000000-0000-0000-0000-000000000001', 'Client decisions', 'Bathroom fixture confirmation is needed before final procurement release next week.', 2),
  ('c3100000-0000-0000-0000-000000000003', 'c3000000-0000-0000-0000-000000000004', 'Risk note', 'Vendor two has adequate pricing but incomplete compliance records; vendor three remains viable with a later delivery window.', 1)
on conflict (id) do update set body = excluded.body;

insert into public.file_categories (code, label)
values
  ('Document', 'Document'),
  ('Photo', 'Photo'),
  ('Video', 'Video'),
  ('Receipt', 'Receipt'),
  ('Contract', 'Contract')
on conflict (code) do update set label = excluded.label;

insert into public.files (id, project_id, category_code, name, description, storage_bucket, storage_path, mime_type, size_bytes, uploaded_by, uploaded_at, client_visible)
values
  ('d1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Photo', 'Lekki slab inspection - north elevation', 'Drone capture showing terrace slab and scaffold clearance.', 'project-assets', 'b1000000-0000-0000-0000-000000000001/photos/lekki-slab-north.jpg', 'image/jpeg', 1450000, public.seed_user_uuid('team.onyeka@hometrust.local'), now() - interval '8 hours', true),
  ('d1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Contract', 'Electrical contractor variation', 'Approved variation order for backup power and conduit routing.', 'project-assets', 'b1000000-0000-0000-0000-000000000001/contracts/electrical-variation.pdf', 'application/pdf', 820000, public.seed_user_uuid('team.balogun@hometrust.local'), now() - interval '3 days', true),
  ('d1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003', 'Document', 'Retail launch permit pack', 'Combined permit tracker and filing receipts.', 'project-assets', 'b1000000-0000-0000-0000-000000000003/documents/permit-pack.pdf', 'application/pdf', 550000, public.seed_user_uuid('team.balogun@hometrust.local'), now() - interval '1 day', true),
  ('d1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000004', 'Receipt', 'Cold storage steel deposit receipt', 'Initial payment receipt for cold storage fabrication package.', 'project-assets', 'b1000000-0000-0000-0000-000000000004/receipts/cold-storage-deposit.pdf', 'application/pdf', 240000, public.seed_user_uuid('team.onyeka@hometrust.local'), now() - interval '12 hours', true),
  ('d1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000005', 'Video', 'Transformer yard walkthrough', 'Short video from the proposed transformer vendor yard inspection.', 'project-assets', 'b1000000-0000-0000-0000-000000000005/videos/vendor-yard.mp4', 'video/mp4', 7400000, public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '5 hours', true),
  ('d1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000006', 'Document', 'Fleet vendor comparison matrix', 'Scoring matrix covering vehicle age, service history, and delivery timeline.', 'project-assets', 'b1000000-0000-0000-0000-000000000006/documents/vendor-matrix.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 310000, public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '1 day', true)
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
  ('d1200000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000004', 'd1000000-0000-0000-0000-000000000004', 'Ibadan Cold Chain Fabricators', 'ICCF-2403-09', current_date - 1, 18500, 'USD', public.seed_user_uuid('team.onyeka@hometrust.local'))
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
  ('e2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'e1100000-0000-0000-0000-000000000002', 'Electrical materials first release', 'PrimeVolt Electrics Ltd', 12500, 'USD', 'approved', now() - interval '3 days', public.seed_user_uuid('team.balogun@hometrust.local'), 'Released after revised BOQ confirmation'),
  ('e2000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000003', null, 'Shop fitting final carpentry tranche', 'EastGate Joinery', 8600, 'USD', 'approved', now() - interval '4 days', public.seed_user_uuid('team.balogun@hometrust.local'), 'Final tranche before snag close-out'),
  ('e2000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000004', 'e1100000-0000-0000-0000-000000000003', 'Cold storage steel deposit', 'Ibadan Cold Chain Fabricators', 18500, 'USD', 'approved', now() - interval '1 day', public.seed_user_uuid('team.onyeka@hometrust.local'), 'Deposit posted against storage package'),
  ('e2000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000005', 'e1100000-0000-0000-0000-000000000004', 'Transformer vendor advance request', 'NorthGrid Energy Ltd', 22000, 'USD', 'pending', now() - interval '10 hours', public.seed_user_uuid('ops.adeyemi@hometrust.local'), 'Held pending replacement vendor diligence'),
  ('e2000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000006', 'e1100000-0000-0000-0000-000000000005', 'Fleet inspection travel and deposits', 'PH Fleet Hub', 17750, 'USD', 'approved', now() - interval '2 days', public.seed_user_uuid('ops.adeyemi@hometrust.local'), 'Inspection trip and reservation fees')
on conflict (id) do update set status = excluded.status, occurred_at = excluded.occurred_at;

insert into public.transaction_receipts (id, transaction_id, receipt_id)
values
  ('e2100000-0000-0000-0000-000000000001', 'e2000000-0000-0000-0000-000000000003', 'd1200000-0000-0000-0000-000000000001')
on conflict (transaction_id, receipt_id) do nothing;

insert into public.approvals (id, project_id, title, description, status, client_visible, requested_by, requested_from_user_id, due_at)
values
  ('e3000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'Survey amendment acknowledgement', 'Please confirm the revised boundary note before legal counsel resubmits the filing.', 'pending', true, public.seed_user_uuid('team.balogun@hometrust.local'), public.seed_user_uuid('client.adebayo@hometrust.local'), now() + interval '3 days'),
  ('e3000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000005', 'Replacement transformer vendor shortlist', 'Operations needs approval to issue RFQ to the replacement shortlist.', 'pending', true, public.seed_user_uuid('ops.adeyemi@hometrust.local'), public.seed_user_uuid('client.sule@hometrust.local'), now() + interval '4 days')
on conflict (id) do update set status = excluded.status, due_at = excluded.due_at;

insert into public.approval_requests (id, project_id, transaction_id, approval_id, title, description, status, client_visible, requested_by, requested_for_user_id, amount, currency_code, due_at)
values
  ('e3100000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', null, 'e3000000-0000-0000-0000-000000000001', 'Approve survey amendment refile', 'Boundary annotation has changed; client acknowledgement is required before the legal refile.', 'pending', true, public.seed_user_uuid('team.balogun@hometrust.local'), public.seed_user_uuid('client.adebayo@hometrust.local'), null, 'USD', now() + interval '3 days'),
  ('e3100000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000005', 'e2000000-0000-0000-0000-000000000004', 'e3000000-0000-0000-0000-000000000002', 'Approve replacement transformer RFQ', 'Original vendor failed documentation review; approve release to replacement shortlist.', 'pending', true, public.seed_user_uuid('ops.adeyemi@hometrust.local'), public.seed_user_uuid('client.sule@hometrust.local'), 22000, 'USD', now() + interval '4 days')
on conflict (id) do update set status = excluded.status, due_at = excluded.due_at;

insert into public.conversations (id, project_id, subject, kind, created_by, created_at, updated_at)
values
  ('f1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Lekki weekly execution thread', 'project', public.seed_user_uuid('team.balogun@hometrust.local'), now() - interval '30 days', now() - interval '2 hours'),
  ('f1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 'Land documentation escalation', 'project', public.seed_user_uuid('team.balogun@hometrust.local'), now() - interval '12 days', now() - interval '1 day'),
  ('f1000000-0000-0000-0000-000000000003', null, 'General support and account coordination', 'support', public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '20 days', now() - interval '5 hours')
on conflict (id) do update set updated_at = excluded.updated_at;

insert into public.conversation_participants (id, conversation_id, user_id, last_read_at)
values
  ('f1100000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000001', public.seed_user_uuid('client.adebayo@hometrust.local'), now() - interval '1 day'),
  ('f1100000-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000001', public.seed_user_uuid('team.balogun@hometrust.local'), now() - interval '2 hours'),
  ('f1100000-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000001', public.seed_user_uuid('team.onyeka@hometrust.local'), now() - interval '8 hours'),
  ('f1100000-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000002', public.seed_user_uuid('client.adebayo@hometrust.local'), now() - interval '2 days'),
  ('f1100000-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000002', public.seed_user_uuid('team.balogun@hometrust.local'), now() - interval '1 day'),
  ('f1100000-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000003', public.seed_user_uuid('client.adebayo@hometrust.local'), now() - interval '5 days'),
  ('f1100000-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000003', public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '5 hours')
on conflict (conversation_id, user_id) do update set last_read_at = excluded.last_read_at;

insert into public.messages (id, conversation_id, sender_user_id, body, sent_at)
values
  ('f1200000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000001', public.seed_user_uuid('team.balogun@hometrust.local'), 'We uploaded the latest site verification report this morning. MEP routing has started and the electrical contractor is mobilized for the first-fix window.', now() - interval '10 hours'),
  ('f1200000-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000001', public.seed_user_uuid('client.adebayo@hometrust.local'), 'Please keep me posted if fixture selections need final approval this week. I can respond same-day.', now() - interval '9 hours'),
  ('f1200000-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000002', public.seed_user_uuid('team.balogun@hometrust.local'), 'Legal counsel flagged the boundary annotation. We need your acknowledgement before we can proceed with the refile.', now() - interval '1 day'),
  ('f1200000-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000003', public.seed_user_uuid('ops.adeyemi@hometrust.local'), 'Your dashboard notifications are active. Use this thread for billing, support, or callback coordination.', now() - interval '5 hours')
on conflict (id) do update set body = excluded.body, sent_at = excluded.sent_at;

insert into public.notifications (id, user_id, project_id, conversation_id, type, title, body, href, created_at)
values
  ('a7000000-0000-0000-0000-000000000001', public.seed_user_uuid('client.adebayo@hometrust.local'), 'b1000000-0000-0000-0000-000000000001', null, 'report_uploaded', 'New Lekki report available', 'The weekly progress report and site media are ready for review.', '/dashboard/projects/b1000000-0000-0000-0000-000000000001/reports', now() - interval '8 hours'),
  ('a7000000-0000-0000-0000-000000000002', public.seed_user_uuid('client.adebayo@hometrust.local'), 'b1000000-0000-0000-0000-000000000002', null, 'approval_needed', 'Survey amendment requires approval', 'Please review the land filing update so counsel can re-submit.', '/dashboard/projects/b1000000-0000-0000-0000-000000000002/budget', now() - interval '1 day'),
  ('a7000000-0000-0000-0000-000000000003', public.seed_user_uuid('client.okafor@hometrust.local'), 'b1000000-0000-0000-0000-000000000003', null, 'milestone_completed', 'Permit inspection passed', 'The retail launch compliance inspection completed without material findings.', '/dashboard/projects/b1000000-0000-0000-0000-000000000003/timeline', now() - interval '6 hours'),
  ('a7000000-0000-0000-0000-000000000004', public.seed_user_uuid('client.sule@hometrust.local'), 'b1000000-0000-0000-0000-000000000005', null, 'budget_threshold', 'Procurement risk flagged', 'Transformer procurement remains blocked pending a replacement vendor approval.', '/dashboard/projects/b1000000-0000-0000-0000-000000000005/budget', now() - interval '4 hours'),
  ('a7000000-0000-0000-0000-000000000005', public.seed_user_uuid('client.ebi@hometrust.local'), 'b1000000-0000-0000-0000-000000000006', null, 'document_added', 'Vendor comparison matrix added', 'The fleet vendor scoring workbook is now in your secure document room.', '/dashboard/projects/b1000000-0000-0000-0000-000000000006/files', now() - interval '1 day'),
  ('a7000000-0000-0000-0000-000000000006', public.seed_user_uuid('client.adebayo@hometrust.local'), null, 'f1000000-0000-0000-0000-000000000001', 'new_message', 'New message in Lekki weekly execution thread', 'Fixture approvals may be needed this week.', '/dashboard/inbox/f1000000-0000-0000-0000-000000000001', now() - interval '9 hours')
on conflict (id) do update set created_at = excluded.created_at, body = excluded.body;

insert into public.notification_reads (id, notification_id, user_id, read_at)
values
  ('a7100000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000001', public.seed_user_uuid('client.adebayo@hometrust.local'), now() - interval '6 hours'),
  ('a7100000-0000-0000-0000-000000000002', 'a7000000-0000-0000-0000-000000000003', public.seed_user_uuid('client.okafor@hometrust.local'), now() - interval '2 hours')
on conflict (notification_id, user_id) do update set read_at = excluded.read_at;

insert into public.support_threads (id, client_account_id, project_id, subject, priority, status, created_by, assigned_to, created_at, updated_at)
values
  ('a8000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'Land title timing reassurance', 'priority', 'open', public.seed_user_uuid('client.adebayo@hometrust.local'), public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '2 days', now() - interval '1 day'),
  ('a8000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000005', 'Mini-grid procurement callback request', 'urgent', 'in_progress', public.seed_user_uuid('client.sule@hometrust.local'), public.seed_user_uuid('ops.adeyemi@hometrust.local'), now() - interval '12 hours', now() - interval '4 hours')
on conflict (id) do update set status = excluded.status, updated_at = excluded.updated_at;

insert into public.support_messages (id, support_thread_id, sender_user_id, body, created_at)
values
  ('a8100000-0000-0000-0000-000000000001', 'a8000000-0000-0000-0000-000000000001', public.seed_user_uuid('client.adebayo@hometrust.local'), 'Please confirm whether the survey amendment introduces any long-term title risk beyond the timing delay.', now() - interval '2 days'),
  ('a8100000-0000-0000-0000-000000000002', 'a8000000-0000-0000-0000-000000000001', public.seed_user_uuid('ops.adeyemi@hometrust.local'), 'No long-term title risk is expected. We are escalating directly with counsel and will keep the dashboard updated once the filing window is confirmed.', now() - interval '1 day'),
  ('a8100000-0000-0000-0000-000000000003', 'a8000000-0000-0000-0000-000000000002', public.seed_user_uuid('client.sule@hometrust.local'), 'I would like a callback before we approve the replacement transformer vendor shortlist.', now() - interval '12 hours')
on conflict (id) do update set body = excluded.body, created_at = excluded.created_at;

insert into public.audit_logs (id, actor_user_id, actor_role, action, target_type, target_id, metadata, created_at)
values
  ('a9000000-0000-0000-0000-000000000001', public.seed_user_uuid('team.balogun@hometrust.local'), 'TEAM_MEMBER', 'report.publish', 'report', 'c3000000-0000-0000-0000-000000000001', '{"projectId":"b1000000-0000-0000-0000-000000000001"}', now() - interval '8 hours'),
  ('a9000000-0000-0000-0000-000000000002', public.seed_user_uuid('ops.adeyemi@hometrust.local'), 'OPERATIONS_MANAGER', 'support.request.respond', 'support_thread', 'a8000000-0000-0000-0000-000000000001', '{"priority":"priority"}', now() - interval '1 day')
on conflict (id) do update set metadata = excluded.metadata, created_at = excluded.created_at;

insert into public.portal_invites (
  id,
  invited_email,
  invited_name,
  invited_role,
  auth_user_id,
  invited_by_user_id,
  client_account_id,
  project_id,
  token_hash,
  invited_at,
  expires_at,
  last_sent_at,
  delivery_metadata
)
values (
  'aa000000-0000-0000-0000-000000000001',
  'client.invited@hometrust.local',
  'Pending Invite Client',
  'CLIENT',
  public.seed_user_uuid('client.invited@hometrust.local'),
  public.seed_user_uuid('ops.adeyemi@hometrust.local'),
  'a1000000-0000-0000-0000-000000000002',
  'b1000000-0000-0000-0000-000000000003',
  encode(digest('hometrust-local-invite-token', 'sha256'), 'hex'),
  now() - interval '6 hours',
  now() + interval '6 days',
  now() - interval '6 hours',
  '{"delivery":"manual-local-link"}'::jsonb
)
on conflict (id) do update set expires_at = excluded.expires_at, delivery_metadata = excluded.delivery_metadata;
