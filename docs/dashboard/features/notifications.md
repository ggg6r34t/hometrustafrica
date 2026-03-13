# Feature: Notifications

## Purpose

Notifications centralize report uploads, approvals, milestone changes, messages, and other important operational events.

## Route

`/dashboard/notifications`

## Current Capabilities

- list unread and read notifications
- type-based filtering
- link through to the destination page
- bulk mark unread notifications as read

## Data Dependencies

- `notifications`
- `notification_reads`

## Permissions

Users primarily read their own notifications. Admin oversight is still modeled in the policy layer for operational use.
