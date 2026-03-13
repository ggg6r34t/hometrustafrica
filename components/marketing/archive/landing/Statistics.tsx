"use client";

import { Building2, Shield, TrendingUp, Users } from "lucide-react";

export default function Statistics() {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Diaspora Members Served",
      description: "Trusted by Africans worldwide",
    },
    {
      icon: Building2,
      value: "200+",
      label: "Projects Completed",
      description: "Successfully delivered",
    },
    {
      icon: Shield,
      value: "100%",
      label: "Fraud Protection",
      description: "Zero fraud incidents",
    },
    {
      icon: TrendingUp,
      value: "$50M+",
      label: "Total Project Value",
      description: "Securely managed",
    },
  ];

  return (
    <section
      className="bg-muted/10 py-20 md:py-28"
      aria-labelledby="statistics-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2
            id="statistics-heading"
            className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl"
          >
            Trusted by the Diaspora
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Numbers that speak to our commitment to transparency, security, and
            excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-lg border border-border/50 bg-card p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 md:h-16 md:w-16">
                    <Icon className="text-primary" size={28} />
                  </div>
                </div>
                <div className="mb-2 text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
                  {stat.value}
                </div>
                <h3 className="mb-1 text-base font-semibold text-foreground md:text-lg">
                  {stat.label}
                </h3>
                <p className="text-xs text-muted-foreground md:text-sm">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
