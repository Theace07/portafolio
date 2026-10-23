"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "@/lib/motion";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789#%&*+<>/=";

// Se respeta la caja de cada letra para que el ancho del texto apenas cambie
// mientras se descifra y el título no salte de línea.
function glyphFor(char: string) {
  const pool =
    char >= "A" && char <= "Z" ? UPPER : char >= "a" && char <= "z" ? LOWER : DIGITS;
  return pool[(Math.random() * pool.length) | 0];
}

type ScrambleProps = {
  text: string;
  className?: string;
  /** Duración total del efecto, en milisegundos. */
  duration?: number;
  delay?: number;
};

/**
 * Texto que se «descifra» de izquierda a derecha la primera vez que se ve.
 * El servidor pinta el texto final, y los lectores de pantalla leen siempre
 * el texto real, nunca los caracteres intermedios.
 */
export function Scramble({ text, className, duration = 1100, delay = 0 }: ScrambleProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({ rootMargin: "0px" });
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) {
      setOutput(text);
      return;
    }
    const chars = [...text];
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now + delay;
      const progress = Math.max(0, Math.min(1, (now - start) / duration));
      setOutput(
        chars
          .map((char, index) => {
            if (char === " " || char === ".") return char;
            // Cada letra se fija en su turno; las de la derecha esperan más.
            const settleAt = 0.25 + (index / chars.length) * 0.75;
            return progress >= settleAt ? char : glyphFor(char);
          })
          .join(""),
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, text, duration, delay]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{output}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
