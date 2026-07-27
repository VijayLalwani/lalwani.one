import type { ReactNode } from "react";

// Reverse-engineered from nisarg.com's own shipped HTML: it wraps its whole
// page in a div that mounts as opacity:0;filter:blur(5px) and animates to
// opacity:1;filter:blur(0) - a soft "content breathes in" effect that
// complements (not replaces) the native View Transition wrapping this in
// layout.tsx, which handles the cross-fade between routes. Plain CSS
// (.animate-page-blur-in, globals.css) - nisarg.com's own version of this
// is pure CSS too (confirmed: no framer-motion/gsap in its shipped JS), and
// a one-shot mount animation like this never needed a JS animation runtime.
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="animate-page-blur-in">{children}</div>;
}
