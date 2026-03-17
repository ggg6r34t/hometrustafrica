import { Metadata } from "next";

import ContactForm from "@/components/forms/ContactForm";
import ContactHero from "@/components/marketing/contact/Hero";

export const metadata: Metadata = {
  title: "Request a Project Review | HomeTrust Africa",
  description:
    "Request a project review with HomeTrust Africa. 15-minute call to review project context, execution risk, and next steps.",
  openGraph: {
    title: "Request a Project Review | HomeTrust Africa",
    description:
      "15-minute call to review your project scope, execution risk, and next-step plan.",
  },
};

/**
 * Contact Page
 *
 * Dedicated contact page with full contact form
 */
export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <ContactHero />
      <ContactForm />
    </div>
  );
}
