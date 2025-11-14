import { Metadata } from "next";

import ContactForm from "@/components/forms/ContactForm";
import ContactHero from "@/components/sections/contact/Hero";

export const metadata: Metadata = {
  title: "Contact Us | HomeTrust Africa",
  description:
    "Get in touch with HomeTrust Africa to start your project back home. We'll respond within 24 hours to discuss your vision and next steps.",
  openGraph: {
    title: "Contact Us | HomeTrust Africa",
    description:
      "Get in touch with HomeTrust Africa to start your project back home.",
  },
};

/**
 * Contact Page
 *
 * Dedicated contact page with full contact form
 */
export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <ContactHero />
      <ContactForm />
    </div>
  );
}
