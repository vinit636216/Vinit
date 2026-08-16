export default function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary ${className}`}
    >
      <span className="text-[10px]">✳</span>
      {children}
    </span>
  );
}
