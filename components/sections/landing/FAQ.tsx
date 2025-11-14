"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionContainer from "@/components/ui/section-container";
import SectionHeader from "@/components/ui/section-header";
import { fadeInUp, viewportOptions } from "@/lib/animations";
import { FAQSchema } from "@/components/seo/StructuredData";

/**
 * FAQ Section Component
 *
 * Frequently asked questions to reduce support queries and improve SEO
 * Includes structured data for rich snippets
 */
export default function FAQ() {
  const faqs = [
    {
      question: "How does the verification process work?",
      answer:
        "All our partners undergo a comprehensive verification process including background checks, legal documentation review, financial audits, and reference verification. We verify their credentials, licenses, and track record before they join our platform. You can view verification badges on each partner's profile.",
    },
    {
      question: "What countries do you currently serve?",
      answer:
        "We currently serve diaspora communities building projects in Nigeria, Ghana, Kenya, South Africa, Tanzania, and Uganda. We're expanding to more countries based on demand. Contact us if your country isn't listed yet.",
    },
    {
      question: "How are my funds protected?",
      answer:
        "We use a secure escrow system where funds are held in a protected account until project milestones are completed and verified. Funds are only released after you approve each milestone. Additionally, all projects are backed by proper contracts and insurance coverage.",
    },
    {
      question: "What are your fees?",
      answer:
        "Our fees are transparent and vary based on project type and size. We charge a small percentage of the project value, which covers project management, verification, and oversight services. Contact us for a detailed quote based on your specific project needs.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on scope and complexity. A residential construction project typically takes 6-12 months, while business setup can be completed in 2-4 months. We provide detailed timelines during the initial project planning phase.",
    },
    {
      question: "Can I track my project progress in real-time?",
      answer:
        "Yes! You'll receive regular updates including photos, videos, and detailed progress reports through our platform. Your dedicated project manager provides weekly updates, and you can access your project dashboard anytime to see the latest status.",
    },
    {
      question: "What happens if something goes wrong with my project?",
      answer:
        "We have a comprehensive dispute resolution process. If issues arise, our team intervenes immediately. We have legal support, insurance coverage, and a guarantee fund to protect your investment. Our goal is to resolve issues quickly and fairly.",
    },
    {
      question: "Do you handle projects other than construction?",
      answer:
        "Yes! We manage various project types including residential and commercial construction, business setup and registration, agricultural projects, property investment, and renovation/remodeling. Contact us to discuss your specific project needs.",
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <SectionContainer
        id="faq"
        className="bg-gradient-to-b from-background to-muted/20"
        ariaLabelledby="faq-heading"
      >
        <SectionHeader
          title="Frequently Asked Questions"
          description="Everything you need to know about working with HomeTrust Africa. Can't find your answer? Contact us directly."
          titleId="faq-heading"
          className="mb-12 md:mb-16"
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card/50 hover:bg-card transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed font-light pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </SectionContainer>
    </>
  );
}
