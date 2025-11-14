"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/loading-skeleton";

/**
 * Enhanced Global Loading State
 *
 * Branded loading experience with smooth animations
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(35,178,69,0.03),transparent_50%)] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Branded Loading Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="mb-6"
          >
            <div className="relative">
              <Shield className="w-16 h-16 text-primary" />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm font-medium"
          >
            Loading HomeTrust Africa...
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-12"
        >
          {/* Hero skeleton */}
          <div className="text-center space-y-6">
            <Skeleton className="h-5 w-40 mx-auto rounded-full" />
            <div className="space-y-4">
              <Skeleton className="h-12 md:h-16 w-full max-w-3xl mx-auto rounded-lg" />
              <Skeleton className="h-12 md:h-16 w-full max-w-2xl mx-auto rounded-lg opacity-80" />
            </div>
            <Skeleton className="h-6 md:h-7 w-full max-w-xl mx-auto rounded-md" />
            <div className="flex justify-center gap-4 pt-4">
              <Skeleton className="h-12 w-36 rounded-lg" />
              <Skeleton className="h-12 w-36 rounded-lg" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Skeleton className="h-64 md:h-80 w-full rounded-2xl" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <Skeleton className="h-10 w-3/4 rounded-lg" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
              <div className="pt-4 space-y-3">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
            </motion.div>
          </div>

          {/* Cards skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-6 space-y-4"
              >
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-5/6 rounded-md" />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

