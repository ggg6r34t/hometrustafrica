"use client";

import { useRef } from "react";
import { Select } from "@/components/ui/select";

type SelectProps = React.ComponentPropsWithoutRef<typeof Select>;

/**
 * Wraps Select and auto-submits the nearest ancestor <form> whenever the
 * selected value changes, so filter dropdowns apply immediately without an
 * explicit "Apply" button click.
 */
export function AutoSubmitSelect({
  onValueChange,
  children,
  ...props
}: SelectProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="contents">
      <Select
        {...props}
        onValueChange={(value) => {
          onValueChange?.(value);
          ref.current?.closest("form")?.requestSubmit();
        }}
      >
        {children}
      </Select>
    </div>
  );
}
