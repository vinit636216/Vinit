"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function ParallaxImage({
  src,
  alt,
  className = "",
  range = 40,
  fill = true,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  range?: number;
  fill?: boolean;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={prefersReducedMotion ? undefined : { y }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes ?? "100vw"}
          className="scale-110 object-cover"
        />
      </motion.div>
    </div>
  );
}
