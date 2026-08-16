"use client";

import Link from "next/link";
import { useActionState } from "react";
import { subscribeNewsletter, type NewsletterFormState } from "@/actions/newsletter";
import Logo from "@/components/nav/Logo";
import type { Profile } from "@/generated/prisma/client";

const initialState: NewsletterFormState = { status: "idle" };

export default function Footer({ profile }: { profile: Profile }) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  const socials = [
    { label: "Instagram", href: profile.instagramUrl },
    { label: "Behance", href: profile.behanceUrl },
    { label: "LinkedIn", href: profile.linkedinUrl },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo name={profile.name} size="md" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/60">
              Crafting intuitive, user-centered UI/UX design — from research and wireframes to
              polished, pixel-perfect interfaces.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-foreground/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Connect
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-foreground/70">
              <li>
                <a href={`mailto:${profile.email}`} className="transition-colors hover:text-foreground">
                  {profile.email}
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                  >
                    {s.label} <span className="text-xs text-muted">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Stay Updated
            </p>
            <p className="mb-4 text-sm text-foreground/60">
              Occasional notes on new projects and design work. No spam.
            </p>
            {state.status === "success" ? (
              <p className="text-sm text-foreground/70">{state.message}</p>
            ) : (
              <form action={formAction} className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full min-w-0 rounded-lg border border-white/15 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={pending}
                  aria-label="Subscribe"
                  className="flex shrink-0 items-center justify-center rounded-lg bg-primary px-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary-dark disabled:opacity-60"
                >
                  {pending ? "…" : "→"}
                </button>
              </form>
            )}
            {state.status === "error" && (
              <p className="mt-2 text-xs text-primary">{state.message}</p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-muted">
            © {profile.copyrightYear} {profile.name}. All rights reserved.
          </p>
          <p className="font-display text-2xl font-bold text-foreground/90 md:text-3xl">
            {profile.name.split(" ")[0]}
          </p>
        </div>
      </div>
    </footer>
  );
}
