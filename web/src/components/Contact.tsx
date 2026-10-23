"use client";

import { useSite } from "@/lib/site-context";
import { sectionIds, site } from "@/lib/site";
import { mailtoHref } from "@/lib/mailto";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  const { t } = useSite();
  const contact = t.contact;
  const mailto = mailtoHref(contact.mailSubject, contact.mailBody);

  return (
    <section
      id={sectionIds.contact}
      className="px-5 pt-15 md:px-10 md:pt-20 lg:px-16 lg:pt-[110px]"
    >
      <Reveal className="spotlight grid items-center gap-8 border border-line bg-accent-wash px-[22px] py-7 md:px-9 md:py-10 lg:grid-cols-12 lg:gap-10 lg:px-15 lg:py-[66px]">
        <div className="lg:col-span-7">
          <p className="tag m-0 text-aqua">§ 05 · {contact.section}</p>
          <h2 className="mt-3.5 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.03em] md:text-[40px] lg:mt-4.5 lg:text-[52px] lg:leading-[1.06]">
            {contact.titleStart} <em className="text-accent not-italic">{contact.titleAccent}</em>{" "}
            {contact.titleEnd}
          </h2>
          <p className="mt-3 max-w-[480px] text-sm leading-[1.7] text-muted md:text-[15px] lg:mt-4.5 lg:text-base lg:leading-[1.75]">
            {contact.lede}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 lg:col-span-5 lg:gap-[11px]">
          <a
            href={mailto}
            className="shine group flex items-center justify-between gap-3 bg-accent px-[18px] py-4 text-sm font-semibold text-accent-fg transition-[background-color,transform] hover:bg-accent-strong active:scale-[0.98] lg:px-6 lg:py-[18px] lg:text-[15px]"
          >
            <span className="truncate">{site.email}</span>
            <ArrowRight size={17} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border border-line bg-bg/40 px-[18px] py-4 text-sm font-semibold text-fg transition-[border-color,transform] hover:border-accent active:scale-[0.98] lg:px-6 lg:py-[18px] lg:text-[15px]"
          >
            LinkedIn
            <ArrowUpRight
              size={17}
              className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border border-line bg-bg/40 px-[18px] py-4 text-sm font-semibold text-fg transition-[border-color,transform] hover:border-accent active:scale-[0.98] lg:px-6 lg:py-[18px] lg:text-[15px]"
          >
            GitHub
            <ArrowUpRight
              size={17}
              className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
