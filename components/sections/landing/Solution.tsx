"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Factory,
  Sprout,
  UserRoundSearch,
  ClipboardCheck,
  Radar,
} from "lucide-react";

import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

const pillars = [
  {
    icon: Building2,
    title: "Project oversight",
    description:
      "Keep execution visible through clearer coordination, milestone discipline, and day-to-day delivery follow-through.",
  },
  {
    icon: UserRoundSearch,
    title: "Verified contractors",
    description:
      "Work begins with vetted local contractors and operators who are screened before engagement.",
  },
  {
    icon: ClipboardCheck,
    title: "Milestone reporting",
    description:
      "Translate local progress into documented updates that can be reviewed remotely and acted on with confidence.",
  },
  {
    icon: Factory,
    title: "Spending reports",
    description:
      "Support delivery with clearer financial reporting so spend can be reviewed alongside progress.",
  },
  {
    icon: Sprout,
    title: "Asset monitoring",
    description:
      "Maintain visibility over physical assets and ongoing activity without relying on informal updates alone.",
  },
  {
    icon: Radar,
    title: "Risk escalation",
    description:
      "Flag issues early when timelines slip, controls weaken, or conditions on the ground start to change.",
  },
];

export default function Solution() {
  return (
    <SectionContainer
      id="solution"
      className="bg-white"
      ariaLabelledby="solution-heading"
    >
      <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-18">
        <motion.div
          className="lg:col-span-5 lg:pr-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Our Solution
          </p>
          <h2 id="solution-heading" className="mt-5 max-w-lg">
            The operating layer that turns intent into controlled execution.
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            HomeTrust Africa defines how execution is handled from a distance:
            who gets verified, how progress is tracked, how spending is
            documented, and when issues are escalated before they become losses.
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-[1.5rem] border border-border/70 bg-white p-6 md:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-[#f8f8f4]">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="max-w-sm pt-1 text-[1.55rem] leading-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
