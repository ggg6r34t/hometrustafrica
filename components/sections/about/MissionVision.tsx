"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Target, Eye } from "lucide-react";
import SectionContainer from "@/components/ui/section-container";
import {
  staggerContainer,
  fadeInUp,
  viewportOptions,
} from "@/lib/animations";

export default function MissionVision() {
  return (
    <SectionContainer
      id="mission-vision"
      className="bg-background py-16 md:py-24"
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Mission */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <Card className="p-8 md:p-10 h-full border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              To provide safe, transparent, and trusted project management services
              that enable diaspora members to build back home without fear. We
              eliminate fraud risk through verified partners, legal protection, and
              complete transparency.
            </p>
          </Card>
        </motion.div>

        {/* Vision */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <Card className="p-8 md:p-10 h-full border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Vision
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              To become the most trusted platform connecting diaspora communities
              with Africa, transforming how projects are managed and ensuring every
              investment contributes to sustainable development and community growth.
            </p>
          </Card>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

