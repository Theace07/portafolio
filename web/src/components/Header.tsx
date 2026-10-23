"use client";

import type { MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useSite } from "@/lib/site-context";
import { sectionIds, site } from "@/lib/site";
import { prefersReducedMotion, useActiveSection, useHideOnScroll } from "@/lib/motion";
import { Moon, Sun } from "@/components/icons";
import type { Lang } from "@/lib/content";

const LANGS: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

const SECTION_IDS = Object.values(sectionIds);

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

export function Header() {
  const { t, theme, setTheme, lang, setLang } = useSite();
  const activeSection = useActiveSection(SECTION_IDS);
  const hidden = useHideOnScroll();

  // El tema nuevo se expande en círculo desde el botón. Donde no hay
  // View Transitions (o se pide menos movimiento) cambia sin más.
  const switchTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const next = theme === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    if (!doc.startViewTransition || prefersReducedMotion()) {
      setTheme(next);
      return;
    }

    const root = document.documentElement;
    const x = event.clientX || window.innerWidth / 2;
    const y = event.clientY || 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.dataset.themeSwitching = "";
    const transition = doc.startViewTransition(() => {
      root.classList.toggle("dark", next === "dark");
      flushSync(() => setTheme(next));
    });
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 650,
          easing: "cubic-bezier(0.77, 0, 0.18, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
    transition.finished.finally(() => delete root.dataset.themeSwitching);
  };

  const navLink = (item: { href: string; label: string }, className: string) => (
    <a
      key={item.href}
      href={item.href}
      aria-current={activeSection === item.href.slice(1) || undefined}
      className={`nav-link transition-colors hover:text-accent aria-[current]:text-accent ${className}`}
    >
      {item.label}
    </a>
  );

  return (
    <header
      data-hidden={hidden || undefined}
      className="site-header sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3 md:px-10 lg:gap-7 lg:px-16 lg:py-3.5">
        <a
          href="#"
          className="group font-mono text-[11px] uppercase tracking-[0.16em] lg:text-xs"
        >
          <span className="inline-block text-accent transition-transform duration-300 group-hover:-translate-x-1">
            &lt;
          </span>
          {site.shortName}
          <span className="inline-block pl-[0.5em] text-accent transition-transform duration-300 group-hover:translate-x-1">
            /&gt;
          </span>
        </a>

        <nav
          aria-label={t.actions.sections}
          className="hidden gap-7 font-mono text-[11px] uppercase tracking-[0.14em] text-muted lg:flex"
        >
          {t.nav.map((item) => navLink(item, ""))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t.actions.language}
            className="relative flex h-11 border border-line"
          >
            {/* Píldora que se desliza bajo el idioma activo. */}
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-1/2 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(${lang === "en" ? 100 : 0}%)` }}
            />
            {LANGS.map((item) => {
              const active = lang === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  aria-pressed={active}
                  className={`relative min-w-11 flex-1 cursor-pointer px-3 font-mono text-[11px] tracking-[0.12em] transition-colors ${
                    active ? "text-accent-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={switchTheme}
            title={theme === "dark" ? t.actions.themeToLight : t.actions.themeToDark}
            aria-label={theme === "dark" ? t.actions.themeToLight : t.actions.themeToDark}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-fg transition-colors hover:border-accent hover:bg-accent-wash hover:text-accent"
          >
            <span key={theme} className="swap-in flex">
              {theme === "dark" ? <Sun /> : <Moon />}
            </span>
          </button>

          <a
            href={site.cv[lang].href}
            download={site.cv[lang].filename}
            className="hidden border-b border-accent-ring pb-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent transition-colors hover:border-accent-strong hover:text-accent-strong md:inline"
          >
            {t.actions.cv} ↓
          </a>
        </div>
      </div>

      <div className="no-scrollbar overflow-x-auto border-t border-line-soft lg:hidden">
        <nav
          aria-label={t.actions.sections}
          className="flex gap-5 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted md:justify-between md:px-10"
        >
          {t.nav.map((item) => navLink(item, "whitespace-nowrap"))}
        </nav>
      </div>
    </header>
  );
}
