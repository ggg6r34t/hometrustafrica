"use client";

import { motion } from "framer-motion";

import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function OurStory() {
  return (
    <SectionContainer id="our-story" className="bg-white">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
        <motion.div
          className="lg:col-span-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Why It Exists
          </p>
          <h2 className="mt-5 max-w-md">
            The opportunity is clear. Execution confidence has been the missing
            layer.
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
            <div className="space-y-6 text-lg text-muted-foreground md:text-xl">
              <p>
                Diaspora families and investors are already funding ambitious
                projects back home. What has been missing is confidence in the
                local execution model behind those investments.
              </p>
              <p>
                Informal coordination and delayed visibility expose timelines,
                quality, and capital long before stakeholders can intervene.
              </p>
              <p>
                HomeTrust Africa is designed to close that risk gap with
                verification standards, milestone controls, and reporting that
                supports timely decisions.
              </p>
            </div>

            <div className="border-t border-border/60 pt-6">
              <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
                In practice
              </p>
              <div className="mt-4 space-y-5 text-sm text-foreground/78">
                <p>
                  Projects should start with clearer scope and responsibilities.
                </p>
                <p>Operators should be screened before execution begins.</p>
                <p>Reporting should support decisions, not just reassurance.</p>
                <p>Issues should surface early enough for action.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
