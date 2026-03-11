"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Tell us your goal",
    description:
      "We begin with the project, location, constraints, and what success should look like.",
  },
  {
    number: "02",
    title: "We verify and structure execution",
    description:
      "We define the operating model, local coordination, and reporting cadence before work begins.",
  },
  {
    number: "03",
    title: "Track progress from anywhere",
    description:
      "You stay informed through clearer updates designed for visibility and decision-making.",
  },
];

export default function HowItWorks() {
  return (
    <SectionContainer
      id="how-it-works"
      className="bg-[#f7f8f4]"
      ariaLabelledby="how-it-works-heading"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-3xl"
      >
        <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
          How It Works
        </p>
        <h2 id="how-it-works-heading" className="mt-5">
          Straightforward for clients. Rigorous underneath.
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-border/60 bg-border/60 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.article
            key={step.number}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-8"
          >
            <div className="text-6xl font-heading font-semibold tracking-[-0.05em] text-[#d7ded6]">
              {step.number}
            </div>
            <h3 className="mt-8 text-2xl">{step.title}</h3>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {step.description}
            </p>
          </motion.article>
        ))}
      </div>
    </SectionContainer>
  );
}
