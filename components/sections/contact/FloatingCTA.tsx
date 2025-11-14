"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUp, MessageSquare } from "lucide-react";

/**
 * Floating CTA Button Component
 *
 * Appears after scrolling past hero section
 * Provides quick access to contact form
 * Hidden on pages where it's not needed (e.g., Contact page)
 */
export default function FloatingCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  // Pages where the floating CTA should not be shown
  const hiddenPages = ["/contact"];

  // Check if current page should hide the floating CTA
  const shouldHide = hiddenPages.includes(pathname);

  useEffect(() => {
    // Don't set up scroll listeners if we should hide the button
    if (shouldHide) {
      setIsVisible(false);
      setHasScrolledPastHero(false);
      return;
    }

    const handleScroll = () => {
      const hero = document.getElementById("main-content");
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show after scrolling past hero (approximately 80vh)
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setHasScrolledPastHero(scrollY > heroBottom * 0.5);
      }

      // Show/hide based on scroll position (hide when near bottom to avoid conflict with scroll-to-top)
      setIsVisible(
        scrollY > windowHeight * 0.5 &&
          scrollY < document.documentElement.scrollHeight - windowHeight - 150
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldHide]);

  // Don't render if we should hide on this page
  if (shouldHide) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && hasScrolledPastHero && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-24 right-4 md:right-8 z-40"
          style={{ marginBottom: "0" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:shadow-2xl rounded-full px-6 py-6 h-auto group flex items-center gap-2 font-semibold"
            aria-label="Start your project - go to contact page"
          >
            <Link href="/contact">
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Start Project</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
