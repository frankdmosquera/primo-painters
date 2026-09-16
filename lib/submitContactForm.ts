"use server";

// Ported from the-latam-painters lib/submitContactForm.ts.
//
// This is the only path a contact form takes. components/forms/ContactForm.tsx
// calls it, and nothing posts to an API route any more.
//
// A SERVER ACTION, not a route handler, and that is the point. A route at
// /api/sendEmail is a public URL anyone can POST to, with no auth and no rate
// limit, which is what Primo had. An action has no URL to hand out and cannot
// be called without going through this validation.
//
// THREE GATES, in this order, and none of them is decoration.
//
//   zod        rejects anything that does not match contactFormSchema
//   honeypot   a tripped honeypot reports SUCCESS rather than an error, so a
//              bot cannot learn which field gave it away
//   escaping   the body is a react template, so react escapes every value.
//              the nodemailer route this replaces interpolated them raw into
//              html, so a submission could inject markup and links into the
//              email Frank reads
import { createElement } from "react";
import { Resend } from "resend";

import { ContactLeadEmail } from "@/emails/contact-lead";

import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contactFormSchema";
import { siteConfig } from "@/data/siteConfig";

type Result = { success: true } | { success: false; error: string };

export async function submitContactForm(
  values: ContactFormValues,
): Promise<Result> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Invalid submission." };
  }

  if (parsed.data.company) {
    return { success: true };
  }

  const { name, email, phone, message } = parsed.data;

  // Every failure below returns the same thing: a phone number. A visitor who
  // cannot reach the form should still be able to reach the business, and the
  // reason it failed is our problem rather than theirs.
  const failed: Result = {
    success: false,
    error: `Failed to send. Please call us on ${siteConfig.business.phoneDisplay} instead.`,
  };

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) return failed;

  try {
    const resend = new Resend(apiKey);

    // from must be at a domain verified in Resend. to is the same address, so
    // the lead lands in the business inbox. Both come from siteConfig rather
    // than being typed here, because a new client means a new config.
    const { data, error } = await resend.emails.send({
      from: `${siteConfig.business.name} <${siteConfig.business.email}>`,
      to: [siteConfig.business.email],
      // So hitting reply in the inbox answers the visitor, not ourselves.
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Phone:   ${phone}`,
        "",
        message,
      ].join("\n"),
      // createElement rather than JSX so this file stays .ts. One call does
      // not justify renaming the module and churning every import of it.
      //
      // react escapes every interpolation, so the hand written escapeHtml
      // this replaces is gone rather than merely missing.
      react: createElement(ContactLeadEmail, {
        name,
        email,
        phone,
        message,
        // Stamped here, on the server, at the moment the enquiry arrives.
        receivedAt: new Date(),
      }),
    });

    // Resend reports failures in the response rather than by throwing, so a
    // try/catch alone would treat a rejected send as a success.
    if (error || !data) return failed;

    return { success: true };
  } catch {
    return failed;
  }
}
