/**
 * Structured Data (JSON-LD) Components
 *
 * SEO enhancement for better search engine visibility
 * Implements Schema.org markup
 */

/**
 * Organization Schema
 */
export function OrganizationSchema() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const socialLinks = [
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
    process.env.NEXT_PUBLIC_TWITTER_URL,
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  ].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HomeTrust Africa",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hometrustafrica.com",
    logo: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://hometrustafrica.com"
    }/icon.svg`,
    description:
      "Building Back Home, Without the Fear. We help Africans in the diaspora build and manage their homes, projects, and businesses back home with full transparency and fraud protection.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@hometrustafrica.com",
      areaServed: ["NG", "GH", "KE", "ZA", "TZ", "UG"], // Country codes
      availableLanguage: ["en"],
      ...(phoneNumber ? { telephone: phoneNumber } : {}),
    },
    ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: "Multiple", // Serving multiple countries
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service Schema
 */
export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Project Management Services",
    provider: {
      "@type": "Organization",
      name: "HomeTrust Africa",
    },
    areaServed: {
      "@type": "Country",
      name: ["Nigeria", "Ghana", "Kenya", "South Africa", "Tanzania", "Uganda"],
    },
    description:
      "Safe, transparent project management services for Africans in the diaspora. We help you build and manage homes, projects, and businesses back home with verified partners and fraud protection.",
    offers: {
      "@type": "Offer",
      description: "Project management and oversight services",
      // priceCurrency: "USD", // Add if applicable
      // price: "Contact for pricing", // Add if applicable
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Website Schema
 */
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HomeTrust Africa",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hometrustafrica.com",
    description:
      "Building Back Home, Without the Fear. Safe project management for the diaspora.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQ Schema (to be used when FAQ section is added)
 */
interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  // Ensure faqs is an array
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Breadcrumb Schema (for future multi-page structure)
 */
interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  // Ensure items is an array
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
