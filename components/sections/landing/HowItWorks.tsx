"use client"

import { motion } from "framer-motion"
import { Lightbulb, ClipboardList, CheckCircle } from "lucide-react"
import SectionContainer from "@/components/ui/section-container"
import SectionHeader from "@/components/ui/section-header"
import StepCard from "@/components/ui/step-card"
import { staggerContainer, viewportOptions } from "@/lib/animations"

/**
 * How It Works Section Component
 * 
 * 3-step process explanation:
 * 1. Share your goal
 * 2. We manage your project
 * 3. You track progress from anywhere
 */
export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Lightbulb,
      title: "Share Your Goal",
      description:
        "Tell us about your project—whether it's building a home, starting a business, or expanding existing investments. We listen and understand your goals.",
    },
    {
      number: 2,
      icon: ClipboardList,
      title: "We Manage Your Project",
      description:
        "We match you with our vetted local experts in your region. They create a detailed plan, timeline, and budget backed by legal documentation. Our team manages everything.",
    },
    {
      number: 3,
      icon: CheckCircle,
      title: "Track Progress from Anywhere",
      description:
        "Your dedicated project manager oversees everything—from payments to milestones. Real-time updates, photos, and transparency at every step. Monitor from anywhere in the world.",
    },
  ]

  return (
    <SectionContainer
      id="how-it-works"
      className="bg-background"
      ariaLabelledby="how-it-works-heading"
    >
      <SectionHeader
        title="How It Works"
        description="A simple, transparent 3-step process to turn your vision into reality."
        titleId="how-it-works-heading"
        className="mb-16"
      />

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {steps.map((step, index) => (
          <StepCard
            key={index}
            number={step.number}
            icon={step.icon}
            title={step.title}
            description={step.description}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </motion.div>
    </SectionContainer>
  )
}
