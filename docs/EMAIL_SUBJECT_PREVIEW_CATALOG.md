# Email Subject + Preview Catalog

Last updated: 2026-03-18

This document provides the current subject line and preview text for all templates in `emails/` for comms sign-off.

## Auth

| Template                                | Subject                                               | Preview Text                                      |
| --------------------------------------- | ----------------------------------------------------- | ------------------------------------------------- |
| `auth-invite-accepted-confirmation.tsx` | Access confirmed: HomeTrust Africa portal             | Portal access confirmed                           |
| `auth-login-alert.tsx`                  | Security alert: New HomeTrust Africa login            | New account login detected                        |
| `auth-password-reset.tsx`               | Action required: Reset your HomeTrust Africa password | Password reset requested                          |
| `portal-invite.tsx`                     | Action required: Accept your HomeTrust Africa invite  | Action required: Accept your secure portal invite |

## Onboarding

| Template                                | Subject                                      | Preview Text                   |
| --------------------------------------- | -------------------------------------------- | ------------------------------ |
| `onboarding-welcome.tsx`                | Welcome to HomeTrust Africa                  | Welcome to HomeTrust Africa    |
| `onboarding-scope-review-scheduled.tsx` | Scope review scheduled: HomeTrust Africa     | Your scope review is scheduled |
| `onboarding-scope-confirmation.tsx`     | Scope confirmed: Next steps for your project | Project scope confirmed        |

## Project Lifecycle

| Template                       | Subject                                     | Preview Text                         |
| ------------------------------ | ------------------------------------------- | ------------------------------------ |
| `project-created.tsx`          | Project created: HomeTrust Africa           | `Project created: ${projectName}`    |
| `project-kickoff.tsx`          | Project kickoff confirmed: HomeTrust Africa | `Kickoff confirmed: ${projectName}`  |
| `project-milestone-update.tsx` | Project update: Milestone status changed    | `Milestone update: ${milestoneName}` |
| `project-report-available.tsx` | Report available: Project progress update   | `Report available: ${projectName}`   |
| `project-budget-update.tsx`    | Budget update: Spend status changed         | `Budget update: ${projectName}`      |
| `project-risk-escalation.tsx`  | Action required: Project risk escalation    | `Risk escalation: ${projectName}`    |

## Communication

| Template                               | Subject                                          | Preview Text                       |
| -------------------------------------- | ------------------------------------------------ | ---------------------------------- |
| `communication-new-message.tsx`        | New message received: HomeTrust Africa workspace | `New message from ${senderName}`   |
| `communication-reply-notification.tsx` | Reply received: Project conversation update      | `Reply received in ${projectName}` |

## Notifications

| Template                           | Subject                                     | Preview Text                       |
| ---------------------------------- | ------------------------------------------- | ---------------------------------- |
| `notification-activity-update.tsx` | Activity update: HomeTrust Africa workspace | `Activity update: ${activityType}` |
| `notification-weekly-summary.tsx`  | Weekly summary: HomeTrust Africa updates    | `Weekly summary for ${period}`     |

## Support

| Template                       | Subject                                          | Preview Text                              |
| ------------------------------ | ------------------------------------------------ | ----------------------------------------- |
| `support-request-received.tsx` | Support request received: HomeTrust Africa       | `Support request received: ${ticketId}`   |
| `support-response.tsx`         | Support update: HomeTrust Africa response posted | `Support response for ticket ${ticketId}` |

## Contact + Newsletter

| Template                   | Subject                                           | Preview Text                                     |
| -------------------------- | ------------------------------------------------- | ------------------------------------------------ |
| `contact-confirmation.tsx` | Project review request received: HomeTrust Africa | Project review request received                  |
| `contact-form.tsx`         | New project inquiry                               | `New project inquiry: ${name}`                   |
| `newsletter-welcome.tsx`   | Welcome to HomeTrust Africa Newsletter            | Subscription confirmed: HomeTrust Africa updates |

## Notes

- All templates now export `subject` constants.
