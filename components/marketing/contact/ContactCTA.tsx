"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import SectionContainer from "../../ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function ContactCTA() {
  return (
    <SectionContainer
      id="contact-cta"
      className="bg-white"
      aria-labelledby="contact-cta-heading"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="mx-auto max-w-5xl rounded-3xl bg-[#dfeee7] px-8 py-10 md:px-12 md:py-14"
      >
        <h2 id="contact-cta-heading" className="mt-5 max-w-3xl text-foreground">
          Request a Project Review
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          Share your project objective, location, and current constraints.
        </p>
        <p className="mt-2 max-w-xl text-base text-muted-foreground">
          We assess project risk and identify priority control gaps.
        </p>
        <Button
          asChild
          size="lg"
          className="group mt-8 rounded-full px-6 shadow-none"
        >
          <Link href="/contact">
            Request a Project Review
            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
        <p className="mt-4 text-sm text-muted-foreground/70">
          15-minute call to review your project and next steps. You leave with a
          recommended execution and oversight path.
        </p>
      </motion.div>
    </SectionContainer>
  );
}
