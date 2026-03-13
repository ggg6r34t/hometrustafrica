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
      className={`scroll-mt-24 py-20 md:scroll-mt-28 md:py-24 ${className}`}
      aria-labelledby={ariaLabelledby}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
    </section>
  );
}
