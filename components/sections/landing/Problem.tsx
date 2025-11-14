"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Lock } from "lucide-react";
import SectionContainer from "@/components/ui/section-container";
import FeatureCardSimple from "@/components/ui/feature-card-simple";
import {
  staggerContainer,
  fadeInUp,
  slideInLeft,
  slideInRight,
  viewportOptions,
} from "@/lib/animations";

/**
 * Problem Section Component
 *
 * Explains the diaspora fraud problem in project management
 * Enhanced UI/UX with improved visual hierarchy and aesthetics
 */
export default function Problem() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "High Fraud Risk",
      description:
        "Diaspora members sending money back home face constant threats of fraudulent schemes and misappropriation of funds by unverified intermediaries.",
    },
    {
      icon: TrendingDown,
      title: "Lack of Oversight",
      description:
        "Without local presence, monitoring project progress becomes nearly impossible. You're left hoping for updates and trusting strangers with your investments.",
    },
    {
      icon: Lock,
      title: "No Transparency",
      description:
        "Most intermediaries lack proper documentation, legal oversight, and accountability measures, leaving your projects vulnerable.",
    },
  ];

  return (
    <SectionContainer
      id="problem"
      className="relative bg-gradient-to-b from-background via-background to-muted/30 overflow-hidden"
      ariaLabelledby="problem-heading"
    >
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,38,38,0.03),transparent_50%)] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(220,38,38,0.02),transparent_60%)] -z-10" />

      {/* Two-column layout: Image/Illustration + Text */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-24">
        {/* Left Column - Image/Illustration */}
        <motion.div
          className="order-2 lg:order-1"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-destructive/10 via-destructive/5 to-muted/20 border border-destructive/20 shadow-xl hover:shadow-2xl group">
            <Image
              src="/problem-illustration.jpg"
              alt="Diaspora fraud and project management challenges - showing the risks and difficulties faced when building back home"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Overlay gradient for better text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Decorative border glow */}
            <div className="absolute inset-0 rounded-3xl ring-2 ring-destructive/10 group-hover:ring-destructive/20 transition-all duration-500" />
          </div>
        </motion.div>

        {/* Right Column - Text Content */}
        <motion.div
          className="order-1 lg:order-2 space-y-6"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {/* Section Badge */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium mb-4"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>The Challenge</span>
          </motion.div>

          <h2
            id="problem-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight tracking-tight"
          >
            Why We Exist
          </h2>

          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Managing projects back home comes with serious challenges.{" "}
              <span className="text-foreground font-medium">
                Distance, cultural differences, and fraudsters
              </span>{" "}
              create a perfect storm of risk that leaves diaspora members
              vulnerable.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              Every year,{" "}
              <span className="text-foreground font-semibold">
                millions of dollars are lost
              </span>{" "}
              to fraudulent intermediaries who promise to help but disappear
              with funds. Without proper oversight, legal protection, or
              transparency, building back home becomes a gamble rather than an
              investment.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Problem Cards Grid */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 lg:gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {problems.map((problem, index) => (
          <FeatureCardSimple
            key={index}
            icon={problem.icon}
            title={problem.title}
            description={problem.description}
            variant="destructive"
          />
        ))}
      </motion.div>
    </SectionContainer>
  );
}
