"use client";

import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoMailOutline,
  IoMapOutline,
} from "react-icons/io5";

import NewsletterForm from "@/components/forms/NewsletterForm";

interface FooterLink {
  href: string;
  label: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const QUICK_LINKS: FooterLink[] = [
  { href: "/about", label: "About" },
  { href: "/#problem", label: "Why we exist" },
  { href: "/#solution", label: "Services" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: <IoLogoFacebook size={20} />,
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    label: "Facebook",
  },
  {
    icon: <IoLogoTwitter size={20} />,
    href: process.env.NEXT_PUBLIC_TWITTER_URL || "",
    label: "Twitter",
  },
  {
    icon: <IoLogoLinkedin size={20} />,
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    label: "LinkedIn",
  },
  {
    icon: <IoLogoInstagram size={20} />,
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    label: "Instagram",
  },
].filter((social) => social.href);

function LinkList({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="md:px-4 lg:px-6">
      <h4 className="mb-4 text-base font-semibold text-white">{title}</h4>
      <ul className="space-y-3 text-sm text-white/72">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLinks() {
  if (SOCIAL_LINKS.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 flex gap-4">
      {SOCIAL_LINKS.map((social) => (
        <Link
          key={social.label}
          href={social.href}
          className="text-white/80 transition-all duration-300 hover:scale-110 hover:text-primary"
          aria-label={social.label}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#081018] py-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 grid gap-12 border-b border-white/8 pb-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="HomeTrust Africa Home"
            >
              <h3 className="mb-4 text-2xl font-bold text-white">
                <span className="font-heading">
                  HomeTrust<span className="ml-2 text-primary">Africa</span>
                </span>
              </h3>
            </Link>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-white/70">
              Premium diaspora oversight for projects, investments, and
              operations across Africa.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/56">
              <IoMapOutline size={14} />
              <span>Serving diaspora communities worldwide</span>
            </div>
          </div>

          <LinkList title="Explore" links={QUICK_LINKS} />
          <LinkList title="Legal" links={LEGAL_LINKS} />

          <div>
            <h4 className="mb-4 text-base font-semibold text-white">
              Stay Updated
            </h4>
            <p className="mb-4 text-sm leading-7 text-white/62">
              Occasional updates on the platform, expansion, and new project
              support categories.
            </p>
            <NewsletterForm />
            <div className="mt-6">
              {SOCIAL_LINKS.length > 0 ? (
                <h4 className="mb-4 text-base font-semibold text-white">
                  Connect
                </h4>
              ) : null}
              <SocialLinks />
              <Link
                href="mailto:info@hometrustafrica.com"
                className="flex items-center gap-2 text-sm text-white/72 transition-colors duration-200 hover:text-primary"
                aria-label="Contact us"
              >
                <IoMailOutline size={16} />
                info@hometrustafrica.com
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-1 text-white/48 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">
            {"\u00A9"} 2026 HomeTrust Africa. All rights reserved.
          </p>
          <p className="text-sm">
            Built for trust, transparency, and cross-border execution.
          </p>
        </div>
      </div>
    </footer>
  );
}
