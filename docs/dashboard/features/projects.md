# Feature: Projects

## Purpose

The projects area is the portfolio browser for all scoped client work.

## Listing Page

Route: `/dashboard/projects`

### Capabilities

- search by project name or location
- filter by status
- filter by project type
- change sort mode

### What Each Card Shows

- project name
- status and health
- project type
- location
- stage label
- completion percentage
- latest update
- next milestone
- lead contact label

## Project Detail Shell

Route family: `/dashboard/projects/[projectId]/*`

The project layout adds:

- project header
- status badge
- project sub-navigation

Sub-routes include overview, timeline, reports, files, budget, and team.

## Permissions

The entire project area is protected by `requireAuthorizedProject(projectId)` and by database-level project scoping.
