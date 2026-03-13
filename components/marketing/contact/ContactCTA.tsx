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
      className="bg-[#dfeee7]"
      aria-labelledby="contact-cta-heading"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="border-t border-[#c8ddd1] pt-10 md:pt-14"
      >
        <div className="max-w-4xl">
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Start the conversation
          </p>
          <h2
            id="contact-cta-heading"
            className="mt-5 max-w-3xl text-foreground"
          >
            Start your project with trusted oversight.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Tell us what you are building, where it is happening, and the
            support you need on the ground.
          </p>
          <Button
            asChild
            size="lg"
            className="group mt-8 rounded-full px-6 shadow-none"
          >
            <Link href="/contact">
              Start Your Project
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
