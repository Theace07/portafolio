"use client";

import { useSite } from "@/lib/site-context";
import { sectionIds, site } from "@/lib/site";
import { mailtoHref } from "@/lib/mailto";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

export function Contact() {
  const { t } = useSite();
  const contact = t.contact;
  const mailto = mailtoHref(contact.mailSubject, contact.mailBody);

  return (
    <section
      id={sectionIds.contact}
      className="px-5 pt-15 md:px-10 md:pt-20 lg:px-16 lg:pt-[110px]"
    >
      <div className="grid items-center gap-8 border border-line bg-accent-wash px-[22px] py-7 md:px-9 md:py-10 lg:grid-cols-12 lg:gap-10 lg:px-15 lg:py-[66px]">
        <div className="lg:col-span-7">
          <p className="tag m-0 text-aqua">§ 05 · {contact.section}</p>
          <h2 className="mt-3.5 font-serif text-[30px] leading-[1.1] tracking-[-0.02em] md:text-[40px] lg:mt-4.5 lg:text-[52px] lg:leading-[1.06]">
            {contact.titleStart} <em className="text-accent">{contact.titleAccent}</em>{" "}
            {contact.titleEnd}
          </h2>
          <p className="mt-3 max-w-[480px] text-sm leading-[1.7] text-muted md:text-[15px] lg:mt-4.5 lg:text-base lg:leading-[1.75]">
            {contact.lede}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 lg:col-span-5 lg:gap-[11px]">
          <a
            href={mailto}
            className="flex items-center justify-between gap-3 bg-accent px-[18px] py-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-strong lg:px-6 lg:py-[18px] lg:text-[15px]"
          >
            <span className="truncate">{site.email}</span>
            <ArrowRight size={17} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border border-line px-[18px] py-4 text-sm font-semibold text-fg transition-colors hover:border-accent lg:px-6 lg:py-[18px] lg:text-[15px]"
          >
            LinkedIn
            <ArrowUpRight size={17} className="text-accent" />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border border-line px-[18px] py-4 text-sm font-semibold text-fg transition-colors hover:border-accent lg:px-6 lg:py-[18px] lg:text-[15px]"
          >
            GitHub
            <ArrowUpRight size={17} className="text-accent" />
          </a>
        </div>
      </div>
    </section>
  );
}
