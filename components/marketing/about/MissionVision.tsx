"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function MissionVision() {
  return (
    <SectionContainer
      id="mission-vision"
      className="bg-[#f7f8f4]"
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
            What Guides Us
          </p>
          <h2 className="mt-5 max-w-md">
            The platform is being shaped around a few clear operating principles.
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-border/60 bg-border/60 md:grid-cols-3">
            <div className="bg-white p-8">
              <h3 className="text-2xl">Trust must be designed</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Serious projects need more than good intentions. They need
                verification, controls, and clearer accountability.
              </p>
            </div>
            <div className="bg-[#f8f8f4] p-8">
              <h3 className="text-2xl">Visibility must be ongoing</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Reporting should not appear only when things go wrong. It should
                be part of how execution is managed from the beginning.
              </p>
            </div>
            <div className="bg-white p-8">
              <h3 className="text-2xl">Coordination must be accountable</h3>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Local execution should feel disciplined enough for families,
                founders, partners, and future institutional relationships.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

