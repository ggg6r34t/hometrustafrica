import { Metadata } from "next";

import Privacy from "./Privacy";

export const metadata: Metadata = {
  title: "Privacy Policy | HomeTrust Africa",
  description:
    "Learn how HomeTrust Africa protects your privacy and handles your personal information. We are committed to transparency and data security.",
  openGraph: {
    title: "Privacy Policy | HomeTrust Africa",
    description:
      "Our commitment to protecting your privacy and personal information.",
  },
};

export default function PrivacyPolicyPage() {
  return <Privacy />;
}
