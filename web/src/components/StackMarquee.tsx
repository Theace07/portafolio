"use client";

import { Fragment } from "react";
import { useSite } from "@/lib/site-context";

/**
 * Cinta infinita con todas las tecnologías del stack. La lista va dos veces
 * seguidas y se desplaza la mitad de su ancho, así el bucle no tiene costura.
 * Es decorativa: el stack ya se lee completo en su sección.
 */
export function StackMarquee() {
  const { t } = useSite();
  const names = t.stack.groups.flatMap((group) => group.items.map((item) => item.name));

  const row = (copy: number) => (
    <ul className="m-0 flex shrink-0 list-none items-center p-0">
      {names.map((name, index) => (
        <Fragment key={`${copy}-${index}`}>
          <li className={index % 2 ? "gradient-text" : "text-fg"}>{name}</li>
          <li className="px-6 text-[0.5em] text-accent lg:px-9">✦</li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden
      className="marquee mt-14 border-y border-line py-5 font-display text-[26px] font-bold uppercase tracking-[-0.02em] md:mt-[72px] md:text-[34px] lg:mt-24 lg:py-7 lg:text-[44px]"
    >
      <div className="marquee-inner flex w-max">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
