"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Reverse-engineered from nisarg.com's own shipped HTML: it wraps its whole
// page in a div that mounts as opacity:0;filter:blur(5px) and animates to
// opacity:1;filter:blur(0) - a soft "content breathes in" effect that
// complements (not replaces) the native View Transition wrapping this in
// layout.tsx, which handles the cross-fade between routes.
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(5px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
