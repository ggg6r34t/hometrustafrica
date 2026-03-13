"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isHomeHeroMode = isHomepage && !scrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clear active section when navigating away from homepage
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
    }
  }, [pathname]);

  // Scroll spy for active navigation state (only on homepage)
  useEffect(() => {
    // Only run scroll spy on homepage
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = [
      "problem",
      "solution",
      "how-it-works",
      "project-types",
      "faq",
      "contact-cta",
    ];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    if (pathname !== "/") {
      setIsOpen(false);
      return;
    }

    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  const getSectionHref = (hash: string) => {
    return pathname === "/" ? hash : `/${hash}`;
  };

  const navLinks = [
    { href: "#problem", label: "Why We Exist", id: "problem" },
    { href: "#solution", label: "Services", id: "solution" },
    {
      href: "#how-it-works",
      label: "How It Works",
      id: "how-it-works",
    },
    {
      href: "/contact",
      label: "Contact",
      id: "contact",
      isLink: true,
    },
  ];

  return (
    <>
      {/* Skip Navigation Link for Accessibility */}
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </Link>
      <nav
        ref={navRef}
        className={`top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow,color] duration-500 ease-out ${
          isHomepage
            ? "fixed left-0 right-0"
            : "sticky border-b border-border/40 bg-background/82 backdrop-blur-md"
        } ${
          isHomepage
            ? isHomeHeroMode
              ? "bg-transparent"
              : "border-b border-border/40 bg-background/88 shadow-[0_10px_30px_rgba(8,16,24,0.04)] backdrop-blur-md"
            : ""
        } ${
          !isHomeHeroMode && scrolled
            ? "bg-background/96 shadow-[0_10px_30px_rgba(8,16,24,0.05)]"
            : ""
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between">
            {/* Logo with Trust Indicator */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className={`flex items-center gap-2 text-[1.15rem] font-bold transition-colors duration-300 ease-out ${
                  isHomeHeroMode ? "text-white" : "text-foreground"
                }`}
                aria-label="HomeTrust Africa Home"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary md:h-7 md:w-7" />
                  <span className="relative font-heading">
                    HomeTrust
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/30 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </span>
                  <span className="text-primary">Africa</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div
              className="hidden md:flex items-center gap-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {navLinks.map((link, idx) => {
                const isActive = link.isLink
                  ? pathname === link.href
                  : activeSection === link.id;
                const activeClass = isHomeHeroMode
                  ? "text-white"
                  : "bg-[#eef2eb] text-foreground";
                const inactiveClass = isHomeHeroMode
                  ? "text-white/82 hover:bg-white/8 hover:text-white"
                  : "text-foreground/78 hover:bg-[#f3f4ef] hover:text-foreground";
                if (link.isLink) {
                  return (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`group relative rounded-md px-3 py-2 text-sm transition-[color,background-color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                          isActive ? activeClass : inactiveClass
                        }`}
                        aria-current={isActive ? "page" : undefined}
                        aria-label={`${link.label} - go to ${link.href}`}
                        role="link"
                      >
                        <span className="relative z-10">{link.label}</span>
                        <span
                          className={`absolute bottom-0 left-3 right-3 h-px transition-transform duration-300 origin-left ${
                            isActive
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          } ${isHomeHeroMode ? "bg-white/85" : "bg-primary/70"}`}
                        />
                      </Link>
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Link
                      href={getSectionHref(link.href)}
                      onClick={(e) => scrollToSection(e, link.href.slice(1))}
                      className={`group relative rounded-md px-3 py-2 text-sm transition-[color,background-color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        isActive ? activeClass : inactiveClass
                      }`}
                      aria-current={isActive ? "page" : undefined}
                      role="link"
                      aria-label={`${link.label} - go to ${link.href}`}
                    >
                      <span className="relative z-10">{link.label}</span>
                      <span
                        className={`absolute bottom-0 left-3 right-3 h-px transition-transform duration-300 origin-left ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        } ${isHomeHeroMode ? "bg-white/85" : "bg-primary/70"}`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              key="cta"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden md:block"
            >
              <Link
                href="/contact"
                aria-label="Start a project - go to contact page"
              >
                <Button
                  className={`px-5 text-sm font-medium shadow-none ${
                    isHomeHeroMode
                      ? "bg-white text-[#081018] hover:bg-white/92"
                      : ""
                  }`}
                >
                  Start a Project
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative h-6 w-6 rounded-lg p-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:hidden ${
                isHomeHeroMode ? "text-white" : "text-foreground"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X size={24} aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Menu size={24} aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  overflow: "hidden",
                }}
                className="absolute left-0 right-0 top-full z-50 border-b border-border/40 bg-background/96 backdrop-blur-md md:hidden"
                role="navigation"
                aria-label="Mobile menu"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.2,
                  }}
                  className="space-y-2 px-6 pb-5"
                >
                  {navLinks.map((item, index) => {
                    const isActive = item.isLink
                      ? pathname === item.href
                      : activeSection === item.id;
                    if (item.isLink) {
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.25 + index * 0.05,
                            duration: 0.3,
                          }}
                        >
                          <Link
                            href={item.href}
                            className={`block px-2 py-2 rounded transition-colors ${
                              isActive
                                ? "bg-[#eef2eb] font-medium text-foreground"
                                : "text-foreground/80 hover:bg-[#f3f4ef] hover:text-foreground"
                            }`}
                            onClick={() => setIsOpen(false)}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      );
                    }
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.25 + index * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <Link
                          href={getSectionHref(item.href)}
                          onClick={(e) => scrollToSection(e, item.id)}
                          className={`block px-2 py-2 rounded transition-colors ${
                            isActive
                              ? "bg-[#eef2eb] font-medium text-foreground"
                              : "text-foreground/80 hover:bg-[#f3f4ef] hover:text-foreground"
                          }`}
                          aria-current={isActive ? "page" : undefined}
                          role="link"
                          aria-label={`${item.label} - go to ${item.href}`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.25 + navLinks.length * 0.05,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      aria-label="Start a project - go to contact page"
                    >
                      <Button className="w-full shadow-none">
                        Start a Project
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
