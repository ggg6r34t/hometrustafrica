"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { staggerItem } from "@/lib/animations";

interface HeroCTAButtonsProps {
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

/**
 * Hero CTA Buttons Component
 *
 * Reusable CTA button group for hero sections
 */
export default function HeroCTAButtons({
  onPrimaryClick,
  onSecondaryClick,
}: HeroCTAButtonsProps) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
      variants={staggerItem}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 group px-10 py-7 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
          onClick={onPrimaryClick}
          aria-label="Start a new project"
        >
          Start a Project
          <ArrowRight
            className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
            size={20}
            aria-hidden="true"
          />
        </Button>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          size="lg"
          variant="outline"
          className="px-10 py-7 text-base md:text-lg font-semibold border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 rounded-xl backdrop-blur-sm"
          onClick={onSecondaryClick}
          aria-label="Learn how it works"
        >
          How It Works
        </Button>
      </motion.div>
    </motion.div>
  );
}
