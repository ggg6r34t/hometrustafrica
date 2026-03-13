"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  viewportOptions,
} from "@/lib/animations";

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
  ];

  return (
    <section
      id="countries"
      className="bg-muted/10 py-24 md:py-32"
      aria-labelledby="countries-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <h2
            id="countries-heading"
            className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
          >
            Where We Operate
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            We&apos;re building a trusted network across Africa. Currently serving
            diaspora members in these countries, with more locations coming soon.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {countries.map((country) => (
            <motion.div key={country.name} variants={staggerItem}>
              <Card className="group h-full border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg md:p-8">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 text-5xl md:text-6xl">
                    {country.flag}
                  </div>
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-2">
                      <MapPin className="text-primary" size={20} />
                      <h3 className="text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-primary md:text-2xl">
                        {country.name}
                      </h3>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                      {country.description}
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {country.projects}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            Don&apos;t see your country?{" "}
            <a
              href="#contact-cta"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("contact-cta");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="font-medium text-primary hover:underline"
            >
              Contact us
            </a>{" "}
            to learn about our expansion plans.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
