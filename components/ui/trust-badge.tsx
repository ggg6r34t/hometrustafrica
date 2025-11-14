"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { staggerItem } from "@/lib/animations"

interface TrustBadgeProps {
  text: string
  className?: string
}

/**
 * Trust Badge Component
 * 
 * Reusable badge component for displaying trust indicators
 */
export default function TrustBadge({
  text,
  className = "",
}: TrustBadgeProps) {
  return (
    <motion.div
      className={`inline-block mb-8 ${className}`}
      variants={staggerItem}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="px-5 py-2.5 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold inline-flex items-center gap-2 border border-primary/20 shadow-sm hover:shadow-md transition-all duration-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <Shield className="w-4 h-4" aria-hidden="true" />
        {text}
      </motion.span>
    </motion.div>
  )
}

