"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { staggerItem } from "@/lib/animations"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  variant?: "default" | "destructive"
  hoverElevation?: boolean
  iconHover?: boolean
}

/**
 * Feature Card Component
 * 
 * Reusable card component for displaying features with icon, title, and description
 */
export default function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "default",
  hoverElevation = false,
  iconHover = false,
}: FeatureCardProps) {
  const isDestructive = variant === "destructive"
  const borderColor = isDestructive
    ? "border-border/50 hover:border-destructive/30"
    : "border-primary/20 hover:border-primary/40"
  const iconBgColor = isDestructive
    ? "bg-destructive/10 group-hover:bg-destructive/20"
    : "bg-primary/10 group-hover:bg-primary/20"
  const iconColor = isDestructive ? "text-destructive" : "text-primary"
  const titleHoverColor = isDestructive
    ? "group-hover:text-destructive"
    : "group-hover:text-primary"

  return (
    <motion.div
      variants={staggerItem}
      whileHover={hoverElevation ? { y: -8, transition: { duration: 0.3 } } : undefined}
    >
      <Card
        className={`p-6 md:p-8 lg:p-10 border transition-all duration-300 hover:shadow-xl h-full bg-card group ${borderColor}`}
      >
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <motion.div
              className={`flex items-center justify-center h-14 w-14 md:h-16 md:h-16 rounded-xl transition-colors duration-300 ${iconBgColor}`}
              whileHover={iconHover ? { scale: 1.1, rotate: 5 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon className={iconColor} size={28} />
            </motion.div>
          </div>
          <div className="flex-1">
            <h3
              className={`text-xl md:text-2xl font-semibold mb-3 text-foreground transition-colors duration-200 ${titleHoverColor}`}
            >
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base font-light">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

