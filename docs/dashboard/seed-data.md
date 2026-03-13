# Seed Data

## Purpose

Seed data exists so the dashboard feels real immediately in local and preview-like development environments.

## What The Seed Includes

- multiple client users
- team members
- operations and admin users
- several active projects across different categories
- milestones in mixed states
- timeline activity
- reports and report sections
- files, receipts, contracts, and media metadata
- budgets and transactions
- approvals and approval requests
- inbox conversations and notifications
- support threads and support replies
- a pending invite

## Why The Seed Matters

The dashboard relies heavily on relational data. Without realistic seed coverage, it is difficult to verify:

- project scoping
- unread and read-state behavior
- report and file navigation
- support thread flows
- approval decisions
- multi-role access differences

## Test Scenarios Enabled By Seed Data

- client A versus client B project isolation
- client versus team-member scope differences
- report detail rendering with attachments
- support follow-up messages
- approval review in both overview and budget contexts
- invite acceptance using the pending invite token
