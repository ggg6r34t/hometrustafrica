# Feature: Team

## Purpose

The team page tells clients who is responsible for their project and how roles are divided.

## Route

`/dashboard/projects/[projectId]/team`

## What It Shows

- project manager
- operations coordinator
- field or specialist roles where published
- email and phone when appropriate
- availability notes

## Data Dependencies

- `project_contacts`

## Permissions

Only `is_client_visible = true` contacts are rendered for client users. Internal-only contacts and notes remain hidden.
