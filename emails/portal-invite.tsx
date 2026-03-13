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

interface PortalInviteEmailProps {
  fullName: string;
  invitedByName: string;
  acceptUrl: string;
  expiresAt: string;
}

export function PortalInviteEmail({
  fullName,
  invitedByName,
  acceptUrl,
  expiresAt,
}: PortalInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your secure HomeTrust Africa portal invitation</Preview>
      <Body style={{ backgroundColor: "#f5f4ef", fontFamily: "Arial, sans-serif", color: "#122117" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", padding: "32px", borderRadius: "20px" }}>
          <Heading style={{ fontSize: "28px", marginBottom: "16px" }}>You have been invited to HomeTrust Africa</Heading>
          <Text style={{ fontSize: "16px", lineHeight: "26px" }}>
            Hello {fullName},
          </Text>
          <Text style={{ fontSize: "16px", lineHeight: "26px" }}>
            {invitedByName} has provisioned your secure HomeTrust Africa client portal access. Use the link below to set your password and enter the dashboard.
          </Text>
          <Section style={{ margin: "28px 0" }}>
            <Button
              href={acceptUrl}
              style={{
                backgroundColor: "#2f7d4c",
                color: "#ffffff",
                padding: "14px 22px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Accept invite
            </Button>
          </Section>
          <Text style={{ fontSize: "14px", lineHeight: "22px", color: "#4b5a4e" }}>
            This invitation expires on {expiresAt}. If you did not expect this email, please contact HomeTrust Africa before using the link.
          </Text>
          <Text style={{ fontSize: "14px", lineHeight: "22px", color: "#4b5a4e" }}>
            For security, this invitation should not be forwarded.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default PortalInviteEmail;
