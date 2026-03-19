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
    title: "Execution governance",
    description:
      "You get a written control model before kickoff. Scope ownership, governance checkpoints, and decision rights are documented in advance.",
  },
  {
    icon: UserRoundSearch,
    title: "Operator verification",
    description:
      "Every operator is screened before engagement. Identity, relevant work history, and project-fit criteria are reviewed and recorded.",
  },
  {
    icon: ClipboardCheck,
    title: "Milestone controls",
    description:
      "Milestones define when work is accepted and when funds can move. Evidence is checked before approvals are released.",
  },
  {
    icon: Factory,
    title: "Financial visibility",
    description:
      "You receive structured spend visibility tied to delivery status. A milestone financial pack shows what was spent, approved, and pending.",
  },
  {
    icon: Sprout,
    title: "Asset and site monitoring",
    description:
      "Site activity is tracked against defined outputs. Field checks are documented and reflected in regular progress updates.",
  },
  {
    icon: Radar,
    title: "Early risk escalation",
    description:
      "Control breaches are escalated early. Slippages, quality gaps, and blocked decisions are surfaced while corrective action is still possible.",
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
            What We Do
          </p>
          <h2 id="solution-heading" className="mt-5 max-w-lg">
            Diaspora project oversight and managed local execution.
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            You receive clear operating documents before work starts: a control
            model, milestone map, and approval path.
          </p>
          <p className="mt-3 max-w-md text-base text-muted-foreground">
            During delivery, you get weekly status updates and milestone packs
            built for remote decisions.
          </p>
        </motion.div>

        <div className="lg:col-span-7">
          <div className="grid gap-5 md:auto-rows-fr md:grid-cols-2 md:gap-6">
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
                  className="flex h-full flex-col rounded-3xl border border-border/70 bg-white p-6 md:p-7"
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
        </div>
      </div>
    </SectionContainer>
  );
}
