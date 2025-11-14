"use client";

import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  ariaLabelledby?: string;
}

/**
 * Section Container Component
 *
 * Reusable wrapper for sections with consistent spacing and max-width
 */
export default function SectionContainer({
  children,
  id,
  className = "",
  ariaLabelledby,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${className}`}
      aria-labelledby={ariaLabelledby}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
