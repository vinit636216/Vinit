export default function Rating({ value = 5, className = "" }: { value?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 text-primary ${className}`} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5"
          fill={i < value ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={i < value ? 0 : 1.2}
        >
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
