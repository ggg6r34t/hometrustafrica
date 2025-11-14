"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import HeroCTAButtons from "@/components/ui/hero-cta-buttons";
import HeroVisual from "@/components/ui/hero-visual";
import { staggerContainerSlow, fadeInUp } from "@/lib/animations";
import TrustBadge from "@/components/ui/trust-badge";
import { useRouter } from "next/navigation";

/**
 * Hero Section Component
 *
 * Enhanced centered hero section with improved visual hierarchy,
 * social proof, and polished animations
 */
export default function Hero() {
  const router = useRouter();
  const handleSecondaryClick = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-32"
      aria-label="Hero section"
    >
      {/* Enhanced background with layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(35,178,69,0.03),transparent_50%)] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(35,178,69,0.02),transparent_70%)] -z-10" />

      <motion.div
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={staggerContainerSlow}
        initial="hidden"
        animate="visible"
      >
        <TrustBadge text="Your Trust, Our Priority" />

        {/* Main heading - Smooth entry animation with fade-up and slight scale */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-foreground leading-[1.1] tracking-tight"
          variants={fadeInUp}
        >
          <motion.span
            className="block mb-2"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            Building Back Home,
          </motion.span>
          <motion.span
            className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            Without the Fear.
          </motion.span>
        </motion.h1>

        {/* Subheading - Better readability with emphasis */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-5xl mx-auto leading-relaxed font-light"
          variants={fadeInUp}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          We help Africans in the diaspora build and manage their homes,
          projects, and businesses back home with{" "}
          <strong className="text-foreground font-medium">
            full transparency
          </strong>{" "}
          and{" "}
          <strong className="text-foreground font-medium">
            zero tolerance for fraud
          </strong>
          .
        </motion.p>

        <HeroCTAButtons
          onPrimaryClick={() => {
            router.push("/contact");
          }}
          onSecondaryClick={handleSecondaryClick}
        />

        <HeroVisual />
      </motion.div>
    </section>
  );
}
