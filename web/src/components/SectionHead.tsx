import type { ReactNode } from "react";

type SectionHeadProps = {
  number: string;
  label: string;
  hint?: string;
  /** Enlace opcional a la derecha (por ejemplo, «Todos en GitHub»). */
  action?: ReactNode;
};

export function SectionHead({ number, label, hint, action }: SectionHeadProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-line pt-4 lg:gap-5 lg:pt-5">
      <span className="tag text-aqua">§ {number}</span>
      <span className="tag text-muted">{label}</span>
      <span className="grow" />
      {hint ? <span className="tag hidden text-faint sm:inline">{hint}</span> : null}
      {action}
    </div>
  );
}

type SectionTitleProps = {
  start: string;
  accent: string;
  end?: string;
  className?: string;
};

export function SectionTitle({ start, accent, end, className = "" }: SectionTitleProps) {
  return (
    <h2
      className={`mt-4 font-serif text-[32px] leading-[1.1] tracking-[-0.02em] md:text-[38px] lg:mt-6 lg:text-[46px] ${className}`}
    >
      {start} <em className="text-accent">{accent}</em>
      {end ? ` ${end}` : null}
    </h2>
  );
}
