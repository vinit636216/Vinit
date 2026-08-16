"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-center bg-secondary px-6 md:px-16"
          initial={{ clipPath: "circle(0% at 100% 0%)" }}
          animate={{ clipPath: "circle(150% at 100% 0%)" }}
          exit={{ clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            data-cursor-hover
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-foreground md:right-10 md:top-8"
          >
            ✕
          </button>

          <motion.ul
            className="flex flex-col gap-1"
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            initial="hidden"
            animate="show"
          >
            {LINKS.map((link) => (
              <motion.li
                key={link.href}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="group flex items-center justify-between border-b border-white/10 py-2.5 md:py-3.5"
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  data-cursor-hover
                  className="font-display text-2xl font-extrabold uppercase text-foreground transition-colors group-hover:text-primary md:text-4xl"
                >
                  {link.label}
                </Link>
                <span className="text-lg text-foreground/40 transition-colors group-hover:text-primary md:text-xl">
                  +
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
