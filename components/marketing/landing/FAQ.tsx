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
      question: "How does your verification process work?",
      answer:
        "Before any engagement, operators are screened against identity records, relevant delivery history, and project-fit criteria. Work starts only after verification checks are documented.",
    },
    {
      question: "What countries do you currently support?",
      answer:
        "We currently support selected markets including Nigeria, Ghana, Kenya, South Africa, Tanzania, and Uganda. Market expansion follows operating readiness and governance capacity.",
    },
    {
      question: "How are funds protected during execution?",
      answer:
        "Funds move through milestone-based approvals. Each approval is tied to documented delivery evidence and reviewed before payment is released.",
    },
    {
      question: "How is pricing structured?",
      answer:
        "Fees are scoped to project complexity, risk profile, and oversight requirements. You receive a defined scope and fee structure before any commitment.",
    },
    {
      question: "Can I monitor progress remotely in real time?",
      answer:
        "You receive a fixed reporting cadence: weekly status updates, milestone evidence packs, and escalation notices when thresholds are missed.",
    },
    {
      question: "Do you only support construction projects?",
      answer:
        "No. We support construction, business setup, agriculture, infrastructure-linked execution, procurement oversight, and related local operations.",
    },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <SectionContainer
        id="faq"
        className="bg-white"
        ariaLabelledby="faq-heading"
      >
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
            Decisions deserve clear answers.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-[1.05rem]">
            A direct overview of diaspora project oversight and managed local
            execution before any project commitment.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="mt-12 md:mt-14"
        >
          <Accordion
            type="single"
            collapsible
            className="border-t border-border/60"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border/60 last:border-b-0"
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
      </SectionContainer>
    </>
  );
}
