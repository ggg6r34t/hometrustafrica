import {
  Body,
  Button,
  Container,
  Head,
  Html,
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

export function BaseEmail({
  previewText,
  title,
  intro,
  children,
  actionLabel,
  actionUrl,
  actionNote,
  footerNote,
}: BaseEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.brand}>HomeTrust Africa</Text>
          </Section>

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
              HomeTrust Africa · Diaspora project oversight and managed local
              execution.
            </Text>
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
  brand: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "700",
    letterSpacing: "0.2px",
    color: "#122117",
    margin: "0",
  },
  content: {
    padding: "24px",
  },
  title: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: "650",
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
  },
  actionButton: {
    backgroundColor: "#2f7d4c",
    borderRadius: "999px",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
    textDecoration: "none",
    padding: "12px 20px",
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
};
