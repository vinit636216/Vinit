"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BlurInText from "@/components/motion/BlurInText";
import Pill from "@/components/ui/Pill";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import type { Project } from "@/generated/prisma/client";

function ProjectCard({ project, offset }: { project: Project; offset: boolean }) {
  const [ref, revealed] = useInViewOnce<HTMLDivElement>(0.3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: revealed ? 0.9 : 0.5, ease: revealed ? [0.22, 1, 0.36, 1] : [0.4, 0, 1, 1] }}
      className={offset ? "sm:mt-10" : ""}
    >
      <Link
        href={`/projects/${project.slug}`}
        data-cursor-hover
        className="group relative block overflow-hidden rounded-lg border border-white/10"
      >
        <div className="relative aspect-[4/5]">
          <Image
            src={project.coverImageUrl}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center justify-between px-4 py-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
              ✳ {project.title}
            </span>
            {project.type && <span className="text-xs text-foreground/70">/{project.type}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="border-t border-white/10 bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Pill className="mb-5">Portfolio</Pill>
        <BlurInText
          as="h2"
          text="Our Projects."
          className="mb-12 font-display text-4xl font-extrabold uppercase leading-none text-foreground md:text-6xl"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} offset={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
