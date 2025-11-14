"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { LucideIcon } from "lucide-react"
import { staggerItemScale, viewportOptions } from "@/lib/animations"

interface StepCardProps {
  number: number
  icon: LucideIcon
  title: string
  description: string
  index: number
  isLast?: boolean
}

/**
 * Step Card Component
 * 
 * Card component for displaying steps in a process
 */
export default function StepCard({
  number,
  icon: Icon,
  title,
  description,
  index,
  isLast = false,
}: StepCardProps) {
  return (
    <motion.div
      className="relative"
      variants={staggerItemScale}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOptions}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      <Card className="p-6 md:p-8 lg:p-10 h-full border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 bg-card group relative">
        {/* Step number badge */}
        <div className="absolute -top-5 left-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg border-2 border-background z-10">
          {number}
        </div>

        <motion.div
          className="mb-6 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Icon className="text-primary" size={32} />
        </motion.div>

        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base font-light">
          {description}
        </p>
      </Card>

      {/* Arrow connector for desktop */}
      {!isLast && (
        <motion.div
          className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-0"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOptions}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <ArrowRight className="text-primary/30" size={24} />
        </motion.div>
      )}
    </motion.div>
  )
}

