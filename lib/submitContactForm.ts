"use server";

// Ported from the-latam-painters lib/submitContactForm.ts, rewired.
//
// Theirs sends through Resend directly. Primo does not have Resend installed
// and already has a working email route at app/api/sendEmail, built on
// nodemailer, so this posts there instead. Copying theirs unchanged would have
// sent Primo's leads nowhere.
//
// The honeypot behaviour is kept: a tripped honeypot reports success rather
// than an error, so a bot cannot learn which field gave it away.
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

  // The route is on this same deployment, so it needs an absolute URL on the
  // server. VERCEL_URL is set in production; localhost covers dev.
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  try {
    const res = await fetch(`${base}/api/sendEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message }),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Failed to send. Please call us on ${siteConfig.business.phoneDisplay} instead.`,
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: `Failed to send. Please call us on ${siteConfig.business.phoneDisplay} instead.`,
    };
  }
}
