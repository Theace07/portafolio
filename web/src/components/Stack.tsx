"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useSite } from "@/lib/site-context";
import { sectionIds } from "@/lib/site";
import { SectionHead, SectionTitle } from "@/components/SectionHead";

export function Stack() {
  const { t } = useSite();
  const stack = t.stack;
  const [active, setActive] = useState(0);

  // Si al cambiar de idioma hubiera menos grupos, no dejamos un índice huérfano.
  useEffect(() => {
    if (active > stack.groups.length - 1) setActive(0);
  }, [active, stack.groups.length]);

  const group = stack.groups[active] ?? stack.groups[0];

  return (
    <section id={sectionIds.stack} className="pt-14 md:pt-[72px] lg:pt-24">
      <div className="px-5 md:px-10 lg:px-16">
        <SectionHead number="02" label={stack.section} hint={stack.hint} />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionTitle start={stack.titleStart} accent={stack.titleAccent} />

          <div
            role="tablist"
            aria-label={stack.section}
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-10 md:px-10 lg:mx-0 lg:flex-wrap lg:px-0 lg:pb-0"
          >
            {stack.groups.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  id={`stack-tab-${index}`}
                  aria-selected={selected}
                  aria-controls="stack-panel"
                  onClick={() => setActive(index)}
                  className={`h-11 shrink-0 cursor-pointer border px-4 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors lg:px-5 lg:tracking-[0.12em] ${
                    selected
                      ? "border-accent bg-accent text-accent-fg"
                      : "border-line text-muted hover:border-accent hover:text-fg"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        id="stack-panel"
        role="tabpanel"
        aria-labelledby={`stack-tab-${active}`}
        key={`${stack.section}-${active}`}
        className="stagger mt-6 grid gap-2.5 px-5 md:grid-cols-2 md:gap-3.5 md:px-10 lg:mt-7 lg:grid-cols-3 lg:gap-4 lg:px-16"
      >
        {group.items.map((tech, index) => (
          <article
            key={index}
            style={{ "--i": index } as CSSProperties}
            className="spotlight group border border-line-soft bg-surface-2 px-[18px] py-4 transition-[border-color,transform] duration-300 hover:-translate-y-[3px] hover:border-accent lg:px-[22px] lg:py-5"
          >
            <h3 className="flex items-center gap-2.5 text-base font-semibold lg:text-lg">
              <span
                className="block h-[7px] w-[7px] bg-aqua transition-transform duration-500 group-hover:rotate-45 group-hover:scale-125"
                aria-hidden
              />
              {tech.name}
            </h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-muted lg:text-sm">{tech.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
