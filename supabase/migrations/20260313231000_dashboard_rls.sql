-- Enable and force RLS on listed tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_account_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approval_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles FORCE ROW LEVEL SECURITY;
ALTER TABLE public.client_accounts FORCE ROW LEVEL SECURITY;
ALTER TABLE public.client_account_members FORCE ROW LEVEL SECURITY;
ALTER TABLE public.team_memberships FORCE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences FORCE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences FORCE ROW LEVEL SECURITY;
ALTER TABLE public.projects FORCE ROW LEVEL SECURITY;
ALTER TABLE public.project_assignments FORCE ROW LEVEL SECURITY;
ALTER TABLE public.project_contacts FORCE ROW LEVEL SECURITY;
ALTER TABLE public.project_status_history FORCE ROW LEVEL SECURITY;
ALTER TABLE public.milestones FORCE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events FORCE ROW LEVEL SECURITY;
ALTER TABLE public.approvals FORCE ROW LEVEL SECURITY;
ALTER TABLE public.reports FORCE ROW LEVEL SECURITY;
ALTER TABLE public.report_sections FORCE ROW LEVEL SECURITY;
ALTER TABLE public.files FORCE ROW LEVEL SECURITY;
ALTER TABLE public.report_attachments FORCE ROW LEVEL SECURITY;
ALTER TABLE public.receipts FORCE ROW LEVEL SECURITY;
ALTER TABLE public.contracts FORCE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets FORCE ROW LEVEL SECURITY;
ALTER TABLE public.project_budgets FORCE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories FORCE ROW LEVEL SECURITY;
ALTER TABLE public.transactions FORCE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_receipts FORCE ROW LEVEL SECURITY;
ALTER TABLE public.approval_requests FORCE ROW LEVEL SECURITY;
ALTER TABLE public.conversations FORCE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants FORCE ROW LEVEL SECURITY;
ALTER TABLE public.messages FORCE ROW LEVEL SECURITY;
ALTER TABLE public.message_attachments FORCE ROW LEVEL SECURITY;
ALTER TABLE public.notifications FORCE ROW LEVEL SECURITY;
ALTER TABLE public.notification_reads FORCE ROW LEVEL SECURITY;
ALTER TABLE public.support_threads FORCE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages FORCE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs FORCE ROW LEVEL SECURITY;

-- Policies (qualified identifiers and SELECT auth.uid() usage)
CREATE POLICY "profiles_select_own_or_admin" ON public.profiles
FOR SELECT TO authenticated
USING (public.profiles.id = (SELECT auth.uid()) OR public.is_adminish());

CREATE POLICY "profiles_update_own_or_admin" ON public.profiles
FOR UPDATE TO authenticated
USING (public.profiles.id = (SELECT auth.uid()) OR public.is_adminish())
WITH CHECK (public.profiles.id = (SELECT auth.uid()) OR public.is_adminish());

CREATE POLICY "user_roles_select_own_or_admin" ON public.user_roles
FOR SELECT TO authenticated
USING (public.user_roles.user_id = (SELECT auth.uid()) OR public.is_adminish());

CREATE POLICY "client_accounts_select_scoped" ON public.client_accounts
FOR SELECT TO authenticated
USING (
  public.is_adminish()
  OR EXISTS (
    SELECT 1 FROM public.client_account_members cam
    WHERE cam.client_account_id = public.client_accounts.id AND cam.user_id = (SELECT auth.uid())
  )
  OR EXISTS (
    SELECT 1
    FROM public.projects p
    JOIN public.project_assignments pa ON pa.project_id = p.id
    WHERE p.client_account_id = public.client_accounts.id AND pa.user_id = (SELECT auth.uid())
  )
);

CREATE POLICY "client_account_members_select_scoped" ON public.client_account_members
FOR SELECT TO authenticated
USING (
  public.client_account_members.user_id = (SELECT auth.uid())
  OR public.is_adminish()
  OR EXISTS (
    SELECT 1 FROM public.client_account_members cam
    WHERE cam.client_account_id = public.client_account_members.client_account_id AND cam.user_id = (SELECT auth.uid())
  )
);

CREATE POLICY "team_memberships_select_own_or_admin" ON public.team_memberships
FOR SELECT TO authenticated
USING (public.team_memberships.user_id = (SELECT auth.uid()) OR public.is_adminish());

CREATE POLICY "user_preferences_manage_own" ON public.user_preferences
FOR ALL TO authenticated
USING (public.user_preferences.user_id = (SELECT auth.uid()) OR public.is_adminish())
WITH CHECK (public.user_preferences.user_id = (SELECT auth.uid()) OR public.is_adminish());

CREATE POLICY "notification_preferences_manage_own" ON public.notification_preferences
FOR ALL TO authenticated
USING (public.notification_preferences.user_id = (SELECT auth.uid()) OR public.is_adminish())
WITH CHECK (public.notification_preferences.user_id = (SELECT auth.uid()) OR public.is_adminish());

CREATE POLICY "projects_select_scoped" ON public.projects
FOR SELECT TO authenticated
USING (public.user_has_project_access(public.projects.id));

CREATE POLICY "projects_manage_assigned_or_admin" ON public.projects
FOR UPDATE TO authenticated
USING (public.user_can_edit_project(public.projects.id))
WITH CHECK (public.user_can_edit_project(public.projects.id));

CREATE POLICY "project_assignments_select_scoped" ON public.project_assignments
FOR SELECT TO authenticated
USING (public.user_has_project_access(public.project_assignments.project_id));

CREATE POLICY "project_assignments_manage_scoped" ON public.project_assignments
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.project_assignments.project_id))
WITH CHECK (public.user_can_edit_project(public.project_assignments.project_id));

CREATE POLICY "project_contacts_select_scoped" ON public.project_contacts
FOR SELECT TO authenticated
USING (
  public.user_has_project_access(public.project_contacts.project_id)
  AND (
    COALESCE(public.current_app_role() <> 'CLIENT', false)
    OR public.project_contacts.is_client_visible
  )
);

CREATE POLICY "project_contacts_manage_scoped" ON public.project_contacts
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.project_contacts.project_id))
WITH CHECK (public.user_can_edit_project(public.project_contacts.project_id));

CREATE POLICY "project_status_history_select_scoped" ON public.project_status_history
FOR SELECT TO authenticated
USING (public.user_has_project_access(public.project_status_history.project_id));

CREATE POLICY "project_status_history_insert_scoped" ON public.project_status_history
FOR INSERT TO authenticated
WITH CHECK (public.user_can_edit_project(public.project_status_history.project_id));

CREATE POLICY "milestones_select_scoped" ON public.milestones
FOR SELECT TO authenticated
USING (
  public.user_has_project_access(public.milestones.project_id)
  AND (
    COALESCE(public.current_app_role() <> 'CLIENT', false)
    OR public.milestones.visible_to_client
  )
);

CREATE POLICY "milestones_manage_scoped" ON public.milestones
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.milestones.project_id))
WITH CHECK (public.user_can_edit_project(public.milestones.project_id));

CREATE POLICY "timeline_events_select_scoped" ON public.timeline_events
FOR SELECT TO authenticated
USING (
  public.user_has_project_access(public.timeline_events.project_id)
  AND (
    COALESCE(public.current_app_role() <> 'CLIENT', false)
    OR public.timeline_events.client_visible
  )
);

CREATE POLICY "timeline_events_manage_scoped" ON public.timeline_events
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.timeline_events.project_id))
WITH CHECK (public.user_can_edit_project(public.timeline_events.project_id));

CREATE POLICY "approvals_select_scoped" ON public.approvals
FOR SELECT TO authenticated
USING (
  public.user_has_project_access(public.approvals.project_id)
  AND (
    COALESCE(public.current_app_role() <> 'CLIENT', false)
    OR public.approvals.client_visible
  )
);

CREATE POLICY "approvals_manage_scoped" ON public.approvals
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.approvals.project_id))
WITH CHECK (public.user_can_edit_project(public.approvals.project_id));

CREATE POLICY "reports_select_scoped" ON public.reports
FOR SELECT TO authenticated
USING (
  public.user_has_project_access(public.reports.project_id)
  AND (
    COALESCE(public.current_app_role() <> 'CLIENT', false)
    OR public.reports.client_visible
  )
);

CREATE POLICY "reports_manage_scoped" ON public.reports
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.reports.project_id))
WITH CHECK (public.user_can_edit_project(public.reports.project_id));

CREATE POLICY "report_sections_select_scoped" ON public.report_sections
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.reports r
    WHERE r.id = public.report_sections.report_id
      AND public.user_has_project_access(r.project_id)
      AND (
        COALESCE(public.current_app_role() <> 'CLIENT', false)
        OR r.client_visible
      )
  )
);

CREATE POLICY "report_sections_manage_scoped" ON public.report_sections
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.reports r
    WHERE r.id = public.report_sections.report_id AND public.user_can_edit_project(r.project_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.reports r
    WHERE r.id = public.report_sections.report_id AND public.user_can_edit_project(r.project_id)
  )
);

CREATE POLICY "files_select_scoped" ON public.files
FOR SELECT TO authenticated
USING (
  public.user_has_project_access(public.files.project_id)
  AND (
    COALESCE(public.current_app_role() <> 'CLIENT', false)
    OR public.files.client_visible
  )
);

CREATE POLICY "files_manage_scoped" ON public.files
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.files.project_id))
WITH CHECK (public.user_can_edit_project(public.files.project_id));

CREATE POLICY "report_attachments_select_scoped" ON public.report_attachments
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.files f
    WHERE f.id = public.report_attachments.file_id
      AND public.user_has_project_access(f.project_id)
      AND (
        COALESCE(public.current_app_role() <> 'CLIENT', false)
        OR f.client_visible
      )
  )
);

CREATE POLICY "report_attachments_manage_scoped" ON public.report_attachments
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.reports r
    WHERE r.id = public.report_attachments.report_id AND public.user_can_edit_project(r.project_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.reports r
    WHERE r.id = public.report_attachments.report_id AND public.user_can_edit_project(r.project_id)
  )
);

CREATE POLICY "receipts_select_scoped" ON public.receipts
FOR SELECT TO authenticated
USING (public.user_has_project_access(public.receipts.project_id));

CREATE POLICY "receipts_manage_scoped" ON public.receipts
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.receipts.project_id))
WITH CHECK (public.user_can_edit_project(public.receipts.project_id));

CREATE POLICY "contracts_select_scoped" ON public.contracts
FOR SELECT TO authenticated
USING (public.user_has_project_access(public.contracts.project_id));

CREATE POLICY "contracts_manage_scoped" ON public.contracts
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.contracts.project_id))
WITH CHECK (public.user_can_edit_project(public.contracts.project_id));

CREATE POLICY "media_assets_select_scoped" ON public.media_assets
FOR SELECT TO authenticated
USING (public.user_has_project_access(public.media_assets.project_id));

CREATE POLICY "media_assets_manage_scoped" ON public.media_assets
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.media_assets.project_id))
WITH CHECK (public.user_can_edit_project(public.media_assets.project_id));

CREATE POLICY "project_budgets_select_scoped" ON public.project_budgets
FOR SELECT TO authenticated
USING (public.user_has_project_access(public.project_budgets.project_id));

CREATE POLICY "project_budgets_manage_scoped" ON public.project_budgets
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.project_budgets.project_id))
WITH CHECK (public.user_can_edit_project(public.project_budgets.project_id));

CREATE POLICY "budget_categories_select_scoped" ON public.budget_categories
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.project_budgets pb
    WHERE pb.id = public.budget_categories.budget_id AND public.user_has_project_access(pb.project_id)
  )
);

CREATE POLICY "budget_categories_manage_scoped" ON public.budget_categories
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.project_budgets pb
    WHERE pb.id = public.budget_categories.budget_id AND public.user_can_edit_project(pb.project_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.project_budgets pb
    WHERE pb.id = public.budget_categories.budget_id AND public.user_can_edit_project(pb.project_id)
  )
);

CREATE POLICY "transactions_select_scoped" ON public.transactions
FOR SELECT TO authenticated
USING (public.user_has_project_access(public.transactions.project_id));

CREATE POLICY "transactions_manage_scoped" ON public.transactions
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.transactions.project_id))
WITH CHECK (public.user_can_edit_project(public.transactions.project_id));

CREATE POLICY "transaction_receipts_select_scoped" ON public.transaction_receipts
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.transactions t
    WHERE t.id = public.transaction_receipts.transaction_id AND public.user_has_project_access(t.project_id)
  )
);

CREATE POLICY "transaction_receipts_manage_scoped" ON public.transaction_receipts
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.transactions t
    WHERE t.id = public.transaction_receipts.transaction_id AND public.user_can_edit_project(t.project_id)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.transactions t
    WHERE t.id = public.transaction_receipts.transaction_id AND public.user_can_edit_project(t.project_id)
  )
);

CREATE POLICY "approval_requests_select_scoped" ON public.approval_requests
FOR SELECT TO authenticated
USING (
  public.user_has_project_access(public.approval_requests.project_id)
  AND (
    COALESCE(public.current_app_role() <> 'CLIENT', false)
    OR public.approval_requests.client_visible
  )
);

CREATE POLICY "approval_requests_manage_scoped" ON public.approval_requests
FOR ALL TO authenticated
USING (public.user_can_edit_project(public.approval_requests.project_id))
WITH CHECK (public.user_can_edit_project(public.approval_requests.project_id));

CREATE POLICY "conversations_select_scoped" ON public.conversations
FOR SELECT TO authenticated
USING (public.user_has_conversation_access(public.conversations.id));

CREATE POLICY "conversations_insert_scoped" ON public.conversations
FOR INSERT TO authenticated
WITH CHECK (
  public.conversations.created_by = (SELECT auth.uid())
  AND (
    public.conversations.project_id IS NULL
    OR public.user_has_project_access(public.conversations.project_id)
  )
);

CREATE POLICY "conversations_update_scoped" ON public.conversations
FOR UPDATE TO authenticated
USING (
  public.user_has_conversation_access(public.conversations.id)
  AND (
    public.is_adminish()
    OR public.conversations.created_by = (SELECT auth.uid())
  )
)
WITH CHECK (
  public.user_has_conversation_access(public.conversations.id)
  AND (
    public.is_adminish()
    OR public.conversations.created_by = (SELECT auth.uid())
  )
);

CREATE POLICY "conversation_participants_select_scoped" ON public.conversation_participants
FOR SELECT TO authenticated
USING (public.user_has_conversation_access(public.conversation_participants.conversation_id));

CREATE POLICY "conversation_participants_manage_scoped" ON public.conversation_participants
FOR ALL TO authenticated
USING (
  public.is_adminish()
  OR EXISTS (
    SELECT 1 FROM public.conversations c
    WHERE c.id = public.conversation_participants.conversation_id AND c.created_by = (SELECT auth.uid())
  )
)
WITH CHECK (
  public.is_adminish()
  OR EXISTS (
    SELECT 1 FROM public.conversations c
    WHERE c.id = public.conversation_participants.conversation_id AND c.created_by = (SELECT auth.uid())
  )
);

CREATE POLICY "messages_select_scoped" ON public.messages
FOR SELECT TO authenticated
USING (public.user_has_conversation_access(public.messages.conversation_id));

CREATE POLICY "messages_insert_scoped" ON public.messages
FOR INSERT TO authenticated
WITH CHECK (
  public.messages.sender_user_id = (SELECT auth.uid())
  AND public.user_has_conversation_access(public.messages.conversation_id)
);

CREATE POLICY "message_attachments_select_scoped" ON public.message_attachments
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.messages m
    WHERE m.id = public.message_attachments.message_id AND public.user_has_conversation_access(m.conversation_id)
  )
);

CREATE POLICY "message_attachments_insert_scoped" ON public.message_attachments
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.messages m
    WHERE m.id = public.message_attachments.message_id
      AND m.sender_user_id = (SELECT auth.uid())
      AND public.user_has_conversation_access(m.conversation_id)
  )
);

CREATE POLICY "notifications_select_own" ON public.notifications
FOR SELECT TO authenticated
USING (public.notifications.user_id = (SELECT auth.uid()) OR public.is_adminish());

CREATE POLICY "notifications_insert_admin_or_sender" ON public.notifications
FOR INSERT TO authenticated
WITH CHECK (public.is_adminish() OR public.notifications.user_id = (SELECT auth.uid()));

CREATE POLICY "notification_reads_manage_own" ON public.notification_reads
FOR ALL TO authenticated
USING (public.notification_reads.user_id = (SELECT auth.uid()) OR public.is_adminish())
WITH CHECK (public.notification_reads.user_id = (SELECT auth.uid()) OR public.is_adminish());

CREATE POLICY "support_threads_select_scoped" ON public.support_threads
FOR SELECT TO authenticated
USING (public.user_has_support_access(public.support_threads.id));

CREATE POLICY "support_threads_insert_scoped" ON public.support_threads
FOR INSERT TO authenticated
WITH CHECK (
  public.support_threads.created_by = (SELECT auth.uid())
  AND (
    public.is_adminish()
    OR public.support_threads.client_account_id IS NULL
    OR EXISTS (
      SELECT 1 FROM public.client_account_members cam
      WHERE cam.client_account_id = public.support_threads.client_account_id AND cam.user_id = (SELECT auth.uid())
    )
  )
);

CREATE POLICY "support_threads_update_scoped" ON public.support_threads
FOR UPDATE TO authenticated
USING (public.user_has_support_access(public.support_threads.id))
WITH CHECK (public.user_has_support_access(public.support_threads.id));

CREATE POLICY "support_messages_select_scoped" ON public.support_messages
FOR SELECT TO authenticated
USING (public.user_has_support_access(public.support_messages.support_thread_id));

CREATE POLICY "support_messages_insert_scoped" ON public.support_messages
FOR INSERT TO authenticated
WITH CHECK (
  public.support_messages.sender_user_id = (SELECT auth.uid())
  AND public.user_has_support_access(public.support_messages.support_thread_id)
);

CREATE POLICY "audit_logs_select_admin" ON public.audit_logs
FOR SELECT TO authenticated
USING (public.is_adminish());

CREATE POLICY "audit_logs_insert_own" ON public.audit_logs
FOR INSERT TO authenticated
WITH CHECK (public.audit_logs.actor_user_id = (SELECT auth.uid()) OR public.is_adminish());

CREATE POLICY "storage_object_select_project_assets" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'project-assets'
  AND public.user_can_access_storage_object(bucket_id, name)
);
