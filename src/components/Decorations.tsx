export function BinderHoles({ side = "right" }: { side?: "left" | "right" }) {
  const sideClass = side === "left" ? "left-[-6px]" : "right-[-6px]";
  return (
    <div className={`absolute ${sideClass} top-0 bottom-0 z-30 flex flex-col justify-evenly py-12 pointer-events-none`}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="w-5 h-5 rounded-full border-2 border-gray-300/60"
          style={{ background: "radial-gradient(circle at 40% 40%, white 30%, #e0e0e0 100%)", boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.15)" }}
        />
      ))}
    </div>
  );
}

export function MusicNotes({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <span className="text-2xl" style={{ color: "oklch(0.6 0.2 200)" }}>♪</span>
      <span className="text-lg ml-1" style={{ color: "oklch(0.7 0.18 320)" }}>♫</span>
    </div>
  );
}

export function FlowerCluster({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="12" r="10" fill="oklch(0.92 0.06 90)" opacity="0.7" />
        <circle cx="14" cy="28" r="9" fill="oklch(0.88 0.08 350)" opacity="0.6" />
        <circle cx="34" cy="28" r="9" fill="oklch(0.85 0.1 180)" opacity="0.6" />
        <circle cx="24" cy="22" r="5" fill="oklch(0.95 0.04 60)" />
      </svg>
    </div>
  );
}

export function GemStone({ color = "oklch(0.7 0.15 230)", className = "" }: { color?: string; className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <polygon points="8,0 16,6 12,16 4,16 0,6" fill={color} opacity="0.7" />
        <polygon points="8,2 13,6 10,14 6,14 3,6" fill={color} opacity="0.9" />
        <polygon points="8,3 10,6 8,12 6,6" fill="white" opacity="0.3" />
      </svg>
    </div>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <span className={`pointer-events-none select-none text-xs ${className}`} style={{ color: "oklch(0.85 0.1 90)" }}>
      ✦
    </span>
  );
}

export function LaceEdge({ color = "oklch(0.75 0.12 140)" }: { color?: string }) {
  return (
    <svg viewBox="0 0 540 16" className="w-full h-4" preserveAspectRatio="none">
      {[...Array(27)].map((_, i) => {
        const x = 10 + i * 20;
        const y = 8;
        return (
          <g key={i} opacity="0.65">
            <circle cx={x} cy={y - 3.2} r="1.5" fill={color} />
            <circle cx={x + 3.2} cy={y} r="1.5" fill={color} />
            <circle cx={x} cy={y + 3.2} r="1.5" fill={color} />
            <circle cx={x - 3.2} cy={y} r="1.5" fill={color} />
            <circle cx={x} cy={y} r="0.9" fill="white" opacity="0.8" />
          </g>
        );
      })}
    </svg>
  );
}

export function CloverIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32">
        <ellipse cx="16" cy="10" rx="6" ry="7" fill="oklch(0.75 0.12 140)" opacity="0.6" />
        <ellipse cx="10" cy="18" rx="6" ry="7" fill="oklch(0.75 0.12 140)" opacity="0.5" transform="rotate(-30 10 18)" />
        <ellipse cx="22" cy="18" rx="6" ry="7" fill="oklch(0.75 0.12 140)" opacity="0.5" transform="rotate(30 22 18)" />
        <rect x="15" y="20" width="2" height="8" rx="1" fill="oklch(0.65 0.12 140)" opacity="0.5" />
      </svg>
    </div>
  );
}
