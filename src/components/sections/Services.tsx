"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import type { Service } from "@/generated/prisma/client";

export default function Services({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="border-t border-white/10 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="mb-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          ✳ Services
        </p>

        <div className="flex flex-col divide-y divide-white/10">
          {services.map((service) => (
            <Reveal
              key={service.id}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-10"
            >
              <span className="font-display text-sm font-bold text-muted">
                {String(service.number).padStart(3, "0")}
              </span>

              <h3 className="font-display text-3xl font-extrabold uppercase leading-none text-foreground md:text-4xl">
                {service.title}
              </h3>

              <div className="flex items-center gap-6">
                {service.imageUrl && (
                  <div className="relative hidden h-20 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 sm:block">
                    <Image src={service.imageUrl} alt={service.title} fill sizes="96px" className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="mb-3 text-sm text-foreground/65">{service.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {service.projectUrl && (
                    <Button asChild data-cursor-hover>
                      <Link href={service.projectUrl}>View Project ↗</Link>
                    </Button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
