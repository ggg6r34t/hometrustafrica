import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactConfirmationEmailProps {
  name: string;
}

export const ContactConfirmationEmail = ({
  name,
}: ContactConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>We've received your message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You, {name}!</Heading>
          <Text style={text}>
            We've received your project inquiry and our team will get back to
            you within 24 hours.
          </Text>

          <Text style={text}>While you wait, here's what happens next:</Text>

          <Section style={listSection}>
            <Text style={listItem}>
              ✓ Our team will review your project details
            </Text>
            <Text style={listItem}>
              ✓ We'll match you with verified partners in your target country
            </Text>
            <Text style={listItem}>
              ✓ You'll receive a detailed proposal with transparent pricing
            </Text>
            <Text style={listItem}>✓ We'll answer any questions you have</Text>
          </Section>

          <Text style={text}>
            If you have any urgent questions, feel free to reply to this email
            or contact us directly.
          </Text>

          <Section style={footer}>
            <Text style={footerText}>
              Best regards,
              <br />
              The HomeTrust Africa Team
            </Text>
            <Text style={footerText}>Building Back Home, Without the Fear</Text>
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

const footer = {
  marginTop: "32px",
  paddingTop: "24px",
  borderTop: "1px solid #e5e5e5",
};

const footerText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "4px 0",
};

export default ContactConfirmationEmail;
