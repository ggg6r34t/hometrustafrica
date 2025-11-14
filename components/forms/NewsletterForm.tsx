"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  newsletterSchema,
  type NewsletterFormValues,
} from "@/schema/newsletter";
import { subscribeNewsletter } from "@/app/actions/newsletter";

export default function NewsletterForm() {
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const result = await subscribeNewsletter(email);
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
      toast.error(error.message || "Failed to subscribe. Please try again.");
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

  const onSubmit = (values: NewsletterFormValues) => {
    mutation.mutate(values.email);
  };

  const isSubmitting = mutation.isPending;
  const isSuccess = mutation.isSuccess && !mutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="newsletter-email" className="sr-only">
                Email address
              </FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="your@email.com"
                    disabled={isSubmitting || isSuccess}
                    className="h-10 bg-background/10 border-primary/20 text-foreground placeholder:text-muted-foreground focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || isSuccess}
                  className="h-10 px-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label="Subscribe to newsletter"
                >
                  {isSuccess ? (
                    <CheckCircle2 size={16} />
                  ) : isSubmitting ? (
                    <motion.div
                      className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <Send size={16} />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {mutation.isError && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-destructive mt-2 flex items-center gap-1"
            role="alert"
          >
            <AlertCircle className="w-3 h-3" />
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Failed to subscribe. Please try again."}
          </motion.p>
        )}
        {isSuccess && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-primary mt-2 flex items-center gap-1"
          >
            <CheckCircle2 size={12} />
            Subscribed successfully!
          </motion.p>
        )}
      </form>
    </Form>
  );
}
