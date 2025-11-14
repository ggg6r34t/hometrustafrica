"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/ui/section-container";
import SectionHeader from "@/components/ui/section-header";
import { staggerContainer, fadeInUp, viewportOptions } from "@/lib/animations";
import { Building2, Shield, Award, Users } from "lucide-react";

/**
 * Partners & Trust Indicators Section
 *
 * Displays partner logos, certifications, and trust badges
 * TODO: Replace placeholder logos with actual partner/client logos
 */
export default function Partners() {
  const partners = [
    {
      name: "Partner 1",
      logo: "🏢", // Replace with actual logo
      category: "Construction",
    },
    {
      name: "Partner 2",
      logo: "🏗️", // Replace with actual logo
      category: "Architecture",
    },
    {
      name: "Partner 3",
      logo: "🏛️", // Replace with actual logo
      category: "Legal",
    },
    {
      name: "Partner 4",
      logo: "💼", // Replace with actual logo
      category: "Business Services",
    },
  ];

  const certifications = [
    {
      icon: Shield,
      title: "ISO Certified",
      description: "Quality management systems",
    },
    {
      icon: Award,
      title: "Industry Recognized",
      description: "Trusted by leading organizations",
    },
    {
      icon: Users,
      title: "500+ Projects",
      description: "Successfully completed",
    },
    {
      icon: Building2,
      title: "7+ Countries",
      description: "Active operations",
    },
  ];

  return (
    <SectionContainer
      id="partners"
      className="bg-background"
      ariaLabelledby="partners-heading"
    >
      <SectionHeader
        title="Trusted Partners & Certifications"
        description="We work with verified partners and maintain the highest standards of quality and compliance."
        titleId="partners-heading"
        className="mb-12 md:mb-16"
      />

      {/* Partner Logos */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="mb-16"
      >
        <h3 className="text-xl font-semibold text-center mb-8 text-muted-foreground">
          Our Verified Partners
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex flex-col items-center justify-center p-6 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {partner.logo}
              </div>
              <p className="text-sm font-medium text-foreground">
                {partner.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {partner.category}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certifications & Trust Indicators */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="grid md:grid-cols-4 gap-6"
      >
        {certifications.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center p-6 rounded-lg border border-primary/10 bg-card/30 hover:bg-card/50 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                {cert.title}
              </h4>
              <p className="text-sm text-muted-foreground font-light">
                {cert.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionContainer>
  );
}

