import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Syne } from "next/font/google";
import { SiteProvider, themeScript } from "@/lib/site-context";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

/** Títulos: display geométrica con personalidad. No tiene cursiva, a propósito. */
const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} · Front-End Developer`,
  description:
    "Portafolio de Samuel Felipe Quiroz Piñeros, desarrollador Front-End: interfaces responsivas y de alto rendimiento con React, Next.js, TypeScript y Tailwind CSS.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eff3f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1416" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${manrope.variable} ${syne.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
