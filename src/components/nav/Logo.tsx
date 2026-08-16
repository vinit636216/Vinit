import Link from "next/link";

export default function Logo({
  name,
  size = "md",
  className = "",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const initial = name.trim().charAt(0).toUpperCase();
  const sizes = {
    sm: { badge: "h-6 w-6 text-xs", text: "text-sm" },
    md: { badge: "h-8 w-8 text-sm", text: "text-lg" },
    lg: { badge: "h-9 w-9 text-base", text: "text-xl" },
  }[size];

  return (
    <Link href="/" data-cursor-hover className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`flex shrink-0 items-center justify-center rounded-md bg-primary font-display font-extrabold text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.1)] ${sizes.badge}`}
      >
        {initial}
      </span>
      <span className={`font-display font-bold text-foreground ${sizes.text}`}>{name}</span>
    </Link>
  );
}
