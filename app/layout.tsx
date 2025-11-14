import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
// import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import {
  OrganizationSchema,
  ServiceSchema,
  WebsiteSchema,
} from "@/components/seo/StructuredData";
import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import TrustBar from "@/components/layout/TrustBar";
import ScrollProgress from "@/components/sections/ScrollProgress";
import ScrollToTop from "@/components/sections/ScrollToTop";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/sections/contact/FloatingCTA";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "HomeTrust Africa - Safe Project Management for Diaspora",
    template: "%s | HomeTrust Africa",
  },
  description:
    "Building Back Home, Without the Fear. We help Africans in the diaspora build and manage their homes, projects, and businesses back home with full transparency and fraud protection.",
  keywords: [
    "diaspora",
    "project management",
    "Africa",
    "fraud protection",
    "business",
    "home building",
    "Nigeria",
    "Ghana",
    "Kenya",
    "diaspora projects",
    "secure escrow",
    "verified partners",
  ],
  authors: [{ name: "HomeTrust Africa" }],
  creator: "HomeTrust Africa",
  publisher: "HomeTrust Africa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hometrustafrica.com"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "HomeTrust Africa - Safe Project Management for Diaspora",
    description:
      "Building Back Home, Without the Fear. We help Africans in the diaspora build and manage their homes, projects, and businesses back home with full transparency.",
    siteName: "HomeTrust Africa",
    // TODO: Replace with actual Open Graph images
    // images: [
    //   {
    //     url: "/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "HomeTrust Africa",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeTrust Africa - Safe Project Management for Diaspora",
    description: "Building Back Home, Without the Fear.",
    // TODO: Replace with actual Twitter handle
    // creator: "@hometrustafrica",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#23B245",
  userScalable: true,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <OrganizationSchema />
        <ServiceSchema />
        <WebsiteSchema />
        <QueryProvider>
          <ErrorBoundary>
            <ScrollProgress />
            <Navbar />
            <TrustBar />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
            <FloatingCTA />
          </ErrorBoundary>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 5000,
              style: {
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              },
              success: {
                iconTheme: {
                  primary: "var(--primary)",
                  secondary: "var(--primary-foreground)",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--destructive)",
                  secondary: "var(--destructive-foreground)",
                },
              },
            }}
          />
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
