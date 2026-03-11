"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/lib/animations";
import SectionContainer from "@/components/ui/section-container";

const problemSignals = [
  {
    stat: "Distance",
    detail: "limits daily visibility once local execution begins.",
  },
  {
    stat: "Informality",
    detail: "creates room for weak controls and unclear accountability.",
  },
  {
    stat: "Silence",
    detail: "often appears only after funds and timelines are already exposed.",
  },
];

export default function Problem() {
  return (
    <SectionContainer
      id="problem"
      className="bg-white"
      ariaLabelledby="problem-heading"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
        <motion.div
          className="lg:col-span-5"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Why We Exist
          </p>
          <h2 id="problem-heading" className="mt-5 max-w-xl">
            Building back home should not feel like sending capital into the dark.
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="border-l-2 border-[#d7b740] pl-6 md:pl-8">
            <p className="max-w-2xl text-xl leading-9 text-foreground md:text-2xl">
              Diaspora families and investors are willing to build, launch, and
              invest. What they often lack is a dependable operating layer that
              makes local execution visible, structured, and accountable.
            </p>
          </div>
          <p className="mt-8 max-w-2xl text-base text-muted-foreground">
            HomeTrust Africa exists because too many important projects still
            depend on informal coordination, weak verification, and updates that
            arrive too late to change outcomes.
          </p>
        </motion.div>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-border/60 bg-border/60 md:grid-cols-3">
        {problemSignals.map((item, index) => (
          <motion.div
            key={item.stat}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            transition={{ delay: index * 0.05 }}
            className="bg-[#f8f8f4] p-8"
          >
            <p className="text-2xl font-semibold text-foreground">{item.stat}</p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {item.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
