"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, wordBlurIn } from "./variants";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

export default function BlurInText({
  text,
  as = "h2",
  className = "",
  wordClassName = "",
  grayUntilRevealed = true,
}: {
  text: string;
  as?: Tag;
  className?: string;
  wordClassName?: string;
  /** Words start muted gray and switch to full color on reveal (matches the reference video). */
  grayUntilRevealed?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  const Tag = motion[as];
  const [ref, revealed] = useInViewOnce<HTMLElement>(0.3);

  if (prefersReducedMotion) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  return (
    <Tag
      ref={ref as never}
      className={className}
      variants={staggerContainer(0.05)}
      initial="hidden"
      animate={revealed ? "show" : "hidden"}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <motion.span
            variants={wordBlurIn}
            className={`inline-block will-change-[filter,opacity,transform] ${
              grayUntilRevealed ? "[transition:color_0.4s]" : ""
            } ${wordClassName}`}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
