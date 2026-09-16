"use client";

// Ported from the-latam-painters components/ContactForm.tsx.
//
// It replaces app/contact/ContactForm.tsx, which imports formik, yup and
// sonner. None of the three are installed, which is why that form was
// commented out: uncommenting it on 2026-09-14 produced a 500 with three
// module-not-found errors. The old file is left on disk, untouched.
//
// This is the stack CLAUDE.md names: react-hook-form for the form, zod for
// validation, shadcn field pieces wired the react-hook-form way.
//
// Three changes from LATAM's version, none of them cosmetic:
//
//   Phone is required, and the label no longer says "(optional)". Primo's
//   route rejects a submission without it - app/api/sendEmail/route.ts line 7.
//   Theirs is optional because their endpoint tolerates it.
//
//   A failed send is shown. LATAM's onSubmit checks result.success and does
//   nothing when it is false, so a visitor whose message failed to send sees
//   the form sit there looking like it worked. This surfaces the error and
//   gives the phone number as a fallback.
//
//   No card header. The page already has "Send Us a Message" as an h2 with an
//   intro paragraph directly above this form, and repeating it would put the
//   same heading on the page twice.
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contactFormSchema";
import { submitContactForm } from "@/lib/submitContactForm";

export function ContactForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setSendError(null);
    const result = await submitContactForm(values);

    if (result.success) {
      setSubmitted(true);
      reset();
      return;
    }

    setSendError(result.error);
  }

  if (submitted) {
    return (
      <div className={cn("mx-auto w-full max-w-2xl", className)} {...props}>
        <Card className="border-0 ring-1 ring-primary/15">
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary-light shadow-lg shadow-primary/25">
              <CheckCircle2 className="size-7 text-white" aria-hidden />
            </div>
            <p className="text-xl font-semibold text-primary-dark">
              Message sent
            </p>
            <p className="max-w-prose font-light leading-7 text-gray-600">
              Thanks for reaching out. We&apos;ll get back to you shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-2xl", className)} {...props}>
      <Card className="border-0 ring-1 ring-primary/15">
        <CardContent className="py-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              {/* Honeypot. A person never sees it; a bot that fills every field
                  trips it. Off screen rather than display:none, which some bots
                  check for. */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px]"
                {...register("company")}
              />

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  placeholder="Jane Smith"
                  {...register("name")}
                />
                <FieldError errors={[errors.name]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                <FieldError errors={[errors.email]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  {...register("phone")}
                />
                <FieldError errors={[errors.phone]} />
              </Field>

              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="What can we help you with?"
                  {...register("message")}
                />
                <FieldError errors={[errors.message]} />
              </Field>

              {sendError && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <span>{sendError}</span>
                </div>
              )}

              <Field>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-full bg-accent text-base font-semibold text-accent-foreground hover:bg-accent/90"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
