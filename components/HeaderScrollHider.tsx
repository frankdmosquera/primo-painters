"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";

/**
 * The only client boundary in the header. Takes children so everything inside
 * stays a server component, which is the stack rule: "use client" only where
 * needed, isolated behind a wrapper that takes children.
 */
export function HeaderScrollHider({ children }: { children: React.ReactNode }) {
  const isVisible = useScrollDirection();

  return (
    <header
      className={`sticky top-0 z-50 flex w-full items-center justify-center border-b bg-background/80 px-3 py-4 backdrop-blur motion-safe:transition-transform motion-safe:duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {children}
    </header>
  );
}
