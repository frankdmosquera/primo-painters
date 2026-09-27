// Ported from the-latam-painters on 2026-09-14, with one change that matters:
// phone is required here, not optional. A lead without a number is not one the
// business can call back.
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

export type ContactValuesType = z.infer<typeof contactFormSchema>;
