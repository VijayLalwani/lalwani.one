"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { useInView } from "framer-motion";

interface LazyLoadProps {
  children: ReactNode;
  className?: string;
  placeholderHeight?: string; 
}

export function LazyLoad({ children, className, placeholderHeight = "400px" }: LazyLoadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px 0px" });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isInView && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isInView, hasLoaded]);

  return (
    <div ref={ref} className={className} style={{ minHeight: !hasLoaded ? placeholderHeight : "auto" }}>
      {hasLoaded ? children : null}
    </div>
  );
}