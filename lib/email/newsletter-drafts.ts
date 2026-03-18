import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export interface NewsletterBroadcastDraftRecord {
  id: string;
  campaignName: string;
  subject: string;
  previewText: string;
  title: string;
  intro: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
  lastTestedAt: string | null;
}

export interface SaveNewsletterBroadcastDraftInput {
  draftId?: string;
  campaignName: string;
  subject: string;
  previewText?: string;
  title: string;
  intro: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

function mapDraftRecord(record: {
  id: string;
  campaign_name: string;
  subject: string;
  preview_text: string | null;
  title: string;
  intro: string;
  body: string;
  cta_label: string | null;
  cta_url: string | null;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
  last_tested_at: string | null;
}): NewsletterBroadcastDraftRecord {
  return {
    id: record.id,
    campaignName: record.campaign_name,
    subject: record.subject,
    previewText: record.preview_text || "",
    title: record.title,
    intro: record.intro,
    body: record.body,
    ctaLabel: record.cta_label || "",
    ctaUrl: record.cta_url || "",
    createdAt: record.created_at,
    updatedAt: record.updated_at,
    updatedBy: record.updated_by,
    lastTestedAt: record.last_tested_at,
  };
}

export async function listNewsletterBroadcastDrafts(limit = 8) {
  const admin = createSupabaseAdminClient() as any;
  const { data, error } = await admin
    .from("newsletter_broadcast_drafts")
    .select(
      "id, campaign_name, subject, preview_text, title, intro, body, cta_label, cta_url, created_at, updated_at, updated_by, last_tested_at",
    )
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message || "Unable to load newsletter drafts.");
  }

  return (data || []).map(mapDraftRecord);
}

export async function saveNewsletterBroadcastDraft(
  actorUserId: string,
  input: SaveNewsletterBroadcastDraftInput,
) {
  const admin = createSupabaseAdminClient() as any;
  const payload = {
    campaign_name: input.campaignName,
    subject: input.subject,
    preview_text: input.previewText?.trim() || null,
    title: input.title,
    intro: input.intro,
    body: input.body,
    cta_label: input.ctaLabel?.trim() || null,
    cta_url: input.ctaUrl?.trim() || null,
    updated_by: actorUserId,
  };

  const query = input.draftId
    ? admin
        .from("newsletter_broadcast_drafts")
        .update(payload)
        .eq("id", input.draftId)
    : admin.from("newsletter_broadcast_drafts").insert({
        ...payload,
        created_by: actorUserId,
      });

  const { data, error } = await query
    .select(
      "id, campaign_name, subject, preview_text, title, intro, body, cta_label, cta_url, created_at, updated_at, updated_by, last_tested_at",
    )
    .single();

  if (error) {
    throw new Error(error.message || "Unable to save newsletter draft.");
  }

  return mapDraftRecord(data);
}

export async function deleteNewsletterBroadcastDraft(draftId: string) {
  const admin = createSupabaseAdminClient() as any;
  const { error } = await admin
    .from("newsletter_broadcast_drafts")
    .delete()
    .eq("id", draftId);

  if (error) {
    throw new Error(error.message || "Unable to delete newsletter draft.");
  }
}

export async function markNewsletterBroadcastDraftTested(
  draftId: string,
  actorUserId: string,
) {
  const admin = createSupabaseAdminClient() as any;
  const { error } = await admin
    .from("newsletter_broadcast_drafts")
    .update({
      updated_by: actorUserId,
      last_tested_by: actorUserId,
      last_tested_at: new Date().toISOString(),
    })
    .eq("id", draftId);

  if (error) {
    throw new Error(
      error.message || "Unable to update newsletter draft test metadata.",
    );
  }
}
