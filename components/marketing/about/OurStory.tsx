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
            The demand is real. The missing layer has been dependable execution.
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
                Many diaspora clients are ready to build homes, launch
                businesses, support farms, or manage long-term investments back
                home. What has often stood in the way is not ambition, but
                confidence in how local execution will actually be handled.
              </p>
              <p>
                Informal coordination, weak verification, and inconsistent
                updates create risk long before anyone notices that funds,
                timelines, or decisions are exposed.
              </p>
              <p>
                HomeTrust Africa is being built to close that gap with a more
                visible, documented, and accountable way to manage serious work
                on the ground.
              </p>
            </div>

            <div className="border-t border-border/60 pt-6">
              <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
                In practice
              </p>
              <div className="mt-4 space-y-5 text-sm text-foreground/78">
                <p>Projects should start with clearer scope and responsibilities.</p>
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
