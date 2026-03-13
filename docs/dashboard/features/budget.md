# Feature: Budget

## Purpose

The budget area gives clients financial transparency without turning the product into a noisy finance dashboard.

## Route

`/dashboard/projects/[projectId]/budget`

## What It Shows

- total allocated budget
- spent and remaining amounts
- budget categories
- recent transactions
- receipt linkage
- approval queue

## Approval Behavior

Client-targeted approvals can now be reviewed and resolved from the budget area where they are relevant to spend control and decision-making.

## Data Dependencies

- `project_budgets`
- `budget_categories`
- `transactions`
- `transaction_receipts`
- `approvals`
- `approval_requests`

## Permissions

Budget data follows project scope. Client users only see scoped financial records and client-visible approvals.

## Honest Notes

- This is a strong visibility layer, not a full accounting system
- team-side transaction creation and budget editing are not yet surfaced as a complete internal UI
