"use client";

import { motion } from "framer-motion";

import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function AboutHero() {
  return (
    <SectionContainer
      id="about"
      className="bg-white pb-14 pt-24 md:pb-16 md:pt-32"
      ariaLabelledby="about-hero-heading"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid gap-12 lg:grid-cols-12 lg:items-end"
      >
        <div className="lg:col-span-7">
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            About HomeTrust Africa
          </p>
          <h1 id="about-hero-heading" className="max-w-4xl text-foreground">
            A more dependable way to manage serious work back home.
          </h1>
        </div>

        <div className="lg:col-span-5 lg:pl-8">
          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
            HomeTrust Africa is being built for diaspora families, founders, and
            investors who need local execution to feel structured, visible, and
            accountable from day one.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="mt-12 grid gap-6 md:grid-cols-3"
      >
        <div className="border-t border-border/60 pt-5">
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Built for
          </p>
          <p className="mt-3 text-base leading-7 text-foreground/80">
            Diaspora families, founders, and investors managing serious work
            across Africa.
          </p>
        </div>
        <div className="border-t border-border/60 pt-5">
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Focused on
          </p>
          <p className="mt-3 text-base leading-7 text-foreground/80">
            Oversight, verification, reporting, and clearer local coordination.
          </p>
        </div>
        <div className="border-t border-border/60 pt-5">
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Built around
          </p>
          <p className="mt-3 text-base leading-7 text-foreground/80">
            Trust, transparency, and operational discipline from the start.
          </p>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
