# Environment Variables Setup

This document describes all required and optional environment variables for the HomeTrust Africa website.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://hometrustafrica.com

# Email Service (Resend)
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY=re_your_resend_api_key_here

# Email Configuration
# The email address that receives contact form submissions
ADMIN_EMAIL=info@hometrustafrica.com

# The "from" email address for outgoing emails
# Must be verified in your Resend account
FROM_EMAIL=contact@hometrustafrica.com

# Error Tracking (Sentry)
# Get your DSN from https://sentry.io/settings/projects/
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

## Optional Environment Variables (for Sentry Source Maps)

```env
# Sentry Configuration (Optional - for source maps upload)
# Get these from https://sentry.io/settings/organizations/
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project

# Sentry Auth Token (Optional - for source maps upload)
# Generate at https://sentry.io/settings/account/api/auth-tokens/
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

## Setup Instructions

### 1. Resend Email Service

1. Sign up at [https://resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Add it to `.env.local` as `RESEND_API_KEY`
5. Verify your domain in Resend dashboard
6. Set `FROM_EMAIL` to a verified email address

### 2. Sentry Error Tracking

1. Sign up at [https://sentry.io](https://sentry.io)
2. Create a new project (select Next.js)
3. Copy your DSN
4. Add it to `.env.local` as both `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_DSN`
5. (Optional) For source maps upload, add `SENTRY_ORG`, `SENTRY_PROJECT`, and `SENTRY_AUTH_TOKEN`

## Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- In development, if `RESEND_API_KEY` is not set, emails will be logged to console instead of sent
- In production, missing `RESEND_API_KEY` will cause form submissions to fail

