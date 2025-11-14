"use client";

import { Shield, CheckCircle2, Award, Globe } from "lucide-react";

export default function TrustBar() {
  const trustItems = [
    { icon: Shield, text: "100% Fraud Protection" },
    { icon: CheckCircle2, text: "Verified Partners" },
    { icon: Award, text: "Legal Compliance" },
    { icon: Globe, text: "7+ Countries" },
  ];

  return (
    <section className="py-4 md:py-6 bg-primary/5 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 text-sm md:text-base"
              >
                <Icon className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium text-foreground">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
