"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function AboutCTA() {
  return (
    <SectionContainer
      id="about-cta"
      className="bg-[#dfeee7]"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="border-t border-[#c8ddd1] pt-10 md:pt-14"
      >
        <div className="max-w-4xl">
          <h2 className="max-w-3xl text-foreground">
            If this is the kind of oversight you need, let&apos;s talk.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Tell us what you are trying to build, where it is happening, and
            where you need support on the ground.
          </p>
          <Button asChild size="lg" className="group mt-8 rounded-full px-6 shadow-none">
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

