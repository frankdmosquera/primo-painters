"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { PopupModal } from "react-calendly";
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
  const [mounted, setMounted] = useState(false);

  // PopupModal reads document.body during render, which does not exist on the
  // server, so it only renders after mount.
  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);

  return (
    <CalendlyContext.Provider value={open}>
      {children}
      {mounted && (
        <PopupModal
          url={siteConfig.booking.calendlyUrl}
          open={isOpen}
          onModalClose={() => setIsOpen(false)}
          rootElement={document.body}
        />
      )}
    </CalendlyContext.Provider>
  );
}
