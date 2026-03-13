# Known Gaps And Future Improvements

This document is intentionally honest. The dashboard is materially more complete after remediation, but several areas are still better described as strong foundations than fully mature workflows.

## Current Gaps

### Internal admin and ops UI

- Invite issuance exists as a secure server-side foundation, not a broad internal console.
- Team/admin workflow screens for publishing reports, files, and status changes are still limited.

### Security settings depth

- Active sessions are summarized, not fully managed.
- Two-factor support is represented as readiness metadata, not an enrollment and recovery flow.

### File lifecycle

- Secure preview and download exist.
- Client-side upload and internal publishing flows are not yet fully surfaced in-product.
- Preview availability still depends on actual storage objects existing.

### Messaging breadth

- Replying to existing conversations is supported.
- General client-side creation of new conversations is still narrower than a full enterprise messaging suite.

## Recommended Next Steps

### Product

- add internal operations/admin pages for invite issuance and assignment management
- add richer approval detail and decision history
- add deeper support case metadata and SLA cues

### Technical

- generate and maintain typed Supabase database types for new schema additions such as `portal_invites`
- add end-to-end auth and authorization smoke tests
- expand RLS test coverage for invite and approval flows

### UX

- add richer notification actions and single-item read interactions
- add more explicit archive/history treatment for older reports and projects
- deepen security account UX for highly trust-sensitive users
