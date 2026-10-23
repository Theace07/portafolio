"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useSite } from "@/lib/site-context";
import { site, sectionIds } from "@/lib/site";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Scramble } from "@/components/motion/Scramble";
import { DotField } from "@/components/motion/DotField";
import { Typewriter } from "@/components/motion/Typewriter";

/** Retraso de entrada de cada bloque del hero, en milisegundos. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const { t } = useSite();
  const hero = t.hero;

  return (
    <section className="relative isolate px-5 pt-9 md:px-10 md:pt-14 lg:px-16 lg:pt-[74px]">
      <div className="aura" aria-hidden />
      <DotField />

      <p className="tag intro m-0 flex items-center gap-3 text-accent" style={delay(0)}>
        <span className="grow-x block h-px w-8 bg-accent lg:w-11" style={delay(150)} aria-hidden />
        {/* En móvil el rol puede ocupar una o dos líneas según la frase:
            se reservan dos para que el nombre no salte mientras se escribe. */}
        <span className="min-h-[2lh] content-center md:min-h-0">
          {hero.place} · <Typewriter words={hero.roles} />
          <span className="caret" aria-hidden />
        </span>
      </p>
      <h1
        className="intro mt-4 max-w-[1180px] font-display text-[34px] font-bold leading-[1.04] tracking-[-0.03em] text-balance md:text-[52px] md:leading-[1] lg:mt-6 lg:text-[76px] lg:leading-[0.98] lg:tracking-[-0.035em]"
        style={delay(120)}
      >
        <Scramble text={site.name} duration={1300} delay={150} />
      </h1>

      <div className="mt-7 grid items-start gap-10 md:mt-10 lg:mt-14 lg:grid-cols-12">
        {/* El retrato es cuadrado: en tablet se limita el ancho para que el
            recorte no se coma la cabeza, y el encuadre se sube al rostro. */}
        <figure className="m-0 min-w-0 md:max-w-[440px] lg:col-span-5 lg:max-w-none">
          <div className="group border border-line bg-surface-2 p-2 lg:p-2.5">
            <div className="unveil overflow-hidden" style={delay(300)}>
              {site.photo ? (
                <Image
                  src={site.photo}
                  alt={hero.photoAlt}
                  width={1254}
                  height={1254}
                  priority
                  sizes="(min-width: 1024px) 45vw, (min-width: 768px) 440px, 100vw"
                  className="h-[340px] w-full object-cover object-[50%_18%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] md:h-[420px] lg:h-[560px]"
                />
              ) : (
                <div className="hatch flex h-[340px] items-end p-4 md:h-[420px] lg:h-[560px] lg:p-5">
                  <span className="tag text-faint">{hero.photoPlaceholder}</span>
                </div>
              )}
            </div>
          </div>
          <figcaption className="intro mt-2.5 flex justify-between" style={delay(900)}>
            <span className="tag text-faint">{hero.figure}</span>
            <span className="tag text-faint">{hero.place}</span>
          </figcaption>
        </figure>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-7 lg:gap-[30px]">
          <p
            className="intro max-w-[600px] text-lg font-medium leading-[1.6] text-fg-2 md:text-xl lg:text-[22px]"
            style={delay(450)}
          >
            {hero.lede}
          </p>

          <dl className="m-0 grid border-b border-line sm:grid-cols-3 sm:border-t">
            {hero.stats.map((stat, index) => (
              <div
                key={index}
                className="intro flex items-baseline justify-between gap-4 border-t border-line py-4 sm:block sm:py-5 sm:pr-6"
                style={delay(600 + index * 110)}
              >
                <dd className="m-0 font-display text-[34px] font-bold leading-none tracking-[-0.02em] lg:text-[46px]">
                  <Scramble text={stat.value} duration={700} delay={700 + index * 110} />
                </dd>
                <dt className="tag text-right text-muted sm:mt-2 sm:text-left">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <div
            className="intro flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3"
            style={delay(900)}
          >
            <a
              href={`#${sectionIds.projects}`}
              className="shine group flex items-center justify-between gap-2.5 bg-accent px-6 py-4 text-[15px] font-semibold text-accent-fg transition-[background-color,transform] hover:bg-accent-strong active:scale-[0.98] sm:justify-start sm:px-7"
            >
              {hero.seeProjects}
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            {[
              { label: "GitHub", href: site.github },
              { label: "LinkedIn", href: site.linkedin },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 border border-line px-6 py-4 text-sm font-semibold text-fg transition-[border-color,color,transform] hover:border-accent hover:text-accent active:scale-[0.98]"
              >
                {link.label}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
