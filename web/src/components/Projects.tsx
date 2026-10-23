"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useSite } from "@/lib/site-context";
import { projectLinks, sectionIds, site } from "@/lib/site";
import { SectionHead, SectionTitle } from "@/components/SectionHead";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";

const pad = (index: number) => String(index + 1).padStart(2, "0");

export function Projects() {
  const { t } = useSite();
  const projects = t.projects;
  const total = Math.min(projects.items.length, projectLinks.length);
  const [active, setActive] = useState(0);

  const go = useCallback(
    (step: number) => setActive((current) => (current + step + total) % total),
    [total],
  );

  useEffect(() => {
    if (active > total - 1) setActive(0);
  }, [active, total]);

  const copy = projects.items[active] ?? projects.items[0];
  const link = projectLinks[active] ?? projectLinks[0];

  return (
    <section
      id={sectionIds.projects}
      className="px-5 pt-14 md:px-10 md:pt-[72px] lg:px-16 lg:pt-24"
    >
      <SectionHead
        number="04"
        label={projects.section}
        action={
          <a
            href={site.githubRepos}
            target="_blank"
            rel="noopener noreferrer"
            className="tag border-b border-accent-ring pb-0.5 text-accent transition-colors hover:border-accent-strong hover:text-accent-strong"
          >
            {projects.all} →
          </a>
        }
      />
      <SectionTitle start={projects.titleStart} accent={projects.titleAccent} />

      <div className="mt-6 grid items-start gap-6 lg:mt-9 lg:grid-cols-12 lg:gap-10">
        <a
          href={link.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${copy.name} — ${projects.cta}`}
          className="block min-w-0 overflow-hidden border border-line transition-colors hover:border-accent lg:col-span-7"
        >
          {link.image ? (
            <Image
              src={link.image}
              alt={copy.name}
              width={1280}
              height={720}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div className="hatch flex aspect-video items-center justify-center">
              <span className="tag text-faint">{projects.capture}</span>
            </div>
          )}
        </a>

        <div className="flex min-w-0 flex-col gap-4 lg:col-span-5 lg:gap-[18px] lg:pt-1">
          <div className="flex items-center justify-between gap-3">
            <span className="tag text-aqua">
              {pad(active)} / {pad(total - 1)}
            </span>
            <span className="tag text-right text-faint">{link.stack}</span>
          </div>

          <h3 className="font-serif text-[28px] leading-[1.12] md:text-[34px] lg:text-[40px] lg:leading-[1.08]">
            {copy.name}
          </h3>
          <p className="text-[15px] leading-[1.7] text-muted lg:text-base lg:leading-[1.75]">
            {copy.description}
          </p>

          <a
            href={link.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center justify-between bg-accent px-5 py-4 text-[15px] font-semibold text-accent-fg transition-colors hover:bg-accent-strong lg:px-6"
          >
            {projects.cta}
            <ArrowUpRight size={17} />
          </a>

          {link.demo ? (
            <a
              href={link.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-line px-5 py-4 text-[15px] font-semibold text-fg transition-colors hover:border-accent lg:px-6"
            >
              {t.actions.demo}
              <ArrowUpRight size={17} className="text-accent" />
            </a>
          ) : null}

          <div
            className={`mt-2 flex items-center justify-between gap-4 border-t border-line pt-4 lg:pt-[22px] ${
              total > 1 ? "" : "hidden"
            }`}
          >
            <div className="flex gap-1.5 lg:gap-2">
              {projects.items.slice(0, total).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`${projects.item} ${pad(index)}`}
                  aria-current={index === active}
                  className={`h-1 cursor-pointer transition-all duration-200 ${
                    index === active
                      ? "w-10 bg-accent lg:w-13"
                      : "w-6.5 bg-line hover:bg-muted lg:w-8.5"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={projects.previous}
                className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-fg transition-colors hover:border-accent hover:bg-accent-wash hover:text-accent"
              >
                <ArrowLeft size={17} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={projects.next}
                className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-fg transition-colors hover:border-accent hover:bg-accent-wash hover:text-accent"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
