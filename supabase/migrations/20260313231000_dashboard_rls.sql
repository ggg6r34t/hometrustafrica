alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.client_accounts enable row level security;
alter table public.client_account_members enable row level security;
alter table public.team_memberships enable row level security;
alter table public.user_preferences enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.projects enable row level security;
alter table public.project_assignments enable row level security;
alter table public.project_contacts enable row level security;
alter table public.project_status_history enable row level security;
alter table public.milestones enable row level security;
alter table public.timeline_events enable row level security;
alter table public.approvals enable row level security;
alter table public.reports enable row level security;
alter table public.report_sections enable row level security;
alter table public.files enable row level security;
alter table public.report_attachments enable row level security;
alter table public.receipts enable row level security;
alter table public.contracts enable row level security;
alter table public.media_assets enable row level security;
alter table public.project_budgets enable row level security;
alter table public.budget_categories enable row level security;
alter table public.transactions enable row level security;
alter table public.transaction_receipts enable row level security;
alter table public.approval_requests enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;
alter table public.message_attachments enable row level security;
alter table public.notifications enable row level security;
alter table public.notification_reads enable row level security;
alter table public.support_threads enable row level security;
alter table public.support_messages enable row level security;
alter table public.audit_logs enable row level security;

alter table public.profiles force row level security;
alter table public.user_roles force row level security;
alter table public.client_accounts force row level security;
alter table public.client_account_members force row level security;
alter table public.team_memberships force row level security;
alter table public.user_preferences force row level security;
alter table public.notification_preferences force row level security;
alter table public.projects force row level security;
alter table public.project_assignments force row level security;
alter table public.project_contacts force row level security;
alter table public.project_status_history force row level security;
alter table public.milestones force row level security;
alter table public.timeline_events force row level security;
alter table public.approvals force row level security;
alter table public.reports force row level security;
alter table public.report_sections force row level security;
alter table public.files force row level security;
alter table public.report_attachments force row level security;
alter table public.receipts force row level security;
alter table public.contracts force row level security;
alter table public.media_assets force row level security;
alter table public.project_budgets force row level security;
alter table public.budget_categories force row level security;
alter table public.transactions force row level security;
alter table public.transaction_receipts force row level security;
alter table public.approval_requests force row level security;
alter table public.conversations force row level security;
alter table public.conversation_participants force row level security;
alter table public.messages force row level security;
alter table public.message_attachments force row level security;
alter table public.notifications force row level security;
alter table public.notification_reads force row level security;
alter table public.support_threads force row level security;
alter table public.support_messages force row level security;
alter table public.audit_logs force row level security;

create policy "profiles_select_own_or_admin" on public.profiles
for select to authenticated
using (id = auth.uid() or public.is_adminish());

create policy "profiles_update_own_or_admin" on public.profiles
for update to authenticated
using (id = auth.uid() or public.is_adminish())
with check (id = auth.uid() or public.is_adminish());

create policy "user_roles_select_own_or_admin" on public.user_roles
for select to authenticated
using (user_id = auth.uid() or public.is_adminish());

create policy "client_accounts_select_scoped" on public.client_accounts
for select to authenticated
using (
  public.is_adminish()
  or exists (
    select 1 from public.client_account_members cam
    where cam.client_account_id = id and cam.user_id = auth.uid()
  )
  or exists (
    select 1
    from public.projects p
    join public.project_assignments pa on pa.project_id = p.id
    where p.client_account_id = id and pa.user_id = auth.uid()
  )
);

create policy "client_account_members_select_scoped" on public.client_account_members
for select to authenticated
using (
  user_id = auth.uid()
  or public.is_adminish()
  or exists (
    select 1 from public.client_account_members cam
    where cam.client_account_id = client_account_id and cam.user_id = auth.uid()
  )
);

create policy "team_memberships_select_own_or_admin" on public.team_memberships
for select to authenticated
using (user_id = auth.uid() or public.is_adminish());

create policy "user_preferences_manage_own" on public.user_preferences
for all to authenticated
using (user_id = auth.uid() or public.is_adminish())
with check (user_id = auth.uid() or public.is_adminish());

create policy "notification_preferences_manage_own" on public.notification_preferences
for all to authenticated
using (user_id = auth.uid() or public.is_adminish())
with check (user_id = auth.uid() or public.is_adminish());

create policy "projects_select_scoped" on public.projects
for select to authenticated
using (public.user_has_project_access(id));

create policy "projects_manage_assigned_or_admin" on public.projects
for update to authenticated
using (public.user_can_edit_project(id))
with check (public.user_can_edit_project(id));

create policy "project_assignments_select_scoped" on public.project_assignments
for select to authenticated
using (public.user_has_project_access(project_id));

create policy "project_assignments_manage_scoped" on public.project_assignments
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "project_contacts_select_scoped" on public.project_contacts
for select to authenticated
using (
  public.user_has_project_access(project_id)
  and (
    coalesce(public.current_app_role() <> 'CLIENT', false)
    or is_client_visible
  )
);

create policy "project_contacts_manage_scoped" on public.project_contacts
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "project_status_history_select_scoped" on public.project_status_history
for select to authenticated
using (public.user_has_project_access(project_id));

create policy "project_status_history_insert_scoped" on public.project_status_history
for insert to authenticated
with check (public.user_can_edit_project(project_id));

create policy "milestones_select_scoped" on public.milestones
for select to authenticated
using (
  public.user_has_project_access(project_id)
  and (
    coalesce(public.current_app_role() <> 'CLIENT', false)
    or visible_to_client
  )
);

create policy "milestones_manage_scoped" on public.milestones
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "timeline_events_select_scoped" on public.timeline_events
for select to authenticated
using (
  public.user_has_project_access(project_id)
  and (
    coalesce(public.current_app_role() <> 'CLIENT', false)
    or client_visible
  )
);

create policy "timeline_events_manage_scoped" on public.timeline_events
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "approvals_select_scoped" on public.approvals
for select to authenticated
using (
  public.user_has_project_access(project_id)
  and (
    coalesce(public.current_app_role() <> 'CLIENT', false)
    or client_visible
  )
);

create policy "approvals_manage_scoped" on public.approvals
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "reports_select_scoped" on public.reports
for select to authenticated
using (
  public.user_has_project_access(project_id)
  and (
    coalesce(public.current_app_role() <> 'CLIENT', false)
    or client_visible
  )
);

create policy "reports_manage_scoped" on public.reports
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "report_sections_select_scoped" on public.report_sections
for select to authenticated
using (
  exists (
    select 1 from public.reports r
    where r.id = report_id
      and public.user_has_project_access(r.project_id)
      and (
        coalesce(public.current_app_role() <> 'CLIENT', false)
        or r.client_visible
      )
  )
);

create policy "report_sections_manage_scoped" on public.report_sections
for all to authenticated
using (
  exists (
    select 1 from public.reports r
    where r.id = report_id and public.user_can_edit_project(r.project_id)
  )
)
with check (
  exists (
    select 1 from public.reports r
    where r.id = report_id and public.user_can_edit_project(r.project_id)
  )
);

create policy "files_select_scoped" on public.files
for select to authenticated
using (
  public.user_has_project_access(project_id)
  and (
    coalesce(public.current_app_role() <> 'CLIENT', false)
    or client_visible
  )
);

create policy "files_manage_scoped" on public.files
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "report_attachments_select_scoped" on public.report_attachments
for select to authenticated
using (
  exists (
    select 1
    from public.files f
    where f.id = file_id
      and public.user_has_project_access(f.project_id)
      and (
        coalesce(public.current_app_role() <> 'CLIENT', false)
        or f.client_visible
      )
  )
);

create policy "report_attachments_manage_scoped" on public.report_attachments
for all to authenticated
using (
  exists (
    select 1 from public.reports r
    where r.id = report_id and public.user_can_edit_project(r.project_id)
  )
)
with check (
  exists (
    select 1 from public.reports r
    where r.id = report_id and public.user_can_edit_project(r.project_id)
  )
);

create policy "receipts_select_scoped" on public.receipts
for select to authenticated
using (public.user_has_project_access(project_id));

create policy "receipts_manage_scoped" on public.receipts
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "contracts_select_scoped" on public.contracts
for select to authenticated
using (public.user_has_project_access(project_id));

create policy "contracts_manage_scoped" on public.contracts
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "media_assets_select_scoped" on public.media_assets
for select to authenticated
using (public.user_has_project_access(project_id));

create policy "media_assets_manage_scoped" on public.media_assets
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "project_budgets_select_scoped" on public.project_budgets
for select to authenticated
using (public.user_has_project_access(project_id));

create policy "project_budgets_manage_scoped" on public.project_budgets
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "budget_categories_select_scoped" on public.budget_categories
for select to authenticated
using (
  exists (
    select 1 from public.project_budgets pb
    where pb.id = budget_id and public.user_has_project_access(pb.project_id)
  )
);

create policy "budget_categories_manage_scoped" on public.budget_categories
for all to authenticated
using (
  exists (
    select 1 from public.project_budgets pb
    where pb.id = budget_id and public.user_can_edit_project(pb.project_id)
  )
)
with check (
  exists (
    select 1 from public.project_budgets pb
    where pb.id = budget_id and public.user_can_edit_project(pb.project_id)
  )
);

create policy "transactions_select_scoped" on public.transactions
for select to authenticated
using (public.user_has_project_access(project_id));

create policy "transactions_manage_scoped" on public.transactions
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "transaction_receipts_select_scoped" on public.transaction_receipts
for select to authenticated
using (
  exists (
    select 1
    from public.transactions t
    where t.id = transaction_id and public.user_has_project_access(t.project_id)
  )
);

create policy "transaction_receipts_manage_scoped" on public.transaction_receipts
for all to authenticated
using (
  exists (
    select 1
    from public.transactions t
    where t.id = transaction_id and public.user_can_edit_project(t.project_id)
  )
)
with check (
  exists (
    select 1
    from public.transactions t
    where t.id = transaction_id and public.user_can_edit_project(t.project_id)
  )
);

create policy "approval_requests_select_scoped" on public.approval_requests
for select to authenticated
using (
  public.user_has_project_access(project_id)
  and (
    coalesce(public.current_app_role() <> 'CLIENT', false)
    or client_visible
  )
);

create policy "approval_requests_manage_scoped" on public.approval_requests
for all to authenticated
using (public.user_can_edit_project(project_id))
with check (public.user_can_edit_project(project_id));

create policy "conversations_select_scoped" on public.conversations
for select to authenticated
using (public.user_has_conversation_access(id));

create policy "conversations_insert_scoped" on public.conversations
for insert to authenticated
with check (
  created_by = auth.uid()
  and (
    project_id is null
    or public.user_has_project_access(project_id)
  )
);

create policy "conversations_update_scoped" on public.conversations
for update to authenticated
using (
  public.user_has_conversation_access(id)
  and (
    public.is_adminish()
    or created_by = auth.uid()
  )
)
with check (
  public.user_has_conversation_access(id)
  and (
    public.is_adminish()
    or created_by = auth.uid()
  )
);

create policy "conversation_participants_select_scoped" on public.conversation_participants
for select to authenticated
using (public.user_has_conversation_access(conversation_id));

create policy "conversation_participants_manage_scoped" on public.conversation_participants
for all to authenticated
using (
  public.is_adminish()
  or exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.created_by = auth.uid()
  )
)
with check (
  public.is_adminish()
  or exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.created_by = auth.uid()
  )
);

create policy "messages_select_scoped" on public.messages
for select to authenticated
using (public.user_has_conversation_access(conversation_id));

create policy "messages_insert_scoped" on public.messages
for insert to authenticated
with check (
  sender_user_id = auth.uid()
  and public.user_has_conversation_access(conversation_id)
);

create policy "message_attachments_select_scoped" on public.message_attachments
for select to authenticated
using (
  exists (
    select 1 from public.messages m
    where m.id = message_id and public.user_has_conversation_access(m.conversation_id)
  )
);

create policy "message_attachments_insert_scoped" on public.message_attachments
for insert to authenticated
with check (
  exists (
    select 1 from public.messages m
    where m.id = message_id
      and m.sender_user_id = auth.uid()
      and public.user_has_conversation_access(m.conversation_id)
  )
);

create policy "notifications_select_own" on public.notifications
for select to authenticated
using (user_id = auth.uid() or public.is_adminish());

create policy "notifications_insert_admin_or_sender" on public.notifications
for insert to authenticated
with check (public.is_adminish() or user_id = auth.uid());

create policy "notification_reads_manage_own" on public.notification_reads
for all to authenticated
using (user_id = auth.uid() or public.is_adminish())
with check (user_id = auth.uid() or public.is_adminish());

create policy "support_threads_select_scoped" on public.support_threads
for select to authenticated
using (public.user_has_support_access(id));

create policy "support_threads_insert_scoped" on public.support_threads
for insert to authenticated
with check (
  created_by = auth.uid()
  and (
    public.is_adminish()
    or client_account_id is null
    or exists (
      select 1 from public.client_account_members cam
      where cam.client_account_id = client_account_id and cam.user_id = auth.uid()
    )
  )
);

create policy "support_threads_update_scoped" on public.support_threads
for update to authenticated
using (public.user_has_support_access(id))
with check (public.user_has_support_access(id));

create policy "support_messages_select_scoped" on public.support_messages
for select to authenticated
using (public.user_has_support_access(support_thread_id));

create policy "support_messages_insert_scoped" on public.support_messages
for insert to authenticated
with check (
  sender_user_id = auth.uid()
  and public.user_has_support_access(support_thread_id)
);

create policy "audit_logs_select_admin" on public.audit_logs
for select to authenticated
using (public.is_adminish());

create policy "audit_logs_insert_own" on public.audit_logs
for insert to authenticated
with check (actor_user_id = auth.uid() or public.is_adminish());

create policy "storage_object_select_project_assets" on storage.objects
for select to authenticated
using (
  bucket_id = 'project-assets'
  and public.user_can_access_storage_object(bucket_id, name)
);
