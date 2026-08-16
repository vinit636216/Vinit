"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BlurInText from "@/components/motion/BlurInText";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import Pill from "@/components/ui/Pill";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import type { Profile, Stat } from "@/generated/prisma/client";

export default function ImpactStats({ profile, stats }: { profile: Profile; stats: Stat[] }) {
  const [photoRef, photoInView] = useInViewOnce<HTMLDivElement>(0.3);

  return (
    <section className="border-t border-white/10 bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:px-10">
        <div>
          <Pill className="mb-5">Better Digital Journeys</Pill>
          <BlurInText
            as="h2"
            text="My Impact Through User Experience"
            className="max-w-lg font-display text-4xl font-extrabold uppercase leading-[1.05] text-foreground md:text-5xl"
          />

          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            whileHover={{ filter: "blur(2px)", scale: 1.04 }}
            animate={photoInView ? { opacity: 1, scale: 1, rotate: -3 } : { opacity: 0, scale: 0.8, rotate: -6 }}
            transition={{ duration: photoInView ? 0.9 : 0.5, delay: photoInView ? 0.2 : 0 }}
            className="relative mt-10 hidden aspect-[4/5] w-40 overflow-hidden rounded-lg border border-white/10 shadow-lg sm:block"
          >
            <Image
              src={profile.heroPhotoUrl || "/placeholders/photo-2.svg"}
              alt={profile.name}
              fill
              sizes="160px"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="flex flex-col justify-center gap-8">
          <p className="max-w-md text-foreground/75">
            Hi, I&apos;m {profile.name.split(" ")[0]}, a {profile.role} passionate about creating
            intuitive and visually engaging digital experiences.
          </p>

          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <Reveal key={stat.id} delay={i * 0.1}>
                <p className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix ?? ""} />
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-muted">
                  ✳ {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
