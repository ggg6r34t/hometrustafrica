"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function AboutCTA() {
  return (
    <SectionContainer
      id="about-cta"
      className="bg-background py-16 md:py-24"
    >
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="text-center"
      >
        <Card className="p-8 md:p-12 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Be Part of Our Journey
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light mb-6">
            We're just getting started, and we'd love to have you join us. As one of
            our early partners, you'll help shape the future of diaspora project
            management while building your dream project back home.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Project
            </Link>
          </motion.div>
        </Card>
      </motion.div>
    </SectionContainer>
  );
}

