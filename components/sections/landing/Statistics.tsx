"use client"

import { Users, Building2, Shield, TrendingUp } from "lucide-react"

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
  ]

  return (
    <section className="py-20 md:py-28 bg-muted/10" aria-labelledby="statistics-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="statistics-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Trusted by the Diaspora
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Numbers that speak to our commitment to transparency, security, and excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="text-primary" size={28} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">{stat.label}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

