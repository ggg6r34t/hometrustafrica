"use client";

import { motion } from "framer-motion";
import {
  Building,
  HardHat,
  Leaf,
  ShoppingBag,
  SunMedium,
} from "lucide-react";

import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

const projects = [
  {
    icon: Building,
    title: "Business launches",
    description: "Entity setup, operating readiness, and partner coordination.",
    context: "For founders, family ventures, and market-entry plans.",
  },
  {
    icon: HardHat,
    title: "Construction",
    description:
      "Multi-stage projects requiring stronger vendor and milestone management.",
    context: "For builds where site progress and spend must stay visible.",
  },
  {
    icon: Leaf,
    title: "Agriculture",
    description: "Field execution, procurement oversight, and reporting structure.",
    context: "For farming, processing, and land-based operating projects.",
  },
  {
    icon: SunMedium,
    title: "Solar installations",
    description: "Technical delivery where site readiness and procurement matter.",
    context: "For energy projects with equipment, logistics, and setup risk.",
  },
  {
    icon: ShoppingBag,
    title: "Retail stores",
    description: "Fit-out, launch preparation, and local operating coordination.",
    context: "For store openings, expansion work, and launch readiness.",
  },
];

export default function ProjectTypes() {
  return (
    <SectionContainer
      id="project-types"
      className="bg-[#f7f8f4]"
      ariaLabelledby="project-types-heading"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          className="lg:col-span-5"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Project Types
          </p>
          <h2 id="project-types-heading" className="mt-5 max-w-xl">
            Where the operating model gets applied.
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            HomeTrust Africa is designed for project categories where local
            execution needs stronger visibility, coordination, and control.
          </p>

          <div className="mt-10 max-w-md rounded-[1.75rem] bg-white px-6 py-6">
            <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
              Typical fit
            </p>
            <p className="mt-4 text-base leading-8 text-foreground/78">
              Work that involves multiple vendors, on-the-ground execution,
              milestone decisions, or spend that should be reviewed with better
              discipline.
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => {
              const Icon = project.icon;
              const isWide = index === 1;

              return (
                <motion.article
                  key={project.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                  transition={{ delay: index * 0.05 }}
                  className={[
                    "rounded-[1.75rem] bg-white p-6 md:p-7",
                    isWide ? "md:col-span-2" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef3ee]">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>

                  <h3 className="mt-10 text-[1.65rem] leading-tight">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="mt-6 max-w-xl text-sm leading-7 text-foreground/72">
                    {project.context}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
