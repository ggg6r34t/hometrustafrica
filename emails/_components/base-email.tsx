import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface BaseEmailProps {
  previewText: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
  actionLabel?: string;
  actionUrl?: string;
  actionNote?: string;
  footerNote?: string;
  unsubscribeUrl?: string;
}

const supportEmail = "support@hometrustafrica.com";
const appBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://hometrustafrica.com";

export const EMAIL_ROUTES = {
  contact: "/contact",
  login: "/login",
  dashboardProjects: "/dashboard/projects",
  dashboardInbox: "/dashboard/inbox",
  dashboardNotifications: "/dashboard/notifications",
  dashboardSupport: "/dashboard/support",
  dashboardSettings: "/dashboard/settings",
} as const;

export function appUrl(path: string) {
  return `${appBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

const PREVIEW_PADDING = "\u200C\u00A0".repeat(90);

// Placeholder logo embedded as data URI so it renders in preview without a
// deployed host. Replace src with a publicly hosted PNG (e.g. appUrl("/email-logo.png"))
// once your brand asset is ready — PNG has the broadest email client support.
const LOGO_SRC =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyMDAgNDAiPg0KICA8cmVjdCB4PSIwIiB5PSI0IiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI4IiBmaWxsPSIjMmY3ZDRjIi8+DQogIDx0ZXh0IHg9IjE2IiB5PSIyNiIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LCdTZWdvZSBVSScsUm9ib3RvLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkhUPC90ZXh0Pg0KICA8dGV4dCB4PSI0MiIgeT0iMTciIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCwnU2Vnb2UgVUknLFJvYm90byxzYW5zLXNlcmlmIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTIyMTE3Ij5Ib21lVHJ1c3Q8L3RleHQ+DQogIDx0ZXh0IHg9IjQyIiB5PSIzMiIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LCdTZWdvZSBVSScsUm9ib3RvLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSI0MDAiIGZpbGw9IiM2MDcyNjUiIGxldHRlci1zcGFjaW5nPSIwLjUiPkFGUklDQTwvdGV4dD4NCjwvc3ZnPg0K";

export function BaseEmail({
  previewText,
  title,
  intro,
  children,
  actionLabel,
  actionUrl,
  actionNote,
  footerNote,
  unsubscribeUrl,
}: BaseEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        {previewText}
        {PREVIEW_PADDING}
      </Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Img
              src={LOGO_SRC}
              alt="HomeTrust Africa"
              width={200}
              height={40}
              style={styles.logo}
            />
          </Section>

          <Hr style={styles.divider} />

          <Section style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.intro}>{intro}</Text>

            {children}

            {actionLabel && actionUrl && (
              <Section style={styles.actionSection}>
                <Button href={actionUrl} style={styles.actionButton}>
                  {actionLabel}
                </Button>
              </Section>
            )}

            {actionNote ? (
              <Text style={styles.supporting}>{actionNote}</Text>
            ) : null}
          </Section>

          <Section style={styles.footer}>
            {footerNote ? (
              <Text style={styles.footerText}>{footerNote}</Text>
            ) : null}
            <Text style={styles.footerText}>
              If you need help, contact us at{" "}
              <a href={`mailto:${supportEmail}`} style={styles.link}>
                {supportEmail}
              </a>
              .
            </Text>
            <Text style={styles.footerText}>
              HomeTrust Africa · Helping diaspora communities build with
              confidence back home.
            </Text>
            {unsubscribeUrl ? (
              <Text style={styles.footerText}>
                <a href={unsubscribeUrl} style={styles.unsubscribeLink}>
                  Unsubscribe
                </a>
              </Text>
            ) : null}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function DataBlock({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Section style={styles.block}>
      <Text style={styles.blockLabel}>{label}</Text>
      <Text style={styles.blockValue}>{value}</Text>
    </Section>
  );
}

export function MutedNote({ children }: { children: React.ReactNode }) {
  return <Text style={styles.supporting}>{children}</Text>;
}

const styles = {
  main: {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,"Helvetica Neue",Arial,sans-serif',
    color: "#122117",
  },
  container: {
    margin: "0 auto",
    maxWidth: "640px",
    padding: "24px 16px 40px",
  },
  header: {
    padding: "16px 24px",
  },
  logo: {
    display: "block",
  },
  content: {
    padding: "24px",
  },
  title: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: "700",
    color: "#122117",
    margin: "0 0 12px",
  },
  intro: {
    fontSize: "15px",
    lineHeight: "24px",
    color: "#33443a",
    margin: "0 0 16px",
  },
  block: {
    margin: "0 0 14px",
    padding: "12px 14px",
    borderRadius: "10px",
    backgroundColor: "#f8faf6",
    border: "1px solid #e8ece3",
  },
  blockLabel: {
    margin: "0 0 4px",
    fontSize: "12px",
    lineHeight: "18px",
    fontWeight: "700",
    letterSpacing: "0.3px",
    color: "#607265",
  },
  blockValue: {
    margin: "0",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#1d2e25",
    whiteSpace: "pre-wrap" as const,
  },
  actionSection: {
    margin: "22px 0 12px",
    textAlign: "center" as const,
  },
  actionButton: {
    backgroundColor: "#2f7d4c",
    borderRadius: "999px",
    color: "#ffffff",
    display: "block",
    fontSize: "14px",
    fontWeight: "700",
    textDecoration: "none",
    padding: "12px 24px",
    maxWidth: "280px",
    margin: "0 auto",
    textAlign: "center" as const,
  },
  supporting: {
    margin: "8px 0 0",
    fontSize: "13px",
    lineHeight: "20px",
    color: "#5f6f65",
  },
  footer: {
    borderTop: "1px solid #e4e7df",
    padding: "16px 24px",
  },
  footerText: {
    margin: "0 0 6px",
    fontSize: "12px",
    lineHeight: "18px",
    color: "#6c7a71",
  },
  link: {
    color: "#2f7d4c",
    textDecoration: "underline",
  },
  divider: {
    borderColor: "#e4e7df",
    margin: "0",
  },
  unsubscribeLink: {
    color: "#6c7a71",
    textDecoration: "underline",
  },
};
