"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

/**
 * Recreates the video's "ABOUT US" diagonal blade-wipe: a skewed solid panel
 * covers the headline, then slides off to reveal it. One-shot on scroll-into-view.
 *
 * Uses a manual IntersectionObserver rather than Framer's `whileInView` — the
 * latter combined with a `style.skewX` value never fired reliably in testing.
 */
export default function ShutterReveal({
  text,
  as = "h1",
  className = "",
  panelClassName = "bg-secondary",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  panelClassName?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [containerRef, revealed] = useInViewOnce<HTMLDivElement>(0.4);
  const Tag = as;

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <div ref={containerRef} className="relative inline-block overflow-hidden">
      <Tag className={className}>{text}</Tag>
      <motion.div
        aria-hidden
        className={`absolute -inset-y-2 -left-[15%] -right-[15%] ${panelClassName}`}
        style={{ skewX: -14 }}
        initial={{ x: "0%" }}
        animate={{ x: revealed ? "130%" : "0%" }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: revealed ? 0.2 : 0 }}
      />
    </div>
  );
}
