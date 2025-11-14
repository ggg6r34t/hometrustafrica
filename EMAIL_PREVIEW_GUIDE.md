# Email Template Preview Guide

## Quick Start

To preview your email templates, run:

```bash
npm run email:dev
```

This will start the React Email preview server at `http://localhost:3000` (or the next available port).

## How It Works

The React Email CLI automatically detects all email templates in the `emails/` directory that have default exports.

## Current Email Templates

1. **contact-form.tsx** - Admin notification email
2. **contact-confirmation.tsx** - User confirmation email  
3. **newsletter-welcome.tsx** - Newsletter welcome email

## Using the Preview

1. Start the preview server: `npm run email:dev`
2. Open `http://localhost:3000` in your browser
3. Select a template from the sidebar
4. Edit props in the right panel to see different data
5. View rendered HTML, plain text, and code

## Troubleshooting

### Templates Not Showing

- Ensure templates have `export default` statements
- Check that templates are in the `emails/` directory
- Verify templates use `@react-email/components`

### Port Already in Use

If port 3000 is in use (by Next.js dev server), the CLI will use the next available port. Check the terminal output for the actual port.

### TypeScript Errors

If you see TypeScript errors:
- Ensure `emails/` directory is included in `tsconfig.json`
- Check that `@react-email/components` is installed
- Restart the preview server

## Example Props for Testing

### Contact Form Email
```typescript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  country: "Nigeria",
  projectType: "Residential Construction",
  message: "I'm interested in building a home..."
}
```

### Contact Confirmation Email
```typescript
{
  name: "John Doe"
}
```

### Newsletter Welcome Email
```typescript
{
  email: "subscriber@example.com"
}
```

## Exporting Templates

To export templates as static HTML:

```bash
npm run email:export
```

This creates an `out/` directory with rendered HTML files.

