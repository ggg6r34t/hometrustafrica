"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import HeroVisual from "@/components/ui/hero-visual";
import { fadeInUp, staggerContainerSlow } from "@/lib/animations";

export default function Hero() {
  const router = useRouter();

  const handleSecondaryClick = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-[#081018] pt-0 text-white"
      aria-label="Hero section"
    >
      <div id="main-content" className="relative">
        <HeroVisual>
          <motion.div
            className="mx-auto flex min-h-[78vh] w-full max-w-7xl items-end px-6 pb-12 pt-20 lg:px-8 lg:pb-16 lg:pt-28"
            variants={staggerContainerSlow}
            initial="hidden"
            animate="visible"
          >
            <div className="max-w-4xl">
              <motion.h1
                variants={fadeInUp}
                className="max-w-4xl text-[3.35rem] leading-[0.98] tracking-[-0.05em] text-white md:text-[4.8rem] lg:text-[5.4rem]"
              >
                Building Back Home, Without the Fear.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl"
              >
                We help Africans in the diaspora manage projects, investments,
                and operations back home with clear oversight, verified local
                execution, and transparent reporting.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <Button
                  size="lg"
                  className="group px-8"
                  onClick={() => router.push("/contact")}
                >
                  Start a Project
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/18 bg-white/6 px-8 text-white hover:bg-white/12 hover:text-white"
                  onClick={handleSecondaryClick}
                >
                  See How It Works
                </Button>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-8 inline-flex items-center gap-2 text-sm text-white/68"
              >
                <ShieldCheck className="h-4 w-4 text-primary" />
                Verified operators. Structured milestones. Reporting you can
                review from anywhere.
              </motion.div>
            </div>
          </motion.div>
        </HeroVisual>
      </div>
    </section>
  );
}
