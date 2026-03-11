"use client";

import { motion } from "framer-motion";
import { Building, HardHat, Leaf, ShoppingBag, SunMedium } from "lucide-react";

import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

const projects = [
  {
    icon: Building,
    title: "Business launches",
    description: "Entity setup, operating readiness, and partner coordination.",
  },
  {
    icon: Leaf,
    title: "Agriculture",
    description: "Field execution, procurement oversight, and reporting structure.",
  },
  {
    icon: HardHat,
    title: "Construction",
    description: "Multi-stage projects requiring stronger vendor and milestone management.",
  },
  {
    icon: SunMedium,
    title: "Solar installations",
    description: "Technical delivery where site readiness and procurement matter.",
  },
  {
    icon: ShoppingBag,
    title: "Retail stores",
    description: "Fit-out, launch preparation, and local operating coordination.",
  },
];

export default function ProjectTypes() {
  return (
    <SectionContainer
      id="project-types"
      className="bg-white"
      ariaLabelledby="project-types-heading"
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
            Project Types
          </p>
          <h2 id="project-types-heading" className="mt-5">
            Built for real projects back home.
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            These are common engagement types where clearer oversight, local
            coordination, and reporting matter most.
          </p>
        </motion.div>

        <div className="lg:col-span-8">
          <div className="border-t border-border/60">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.article
                  key={project.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                  transition={{ delay: index * 0.05 }}
                  className="grid gap-5 border-b border-border/60 py-7 md:grid-cols-[minmax(0,1fr)_220px] md:items-start md:gap-8"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border/50 bg-[#f8f8f4]">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl">{project.title}</h3>
                      <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="md:pl-6">
                    <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
                      Typical use
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground/78">
                      {index === 0 &&
                        "Entity launch, local setup, and operating readiness."}
                      {index === 1 &&
                        "Field execution, procurement, and milestone visibility."}
                      {index === 2 &&
                        "Vendor management, site progress, and spend discipline."}
                      {index === 3 &&
                        "Site readiness, equipment delivery, and installation follow-through."}
                      {index === 4 &&
                        "Fit-out coordination, launch support, and local operations."}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
