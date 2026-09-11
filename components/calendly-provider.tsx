"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { siteConfig } from "@/data/siteConfig";

/**
 * One Calendly modal for the whole site.
 *
 * Before this there was a separate PopupModal inside the header, the hero
 * calendar and the hero call to action, each with its own open state and its
 * own `mounted` guard, and the Calendly URL written out in four files with one
 * of them missing the hide_gdpr_banner flag.
 *
 * Any button anywhere can now call `useCalendly()` and open the same modal.
 * Because this wraps `{children}` rather than rendering the page itself, every
 * server component inside it stays a server component and is not pulled into
 * the client bundle.
 */
const CalendlyContext = createContext<() => void>(() => {});

export const useCalendly = () => useContext(CalendlyContext);

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // PopupModal reads document.body during render, which does not exist on the
  // server, so it only renders after mount.
  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback(() => {
    setIsReady(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsReady(false);
  }, []);

  // Calendly posts a message once the scheduling page has rendered. That is
  // the signal we want, but it cannot be the only one: if it never arrives the
  // spinner would sit on top of a perfectly working calendar forever.
  useCalendlyEventListener({
    onEventTypeViewed: () => setIsReady(true),
    onProfilePageViewed: () => setIsReady(true),
  });

  // Two fallbacks behind that signal.
  useEffect(() => {
    if (!isOpen || isReady) return;

    // 1. the iframe's own load event, which fires even if no message arrives
    const poll = window.setInterval(() => {
      const frame = document.querySelector<HTMLIFrameElement>(
        ".calendly-overlay iframe",
      );
      if (!frame) return;
      window.clearInterval(poll);
      frame.addEventListener("load", () => setIsReady(true), { once: true });
    }, 120);

    // 2. a hard ceiling, so a stuck spinner is impossible
    const ceiling = window.setTimeout(() => setIsReady(true), 6000);

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(ceiling);
    };
  }, [isOpen, isReady]);

  return (
    <CalendlyContext.Provider value={open}>
      {children}

      {mounted && (
        <PopupModal
          url={siteConfig.booking.calendlyUrl}
          open={isOpen}
          onModalClose={close}
          rootElement={document.body}
        />
      )}

      {/* Sits above Calendly's overlay (9999) until the calendar reports in.
          Calendly shows only a faint three dot mark on a white panel, which on
          a slow connection reads as a broken modal. */}
      {isOpen && !isReady && (
        <div
          className="pointer-events-none fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-4"
          role="status"
          aria-live="polite"
        >
          <span
            className="h-9 w-9 rounded-full border-[3px] border-white/25 border-t-white motion-safe:animate-spin"
            aria-hidden="true"
          />
          <span className="text-sm font-medium tracking-wide text-white/90">
            Loading the calendar…
          </span>
        </div>
      )}
    </CalendlyContext.Provider>
  );
}
