"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Factory,
  Sprout,
  Store,
  UserRoundSearch,
} from "lucide-react";

import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

const pillars = [
  {
    icon: Building2,
    title: "Construction and infrastructure",
    description:
      "Coordinate builds, renovations, and site delivery with clearer local execution support.",
  },
  {
    icon: UserRoundSearch,
    title: "Vendor verification",
    description:
      "Screen operators, contractors, and suppliers before key decisions are made.",
  },
  {
    icon: Factory,
    title: "Business setup and operations",
    description:
      "Support launches, local coordination, and early operating structure for ventures back home.",
  },
  {
    icon: Sprout,
    title: "Agriculture and productive assets",
    description:
      "Oversee farms, equipment, and income-generating projects with more visibility on the ground.",
  },
];

export default function Solution() {
  return (
    <SectionContainer
      id="solution"
      className="bg-white"
      ariaLabelledby="solution-heading"
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
            Our Solution
          </p>
          <h2 id="solution-heading" className="mt-5 max-w-lg">
            Structured support, built for execution.
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            HomeTrust Africa helps diaspora clients move from intention to local
            execution across the project types that matter most.
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-border/60 bg-border/60 md:grid-cols-2">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const tones = ["bg-[#eef6ef]", "bg-[#f8f8f4]", "bg-[#f1f4f7]", "bg-[#f6f3ea]"];
              return (
                <motion.div
                  key={pillar.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                  transition={{ delay: index * 0.05 }}
                  className={`${tones[index]} p-8`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/50 bg-white/70">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-6 text-2xl">{pillar.title}</h3>
                  <p className="mt-3 max-w-sm text-sm text-muted-foreground">
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
