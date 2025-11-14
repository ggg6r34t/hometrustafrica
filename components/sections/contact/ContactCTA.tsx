"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { fadeInUp, viewportOptions } from "@/lib/animations";
import { motion } from "framer-motion";
import SectionContainer from "../../ui/section-container";

/**
 * CTA Section Component
 *
 * Full-width call-to-action section with gradient button
 * TODO: Add newsletter signup option (optional)
 */
export default function ContactCTA() {
  return (
    <SectionContainer
      id="contact-cta"
      className="py-24 md:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/3 relative overflow-hidden"
      aria-labelledby="contact-cta-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-[0.03] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="text-center"
        >
          <h2
            id="contact-cta-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight"
          >
            Ready to Build Back Home?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Stop worrying about fraud. Start building with confidence. Let's
            turn your vision into reality.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOptions}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 group px-10 py-7 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
            >
              <Link href="/contact">
                Get Started
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  size={20}
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
