// Ported from the-latam-painters lib/contactFormSchema.ts, with one change
// that matters: phone is required here, not optional.
//
// Primo's own route rejects a submission without it. app/api/sendEmail/route.ts
// line 7 is `if (!name || !email || !message || !phone)`, and line 8 carries a
// note reading "we need too add phone to the form". An optional phone would
// have produced a form that validates fine and then fails at the API for some
// visitors and not others, which is worse than asking for the number.
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Please enter a phone number we can reach you on"),
  message: z.string().min(5, "Please enter a message"),
  // Honeypot. Left optional on purpose: a bot that fills every field trips it,
  // a person never sees it. Validation must not reject it, or the bot learns.
  company: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
