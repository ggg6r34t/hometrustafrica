"use client";

import {
  FileText,
  Scale,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Calendar,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function TermsOfService() {
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
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By
              using HomeTrust Africa, you agree to these terms.
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
                  Welcome to HomeTrust Africa. These Terms of Service ("Terms")
                  govern your access to and use of our website, services, and
                  platform (collectively, the "Services") provided by HomeTrust
                  Africa ("we," "our," or "us").
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  By accessing or using our Services, you agree to be bound by
                  these Terms. If you disagree with any part of these terms, you
                  may not access or use our Services.
                </p>
              </Card>
            </motion.div>

            {/* Acceptance of Terms */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Acceptance of Terms
                </h2>
              </div>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light">
                  By creating an account, submitting a project inquiry, or using
                  any of our Services, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms and our
                  Privacy Policy. You must be at least 18 years old and have the
                  legal capacity to enter into these Terms.
                </p>
              </Card>
            </motion.div>

            {/* Description of Services */}
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
                  Description of Services
                </h2>
              </div>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  HomeTrust Africa provides project management services for
                  Africans in the diaspora who wish to build, invest, or manage
                  projects in their home countries. Our Services include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-light ml-4">
                  <li>Project consultation and planning services</li>
                  <li>
                    Connection with verified local partners and contractors
                  </li>
                  <li>Project oversight and progress tracking</li>
                  <li>
                    Transparent financial reporting and milestone management
                  </li>
                  <li>Legal and regulatory compliance support</li>
                  <li>
                    Communication and coordination between clients and local
                    partners
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* User Responsibilities */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                User Responsibilities
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-light ml-4">
                  <li>
                    Provide accurate, current, and complete information during
                    registration and throughout your use of the Services
                  </li>
                  <li>
                    Maintain the security of your account credentials and notify
                    us immediately of any unauthorized access
                  </li>
                  <li>
                    Use the Services only for lawful purposes and in accordance
                    with these Terms
                  </li>
                  <li>
                    Comply with all applicable laws and regulations in your
                    jurisdiction and the jurisdiction where your project is
                    located
                  </li>
                  <li>
                    Not engage in any fraudulent, deceptive, or harmful
                    activities
                  </li>
                  <li>
                    Respect the intellectual property rights of HomeTrust Africa
                    and third parties
                  </li>
                  <li>
                    Not interfere with or disrupt the Services or servers
                    connected to the Services
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* Project Management and Fees */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Project Management and Fees
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  <strong className="text-foreground">Service Fees:</strong> Our
                  service fees are disclosed during the project consultation
                  phase and are based on the scope and complexity of your
                  project. All fees are clearly outlined in your project
                  agreement.
                </p>
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  <strong className="text-foreground">Payment Terms:</strong>{" "}
                  Payments are typically structured as milestone-based payments
                  held in escrow. Funds are released only upon completion and
                  verification of project milestones.
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  <strong className="text-foreground">Refunds:</strong> Refund
                  policies vary by project type and are detailed in your
                  specific project agreement. Generally, refunds are considered
                  on a case-by-case basis and may be subject to administrative
                  fees.
                </p>
              </Card>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Limitation of Liability
                </h2>
              </div>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  To the maximum extent permitted by law:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-light ml-4">
                  <li>
                    HomeTrust Africa acts as an intermediary and project
                    management service provider. We facilitate connections
                    between clients and verified local partners but are not
                    directly responsible for the execution of construction or
                    project work.
                  </li>
                  <li>
                    We are not liable for delays, defects, or issues arising
                    from factors beyond our reasonable control, including
                    weather, natural disasters, government actions, or
                    third-party contractor performance.
                  </li>
                  <li>
                    Our total liability for any claims arising from or related
                    to the Services shall not exceed the total fees paid by you
                    to HomeTrust Africa for the specific project in question.
                  </li>
                  <li>
                    We are not liable for indirect, incidental, special,
                    consequential, or punitive damages, including lost profits,
                    data loss, or business interruption.
                  </li>
                </ul>
              </Card>
            </motion.div>

            {/* Disclaimers */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Disclaimers
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  <strong className="text-foreground">
                    Service Availability:
                  </strong>{" "}
                  We strive to provide reliable Services but do not guarantee
                  uninterrupted, secure, or error-free operation. Services are
                  provided "as is" and "as available."
                </p>
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  <strong className="text-foreground">
                    Third-Party Services:
                  </strong>{" "}
                  Our Services may include links to third-party websites or
                  services. We are not responsible for the content, policies, or
                  practices of third-party services.
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  <strong className="text-foreground">No Warranty:</strong> We
                  disclaim all warranties, express or implied, including
                  warranties of merchantability, fitness for a particular
                  purpose, and non-infringement.
                </p>
              </Card>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Intellectual Property
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  All content, features, and functionality of the Services,
                  including but not limited to text, graphics, logos, icons,
                  images, and software, are the exclusive property of HomeTrust
                  Africa or its licensors and are protected by copyright,
                  trademark, and other intellectual property laws.
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  You may not reproduce, distribute, modify, create derivative
                  works of, publicly display, or otherwise exploit any content
                  from the Services without our express written permission.
                </p>
              </Card>
            </motion.div>

            {/* Termination */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-6 h-6 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Termination
                </h2>
              </div>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  We may terminate or suspend your access to the Services
                  immediately, without prior notice, for any reason, including
                  if you breach these Terms.
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Upon termination, your right to use the Services will cease
                  immediately. All provisions of these Terms that by their
                  nature should survive termination shall survive, including
                  ownership provisions, warranty disclaimers, and limitations of
                  liability.
                </p>
              </Card>
            </motion.div>

            {/* Dispute Resolution */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Dispute Resolution
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  <strong className="text-foreground">
                    Informal Resolution:
                  </strong>{" "}
                  We encourage you to contact us first to resolve any disputes
                  informally. Please reach out to{" "}
                  <a
                    href="mailto:support@hometrustafrica.com"
                    className="text-primary hover:underline"
                  >
                    support@hometrustafrica.com
                  </a>{" "}
                  with any concerns.
                </p>
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  <strong className="text-foreground">Arbitration:</strong> If
                  informal resolution is unsuccessful, disputes will be resolved
                  through binding arbitration in accordance with the rules of
                  the American Arbitration Association, unless prohibited by
                  law.
                </p>
                <p className="text-muted-foreground leading-relaxed font-light">
                  <strong className="text-foreground">Governing Law:</strong>{" "}
                  These Terms shall be governed by and construed in accordance
                  with the laws of [Your Jurisdiction], without regard to its
                  conflict of law provisions.
                </p>
              </Card>
            </motion.div>

            {/* Changes to Terms */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Changes to Terms
              </h2>
              <Card className="p-6 border border-border/50 bg-card">
                <p className="text-muted-foreground leading-relaxed font-light">
                  We reserve the right to modify these Terms at any time. We
                  will notify you of any material changes by posting the new
                  Terms on this page and updating the "Last updated" date. Your
                  continued use of the Services after such modifications
                  constitutes acceptance of the updated Terms. If you do not
                  agree to the modified Terms, you must stop using the Services.
                </p>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <Card className="p-6 border border-primary/20 bg-primary/5">
                <p className="text-muted-foreground leading-relaxed font-light mb-4">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Email:</strong>{" "}
                    <a
                      href="mailto:legal@hometrustafrica.com"
                      className="text-primary hover:underline"
                    >
                      legal@hometrustafrica.com
                    </a>
                  </p>
                  <p>
                    <strong className="text-foreground">
                      General Inquiries:
                    </strong>{" "}
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

            {/* Acknowledgment */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              className="mb-12"
            >
              <Card className="p-6 border border-primary/20 bg-primary/5">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="text-foreground font-semibold mb-2">
                      By using HomeTrust Africa Services
                    </p>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      You acknowledge that you have read, understood, and agree
                      to be bound by these Terms of Service and our Privacy
                      Policy. Thank you for choosing HomeTrust Africa.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
