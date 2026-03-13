"use client";

import { usePathname } from "next/navigation";
import { Shield, CheckCircle2, Award, Globe } from "lucide-react";

export default function TrustBar() {
  const pathname = usePathname();
  const trustItems = [
    { icon: Shield, text: "Structured fraud prevention" },
    { icon: CheckCircle2, text: "Verified partners" },
    { icon: Award, text: "Transparent reporting" },
    { icon: Globe, text: "Diaspora-first operations" },
  ];

  if (pathname === "/") {
    return null;
  }

  return (
    <section className="border-b border-border/50 bg-[#f7f8f4] py-3">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 text-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-foreground/78">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
