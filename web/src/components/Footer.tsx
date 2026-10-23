"use client";

import { useSite } from "@/lib/site-context";
import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";

export function Footer() {
  const { t, lang } = useSite();
  const year = new Date().getFullYear();

  // Todos abren en una pestaña nueva, para no sacar al visitante del portafolio.
  const links = [
    { label: "LinkedIn", href: site.linkedin },
    { label: "GitHub", href: site.github },
    { label: t.actions.cvShort, href: site.cv[lang].href },
  ];

  return (
    <footer className="mt-14 border-t border-line px-5 pt-7 md:mt-[72px] md:px-10 lg:mt-24 lg:px-16 lg:pt-10">
      <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div>
          <p className="m-0 font-display text-[22px] font-bold tracking-[-0.02em] md:text-2xl lg:text-[26px]">{site.name}</p>
          <p className="m-0 mt-2 font-mono text-[11px] text-muted lg:text-xs">{site.phone}</p>
          <p className="m-0 mt-1.5 font-mono text-[11px] text-muted lg:text-xs">
            {t.hero.place} · {t.footer.remote}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] lg:gap-7 lg:text-xs">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-accent-ring pb-0.5 text-accent transition-colors hover:border-accent-strong hover:text-accent-strong"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Reveal>

      <p className="m-0 py-8 font-mono text-[10px] uppercase tracking-[0.12em] text-faint lg:pt-9 lg:pb-10 lg:text-[11px]">
        © {year} {site.name} — {t.footer.rights}
      </p>
    </footer>
  );
}
