"use client";

import { motion } from "framer-motion";
import BlurInText from "@/components/motion/BlurInText";
import { staggerContainer, fadeUp } from "@/components/motion/variants";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import type { Achievement } from "@/generated/prisma/client";

export default function Achievements({ achievements }: { achievements: Achievement[] }) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.3);

  return (
    <section className="border-t border-white/10 bg-secondary py-20 text-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground">
          ✳ Honors &amp; Awards
        </span>
        <BlurInText
          as="h2"
          text="Achievements"
          className="mb-14 font-display text-5xl font-extrabold uppercase leading-none text-foreground md:text-7xl"
        />

        {achievements.length > 0 && (
          <motion.div
            ref={ref}
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {achievements.map((a) => (
              <motion.div key={a.id} variants={fadeUp} className="bg-secondary p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                  {a.year ?? ""}
                </p>
                <p className="font-display text-lg font-bold leading-snug">{a.title}</p>
                {a.issuer && <p className="mt-1 text-sm text-foreground/60">{a.issuer}</p>}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
