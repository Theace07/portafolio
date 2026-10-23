"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/lib/motion";

type RevealProps = {
  as?: ElementType;
  /** Retraso en milisegundos, para escalonar elementos vecinos. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string;
};

/** Sube y aparece la primera vez que entra en pantalla. */
export function Reveal({ as: Tag = "div", delay = 0, className, style, children, id }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal="rise"
      data-shown={inView || undefined}
      className={className}
      style={{ "--delay": `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
