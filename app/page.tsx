import Hero from "@/components/sections/landing/Hero";
import Problem from "@/components/sections/landing/Problem";
import Solution from "@/components/sections/landing/Solution";
import HowItWorks from "@/components/sections/landing/HowItWorks";
import Partners from "@/components/sections/landing/Partners";
import ProjectTypes from "@/components/sections/landing/ProjectTypes";
import FAQ from "@/components/sections/landing/FAQ";
import CTASimple from "@/components/sections/contact/ContactCTA";

/**
 * Home Page Component
 *
 * Main landing page for HomeTrust Africa
 * Sections: Hero, Problem, Solution, How It Works, Partners, Project Types, FAQ, CTA, Footer
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Partners />
      <ProjectTypes />
      <FAQ />
      <CTASimple />
    </>
  );
}
