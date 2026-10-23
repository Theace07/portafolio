"use client";

import Image from "next/image";
import { useSite } from "@/lib/site-context";
import { site, sectionIds } from "@/lib/site";
import { ArrowRight } from "@/components/icons";

export function Hero() {
  const { t } = useSite();
  const hero = t.hero;

  return (
    <section className="px-5 pt-9 md:px-10 md:pt-14 lg:px-16 lg:pt-[74px]">
      <p className="tag m-0 flex items-center gap-3 text-accent">
        <span className="block h-px w-8 bg-accent lg:w-11" aria-hidden />
        {hero.role} · {hero.place}
      </p>
      <h1 className="mt-4 max-w-[1180px] font-serif text-[38px] leading-[1.04] tracking-[-0.02em] text-balance md:text-[58px] md:leading-[1] lg:mt-6 lg:text-[84px] lg:leading-[0.98] lg:tracking-[-0.025em]">
        {site.name}
      </h1>

      <div className="mt-7 grid items-start gap-10 md:mt-10 lg:mt-14 lg:grid-cols-12">
        {/* El retrato es cuadrado: en tablet se limita el ancho para que el
            recorte no se coma la cabeza, y el encuadre se sube al rostro. */}
        <figure className="m-0 min-w-0 md:max-w-[440px] lg:col-span-5 lg:max-w-none">
          <div className="border border-line bg-surface-2 p-2 lg:p-2.5">
            {site.photo ? (
              <Image
                src={site.photo}
                alt={hero.photoAlt}
                width={1254}
                height={1254}
                priority
                sizes="(min-width: 1024px) 45vw, (min-width: 768px) 440px, 100vw"
                className="h-[340px] w-full object-cover object-[50%_18%] md:h-[420px] lg:h-[560px]"
              />
            ) : (
              <div className="hatch flex h-[340px] items-end p-4 md:h-[420px] lg:h-[560px] lg:p-5">
                <span className="tag text-faint">{hero.photoPlaceholder}</span>
              </div>
            )}
          </div>
          <figcaption className="mt-2.5 flex justify-between">
            <span className="tag text-faint">{hero.figure}</span>
            <span className="tag text-faint">{hero.place}</span>
          </figcaption>
        </figure>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-7 lg:gap-[30px]">
          <p className="max-w-[600px] font-serif text-xl italic leading-[1.5] text-fg-2 md:text-[23px] lg:text-[25px]">
            {hero.lede}
          </p>

          <dl className="m-0 grid border-b border-line sm:grid-cols-3 sm:border-t">
            {hero.stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-baseline justify-between gap-4 border-t border-line py-4 sm:block sm:py-5 sm:pr-6"
              >
                <dd className="m-0 font-serif text-[34px] leading-none lg:text-[46px]">
                  {stat.value}
                </dd>
                <dt className="tag text-right text-muted sm:mt-2 sm:text-left">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <a
              href={`#${sectionIds.projects}`}
              className="flex items-center justify-between gap-2.5 bg-accent px-6 py-4 text-[15px] font-semibold text-accent-fg transition-colors hover:bg-accent-strong sm:justify-start sm:px-7"
            >
              {hero.seeProjects}
              <ArrowRight />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-line px-6 py-4 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-line px-6 py-4 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
