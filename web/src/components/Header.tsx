"use client";

import { useSite } from "@/lib/site-context";
import { site } from "@/lib/site";
import { Moon, Sun } from "@/components/icons";
import type { Lang } from "@/lib/content";

const LANGS: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export function Header() {
  const { t, theme, toggleTheme, lang, setLang } = useSite();

  return (
    <header className="border-b border-line">
      <div className="flex items-center justify-between gap-4 px-5 py-3 md:px-10 lg:gap-7 lg:px-16 lg:py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] lg:text-xs">
          {site.shortName}
        </span>

        <nav
          aria-label={t.actions.sections}
          className="hidden gap-7 font-mono text-[11px] uppercase tracking-[0.14em] lg:flex"
        >
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t.actions.language}
            className="flex h-11 border border-line"
          >
            {LANGS.map((item) => {
              const active = lang === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  aria-pressed={active}
                  className={`min-w-11 cursor-pointer px-3 font-mono text-[11px] tracking-[0.12em] transition-colors ${
                    active
                      ? "bg-accent text-accent-fg"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            title={theme === "dark" ? t.actions.themeToLight : t.actions.themeToDark}
            aria-label={theme === "dark" ? t.actions.themeToLight : t.actions.themeToDark}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-line text-fg transition-colors hover:border-accent hover:bg-accent-wash hover:text-accent"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
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
          className="flex gap-5 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] md:justify-between md:px-10"
        >
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
