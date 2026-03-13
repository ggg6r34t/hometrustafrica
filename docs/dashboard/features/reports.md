# Feature: Reports

## Purpose

Reports are one of the main trust artifacts in the dashboard. They package operational updates into structured summaries that clients can review and archive.

## Routes

- `/dashboard/projects/[projectId]/reports`
- `/dashboard/projects/[projectId]/reports/[reportId]`

## List View

The report hub supports:

- title/summary search
- report type filtering
- list cards with metadata such as uploader, reporting period, attachment count, and media count

## Detail View

The report detail page adds:

- executive summary
- ordered report sections
- supporting attachments with secure preview/download

## Data Dependencies

- `reports`
- `report_sections`
- `report_attachments`
- linked `files`
- uploader profiles

## Permissions

Clients can only read reports where:

- the project is in scope
- the report is client-visible

## Honest Notes

- There is currently no client-side report authoring flow
- Team-side report publishing exists at the data-model level but not as a full internal UI
