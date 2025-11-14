import { Metadata } from "next";

import AboutHero from "@/components/sections/about/Hero";
import MissionVision from "@/components/sections/about/MissionVision";
import OurStory from "@/components/sections/about/OurStory";
import AboutCTA from "@/components/sections/about/CTA";

export const metadata: Metadata = {
  title: "About Us | HomeTrust Africa",
  description:
    "Learn about HomeTrust Africa's mission to help diaspora members build back home safely. Discover our story and commitment to transparency and trust.",
  openGraph: {
    title: "About Us | HomeTrust Africa",
    description:
      "Building back home without fear. Safe, transparent, trusted project management for the diaspora.",
  },
};

/**
 * About Us Page
 *
 * Streamlined page about HomeTrust Africa's mission and story
 */
export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <AboutHero />
      <MissionVision />
      <OurStory />
      <AboutCTA />
    </div>
  );
}
