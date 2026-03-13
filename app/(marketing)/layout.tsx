import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import TrustBar from "@/components/layout/TrustBar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/marketing/ScrollProgress";
import ScrollToTop from "@/components/marketing/ScrollToTop";
import FloatingCTA from "@/components/marketing/contact/FloatingCTA";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <TrustBar />
      {children}
      <Footer />
      <ScrollToTop />
      <FloatingCTA />
    </>
  );
}
