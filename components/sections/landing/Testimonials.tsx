"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import SectionContainer from "@/components/ui/section-container";
import SectionHeader from "@/components/ui/section-header";
import { staggerContainer, fadeInUp, viewportOptions } from "@/lib/animations";

/**
 * Testimonials Section Component
 *
 * Displays customer testimonials to build trust and social proof
 * TODO: Replace placeholder testimonials with real customer reviews
 */
export default function Testimonials() {
  const testimonials = [
    {
      name: "Adebayo Okafor",
      location: "London, UK → Lagos, Nigeria",
      project: "Residential Construction",
      rating: 5,
      text: "HomeTrust Africa made building my dream home in Lagos stress-free. Their transparency and regular updates gave me peace of mind from thousands of miles away. The project was completed on time and within budget.",
      image: "👨‍💼",
    },
    {
      name: "Fatima Diallo",
      location: "Toronto, Canada → Accra, Ghana",
      project: "Business Setup",
      rating: 5,
      text: "I was skeptical after hearing horror stories from friends. But HomeTrust's verified contractors and legal oversight gave me confidence. My business is now operational, and I couldn't be happier with their service.",
      image: "👩‍💼",
    },
    {
      name: "Kwame Mensah",
      location: "New York, USA → Kumasi, Ghana",
      project: "Property Investment",
      rating: 5,
      text: "The detailed spending reports and milestone tracking were exactly what I needed. No hidden fees, no surprises. HomeTrust Africa is the only way I'll manage projects back home from now on.",
      image: "👨‍💼",
    },
  ];

  return (
    <SectionContainer
      id="testimonials"
      className="bg-gradient-to-b from-muted/20 to-background"
      ariaLabelledby="testimonials-heading"
    >
      <SectionHeader
        title="Trusted by Diaspora Families"
        description="See how we've helped families build, invest, and grow back home with complete transparency and zero fraud."
        titleId="testimonials-heading"
        className="mb-16"
      />

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="h-full p-6 md:p-8 border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  {testimonial.image}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {testimonial.location}
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <Quote className="w-6 h-6 text-primary/20 group-hover:text-primary/30 transition-colors shrink-0" />
              </div>
              <p className="text-muted-foreground leading-relaxed font-light mb-4">
                "{testimonial.text}"
              </p>
              <p className="text-xs text-muted-foreground font-medium mt-auto">
                Project: {testimonial.project}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
