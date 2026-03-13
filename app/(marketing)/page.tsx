import Hero from "@/components/marketing/landing/Hero";
import Problem from "@/components/marketing/landing/Problem";
import Solution from "@/components/marketing/landing/Solution";
import HowItWorks from "@/components/marketing/landing/HowItWorks";
import ProjectTypes from "@/components/marketing/landing/ProjectTypes";
import FAQ from "@/components/marketing/landing/FAQ";
import CTASimple from "@/components/marketing/contact/ContactCTA";

/**
 * Home Page Component
 *
 * Main landing page for HomeTrust Africa
 * Sections: Hero, Problem, Solution, How It Works, Project Types, FAQ, CTA, Footer
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <ProjectTypes />
      <FAQ />
      <CTASimple />
    </>
  );
}
