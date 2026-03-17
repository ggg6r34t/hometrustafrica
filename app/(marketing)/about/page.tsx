import { Metadata } from "next";

import AboutHero from "@/components/marketing/about/Hero";
import MissionVision from "@/components/marketing/about/MissionVision";
import OurStory from "@/components/marketing/about/OurStory";
import AboutCTA from "@/components/marketing/about/CTA";

export const metadata: Metadata = {
  title: "About Us | HomeTrust Africa",
  description:
    "Learn how HomeTrust Africa provides diaspora project oversight and managed local execution through verification standards, milestone controls, and structured reporting.",
  openGraph: {
    title: "About Us | HomeTrust Africa",
    description:
      "Diaspora project oversight and managed local execution across Africa.",
  },
};

/**
 * About Us Page
 *
 * Streamlined page about HomeTrust Africa's mission and story
 */
export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <AboutHero />
      <MissionVision />
      <OurStory />
      <AboutCTA />
    </div>
  );
}
