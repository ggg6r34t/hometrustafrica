import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import TrustBar from "@/components/layout/TrustBar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/marketing/ScrollToTop";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <TrustBar />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
}
