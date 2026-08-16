"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FullscreenMenu from "./FullscreenMenu";
import Logo from "./Logo";

export default function Navbar({
  name = "Vinit V Balgum",
  overlay = false,
  projectsCount,
  servicesCount,
}: {
  name?: string;
  overlay?: boolean;
  projectsCount?: number;
  servicesCount?: number;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!overlay);
  const pathname = usePathname();

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  const solid = !overlay || scrolled;
  const linkClass = (active: boolean) =>
    `transition-colors hover:text-foreground ${
      active ? "text-foreground underline decoration-primary decoration-2 underline-offset-8" : ""
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid ? "border-b border-white/10 bg-background/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Logo name={name} size="sm" />

          <nav className="hidden items-center gap-9 text-sm font-medium text-foreground/80 md:flex">
            <Link href="/" data-cursor-hover className={linkClass(pathname === "/")}>
              Home
            </Link>
            <Link href="/about" data-cursor-hover className={linkClass(pathname === "/about")}>
              About
            </Link>
            {typeof projectsCount === "number" && (
              <Link href="/#work" data-cursor-hover className={linkClass(false)}>
                Work <span className="text-foreground/40">({projectsCount})</span>
              </Link>
            )}
            {typeof servicesCount === "number" && (
              <Link href="/#services" data-cursor-hover className={linkClass(false)}>
                Services <span className="text-foreground/40">({servicesCount})</span>
              </Link>
            )}
            <Link href="/blog" data-cursor-hover className={linkClass(pathname.startsWith("/blog"))}>
              Blog
            </Link>
            <Link href="/#contact" data-cursor-hover className={linkClass(false)}>
              Contact
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            data-cursor-hover
            className="flex h-10 w-11 flex-col items-center justify-center gap-1.5"
          >
            <span className="h-0.5 w-full rounded-full bg-foreground" />
            <span className="h-0.5 w-full rounded-full bg-foreground" />
          </button>
        </div>
      </header>

      <FullscreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
