"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type TypewriterProps = {
  words: readonly string[];
  /** Pausa con la palabra completa antes de borrarla, en ms. */
  hold?: number;
};

/**
 * Escribe y borra las palabras una tras otra, como en una terminal.
 * Los lectores de pantalla oyen solo la primera, entera y una sola vez.
 */
export function Typewriter({ words, hold = 2200 }: TypewriterProps) {
  const key = words.join("|");
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    const list = key.split("|");
    setText(list[0]);
    if (list.length < 2 || prefersReducedMotion()) return;

    let index = 0;
    let length = list[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const word = list[index];
      if (deleting) {
        if (length > 0) {
          setText(word.slice(0, --length));
          timer = setTimeout(step, 26);
        } else {
          deleting = false;
          index = (index + 1) % list.length;
          timer = setTimeout(step, 280);
        }
      } else if (length < list[index].length) {
        setText(list[index].slice(0, ++length));
        // Un poco de irregularidad: nadie teclea a ritmo de metrónomo.
        timer = setTimeout(step, 45 + Math.random() * 55);
      } else {
        deleting = true;
        timer = setTimeout(step, hold);
      }
    };

    timer = setTimeout(step, hold + 1200);
    return () => clearTimeout(timer);
  }, [key, hold]);

  return (
    <>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden>{text}</span>
    </>
  );
}
