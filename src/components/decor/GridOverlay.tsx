function Cross({ x, y }: { x: string; y: string }) {
  return (
    <span
      className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white/40"
      style={{ left: x, top: y }}
      aria-hidden
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
    </span>
  );
}

export default function GridOverlay() {
  const vLines = ["14%", "86%"];
  const hLines = ["18%", "82%"];

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {vLines.map((x) => (
        <span key={x} className="absolute inset-y-0 w-px bg-white/10" style={{ left: x }} />
      ))}
      {hLines.map((y) => (
        <span key={y} className="absolute inset-x-0 h-px bg-white/10" style={{ top: y }} />
      ))}
      {vLines.map((x) => hLines.map((y) => <Cross key={`${x}-${y}`} x={x} y={y} />))}
    </div>
  );
}
