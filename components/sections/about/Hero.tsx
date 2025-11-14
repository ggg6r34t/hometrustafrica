"use client";

import PageHeader from "@/components/ui/page-header";

export default function AboutHero() {
  return (
    <PageHeader
      title="About HomeTrust Africa"
      description={[
        "We're a new platform on a mission to empower diaspora communities to build back home with confidence, transparency, and zero tolerance for fraud.",
        "As we grow, every project we manage will be a step toward rebuilding trust, strengthening communities, and creating lasting impact across Africa.",
      ]}
    />
  );
}
