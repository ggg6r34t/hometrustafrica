# Feature: Timeline

## Purpose

The timeline gives clients a chronological, client-safe activity feed for a project.

## Route

`/dashboard/projects/[projectId]/timeline`

## Content Types

- milestone activity
- published report events
- file-related events
- approvals
- messages
- budget-related updates
- assignment or status changes where exposed to clients

## Current Behavior

- timeline events are read-only in the client portal
- the feed uses the shared `ActivityFeed` component
- empty states are shown when no client-visible events exist

## Data Dependencies

- `timeline_events`
- actor profile lookups for display names

## Permissions

Clients only see rows where:

- they have project access
- the timeline event is marked client-visible
