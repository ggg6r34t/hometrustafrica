# HomeTrust Africa - Production Website

A production-ready Next.js website for HomeTrust Africa, a diaspora project management agency that helps Africans abroad safely manage and build projects, homes, and businesses back home without fraud.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Form Handling**: Server Actions (Next.js 14+)
- **Notifications**: Sonner (Toast)
- **Analytics**: Vercel Analytics

## 📁 Project Structure

```
hometrust-africa/
├── app/
│   ├── actions/          # Server Actions for form submissions
│   │   └── contact.ts    # Contact form server action
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── sections/         # Page sections
│   │   ├── hero.tsx
│   │   ├── navigation.tsx
│   │   ├── trust-bar.tsx
│   │   ├── problem.tsx
│   │   ├── solution.tsx
│   │   ├── how-it-works.tsx
│   │   ├── contact-cta.tsx
│   │   ├── contact-form.tsx
│   │   ├── footer.tsx
│   │   ├── scroll-to-top.tsx
│   │   └── scroll-progress.tsx
│   └── ui/              # Shadcn/ui components
├── lib/
│   └── animations.ts    # Framer Motion animation variants
└── public/              # Static assets (images, etc.)
```

## 🛠️ Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SITE_URL=https://hometrustafrica.com
   # Add your email service API keys when ready
   # RESEND_API_KEY=your_resend_key
   # or
   # SENDGRID_API_KEY=your_sendgrid_key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## 📝 TODO: Before Production Launch

### Content & Images
- [ ] Replace placeholder hero image with actual project showcase
- [ ] Add real client testimonials with photos
- [ ] Add Open Graph images (`/public/og-image.jpg` - 1200x630px)
- [ ] Add favicon and app icons
- [ ] Replace placeholder statistics with real data

### Email Integration
- [ ] Set up email service (Resend, SendGrid, or similar)
- [ ] Update `app/actions/contact.ts` with actual email sending logic
- [ ] Add email templates for form submissions
- [ ] Set up auto-reply emails

### Database (Optional)
- [ ] Set up database (Prisma + PostgreSQL/Supabase)
- [ ] Store form submissions in database
- [ ] Add admin dashboard to view submissions

### Security & Performance
- [ ] Add reCAPTCHA or similar spam protection
- [ ] Add rate limiting for form submissions
- [ ] Optimize images (use Next.js Image component)
- [ ] Add error tracking (Sentry, LogRocket, etc.)
- [ ] Set up monitoring and analytics

### SEO
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Submit to Google Search Console
- [ ] Add structured data (JSON-LD)
- [ ] Update Twitter handle in metadata

### Legal & Compliance
- [ ] Add Privacy Policy page
- [ ] Add Terms of Service page
- [ ] Add GDPR compliance (if serving EU users)
- [ ] Add cookie consent banner (if needed)

## 🎨 Design System

- **Primary Color**: `#23B245` (Green)
- **Typography**: Inter (Google Fonts)
- **Breakpoints**: Mobile-first responsive design
- **Accessibility**: WCAG 2.1 AA compliant

## 📧 Contact Form

The contact form uses Next.js Server Actions for submission. Currently, it logs submissions to the console. To enable email sending:

1. Choose an email service (Resend recommended)
2. Add API key to `.env.local`
3. Update `app/actions/contact.ts` with email sending logic

Example with Resend:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'contact@hometrustafrica.com',
  to: 'info@hometrustafrica.com',
  subject: `New Project Inquiry from ${data.name}`,
  html: `<p>Name: ${data.name}</p><p>Email: ${data.email}</p>...`
});
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- Follow Next.js deployment guides for your platform
- Ensure Node.js 18+ is supported
- Set environment variables in platform settings

## 📚 Key Features

- ✅ Server Actions for form submissions (no API routes needed)
- ✅ SEO-optimized metadata
- ✅ Accessible components (ARIA labels, semantic HTML)
- ✅ Smooth scroll animations with Framer Motion
- ✅ Responsive mobile-first design
- ✅ Production-ready code structure
- ✅ TypeScript for type safety
- ✅ Toast notifications for user feedback

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Private - All rights reserved by HomeTrust Africa

---

**Built with ❤️ for the African diaspora community**

