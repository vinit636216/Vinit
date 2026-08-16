"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

const EXIT = { duration: 0.5, ease: [0.4, 0, 1, 1] as const };
const ENTER = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

const PRESETS: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28, transition: EXIT },
    show: { opacity: 1, y: 0, transition: ENTER },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92, transition: EXIT },
    show: { opacity: 1, scale: 1, transition: ENTER },
  },
  left: {
    hidden: { opacity: 0, x: -28, transition: EXIT },
    show: { opacity: 1, x: 0, transition: ENTER },
  },
  right: {
    hidden: { opacity: 0, x: 28, transition: EXIT },
    show: { opacity: 1, x: 0, transition: ENTER },
  },
};

/**
 * Scroll-triggered reveal using a manual IntersectionObserver rather than
 * Framer's `whileInView` — the latter proved unreliable in this app, so
 * every scroll reveal in the site funnels through this one dependable
 * primitive.
 */
export default function Reveal({
  children,
  preset = "up",
  delay = 0,
  className = "",
  amount = 0.25,
}: {
  children: ReactNode;
  preset?: keyof typeof PRESETS;
  delay?: number;
  className?: string;
  amount?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [ref, revealed] = useInViewOnce<HTMLDivElement>(amount);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={PRESETS[preset]}
      initial="hidden"
      animate={revealed ? "show" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
