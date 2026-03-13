import type { ReactNode } from "react";
import Link from "next/link";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(46,125,80,0.12),_transparent_32%),linear-gradient(180deg,#f6f5ef_0%,#f1f1eb_100%)] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 md:px-8 md:py-8">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span className="font-heading text-lg font-semibold tracking-tight">
              HomeTrust <span className="text-primary">Africa</span>
            </span>
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-10">
          <div className="grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.92fr)_440px] lg:items-center">
            <section className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/42">{eyebrow}</p>
              <h1 className="mt-6 max-w-lg text-[clamp(3rem,5vw,4.75rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-[#0f1720]">
                {title}
              </h1>
              <p className="mt-5 max-w-sm text-[1rem] leading-8 text-foreground/62">{description}</p>
            </section>

            <section className="w-full rounded-[24px] border border-border/70 bg-white p-8 md:p-9">
              {children}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
