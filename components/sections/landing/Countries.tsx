"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { staggerContainer, staggerItem, fadeInUp, viewportOptions } from "@/lib/animations"

export default function Countries() {
  const countries = [
    {
      name: "Nigeria",
      flag: "🇳🇬",
      description: "Lagos, Abuja, Port Harcourt, and major cities",
      projects: "150+ projects",
    },
    {
      name: "Ghana",
      flag: "🇬🇭",
      description: "Accra, Kumasi, and surrounding regions",
      projects: "45+ projects",
    },
    {
      name: "Kenya",
      flag: "🇰🇪",
      description: "Nairobi, Mombasa, and key urban centers",
      projects: "30+ projects",
    },
    {
      name: "South Africa",
      flag: "🇿🇦",
      description: "Johannesburg, Cape Town, Durban",
      projects: "25+ projects",
    },
    {
      name: "Tanzania",
      flag: "🇹🇿",
      description: "Dar es Salaam, Arusha, and major cities",
      projects: "15+ projects",
    },
    {
      name: "Uganda",
      flag: "🇺🇬",
      description: "Kampala and surrounding regions",
      projects: "10+ projects",
    },
  ]


  return (
    <section id="countries" className="py-24 md:py-32 bg-muted/10" aria-labelledby="countries-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <h2 id="countries-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Where We Operate
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're building a trusted network across Africa. Currently serving diaspora members in these countries, with more locations coming soon.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {countries.map((country, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
            >
              <Card className="p-6 md:p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full bg-card group">
                <div className="flex items-start gap-4">
                  <div className="text-5xl md:text-6xl flex-shrink-0">
                    {country.flag}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="text-primary" size={20} />
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                        {country.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{country.description}</p>
                    <p className="text-primary text-sm font-semibold">{country.projects}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            Don't see your country?{" "}
            <a
              href="#contact-cta"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById("contact-cta")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
              className="text-primary hover:underline font-medium"
            >
              Contact us
            </a>{" "}
            to learn about our expansion plans.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

