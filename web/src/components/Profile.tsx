"use client";

import { useSite } from "@/lib/site-context";
import { sectionIds } from "@/lib/site";
import { SectionHead, SectionTitle } from "@/components/SectionHead";
import { Reveal } from "@/components/motion/Reveal";

export function Profile() {
  const { t } = useSite();
  const profile = t.profile;

  return (
    <section id={sectionIds.profile} className="px-5 pt-14 md:px-10 md:pt-[72px] lg:px-16 lg:pt-24">
      <SectionHead number="01" label={profile.section} />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionTitle start={profile.titleStart} accent={profile.titleAccent} />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-7 lg:mt-[34px] lg:gap-5">
          <Reveal as="p" className="text-base leading-[1.75] text-fg-2 md:text-[17px] lg:text-lg">
            {profile.paragraphs[0]}
          </Reveal>
          <Reveal as="p" delay={120} className="text-[15px] leading-[1.8] text-muted lg:text-base">
            {profile.paragraphs[1]}
          </Reveal>

          <dl className="m-0 mt-3 grid gap-x-10 sm:grid-cols-2 lg:gap-x-[52px]">
            {profile.meta.map((row, index) => (
              <Reveal
                key={index}
                delay={200 + index * 70}
                className="group flex justify-between gap-3 border-t border-line py-3.5 font-mono text-[11px] transition-colors hover:border-accent lg:text-xs"
              >
                <dt className="text-faint">{row.key}</dt>
                <dd className="m-0 text-right transition-colors group-hover:text-accent">{row.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
