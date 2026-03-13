# Feature: Inbox

## Purpose

The inbox is the secure conversation center for project-linked and general support communications.

## Routes

- `/dashboard/inbox`
- `/dashboard/inbox/[threadId]`

## List View

Current capabilities:

- searchable conversation list
- unread counts
- conversation kind labels
- project association when available

## Thread View

Current capabilities:

- participant summary
- chronological messages
- secure reply composer
- automatic read-state update when the thread is opened

## Data Dependencies

- `conversations`
- `conversation_participants`
- `messages`
- participant profiles and roles

## Permissions

Conversation access is restricted to participants and adminish roles through both app checks and RLS.

## Honest Notes

- The portal supports replying to existing conversations
- It does not yet expose a broad conversation creation UI for clients beyond support request creation
