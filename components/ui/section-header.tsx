"use client"

import { motion } from "framer-motion"
import { fadeInUp, viewportOptions } from "@/lib/animations"

interface SectionHeaderProps {
  title: string
  description: string
  titleId?: string
  className?: string
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
}: SectionHeaderProps) {
  return (
    <motion.div
      className={`text-center mb-16 md:mb-20 ${className}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
    >
      <h2
        id={titleId}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground"
      >
        {title}
      </h2>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
        {description}
      </p>
    </motion.div>
  )
}

