"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "@/components/nav/Logo";
import { ADMIN_NAV_GROUPS } from "./adminNav";

export default function AdminMobileNav({
  userName,
  logout,
}: {
  userName: string;
  logout: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-surface px-4 py-3 md:hidden">
      <Logo name="Vinit V Balgum" size="sm" />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex w-72 flex-col bg-surface p-0">
          <SheetHeader className="border-b border-white/10">
            <SheetTitle>Admin Menu</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-4">
            {ADMIN_NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-1.5 text-sm text-foreground/80 transition hover:bg-background hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="border-t border-white/10 p-5">
            <p className="mb-2 truncate text-xs text-muted">{userName}</p>
            <form action={logout}>
              <Button type="submit" variant="outline" className="w-full">
                Log out
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
