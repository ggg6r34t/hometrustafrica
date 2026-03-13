"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import SectionContainer from "@/components/ui/section-container";
import { fadeInUp, viewportOptions } from "@/lib/animations";

const stories = [
  {
    location: "London to Lagos",
    title: "Residential build oversight",
    summary:
      "A diaspora client needed a more dependable structure for managing a multi-stage construction project remotely.",
  },
  {
    location: "Toronto to Accra",
    title: "Retail launch coordination",
    summary:
      "A founder required local verification, fit-out coordination, and clearer visibility before committing more capital.",
  },
  {
    location: "New York to Kumasi",
    title: "Agriculture expansion support",
    summary:
      "A remote investor needed stronger oversight for procurement, operators, and field progress reporting.",
  },
];

export default function Testimonials() {
  return (
    <SectionContainer
      id="social-proof"
      className="bg-[#f2f3ee]"
      ariaLabelledby="social-proof-heading"
    >
      <div className="grid gap-14 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
            Case Studies
          </p>
          <h2 id="social-proof-heading" className="mt-5">
            Oversight stories that show the platform in action.
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 lg:col-span-8">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ delay: index * 0.05 }}
              className="border-t border-border/60 pt-6"
            >
              <p className="text-xs font-medium tracking-[0.04em] text-muted-foreground/75">
                {story.location}
              </p>
              <h3 className="mt-4 text-2xl">{story.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                {story.summary}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
                <span>View story</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
