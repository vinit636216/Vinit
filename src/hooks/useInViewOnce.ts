"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver-based viewport tracker. By default it keeps watching
 * and toggles `inView` both ways, so animations replay whether the user
 * scrolls down into a section or back up into it. Pass `once: true` for a
 * fire-once reveal instead.
 *
 * Framer Motion's `whileInView` proved unreliable in this app, so every
 * scroll-triggered animation drives off this hook instead.
 */
export function useInViewOnce<T extends HTMLElement>(amount = 0.2, once = false) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0]?.isIntersecting ?? false;
        if (isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [amount, once]);

  return [ref, inView] as const;
}
