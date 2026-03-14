do $$
declare
  seeded_emails text[] := array[
    'client.adebayo@hometrust.local',
    'client.okafor@hometrust.local',
    'client.sule@hometrust.local',
    'client.ebi@hometrust.local',
    'team.balogun@hometrust.local',
    'team.onyeka@hometrust.local',
    'ops.adeyemi@hometrust.local',
    'admin@hometrust.local',
    'client.invited@hometrust.local'
  ];
  seeded_user_ids uuid[];
  seeded_project_ids uuid[] := array[
    'b1000000-0000-0000-0000-000000000001',
    'b1000000-0000-0000-0000-000000000002',
    'b1000000-0000-0000-0000-000000000003',
    'b1000000-0000-0000-0000-000000000004',
    'b1000000-0000-0000-0000-000000000005',
    'b1000000-0000-0000-0000-000000000006'
  ];
  seeded_account_ids uuid[] := array[
    'a1000000-0000-0000-0000-000000000001',
    'a1000000-0000-0000-0000-000000000002',
    'a1000000-0000-0000-0000-000000000003'
  ];
  seeded_conversation_ids uuid[] := array[
    'f1000000-0000-0000-0000-000000000001',
    'f1000000-0000-0000-0000-000000000002',
    'f1000000-0000-0000-0000-000000000003'
  ];
  seeded_support_thread_ids uuid[] := array[
    'a8000000-0000-0000-0000-000000000001',
    'a8000000-0000-0000-0000-000000000002'
  ];
begin
  select coalesce(array_agg(id), '{}')
  into seeded_user_ids
  from public.profiles
  where email = any(seeded_emails);

  delete from public.message_attachments
  where message_id in (
    select id from public.messages where conversation_id = any(seeded_conversation_ids)
  );

  delete from public.messages
  where conversation_id = any(seeded_conversation_ids)
     or sender_user_id = any(seeded_user_ids);

  delete from public.conversation_participants
  where conversation_id = any(seeded_conversation_ids)
     or user_id = any(seeded_user_ids);

  delete from public.notification_reads
  where user_id = any(seeded_user_ids)
     or notification_id in (
       select id from public.notifications where user_id = any(seeded_user_ids)
     );

  delete from public.notifications
  where user_id = any(seeded_user_ids)
     or project_id = any(seeded_project_ids)
     or conversation_id = any(seeded_conversation_ids);

  delete from public.support_messages
  where support_thread_id = any(seeded_support_thread_ids)
     or sender_user_id = any(seeded_user_ids);

  delete from public.support_threads
  where id = any(seeded_support_thread_ids)
     or created_by = any(seeded_user_ids)
     or assigned_to = any(seeded_user_ids)
     or client_account_id = any(seeded_account_ids)
     or project_id = any(seeded_project_ids);

  delete from public.report_attachments
  where report_id in (select id from public.reports where project_id = any(seeded_project_ids))
     or file_id in (select id from public.files where project_id = any(seeded_project_ids));

  delete from public.transaction_receipts
  where transaction_id in (select id from public.transactions where project_id = any(seeded_project_ids))
     or receipt_id in (select id from public.receipts where project_id = any(seeded_project_ids));

  delete from public.media_assets
  where project_id = any(seeded_project_ids)
     or file_id in (select id from public.files where project_id = any(seeded_project_ids));

  delete from public.contracts
  where project_id = any(seeded_project_ids)
     or file_id in (select id from public.files where project_id = any(seeded_project_ids));

  delete from public.receipts
  where project_id = any(seeded_project_ids)
     or uploaded_by = any(seeded_user_ids);

  delete from public.files
  where project_id = any(seeded_project_ids)
     or uploaded_by = any(seeded_user_ids);

  delete from public.report_sections
  where report_id in (select id from public.reports where project_id = any(seeded_project_ids));

  delete from public.reports
  where project_id = any(seeded_project_ids)
     or uploaded_by = any(seeded_user_ids);

  delete from public.timeline_events
  where project_id = any(seeded_project_ids)
     or actor_user_id = any(seeded_user_ids);

  delete from public.milestones
  where project_id = any(seeded_project_ids)
     or created_by = any(seeded_user_ids);

  delete from public.approval_requests
  where project_id = any(seeded_project_ids)
     or requested_by = any(seeded_user_ids)
     or requested_for_user_id = any(seeded_user_ids);

  delete from public.approvals
  where project_id = any(seeded_project_ids)
     or requested_by = any(seeded_user_ids)
     or requested_from_user_id = any(seeded_user_ids)
     or resolved_by = any(seeded_user_ids);

  delete from public.transaction_receipts
  where transaction_id in (select id from public.transactions where created_by = any(seeded_user_ids));

  delete from public.transactions
  where project_id = any(seeded_project_ids)
     or created_by = any(seeded_user_ids);

  delete from public.budget_categories
  where budget_id in (select id from public.project_budgets where project_id = any(seeded_project_ids));

  delete from public.project_budgets
  where project_id = any(seeded_project_ids);

  delete from public.project_status_history
  where project_id = any(seeded_project_ids)
     or changed_by = any(seeded_user_ids);

  delete from public.project_contacts
  where project_id = any(seeded_project_ids);

  delete from public.project_assignments
  where project_id = any(seeded_project_ids)
     or user_id = any(seeded_user_ids);

  delete from public.conversations
  where id = any(seeded_conversation_ids)
     or created_by = any(seeded_user_ids)
     or project_id = any(seeded_project_ids);

  delete from public.audit_logs
  where actor_user_id = any(seeded_user_ids)
     or target_id = any(array[
       'c3000000-0000-0000-0000-000000000001',
       'a8000000-0000-0000-0000-000000000001'
     ]);

  delete from public.portal_invites
  where invited_email = any(seeded_emails)
     or auth_user_id = any(seeded_user_ids)
     or invited_by_user_id = any(seeded_user_ids)
     or client_account_id = any(seeded_account_ids)
     or project_id = any(seeded_project_ids);

  delete from public.projects
  where id = any(seeded_project_ids)
     or created_by = any(seeded_user_ids);

  delete from public.client_account_members
  where client_account_id = any(seeded_account_ids)
     or user_id = any(seeded_user_ids);

  delete from public.team_memberships
  where user_id = any(seeded_user_ids);

  delete from public.notification_preferences
  where user_id = any(seeded_user_ids);

  delete from public.user_preferences
  where user_id = any(seeded_user_ids);

  delete from public.user_roles
  where user_id = any(seeded_user_ids);

  delete from public.client_accounts
  where id = any(seeded_account_ids);

  delete from auth.identities
  where provider = 'email'
    and provider_id = any(seeded_emails);

  delete from auth.users
  where email = any(seeded_emails);
end $$;
