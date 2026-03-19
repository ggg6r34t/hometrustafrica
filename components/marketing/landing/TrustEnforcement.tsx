"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ListChecks, FileBarChart2, BellRing } from "lucide-react";

import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

const mechanisms = [
  {
    icon: BadgeCheck,
    title: "Operator verification",
    description:
      "Every contractor is screened before engagement. Identity, credentials, and project-fit are reviewed and documented.",
  },
  {
    icon: ListChecks,
    title: "Milestone-linked controls",
    description:
      "Payments and approvals advance only after milestone evidence is confirmed. No payment moves on a promise.",
  },
  {
    icon: FileBarChart2,
    title: "Structured reporting",
    description:
      "Reporting follows a fixed cadence with milestone packs and spend summaries. Decisions are based on documented evidence, not verbal updates.",
  },
  {
    icon: BellRing,
    title: "Early escalation",
    description:
      "Timeline slippages, quality failures, and control gaps are flagged early — while corrective action is still practical.",
  },
];

export default function TrustEnforcement() {
  return (
    <SectionContainer
      id="trust"
      className="bg-white"
      ariaLabelledby="trust-heading"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
        <motion.div
          className="lg:col-span-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            How Trust Is Enforced
          </p>
          <h2 id="trust-heading" className="mt-5 max-w-sm">
            Trust is built through controls you can inspect.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
            You see what is approved, what is delayed, and what needs a decision
            at each stage.
          </p>
          <p className="mt-3 max-w-sm text-base leading-7 text-muted-foreground">
            Evidence is documented before approvals move, and escalation is
            triggered when agreed thresholds are missed.
          </p>

          <div className="mt-10 border-t border-border/60 pt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Not a family contact. Not an informal agent.
            </p>
            <p className="mt-4 text-sm leading-7 text-foreground/78">
              HomeTrust Africa is a structured execution partner with defined
              verification standards, milestone governance, and reporting
              requirements. We operate where informal coordination creates risk.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Sample weekly report fields
            </p>
            <p className="mt-4 text-sm leading-7 text-foreground/78">
              Milestone status, spend by line item, unresolved blockers,
              required decisions, and next approvals.
            </p>
            <p className="mt-4 text-sm leading-7 text-foreground/78">
              Escalation example: if a milestone is delayed beyond 7 days or
              submitted evidence does not match site conditions, the issue is
              flagged for immediate review.
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-8">
          <div className="grid gap-px overflow-hidden rounded-[1.75rem] bg-border/30 md:grid-cols-2">
            {mechanisms.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#f7f8f4] p-7 md:p-8"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-white">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-5 border-t border-border/50" />
                  <h3 className="mt-5 text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
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
