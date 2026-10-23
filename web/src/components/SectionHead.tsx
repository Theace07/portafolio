"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/motion";

type SectionHeadProps = {
  number: string;
  label: string;
  hint?: string;
  /** Enlace opcional a la derecha (por ejemplo, «Todos en GitHub»). */
  action?: ReactNode;
};

export function SectionHead({ number, label, hint, action }: SectionHeadProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  // La línea superior es un pseudo-elemento (.section-head) que se dibuja al entrar.
  return (
    <div
      ref={ref}
      data-shown={inView || undefined}
      className="section-head flex flex-wrap items-baseline gap-x-4 gap-y-2 pt-4 lg:gap-5 lg:pt-5"
    >
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

/** Parte el texto en palabras enmascaradas que suben una tras otra. */
function Words({ text, from }: { text: string; from: number }) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word, index) => (
      <span key={index}>
        {index > 0 ? " " : null}
        <span className="w">
          <span style={{ "--i": from + index } as CSSProperties}>{word}</span>
        </span>
      </span>
    ));
}

export function SectionTitle({ start, accent, end, className = "" }: SectionTitleProps) {
  const [ref, inView] = useInView<HTMLHeadingElement>();
  const startCount = start.split(" ").filter(Boolean).length;
  const accentCount = accent.split(" ").filter(Boolean).length;

  return (
    <h2
      ref={ref}
      data-shown={inView || undefined}
      className={`words mt-4 font-display text-[30px] font-bold leading-[1.1] tracking-[-0.03em] md:text-[38px] lg:mt-6 lg:text-[46px] ${className}`}
    >
      <Words text={start} from={0} />{" "}
      <em className="ink text-accent not-italic">
        <Words text={accent} from={startCount} />
      </em>
      {end ? (
        <>
          {" "}
          <Words text={end} from={startCount + accentCount} />
        </>
      ) : null}
    </h2>
  );
}
