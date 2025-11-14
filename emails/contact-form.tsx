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

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  country: string;
  projectType: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  phone,
  country,
  projectType,
  message,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New project inquiry from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Project Inquiry</Heading>
          <Text style={text}>
            You have received a new project inquiry from the HomeTrust Africa
            contact form.
          </Text>

          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>
              <a href={`mailto:${email}`} style={link}>
                {email}
              </a>
            </Text>
          </Section>

          {phone && (
            <Section style={section}>
              <Text style={label}>Phone:</Text>
              <Text style={value}>
                <a href={`tel:${phone}`} style={link}>
                  {phone}
                </a>
              </Text>
            </Section>
          )}

          <Section style={section}>
            <Text style={label}>Country:</Text>
            <Text style={value}>{country}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Project Type:</Text>
            <Text style={value}>{projectType}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This email was sent from the HomeTrust Africa contact form.
            </Text>
            <Text style={footerText}>
              Please respond to the inquiry within 24 hours.
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
};

const section = {
  margin: "24px 0",
};

const label = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px 0",
};

const value = {
  color: "#333",
  fontSize: "16px",
  margin: "0",
};

const link = {
  color: "#23B245",
  textDecoration: "underline",
};

const messageText = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "8px 0 0 0",
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
  whiteSpace: "pre-wrap",
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

export default ContactFormEmail;
