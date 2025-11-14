"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Users, FileCheck, Shield } from "lucide-react"
import SectionContainer from "@/components/ui/section-container"
import SectionHeader from "@/components/ui/section-header"
import FeatureCard from "@/components/ui/feature-card"
import { staggerContainer, viewportOptions } from "@/lib/animations"

/**
 * Solution Section Component
 * 
 * Displays HomeTrust Africa's solution offerings
 * Features: Verified contractors, Project management & tracking, 
 * Transparent spending reports, Legal and community support
 */
export default function Solution() {
  const solutions = [
    {
      icon: CheckCircle2,
      title: "Verified Contractors",
      description:
        "Our network of vetted, trusted local partners undergo strict background checks and legal verification in each country. Every contractor is verified before joining our platform.",
    },
    {
      icon: Users,
      title: "Project Management & Tracking",
      description:
        "Local project managers provide real-time updates, photos, and transparent communication every step of the way. Track progress from anywhere in the world.",
    },
    {
      icon: FileCheck,
      title: "Transparent Spending Reports",
      description: 
        "Every project is protected by proper contracts, insurance, and compliance with local regulations. Get detailed spending reports and financial transparency.",
    },
    {
      icon: Shield,
      title: "Legal & Community Support",
      description:
        "Our multi-level verification system and escrow services protect your funds until project milestones are completed. Legal support and community oversight ensure accountability.",
    },
  ]

  return (
    <SectionContainer
      id="solution"
      className="bg-background"
      ariaLabelledby="solution-heading"
    >
      <SectionHeader
        title="Our Solution"
        description="We've built a comprehensive platform that eliminates fraud, ensures transparency, and makes managing projects back home simple and secure."
        titleId="solution-heading"
      />

      <motion.div
        className="grid md:grid-cols-2 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {solutions.map((solution, index) => (
          <FeatureCard
            key={index}
            icon={solution.icon}
            title={solution.title}
            description={solution.description}
            hoverElevation
            iconHover
          />
        ))}
      </motion.div>
    </SectionContainer>
  )
}
