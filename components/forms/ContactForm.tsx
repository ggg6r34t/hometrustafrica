"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SectionContainer from "@/components/ui/section-container";
import {
  staggerContainer,
  staggerItem,
  viewportOptions,
} from "@/lib/animations";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Shield,
  Building2,
  Home,
  Briefcase,
  Sprout,
  Users,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { contactFormSchema, type ContactFormValues } from "@/schema/contact";
import { submitContactForm, type ContactFormData } from "@/app/actions/contact";

const africanCountries = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "Tanzania",
  "Uganda",
  "Ethiopia",
  "Rwanda",
  "Senegal",
  "Other African Country",
];

const diasporaCountries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Other",
];

const projectTypes = [
  {
    value: "residential",
    label: "Residential Construction",
    icon: Home,
    description: "Build or renovate your home",
  },
  {
    value: "commercial",
    label: "Commercial Development",
    icon: Building2,
    description: "Business properties & real estate",
  },
  {
    value: "business",
    label: "Business Setup",
    icon: Briefcase,
    description: "Start or expand your business",
  },
  {
    value: "agricultural",
    label: "Agricultural Projects",
    icon: Sprout,
    description: "Farming & agricultural investments",
  },
  {
    value: "general",
    label: "General Inquiry",
    icon: Users,
    description: "Other questions or consultations",
  },
];

/**
 * Full Contact Form Component
 *
 * Custom-designed contact page for HomeTrust Africa
 * Reflects trust, transparency, and diaspora connection
 */
export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      projectType: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const formData: ContactFormData = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone || "",
        country: data.country || "Not specified",
        projectType: data.projectType || "General Inquiry",
        message: data.message,
      };
      const result = await submitContactForm(formData);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit. Please try again.");
    },
  });

  // Reset mutation state after showing success message for 5 seconds
  useEffect(() => {
    if (mutation.isSuccess && !mutation.isPending) {
      const timer = setTimeout(() => {
        mutation.reset();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [mutation.isSuccess, mutation.isPending]);

  const onSubmit = (values: ContactFormValues) => {
    mutation.mutate(values);
  };

  const isPending = mutation.isPending;

  return (
    <SectionContainer
      id="contact"
      className="bg-background py-16 md:py-24"
      ariaLabelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Form */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-md p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name Fields */}
                <motion.div
                  variants={staggerItem}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          First Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            disabled={isPending}
                            className="h-11 transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Last Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            disabled={isPending}
                            className="h-11 transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={staggerItem}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Email Address{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            disabled={isPending}
                            className="h-11 transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Country and Project Type */}
                <motion.div
                  variants={staggerItem}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Your Country{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full h-11">
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="diaspora" disabled>
                              <span className="font-semibold">
                                Diaspora Countries
                              </span>
                            </SelectItem>
                            {diasporaCountries.map((countryOption) => (
                              <SelectItem
                                key={countryOption}
                                value={countryOption}
                              >
                                {countryOption}
                              </SelectItem>
                            ))}
                            <SelectItem
                              value="africa"
                              disabled
                              className="mt-2"
                            >
                              <span className="font-semibold">
                                African Countries
                              </span>
                            </SelectItem>
                            {africanCountries.map((countryOption) => (
                              <SelectItem
                                key={countryOption}
                                value={countryOption}
                              >
                                {countryOption}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Project Type{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full h-11">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {projectTypes.map((type) => {
                              const Icon = type.icon;
                              return (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 text-primary" />
                                    <div className="text-left">
                                      <div className="font-medium">
                                        {type.label}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {type.description}
                                      </div>
                                    </div>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Phone (Optional) */}
                <motion.div variants={staggerItem}>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Phone Number{" "}
                          <span className="text-muted-foreground font-normal text-xs">
                            (Optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 (234) 567-8900"
                            disabled={isPending}
                            className="h-11 transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={staggerItem}>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">
                          Tell Us About Your Project{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share details about your project, timeline, budget, or any questions you have..."
                            rows={6}
                            disabled={isPending}
                            className="resize-none transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Privacy Notice */}
                <motion.div
                  variants={staggerItem}
                  className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/50"
                >
                  <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline font-medium"
                    >
                      Privacy Policy
                    </Link>
                    . Your information is secure and will only be used to
                    respond to your inquiry.
                  </p>
                </motion.div>

                {/* Error Message */}
                {mutation.isError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    variants={staggerItem}
                    role="alert"
                    className="rounded-lg p-4 flex items-start gap-3 border bg-destructive/10 text-destructive border-destructive/20"
                  >
                    <AlertCircle
                      className="w-5 h-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-medium leading-relaxed">
                      {mutation.error instanceof Error
                        ? mutation.error.message
                        : "Failed to submit. Please try again."}
                    </p>
                  </motion.div>
                )}

                {/* Success Message */}
                {mutation.isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    variants={staggerItem}
                    role="status"
                    className="rounded-lg p-4 flex items-start gap-3 border bg-primary/10 text-primary border-primary/20"
                  >
                    <CheckCircle2
                      className="w-5 h-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-medium leading-relaxed">
                      Thank you! We've received your message and will contact
                      you within 24 hours.
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div variants={staggerItem} className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        Start Your Project Journey
                        <ArrowRight
                          className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block"
                          size={18}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </Card>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
