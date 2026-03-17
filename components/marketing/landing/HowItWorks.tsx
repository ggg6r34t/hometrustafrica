"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Onboarding and project review",
    description:
      "You share objectives, location, budget, and constraints. Timeline: 48 hours. Deliverable: scope brief, risk register, and recommended control model.",
  },
  {
    number: "02",
    title: "Verification and control setup",
    description:
      "We verify operators and define approvals. Timeline: 3-5 business days. Deliverable: operator checklist, milestone plan, and governance checkpoints.",
  },
  {
    number: "03",
    title: "Managed execution and reporting",
    description:
      "Execution begins under agreed controls. Cadence: weekly status updates, milestone evidence packs, and escalation notices when thresholds are missed.",
  },
];

export default function HowItWorks() {
  return (
    <SectionContainer
      id="how-it-works"
      className="bg-[#081018] text-white"
      ariaLabelledby="how-it-works-heading"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-3xl"
      >
        <p className="text-sm font-medium tracking-[0.04em] text-white/56">
          How It Works
        </p>
        <h2 id="how-it-works-heading" className="mt-5 text-white">
          A controlled process from onboarding to delivery.
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] bg-white/10 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.article
            key={step.number}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            transition={{ delay: index * 0.05 }}
            className="bg-[#0d151a] p-8"
          >
            <div className="text-6xl font-heading font-semibold tracking-[-0.05em] text-white/18">
              {step.number}
            </div>
            <h3 className="mt-8 text-2xl text-white">{step.title}</h3>
            <p className="mt-4 max-w-sm text-sm text-white/62">
              {step.description}
            </p>
          </motion.article>
        ))}
      </div>
    </SectionContainer>
  );
}
