"use client";

import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import type { ExperienceEntry, PartnerLogo } from "@/generated/prisma/client";

function formatRange(start: Date, end: Date | null) {
  const startYear = new Date(start).getFullYear();
  const endYear = end ? new Date(end).getFullYear() : "Present";
  return `${startYear}–${endYear}`;
}

export default function ExperienceTimeline({
  entries,
  logos,
}: {
  entries: ExperienceEntry[];
  logos: PartnerLogo[];
}) {
  if (entries.length === 0) return null;

  return (
    <section className="border-t border-white/10 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          ✳ Experience
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {entries.map((entry, i) => (
            <Reveal key={entry.id} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "sm:mt-10" : ""}>
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg border border-white/10">
                <Image
                  src={entry.photoUrl || "/placeholders/photo-1.svg"}
                  alt={entry.company}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                {entry.company}_[{formatRange(entry.startDate, entry.endDate)}]
              </p>
              <p className="text-sm text-muted">{entry.role}</p>
            </Reveal>
          ))}
        </div>

        {logos.length > 0 && (
          <div className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-5">
            {logos.map((logo, i) => (
              <div
                key={logo.id}
                className={`flex aspect-square items-center justify-center p-6 ${
                  i % 2 === 0 ? "bg-cream" : "bg-surface"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.logoUrl} alt={logo.name} className="h-8 w-auto opacity-70 grayscale" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
