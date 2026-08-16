import type { PartnerLogo } from "@/generated/prisma/client";

export default function TrustedBy({ logos }: { logos: PartnerLogo[] }) {
  if (logos.length === 0) return null;

  return (
    <section className="border-y border-white/10 bg-background py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 md:justify-between md:px-10">
        <p className="w-full shrink-0 text-center text-xs font-semibold uppercase tracking-widest text-muted md:w-auto md:text-left">
          Trusted by
          <br className="hidden md:block" /> leading brands
        </p>
        {logos.map((logo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={logo.id}
            src={logo.logoUrl}
            alt={logo.name}
            className="h-6 w-auto shrink-0 grayscale opacity-60 transition hover:opacity-100 hover:grayscale-0 md:h-7"
          />
        ))}
      </div>
    </section>
  );
}
