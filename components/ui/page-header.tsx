"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/lib/animations";

interface PageHeaderProps {
  title: string;
  description: string | string[];
  id?: string;
  className?: string;
  maxWidth?: "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
}

const maxWidthClasses = {
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

export default function PageHeader({
  title,
  description,
  id,
  className = "",
  maxWidth = "4xl",
}: PageHeaderProps) {
  const descriptionArray = Array.isArray(description) ? description : [description];

  return (
    <section
      id={id}
      className={`relative bg-gradient-to-br from-primary/10 via-background to-primary/3 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden ${className}`}
    >
      {/* Enhanced background with layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(35,178,69,0.08),transparent_50%)] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(35,178,69,0.05),transparent_60%)] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className={maxWidthClasses[maxWidth]}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight tracking-tight">
            {title}
          </h1>
          {descriptionArray.map((desc, index) => (
            <p
              key={index}
              className={`${
                index === 0
                  ? "text-xl md:text-2xl text-muted-foreground leading-relaxed font-light mb-8"
                  : "text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
              }`}
            >
              {desc}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

