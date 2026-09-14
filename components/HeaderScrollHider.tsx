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
      // No px here. LATAM carries px-3 on the header element as well as the
      // padding on the container inside it, which pushed the header's content
      // 12px further in than every section below it. The inner container owns
      // the gutter, so the page has one edge.
      className={`sticky top-0 z-50 flex w-full items-center justify-center border-b bg-white py-4 motion-safe:transition-transform motion-safe:duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {children}
    </header>
  );
}
