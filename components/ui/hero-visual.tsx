"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield } from "lucide-react";
import { scaleIn } from "@/lib/animations";

/**
 * Hero Visual Component
 *
 * Hero image showcasing diaspora and home connection
 */
export default function HeroVisual() {
  return (
    <motion.div
      className="relative aspect-video max-w-7xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-muted/30 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 group"
      variants={scaleIn}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 1.2,
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Hero Image */}
      <Image
        src="/diasporat-and-home.png"
        alt="Diaspora and home connection - Building back home with trust and transparency"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(35,178,69,0.08)_100%)]" />

      {/* Trust badge overlay */}
      <motion.div
        className="absolute top-6 right-6 bg-background/90 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 shadow-lg flex items-center gap-2 z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
        <span className="text-xs font-semibold text-foreground">
          Verified & Secure
        </span>
      </motion.div>
    </motion.div>
  );
}
