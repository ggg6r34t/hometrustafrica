"use client";

import { motion } from "framer-motion";
import { BadgeCheck, FileBadge2, Scale, Users2 } from "lucide-react";

import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

const trustSignals = [
  {
    icon: BadgeCheck,
    title: "Verified operators",
    description: "Local contractors, vendors, and delivery partners are screened before engagement.",
  },
  {
    icon: Scale,
    title: "Documented accountability",
    description: "Projects sit inside clearer records, approvals, and escalation structures.",
  },
  {
    icon: FileBadge2,
    title: "Evidence-led reporting",
    description: "Updates are designed to support decisions with photos, milestones, and documentation.",
  },
  {
    icon: Users2,
    title: "Local oversight",
    description: "Dedicated managers help narrow the gap between diaspora intent and local execution.",
  },
];

export default function Partners() {
  return (
    <SectionContainer
      id="trust"
      className="bg-[#081018] text-white"
      ariaLabelledby="trust-heading"
    >
      <div className="grid gap-14 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <p className="text-sm font-medium tracking-[0.04em] text-white/56">
            Trust Infrastructure
          </p>
          <h2 id="trust-heading" className="mt-5 text-white">
            Trust depends on the controls behind the work.
          </h2>
          <p className="mt-6 max-w-sm text-lg text-white/68">
            This is where HomeTrust Africa demonstrates discipline: the
            safeguards, records, and accountability structures that make remote
            oversight credible.
          </p>
        </motion.div>

        <div className="lg:col-span-8">
          <div className="grid gap-px overflow-hidden rounded-[1.75rem] bg-white/10 md:grid-cols-2">
            {trustSignals.map((signal, index) => {
              const Icon = signal.icon;
              return (
                <motion.div
                  key={signal.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#0d151a] p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-6 text-2xl text-white">{signal.title}</h3>
                  <p className="mt-3 max-w-sm text-sm text-white/62">
                    {signal.description}
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
