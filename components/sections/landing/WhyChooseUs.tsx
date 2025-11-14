"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Shield, Zap, Users, TrendingUp } from "lucide-react"
import { staggerContainer, staggerItem, fadeInUp, viewportOptions } from "@/lib/animations"

/**
 * Why Choose Us Section Component
 * 
 * Highlights key differentiators: Trust, Transparency, Support, Oversight
 * Uses green accent color (#23B245) for icons
 */
export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Shield,
      title: "Trust",
      description:
        "Every partner is verified. Every contract is legal. Every transaction is protected. Your security is non-negotiable.",
    },
    {
      icon: Zap,
      title: "Transparency",
      description: 
        "Real-time dashboards, photo updates, and detailed spending reports. Complete visibility into every aspect of your project.",
    },
    {
      icon: Users,
      title: "Support",
      description:
        "Our teams understand local regulations, culture, and market conditions. Dedicated project managers provide 24/7 support.",
    },
    {
      icon: TrendingUp,
      title: "Oversight",
      description: 
        "Multi-level verification system with community oversight. Legal protection and accountability at every step of your project.",
    },
  ]


  return (
    <section id="why-choose-us" className="py-24 md:py-32 bg-background" aria-labelledby="why-choose-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <h2 id="why-choose-us-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Why Choose HomeTrust Africa
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're not just another service. We're your trusted partner in building back home.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={index}
                variants={staggerItem}
              >
                <Card className="flex gap-6 p-6 md:p-8 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl bg-card group h-full">
                  <div className="flex-shrink-0">
                    <motion.div
                      className="flex items-center justify-center h-14 w-14 md:h-16 md:h-16 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Icon className="text-primary" size={28} style={{ color: "#23B245" }} />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-200">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">{reason.description}</p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
