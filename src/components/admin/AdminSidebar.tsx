import Link from "next/link";
import Logo from "@/components/nav/Logo";
import { ADMIN_NAV_GROUPS } from "./adminNav";

export default function AdminSidebar({
  userName,
  logout,
}: {
  userName: string;
  logout: () => Promise<void>;
}) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-white/10 bg-surface px-5 py-8 md:flex">
      <div>
        <Logo name="Vinit V Balgum" size="sm" className="mb-8" />
        <nav className="flex flex-col gap-6">
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
      </div>

      <div className="border-t border-white/10 pt-4">
        <p className="mb-2 truncate text-xs text-muted">{userName}</p>
        <form action={logout}>
          <button
            type="submit"
            className="w-full rounded-lg border border-white/15 py-1.5 text-sm font-medium text-foreground/80 transition hover:border-primary hover:text-primary"
          >
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
