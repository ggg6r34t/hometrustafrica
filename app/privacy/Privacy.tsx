"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Mail, Calendar } from "lucide-react";

import { Card } from "@/components/ui/card";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function Privacy() {
  const lastUpdated = "November 2025";

  return (
    <div className="relative min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(35,178,69,0.08),transparent_50%)] -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <Card className="p-8 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  HomeTrust Africa ("we," "our," or "us") is committed to
                  protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you use our services, including our website and project
                  management platform.
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  By using our services, you agree to the collection and use of
                  information in accordance with this policy. If you do not
                  agree with our policies and practices, please do not use our
                  services.
                </p>
              </Card>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Information We Collect
                </h2>
              </div>

              <div className="space-y-6">
                <Card className="p-6 border border-border/50 bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Personal Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light mb-3">
                    We collect information that you provide directly to us,
                    including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-light ml-4">
                    <li>
                      Name, email address, phone number, and mailing address
                    </li>
                    <li>
                      Country of residence and country where your project is
                      located
                    </li>
                    <li>Project details, budget information, and timeline</li>
                    <li>
                      Payment information (processed securely through
                      third-party providers)
                    </li>
                    <li>Communication preferences and correspondence</li>
                  </ul>
                </Card>

                <Card className="p-6 border border-border/50 bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Automatically Collected Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light mb-3">
                    When you visit our website, we automatically collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-light ml-4">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </Card>
              </div>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  How We Use Your Information
                </h2>
              </div>

              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-light ml-4">
                  <li>
                    Provide, maintain, and improve our services and project
                    management platform
                  </li>
                  <li>
                    Process your inquiries, project requests, and transactions
                  </li>
                  <li>
                    Communicate with you about your projects, including updates,
                    progress reports, and support
                  </li>
                  <li>
                    Verify your identity and prevent fraud or unauthorized
                    access
                  </li>
                  <li>
                    Send you newsletters, marketing communications, and
                    promotional materials (with your consent)
                  </li>
                  <li>Analyze usage patterns and improve user experience</li>
                  <li>
                    Comply with legal obligations and enforce our terms of
                    service
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* Information Sharing */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Information Sharing and Disclosure
                </h2>
              </div>

              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  We do not sell your personal information. We may share your
                  information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-light ml-4">
                  <li>
                    <strong className="text-foreground">
                      Service Providers:
                    </strong>{" "}
                    With trusted third-party service providers who assist us in
                    operating our platform, processing payments, or conducting
                    business operations
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Verified Partners:
                    </strong>{" "}
                    With our verified local partners and contractors who are
                    involved in your project, as necessary to complete your
                    project
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Legal Requirements:
                    </strong>{" "}
                    When required by law, court order, or government regulation
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Business Transfers:
                    </strong>{" "}
                    In connection with a merger, acquisition, or sale of assets
                  </li>
                  <li>
                    <strong className="text-foreground">
                      With Your Consent:
                    </strong>{" "}
                    When you explicitly authorize us to share your information
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* Data Security */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Data Security
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  We implement industry-standard security measures to protect
                  your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-light ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>
                    Secure payment processing through PCI-compliant providers
                  </li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection and privacy</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed font-light mt-4">
                  However, no method of transmission over the internet or
                  electronic storage is 100% secure. While we strive to use
                  commercially acceptable means to protect your information, we
                  cannot guarantee absolute security.
                </p>
              </Card>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Your Rights and Choices
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-light ml-4">
                  <li>
                    Access and receive a copy of your personal information
                  </li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict processing of your information</li>
                  <li>
                    Data portability (receive your data in a structured format)
                  </li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed font-light mt-4">
                  To exercise these rights, please contact us at{" "}
                  <a
                    href="mailto:privacy@hometrustafrica.com"
                    className="text-primary hover:underline"
                  >
                    privacy@hometrustafrica.com
                  </a>
                  .
                </p>
              </Card>
            </motion.div>

            {/* Cookies */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Cookies and Tracking Technologies
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-light ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Improve website functionality and user experience</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed font-light mt-4">
                  You can control cookies through your browser settings.
                  However, disabling cookies may limit your ability to use
                  certain features of our website.
                </p>
              </Card>
            </motion.div>

            {/* International Data Transfers */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                International Data Transfers
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light">
                  Your information may be transferred to and processed in
                  countries other than your country of residence. These
                  countries may have data protection laws that differ from those
                  in your country. We take appropriate safeguards to ensure that
                  your information receives an adequate level of protection,
                  including through contractual agreements with our service
                  providers.
                </p>
              </Card>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Children's Privacy
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light">
                  Our services are not intended for individuals under the age of
                  18. We do not knowingly collect personal information from
                  children. If you believe we have collected information from a
                  child, please contact us immediately, and we will take steps
                  to delete such information.
                </p>
              </Card>
            </motion.div>

            {/* Changes to Privacy Policy */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Changes to This Privacy Policy
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date. You are
                  advised to review this Privacy Policy periodically for any
                  changes. Changes are effective when posted on this page.
                </p>
              </Card>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Contact Us
              </h2>
              <Card className="p-6 border border-primary/20 bg-primary/5">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <a
                      href="mailto:privacy@hometrustafrica.com"
                      className="text-primary hover:underline"
                    >
                      privacy@hometrustafrica.com
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <a
                      href="mailto:hello@hometrustafrica.com"
                      className="text-primary hover:underline"
                    >
                      hello@hometrustafrica.com
                    </a>
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
