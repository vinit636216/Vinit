"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlurInText from "@/components/motion/BlurInText";
import type { FaqItem } from "@/generated/prisma/client";

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-white/10 bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          ✳ FAQ
        </p>
        <BlurInText
          as="h2"
          text="Frequently Asked Questions"
          className="mb-10 font-display text-3xl font-extrabold uppercase leading-tight text-foreground md:text-4xl"
        />

        <div className="flex flex-col divide-y divide-white/10 rounded-lg border border-white/10 bg-surface">
          {items.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="px-5">
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {i + 1}. {item.question.toUpperCase()}
                  </span>
                  <span className="shrink-0 text-lg text-primary">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-sm leading-relaxed text-foreground/70">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
