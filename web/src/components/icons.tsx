type IconProps = { size?: number; className?: string };

function base(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
}

export function ArrowRight({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M5 12h13" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowLeft({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M19 12H6" />
      <path d="M12 5l-7 7 7 7" />
    </svg>
  );
}

export function ArrowUpRight({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowDown({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 4v13" />
      <path d="M6 12l6 6 6-6" />
    </svg>
  );
}

export function Sun({ size = 17, className }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={1.6}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2" />
      <path d="M12 19.3v2.2" />
      <path d="M4.2 4.2l1.6 1.6" />
      <path d="M18.2 18.2l1.6 1.6" />
      <path d="M2.5 12h2.2" />
      <path d="M19.3 12h2.2" />
      <path d="M4.2 19.8l1.6-1.6" />
      <path d="M18.2 5.8l1.6-1.6" />
    </svg>
  );
}

export function Moon({ size = 17, className }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={1.6}>
      <path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a6.6 6.6 0 0 0 9.5 9.5z" />
    </svg>
  );
}
