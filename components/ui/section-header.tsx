"use client"

import { motion } from "framer-motion"
import { fadeInUp, viewportOptions } from "@/lib/animations"

interface SectionHeaderProps {
  title: string
  description: string
  titleId?: string
  className?: string
  eyebrow?: string
  align?: "left" | "center"
}

/**
 * Section Header Component
 * 
 * Reusable header component for sections with title and description
 */
export default function SectionHeader({
  title,
  description,
  titleId,
  className = "",
  eyebrow,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`${align === "center" ? "text-center" : "text-left"} mb-16 md:mb-20 ${className}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
    >
      {eyebrow ? <div className="eyebrow mb-5">{eyebrow}</div> : null}
      <h2
        id={titleId}
        className="mb-6 text-4xl font-semibold text-foreground md:text-5xl"
      >
        {title}
      </h2>
      <p
        className={`text-lg leading-relaxed text-muted-foreground md:text-xl ${
          align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
        }`}
      >
        {description}
      </p>
    </motion.div>
  )
}

