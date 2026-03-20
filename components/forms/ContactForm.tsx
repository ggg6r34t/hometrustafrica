"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  Building2,
  Home,
  Briefcase,
  Sprout,
  Users,
  Info,
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
      className="bg-white pt-2 md:pt-4"
      ariaLabelledby="contact-heading"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <motion.div
          className="lg:col-span-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="border-t border-border/60 pt-6">
            <p className="text-sm font-medium tracking-[0.04em] text-muted-foreground/80">
              Before you submit
            </p>
            <h2 id="contact-heading" className="mt-5 max-w-sm">
              Strong inputs improve execution quality.
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-xl">Include</h3>
                <p className="mt-3 max-w-sm text-base text-muted-foreground">
                  Project objective, location, current stage, budget range, and
                  where local execution is currently exposed.
                </p>
              </div>
              <div>
                <h3 className="text-xl">What happens next</h3>
                <p className="mt-3 max-w-sm text-base text-muted-foreground">
                  We review your brief within 48 hours.
                </p>
                <p className="mt-2 max-w-sm text-base text-muted-foreground">
                  You receive a recommended next-step plan. No commitment is
                  required at this stage.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="lg:col-span-8"
        >
          <div className="pt-6 md:pt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
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
                            disabled={isPending}
                            className="h-12 rounded-xl border-border/70 bg-white shadow-none transition-all duration-200"
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
                            disabled={isPending}
                            className="h-12 rounded-xl border-border/70 bg-white shadow-none transition-all duration-200"
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
                          Email <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            disabled={isPending}
                            className="h-12 rounded-xl border-border/70 bg-white shadow-none transition-all duration-200"
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
                          Country of Residence{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 w-full rounded-xl border-border/70 bg-white shadow-none">
                              <SelectValue placeholder="Choose your current country" />
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
                          Project Category{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 w-full rounded-xl border-border/70 bg-white shadow-none">
                              <SelectValue placeholder="Choose the closest project category" />
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
                          Phone{" "}
                          <span className="text-muted-foreground font-normal text-xs">
                            Optional
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            disabled={isPending}
                            className="h-12 rounded-xl border-border/70 bg-white shadow-none transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-sm text-muted-foreground">
                          Optional. Useful if you prefer a call or WhatsApp
                          reply.
                        </p>
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
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-sm font-medium text-foreground">
                            Project Brief{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="inline-flex h-5 w-5 min-h-5 min-w-5 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                                aria-label="Project brief guidance"
                              >
                                <Info className="h-4 w-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              The more specific your brief is, the more useful
                              the first review will be.
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Outline the project objective, location, current stage, budget range, expected timeline, and where local execution needs oversight."
                            rows={6}
                            disabled={isPending}
                            className="min-h-40 rounded-2xl border-border/70 bg-white shadow-none transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Privacy Notice */}
                <motion.div variants={staggerItem}>
                  <p className="max-w-2xl text-sm text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline font-medium"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </motion.div>

                {/* Error Message */}
                {mutation.isError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    variants={staggerItem}
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-destructive"
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
                    className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-primary"
                  >
                    <CheckCircle2
                      className="w-5 h-5 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-medium leading-relaxed">
                      Thank you. Your brief has been received and queued for
                      review.
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div variants={staggerItem} className="pt-1">
                  <Button
                    type="submit"
                    size="lg"
                    className="group w-full rounded-full px-8 py-6 text-base font-semibold shadow-none disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
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
                        Request a Project Review
                        <ArrowRight
                          className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block"
                          size={18}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Button>
                  {mutation.isSuccess && (
                    <p className="mt-3 text-sm text-primary">
                      Submitted successfully. We will respond within 48 hours.
                    </p>
                  )}
                </motion.div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
