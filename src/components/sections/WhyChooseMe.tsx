"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BlurInText from "@/components/motion/BlurInText";
import Reveal from "@/components/motion/Reveal";
import Pill from "@/components/ui/Pill";
import Rating from "@/components/ui/Rating";
import { staggerContainer, fadeUp } from "@/components/motion/variants";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import type { Testimonial } from "@/generated/prisma/client";

const STEPS = [
  {
    title: "Research",
    copy: "Conducting qualitative and quantitative research — interviews, surveys, usability testing — to uncover deep user insights.",
  },
  {
    title: "Prototype",
    copy: "Building detailed wireframes and interactive prototypes to visualize user flows and test concepts effectively.",
  },
  {
    title: "Visuals",
    copy: "Crafting intuitive interfaces with strong visual hierarchy, typography, and consistent design systems.",
  },
  {
    title: "Engage",
    copy: "Designing seamless interactions with optimal usability, accessibility, and responsiveness across devices.",
  },
];

export default function WhyChooseMe({ testimonials }: { testimonials: Testimonial[] }) {
  const avatars = testimonials.slice(0, 3);
  const [stepsRef, stepsInView] = useInViewOnce<HTMLDivElement>(0.3);

  return (
    <section className="relative border-t border-white/10 bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          ref={stepsRef}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={stepsInView ? "show" : "hidden"}
          className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              className="rounded-lg border border-white/10 bg-surface p-6 text-foreground"
            >
              <p className="mb-6 text-xs text-muted">/{step.title}</p>
              <p className="text-sm leading-relaxed text-foreground/80">{step.copy}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-xl">
            <Pill className="mb-5">Why Choose Me</Pill>
            <BlurInText
              as="h2"
              text="Focused on Design That Delivers Results"
              className="font-display text-4xl font-extrabold uppercase leading-[1.05] text-foreground md:text-5xl"
            />
          </div>

          {avatars.length > 0 && (
            <Reveal className="flex items-center gap-3 rounded-lg border border-white/10 bg-surface px-5 py-4">
              <div className="flex -space-x-3">
                {avatars.map((t) => (
                  <div
                    key={t.id}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-surface"
                  >
                    <Image
                      src={t.avatarUrl || "/placeholders/avatar.svg"}
                      alt={t.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <Rating value={5} />
                <p className="mt-0.5 text-xs font-semibold text-foreground">
                  1.2k+ Happy Clients
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
