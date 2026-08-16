"use client";

import Image from "next/image";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import Rating from "@/components/ui/Rating";
import type { Stat, Testimonial } from "@/generated/prisma/client";

export default function AboutStats({
  stats,
  testimonials,
}: {
  stats: Stat[];
  testimonials: Testimonial[];
}) {
  const avatars = testimonials.slice(0, 4);

  return (
    <section className="border-t border-white/10 bg-cream py-16 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:flex-row md:items-center md:justify-between md:px-10">
        {avatars.length > 0 && (
          <Reveal preset="left" className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {avatars.map((t) => (
                <div key={t.id} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-cream">
                  <Image
                    src={t.avatarUrl || "/placeholders/avatar.svg"}
                    alt={t.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <Rating value={5} />
              <p className="text-xs font-semibold text-foreground">4K+ Trust Me</p>
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-3 gap-8">
          {stats.slice(0, 3).map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.1}>
              <p className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix ?? ""} />
              </p>
              <p className="mt-1 max-w-[10rem] text-xs text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
