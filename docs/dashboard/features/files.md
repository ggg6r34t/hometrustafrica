# Feature: Files

## Purpose

The files area is the client document room for project-safe assets such as documents, receipts, contracts, photos, and videos.

## Route

`/dashboard/projects/[projectId]/files`

## Capabilities

- filter by category
- filter by uploader
- secure preview for previewable file types
- secure download through signed URLs

## File Types Modeled

- documents
- photos
- videos
- receipts
- contracts

## Data Dependencies

- `files`
- `receipts`
- `contracts`
- `media_assets`
- Supabase Storage signed URLs

## Security Model

- files are never exposed by raw public bucket access
- metadata access is project-scoped and client-visible aware
- actual storage access is also checked against project authorization

## Known Constraints

- preview quality depends on the storage object actually existing in the bucket
- the client portal does not currently include an upload workflow
