"use client";

import type { ReactNode } from "react";

import { motion } from "framer-motion";
import Image from "next/image";

import { scaleIn } from "@/lib/animations";

interface HeroVisualProps {
  children: ReactNode;
}

export default function HeroVisual({ children }: HeroVisualProps) {
  return (
    <motion.div
      className="relative min-h-[78vh]"
      variants={scaleIn}
      initial="hidden"
      animate="visible"
    >
      <Image
        src="/remote-project-monitoring-frustration.png"
        alt="Diaspora professionals connected to projects and operations across Africa"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,11,16,0.78)_0%,rgba(6,11,16,0.48)_42%,rgba(6,11,16,0.24)_72%,rgba(6,11,16,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,16,0.12)_0%,rgba(6,11,16,0.08)_40%,rgba(6,11,16,0.74)_100%)]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
