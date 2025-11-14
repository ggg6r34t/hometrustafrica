import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface NewsletterWelcomeEmailProps {
  email: string;
}

export const NewsletterWelcomeEmail = ({
  email,
}: NewsletterWelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to HomeTrust Africa Newsletter</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to HomeTrust Africa!</Heading>
          <Text style={text}>
            Thank you for subscribing to our newsletter. We're excited to have
            you join our community of diaspora members building back home.
          </Text>

          <Text style={text}>You'll receive updates about:</Text>

          <Section style={listSection}>
            <Text style={listItem}>✓ Project management tips and insights</Text>
            <Text style={listItem}>✓ Success stories from our community</Text>
            <Text style={listItem}>
              ✓ Updates on our services and new features
            </Text>
            <Text style={listItem}>
              ✓ Resources for safe project management
            </Text>
          </Section>

          <Section style={buttonSection}>
            <Button style={button} href="https://hometrustafrica.com/contact">
              Start Your Project
            </Button>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              You're receiving this email because you subscribed to the
              HomeTrust Africa newsletter.
            </Text>
            <Text style={footerText}>
              If you no longer wish to receive these emails, you can{" "}
              <a href="#" style={link}>
                unsubscribe here
              </a>
              .
            </Text>
            <Text style={footerText}>
              HomeTrust Africa - Building Back Home, Without the Fear
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const h1 = {
  color: "#23B245",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const listSection = {
  margin: "24px 0",
  padding: "16px",
  backgroundColor: "#f9f9f9",
  borderRadius: "4px",
};

const listItem = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "8px 0",
};

const buttonSection = {
  margin: "32px 0",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#23B245",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const footer = {
  marginTop: "32px",
  paddingTop: "24px",
  borderTop: "1px solid #e5e5e5",
};

const footerText = {
  color: "#666",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "4px 0",
};

const link = {
  color: "#23B245",
  textDecoration: "underline",
};

export default NewsletterWelcomeEmail;
