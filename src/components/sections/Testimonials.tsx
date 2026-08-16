"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import BlurInText from "@/components/motion/BlurInText";
import Pill from "@/components/ui/Pill";
import Rating from "@/components/ui/Rating";
import type { Testimonial } from "@/generated/prisma/client";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("init", onSelect);
  }, [emblaApi, onSelect]);

  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-white/10 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Pill className="mb-5">Testimonials</Pill>
        <BlurInText
          as="h2"
          text="What Clients Say"
          className="mb-12 font-display text-4xl font-extrabold uppercase leading-none text-foreground md:text-5xl"
        />

        <div className="touch-pan-y select-none overflow-hidden [-webkit-user-select:none]" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="min-w-[280px] flex-[0_0_85%] cursor-grab rounded-lg border border-white/10 bg-surface p-6 transition-opacity duration-300 active:cursor-grabbing sm:flex-[0_0_45%] lg:flex-[0_0_31%]"
                style={{ opacity: i === selected ? 1 : 0.5 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <Rating value={t.rating} />
                  <span className="text-lg text-muted">+</span>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-foreground/75">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full">
                    <Image
                      src={t.avatarUrl || "/placeholders/avatar.svg"}
                      alt={t.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
