"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import GridOverlay from "@/components/decor/GridOverlay";
import type { Profile, Project } from "@/generated/prisma/client";

export default function Hero({
  profile,
  featuredProject,
}: {
  profile: Profile;
  featuredProject: Project | null;
}) {
  return (
    <section className="relative h-[100svh] min-h-[680px] overflow-hidden bg-primary">
      <GridOverlay />

      {/* Ghost watermark name */}
      <motion.h1
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="pointer-events-none absolute left-1/2 top-[30%] w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[14vw] font-bold uppercase leading-none text-white/10 md:top-[26%] md:text-[8vw]"
      >
        {profile.role}
      </motion.h1>

      {/* Portrait, bleeding off the bottom edge */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 top-[38%] z-10 mx-auto w-[78%] max-w-3xl overflow-hidden md:inset-x-auto md:right-[6%] md:top-[30%] md:w-[50%]"
      >
        <div className="relative h-full w-full">
          <Image
            src={profile.heroPhotoUrl || "/placeholders/portrait.svg"}
            alt={profile.name}
            fill
            priority
            sizes="(min-width: 768px) 52vw, 78vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>

      {/* Tagline, below the fixed nav */}
      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute left-6 top-24 z-20 max-w-[230px] text-xs font-semibold uppercase leading-relaxed tracking-wide text-foreground/85 md:left-10 md:top-28"
      >
        {profile.tagline}
      </motion.p>

      {/* Floating polaroid project card */}
      {featuredProject && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute right-6 top-[38%] z-20 w-32 overflow-hidden rounded-lg border border-white/10 bg-surface shadow-2xl sm:top-[32%] sm:w-40 md:right-10"
        >
          <Link href={`/projects/${featuredProject.slug}`} data-cursor-hover>
            <div className="relative aspect-square">
              <Image
                src={featuredProject.coverImageUrl}
                alt={featuredProject.title}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <p className="flex items-center gap-1 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-foreground">
              ✳ {featuredProject.title}
              <span className="ml-auto font-normal text-muted">/{featuredProject.type}</span>
            </p>
          </Link>
        </motion.div>
      )}

      {/* Floating "Let's Talk" card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="absolute bottom-28 right-6 z-20 flex w-56 items-center gap-3 rounded-lg border border-white/10 bg-secondary/95 p-3 shadow-2xl backdrop-blur-sm md:bottom-32 md:right-10"
      >
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md">
          <Image
            src={profile.heroPhotoUrl || "/placeholders/avatar.svg"}
            alt={profile.name}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-foreground">{profile.name.split(" ")[0]}</p>
          <p className="truncate text-[11px] text-foreground/60">{profile.role}</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm text-foreground">
          ↗
        </span>
      </motion.div>

      {/* Bottom bar: copyright + giant name */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 md:px-10 md:pb-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-1 text-xs font-medium text-foreground/70"
        >
          © {profile.copyrightYear}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[16vw] font-bold uppercase leading-[0.85] text-foreground md:text-[7.5vw]"
        >
          {profile.displayName}
        </motion.h2>
      </div>
    </section>
  );
}
