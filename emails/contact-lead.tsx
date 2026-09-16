import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { logoImg } from "@/data/images/general-images";
import { siteConfig } from "@/data/siteConfig";

/**
 * The lead notification. One person receives this: whoever reads the business
 * inbox.
 *
 * TWO AUDIENCES, and they pull in different directions. To the business it is
 * a notification, so name, phone and message have to be scannable in a second.
 * To the visitor it is brand facing, because hitting Reply quotes this whole
 * email underneath the response. That is why it is laid out and not decorated:
 * legible first, branded second.
 *
 * COLOURS ARE HEX, not tokens, and that is not an oversight. Email clients do
 * not support CSS custom properties, so --primary cannot reach here. These
 * values have to be kept in step with the site by hand.
 *
 * EVERYTHING ELSE COMES FROM siteConfig, so a new client is a new config
 * rather than a new template.
 *
 * Preview it with `npm run email`, which serves this at localhost:3001 and
 * reloads as you edit. No email is sent.
 */

const BRAND = "#1d4ed8";
const INK = "#0f172a";
const MUTED = "#64748b";
const LINE = "#e2e8f0";
const PAPER = "#f8fafc";

export type ContactLeadEmailProps = {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** When the enquiry came in. Formatted in Calgary time, see below. */
  receivedAt: Date;
};

/**
 * Calgary time, always, regardless of where this renders. Vercel runs UTC, so
 * formatting with the server's own zone would stamp every summer lead an hour
 * or six wrong and nobody would notice until they quoted the wrong morning.
 */
function formatReceived(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Section style={{ marginBottom: "12px" }}>
      <Text
        style={{
          margin: "0 0 2px",
          fontSize: "11px",
          lineHeight: "16px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        {label}
      </Text>
      <Text style={{ margin: 0, fontSize: "16px", lineHeight: "24px", color: INK }}>
        {children}
      </Text>
    </Section>
  );
}

export function ContactLeadEmail({
  name,
  email,
  phone,
  message,
  receivedAt,
}: ContactLeadEmailProps) {
  return (
    <Html lang="en">
      <Head />
      {/* The line the inbox shows next to the subject, before opening it. */}
      <Preview>{`${name} - ${phone}`}</Preview>
      <Body
        style={{
          margin: 0,
          backgroundColor: PAPER,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "32px 16px" }}>
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: `1px solid ${LINE}`,
              padding: "28px",
            }}
          >
            {/* Most clients block images until the reader allows them, so the
                alt text is the fallback rather than a nicety: blocked, this
                still reads "Primo Painters". Absolute URL because an email has
                no site to be relative to.

                logoImg, NOT siteConfig.branding.logo. They are different jobs:
                logoImg is the logo we render, 400x282 at 42KB. branding.logo
                is the URL declared to Google in data/jsonLd.ts, and it is in
                the SEO baseline, so it does not move without a decision. An
                email loads this raw with no optimizer in front of it, which is
                the one place the 1MB original actually reached a reader. */}
            <Img
              src={`${siteConfig.business.website}${logoImg.src}`}
              alt={siteConfig.business.name}
              width="140"
              height="99"
              style={{ display: "block", marginBottom: "12px" }}
            />

            <Heading
              as="h1"
              style={{ margin: "0 0 20px", fontSize: "22px", lineHeight: "30px", color: INK }}
            >
              New enquiry from the website
            </Heading>

            <Text
              style={{
                margin: "-12px 0 20px",
                fontSize: "13px",
                lineHeight: "18px",
                color: MUTED,
              }}
            >
              {formatReceived(receivedAt)}
            </Text>

            <Field label="Name">{name}</Field>

            <Field label="Phone">
              <Link href={`tel:${phone}`} style={{ color: BRAND, textDecoration: "none" }}>
                {phone}
              </Link>
            </Field>

            <Field label="Email">
              <Link href={`mailto:${email}`} style={{ color: BRAND, textDecoration: "none" }}>
                {email}
              </Link>
            </Field>

            <Hr style={{ borderColor: LINE, margin: "20px 0" }} />

            <Text
              style={{
                margin: "0 0 6px",
                fontSize: "11px",
                lineHeight: "16px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              Message
            </Text>
            {/* Split rather than <br />, so a blank line between paragraphs
                survives instead of collapsing. */}
            {message.split(/\n{2,}/).map((paragraph, i) => (
              <Text
                key={i}
                style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "24px", color: INK }}
              >
                {paragraph}
              </Text>
            ))}
            {/* A tap target rather than a link. This is read on a phone, and
                the whole point of a lead is to ring them back. */}
            <Button
              href={`tel:${phone}`}
              style={{
                display: "block",
                marginTop: "20px",
                backgroundColor: BRAND,
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 600,
                padding: "14px 20px",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {`Call ${name}`}
            </Button>
          </Section>

          <Text
            style={{
              margin: "16px 0 0",
              fontSize: "12px",
              lineHeight: "18px",
              color: MUTED,
              textAlign: "center" as const,
            }}
          >
            Sent from the contact form at{" "}
            <Link href={siteConfig.business.website} style={{ color: MUTED }}>
              {siteConfig.business.website.replace(/^https?:\/\//, "")}
            </Link>
            . Replying goes straight to {name}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/**
 * The preview server renders the default export, with these props. They are
 * sample data for design only and never reach a real send.
 */
export default function PreviewContactLeadEmail() {
  return (
    <ContactLeadEmail
      name="Sarah Whitfield"
      email="sarah.whitfield@example.com"
      phone="(403) 555-0148"
      receivedAt={new Date()}
      message={
        "Hi, we just bought a place in Legacy and the whole main floor needs painting before we move in on the 12th.\n\nFour bedrooms, living room, and the stairwell railing which is currently stained oak. Could someone come and quote? Mornings are best for us."
      }
    />
  );
}
