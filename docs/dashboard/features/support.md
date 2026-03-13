# Feature: Support

## Purpose

Support is the escalation-oriented side of client communication. It complements the inbox by giving clients a clearer place to request callbacks, urgent help, and operational reassurance.

## Routes

- `/dashboard/support`
- `/dashboard/support/[threadId]`

## What It Supports

- opening a support request
- reviewing open support threads
- replying inside a support-specific thread
- escalation guidance for urgent financial, legal, or delivery issues

## Data Dependencies

- `support_threads`
- `support_messages`
- admin/ops notification fan-out on new client support activity

## Permissions

Support thread access is scoped to:

- the client who opened the thread
- the assigned support operator
- adminish roles
- client account members where applicable
