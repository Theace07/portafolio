"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { content, type Content, type Lang } from "@/lib/content";

export type Theme = "dark" | "light";

export const THEME_KEY = "portafolio:theme";
export const LANG_KEY = "portafolio:lang";
export const DEFAULT_THEME: Theme = "dark";
export const DEFAULT_LANG: Lang = "es";

type SiteState = {
  theme: Theme;
  lang: Lang;
  t: Content;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLang: (lang: Lang) => void;
};

const SiteContext = createContext<SiteState | null>(null);

function readStored<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return allowed.includes(stored as T) ? (stored as T) : fallback;
  } catch {
    return fallback;
  }
}

function store(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Navegación privada o almacenamiento bloqueado: no es motivo para romper la página.
  }
}

export function SiteProvider({ children }: { children: ReactNode }) {
  // El primer render debe coincidir con lo que pintó el servidor; el script
  // de `layout.tsx` ya aplicó la clase correcta, y el efecto de abajo
  // sincroniza el estado con lo guardado en cuanto monta.
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    setThemeState(readStored(THEME_KEY, ["dark", "light"] as const, DEFAULT_THEME));
    setLangState(readStored(LANG_KEY, ["es", "en"] as const, DEFAULT_LANG));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = content[lang].htmlLang;
  }, [lang]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    store(THEME_KEY, next);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    store(LANG_KEY, next);
  }, []);

  const value = useMemo<SiteState>(
    () => ({
      theme,
      lang,
      t: content[lang],
      setTheme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
      setLang,
    }),
    [theme, lang, setTheme, setLang],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteState {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite debe usarse dentro de <SiteProvider>");
  return value;
}

/**
 * Se ejecuta antes del primer pintado para que el tema guardado no llegue
 * tarde y la página no parpadee de oscuro a claro.
 */
export const themeScript = `
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  // Red de seguridad: si React no llega a arrancar (error de red, recurso
  // bloqueado…), se quita .js y todo lo que esperaba su animación se muestra.
  setTimeout(function () {
    if (!root.classList.contains("hydrated")) root.classList.remove("js");
  }, 3500);
  try {
    var stored = localStorage.getItem(${JSON.stringify(THEME_KEY)});
    var theme = stored === "light" || stored === "dark" ? stored : ${JSON.stringify(DEFAULT_THEME)};
    document.documentElement.classList.toggle("dark", theme === "dark");
    var lang = localStorage.getItem(${JSON.stringify(LANG_KEY)});
    if (lang === "es" || lang === "en") document.documentElement.lang = lang;
  } catch (e) {}
})();
`;
