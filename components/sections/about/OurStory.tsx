"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function OurStory() {
  return (
    <SectionContainer
      id="our-story"
      className="bg-gradient-to-b from-background to-muted/20 py-16 md:py-24"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our Story
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
        >
          <p>
            HomeTrust Africa was born from a simple observation:{" "}
            <span className="text-foreground font-medium">
              millions of diaspora members want to invest back home, but fear
              stops them.
            </span>{" "}
            Stories of lost funds, broken promises, and fraudulent intermediaries
            have created a barrier between diaspora communities and their dreams of
            building back home.
          </p>

          <p>
            We saw the gap between intention and action. The desire to contribute to
            Africa's growth is strong, but the trust infrastructure was missing. That's
            why we built HomeTrust Africa—to bridge that gap with{" "}
            <span className="text-foreground font-medium">
              verified partners, legal protection, and complete transparency.
            </span>
          </p>

          <p>
            As a new venture, we're building HomeTrust Africa from the ground up with
            a clear vision: to create a platform where{" "}
            <span className="text-foreground font-medium">
              every diaspora member can invest back home with confidence.
            </span>{" "}
            We're starting fresh, unburdened by legacy systems, and committed to
            setting new standards for transparency and trust in diaspora project
            management.
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

