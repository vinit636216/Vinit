"use client";

import Image from "next/image";
import ShutterReveal from "@/components/motion/ShutterReveal";
import Reveal from "@/components/motion/Reveal";
import type { Profile } from "@/generated/prisma/client";

export default function AboutHero({ profile }: { profile: Profile }) {
  const photos = profile.aboutPhotoUrls.length > 0
    ? profile.aboutPhotoUrls
    : ["/placeholders/photo-1.svg", "/placeholders/photo-2.svg", "/placeholders/photo-3.svg", "/placeholders/portrait.svg"];

  return (
    <section className="bg-background pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="mb-4 font-display text-sm font-bold text-foreground">{profile.name}</p>

        <ShutterReveal
          text="About Us"
          as="h1"
          className="mb-14 font-display text-6xl font-extrabold uppercase leading-none text-foreground md:text-8xl"
          panelClassName="bg-background"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {photos.slice(0, 4).map((src, i) => (
            <Reveal
              key={src + i}
              preset="scale"
              delay={i * 0.1}
              className="relative aspect-[3/4] overflow-hidden rounded-lg border border-white/10"
            >
              <Image src={src} alt={`${profile.name} ${i + 1}`} fill sizes="25vw" className="object-cover" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
