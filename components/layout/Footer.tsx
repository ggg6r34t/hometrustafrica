"use client";

import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoMailOutline, IoMapOutline } from "react-icons/io5";
import Link from "next/link";

import NewsletterForm from "@/components/forms/NewsletterForm";
import { Shield } from "lucide-react";

// Types
interface FooterLink {
  href: string;
  label: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

// Constants
const QUICK_LINKS: FooterLink[] = [
  { href: "/about", label: "About Us" },
  { href: "#problem", label: "Why We Exist" },
  { href: "#solution", label: "Our Solution" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const SOCIAL_LINKS: SocialLink[] = [
  { icon: <IoLogoFacebook size={20} />, href: "#", label: "Facebook" },
  { icon: <IoLogoTwitter size={20} />, href: "#", label: "Twitter" },
  { icon: <IoLogoLinkedin size={20} />, href: "#", label: "LinkedIn" },
  { icon: <IoLogoInstagram size={20} />, href: "#", label: "Instagram" },
];

const LinkList = ({ title, links }: { title: string; links: FooterLink[] }) => (
  <div className="md:px-4 lg:px-6">
    <h4 className="font-semibold mb-4 text-base">{title}</h4>
    <ul className="space-y-3 text-sm opacity-80">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="hover:text-primary transition-colors duration-200 hover:opacity-100"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLinks = () => (
  <div className="flex gap-4 mb-4">
    {SOCIAL_LINKS.map((social) => (
      <Link
        key={social.label}
        href={social.href}
        className="text-primary-foreground hover:text-primary transition-all duration-300 hover:scale-110"
        aria-label={social.label}
      >
        {social.icon}
      </Link>
    ))}
  </div>
);

const Copyright = () => (
  <div className="border-t border-primary/20 pt-6">
    <p className="text-sm opacity-70 text-center">
      © 2025 HomeTrust Africa. All rights reserved.
    </p>
  </div>
);

/**
 * Footer Component
 *
 * Enhanced footer with newsletter signup
 * 4-column layout: About, Links, Newsletter & Socials
 * Small copyright line at the bottom
 */
export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-16 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="HomeTrust Africa Home"
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="relative">
                  HomeTrust<span className="text-primary ml-2">Africa</span>
                </span>
              </h3>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed mb-4">
              Building back home without fear. Safe, transparent, trusted
              project management for the diaspora.
            </p>
            <div className="flex items-center gap-2 text-xs opacity-70">
              <IoMapOutline size={14} />
              <span>Serving diaspora communities worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <LinkList title="Quick Links" links={QUICK_LINKS} />

          {/* Legal */}
          <LinkList title="Legal" links={LEGAL_LINKS} />

          {/* Newsletter & Socials */}
          <div>
            <h4 className="font-semibold mb-4 text-base">Stay Updated</h4>
            <NewsletterForm />

            <div>
              <h4 className="font-semibold mb-4 text-base">Connect</h4>
              <SocialLinks />
              <div className="space-y-2 text-sm opacity-80">
                <Link
                  href="mailto:hello@hometrustafrica.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors duration-200"
                  aria-label="Contact us"
                >
                  <IoMailOutline size={16} />
                  hello@hometrustafrica.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <Copyright />
      </div>
    </footer>
  );
}
