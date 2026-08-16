"use client";

import { useActionState } from "react";
import Pill from "@/components/ui/Pill";
import { Button } from "@/components/ui/button";
import { submitContactForm, type ContactFormState } from "@/actions/contact";

const initialState: ContactFormState = { status: "idle" };

export default function Contact() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <section id="contact" className="border-t border-white/10 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-white/10 md:grid-cols-2">
          <div className="bg-surface p-6 sm:p-8 md:p-12">
          <h3 className="mb-6 font-display text-2xl font-extrabold text-foreground">
            Reach Out to Me
          </h3>

          {state.status === "success" ? (
            <p className="rounded-lg border border-white/10 bg-background px-4 py-6 text-sm text-foreground">
              {state.message}
            </p>
          ) : (
            <form action={formAction} className="flex flex-col gap-4">
              {/* Honeypot — hidden from real users, bots tend to fill every field. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="mb-1 block text-xs font-medium text-foreground/80">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  className="w-full rounded-lg border border-white/15 bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-xs font-medium text-foreground/80">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full rounded-lg border border-white/15 bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-xs font-medium text-foreground/80">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Your message"
                  className="w-full rounded-lg border border-white/15 bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              {state.status === "error" && (
                <p className="text-xs text-primary">{state.message}</p>
              )}

              <Button
                type="submit"
                disabled={pending}
                className="mt-2 h-12 w-full justify-center rounded-lg text-sm font-semibold"
              >
                {pending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        <div
          className="relative flex min-h-[280px] flex-col justify-end bg-cover bg-center p-6 text-foreground sm:p-8 md:min-h-[320px] md:p-12"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(193,18,31,0.92), rgba(10,10,10,0.92)), url(/placeholders/wide-1.svg)",
          }}
        >
          <Pill className="mb-4 w-fit bg-black/30 text-foreground">Design Insights</Pill>
          <h3 className="font-display text-3xl font-extrabold uppercase leading-none md:text-4xl">
            Let&apos;s Create
            <br /> Together
          </h3>
          <p className="mt-3 max-w-xs text-sm text-foreground/80">
            Refining the design through feedback and testing to ensure the best user experience.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
