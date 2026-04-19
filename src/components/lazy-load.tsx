"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

interface LazyLoadProps {
  children: ReactNode;
  className?: string;
  placeholderHeight?: string; 
}

export function LazyLoad({ children, className, placeholderHeight = "400px" }: LazyLoadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px 0px" });

  return (
    <div ref={ref} className={className} style={{ minHeight: !isInView ? placeholderHeight : "auto" }}>
      {isInView ? children : null}
    </div>
  );
}