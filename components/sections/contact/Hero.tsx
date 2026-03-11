"use client";

import { motion } from "framer-motion";

import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function ContactHero() {
  return (
    <SectionContainer
      id="contact"
      className="bg-white pb-10 pt-24 md:pb-12 md:pt-30"
      ariaLabelledby="contact-hero-heading"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid gap-10 lg:grid-cols-12 lg:items-end"
      >
        <div className="lg:col-span-7">
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Contact
          </p>
          <h1 id="contact-hero-heading" className="max-w-4xl text-foreground">
            Start the conversation about what you need back home.
          </h1>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
