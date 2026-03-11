"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQSchema } from "@/components/seo/StructuredData";
import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function FAQ() {
  const faqs = [
    {
      question: "How does the verification process work?",
      answer:
        "Partners go through structured review covering identity, documentation, operating credibility, and suitability for the work they support.",
    },
    {
      question: "What countries do you currently serve?",
      answer:
        "We currently support projects across selected African markets including Nigeria, Ghana, Kenya, South Africa, Tanzania, and Uganda, with expansion guided by demand and operational readiness.",
    },
    {
      question: "How are my funds protected?",
      answer:
        "Projects are designed around clearer controls, milestone review, and structured approvals so financial decisions are tied to visible progress.",
    },
    {
      question: "What are your fees?",
      answer:
        "Fees depend on scope, complexity, and operating needs. Pricing reflects the level of coordination, verification, and oversight required.",
    },
    {
      question: "Can I track my project progress remotely?",
      answer:
        "Yes. The platform is built around transparent reporting so you can review progress and execution updates without relying on informal follow-up.",
    },
    {
      question: "Do you only handle construction projects?",
      answer:
        "No. HomeTrust Africa supports multiple project categories including construction, agriculture, business setup, vendor verification, and other operations requiring trusted local coordination.",
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <SectionContainer
        id="faq"
        className="bg-[#f7f8f4]"
        ariaLabelledby="faq-heading"
      >
        <div className="grid gap-14 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
              Frequently Asked Questions
            </p>
            <h2 id="faq-heading" className="mt-5">
              Clarity before commitment.
            </h2>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <Accordion
              type="single"
              collapsible
              className="overflow-hidden rounded-[1.75rem] border border-border/60"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-border/60 px-6 last:border-b-0"
                >
                  <AccordionTrigger className="py-6 text-left text-lg font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-3xl pb-6 text-sm leading-7 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </SectionContainer>
    </>
  );
}
