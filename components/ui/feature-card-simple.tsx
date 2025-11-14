"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { staggerItem } from "@/lib/animations"

interface FeatureCardSimpleProps {
  icon: LucideIcon
  title: string
  description: string
  variant?: "default" | "destructive"
}

/**
 * Simple Feature Card Component
 * 
 * Simplified version with icon on top, used in Problem section
 */
export default function FeatureCardSimple({
  icon: Icon,
  title,
  description,
  variant = "default",
}: FeatureCardSimpleProps) {
  const isDestructive = variant === "destructive"
  const borderColor = isDestructive
    ? "border-border/50 hover:border-destructive/30"
    : "border-border/50"
  const iconBgColor = isDestructive
    ? "bg-destructive/10 group-hover:bg-destructive/20"
    : "bg-primary/10"
  const iconColor = isDestructive ? "text-destructive" : "text-primary"
  const titleHoverColor = isDestructive
    ? "group-hover:text-destructive"
    : "group-hover:text-primary"

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`p-6 md:p-8 lg:p-10 hover:shadow-xl transition-all duration-300 border h-full bg-card group ${borderColor}`}
      >
        <div className={`mb-6 w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-colors duration-300 ${iconBgColor}`}>
          <Icon className={iconColor} size={28} />
        </div>
        <h3
          className={`text-xl md:text-2xl font-semibold mb-4 text-foreground transition-colors duration-200 ${titleHoverColor}`}
        >
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base font-light">
          {description}
        </p>
      </Card>
    </motion.div>
  )
}

