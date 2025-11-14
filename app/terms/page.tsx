import { Metadata } from "next";

import TermsOfService from "./TermsOfService";

export const metadata: Metadata = {
  title: "Terms of Service | HomeTrust Africa",
  description:
    "Read HomeTrust Africa's Terms of Service. Understand your rights and responsibilities when using our project management services.",
  openGraph: {
    title: "Terms of Service | HomeTrust Africa",
    description: "Terms and conditions for using HomeTrust Africa services.",
  },
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
