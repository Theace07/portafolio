"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useSite } from "@/lib/site-context";
import { sectionIds } from "@/lib/site";
import { SectionHead, SectionTitle } from "@/components/SectionHead";
import { ArrowLeft, ArrowRight } from "@/components/icons";

export function Timeline() {
  const { t } = useSite();
  const timeline = t.timeline;
  const total = timeline.milestones.length;
  const [active, setActive] = useState(total - 1);

  useEffect(() => {
    if (active > total - 1) setActive(total - 1);
  }, [active, total]);

  const current = timeline.milestones[active] ?? timeline.milestones[0];
  // Los nodos se reparten en columnas iguales y el punto se dibuja al inicio
  // de cada columna, así que el relleno avanza un ancho de columna por hito.
  const fill = `${(active * 100) / total}%`;

  return (
    <section id={sectionIds.timeline} className="pt-14 md:pt-[72px] lg:pt-24">
      <div className="px-5 md:px-10 lg:px-16">
        <SectionHead number="03" label={timeline.section} hint={timeline.hint} />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            start={timeline.titleStart}
            accent={timeline.titleAccent}
            end={timeline.titleEnd}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActive((current) => (current - 1 + total) % total)}
              aria-label={timeline.previous}
              title={timeline.previous}
              className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-fg transition-colors hover:border-accent hover:bg-accent-wash hover:text-accent"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => setActive((current) => (current + 1) % total)}
              aria-label={timeline.next}
              title={timeline.next}
              className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-fg transition-colors hover:border-accent hover:bg-accent-wash hover:text-accent"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 px-5 md:px-10 lg:mt-[34px] lg:px-16">
        <div className="relative pr-1 lg:pr-0">
          {/* La línea acaba en el último punto: una columna menos que el total. */}
          <div
            className="absolute top-[7px] left-0 h-px bg-line"
            style={{ right: `${100 / total}%` }}
            aria-hidden
          />
          <div
            className="absolute top-1.5 left-0 h-[3px] bg-gradient-to-r from-aqua to-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: fill }}
            aria-hidden
          />
          <ol
            className="relative m-0 grid list-none p-0"
            style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
            aria-label={timeline.section}
          >
            {timeline.milestones.map((milestone, index) => {
              const selected = index === active;
              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-current={selected ? "step" : undefined}
                    className={`group flex min-h-11 w-full cursor-pointer flex-col gap-2 pr-2 text-left transition-colors lg:gap-3 lg:pr-4 ${
                      selected ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    <span
                      className={`block h-[15px] w-[15px] rounded-full border transition-all duration-200 ${
                        selected
                          ? "scale-105 border-accent bg-accent shadow-[0_0_0_6px_var(--accent-ring)]"
                          : "border-line bg-bg group-hover:border-accent"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`font-mono text-[13px] md:text-base lg:text-[19px] ${
                        selected ? "text-accent" : ""
                      }`}
                    >
                      {milestone.year}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-faint md:tracking-[0.12em] lg:text-[10px] lg:tracking-[0.14em]">
                      {milestone.org}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="px-5 md:px-10 lg:px-16">
        <article
          key={active}
          className="spotlight mt-6 border border-line bg-surface-2 px-[22px] py-6 md:px-8 md:py-7 lg:mt-[46px] lg:grid lg:grid-cols-12 lg:gap-10 lg:px-11 lg:py-10">
          <div className="swap-in lg:col-span-5">
            <p className="tag m-0 text-accent">{current.period}</p>
            <h3 className="mt-2.5 font-display text-[27px] font-bold tracking-[-0.02em] leading-[1.12] md:text-[32px] lg:mt-3.5 lg:text-[38px] lg:leading-[1.1]">
              {current.role}
            </h3>
            <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted lg:mt-3 lg:text-[11px]">
              {current.place}
            </p>
            <ul className="m-0 mt-4 hidden list-none flex-wrap gap-2 p-0 lg:mt-[22px] lg:flex">
              {current.tech.map((item, index) => (
                <li
                  key={index}
                  className="border border-line px-3 py-1.5 font-mono text-[11px] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="swap-in lg:col-span-7" style={{ animationDelay: "90ms" }}>
            <p className="mt-4 text-[15px] leading-[1.75] text-fg-2 md:text-base lg:mt-0 lg:text-[17px]">
              {current.description}
            </p>
            <ul className="stagger m-0 mt-4 flex list-none flex-col gap-3 p-0 lg:mt-[18px] lg:gap-[18px]">
              {current.achievements.map((item, index) => (
                <li
                  key={index}
                  style={{ "--i": index + 2 } as CSSProperties}
                  className="flex items-start gap-3 lg:gap-3.5"
                >
                  <span className="mt-2 block h-[7px] w-[7px] shrink-0 bg-aqua" aria-hidden />
                  <span className="text-[15px] leading-[1.65] text-fg-2 lg:text-base lg:leading-[1.7]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="m-0 mt-[18px] flex list-none flex-wrap gap-2 p-0 lg:hidden">
              {current.tech.map((item, index) => (
                <li
                  key={index}
                  className="border border-line px-[11px] py-1.5 font-mono text-[11px] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
