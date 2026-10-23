/**
 * Datos que no dependen del idioma.
 */

export const site = {
  name: "Samuel Felipe Quiroz Piñeros",
  /** Versión corta para la cabecera, donde el nombre completo no cabe. */
  shortName: "Samuel Quiroz",
  phone: "+57 305 447 1598",
  github: "https://github.com/Theace07",
  githubRepos: "https://github.com/Theace07?tab=repositories",
  linkedin: "https://www.linkedin.com/in/samuel-felipe-quiroz-pi%C3%B1eros-3a5327323/",
  /** Un PDF por idioma, dentro de `public/`. */
  cv: {
    es: { href: "/cv-es.pdf", filename: "Samuel-Quiroz-CV-ES.pdf" },
    en: { href: "/cv-en.pdf", filename: "Samuel-Quiroz-CV-EN.pdf" },
  },
  /**
   * Retrato, guardado en `public/imagenes/`. Al vivir dentro del repositorio
   * viaja con el proyecto: cualquiera que lo clone o lo despliegue la ve, sin
   * tener que descargar nada aparte. Si lo pones a `null` se muestra el hueco
   * con la trama diagonal.
   */
  photo: "/imagenes/foto.jpg" as string | null,
} as const;

/**
 * Un proyecto por entrada. El nombre y la descripción viven en `content.ts`,
 * traducidos; aquí van el repositorio, el enlace en vivo, el stack y la
 * captura, que no cambian con el idioma. El orden debe coincidir en los dos
 * archivos.
 */
export type ProjectLink = {
  repo: string;
  /** Enlace al proyecto desplegado, si lo hay. */
  demo: string | null;
  stack: string;
  /** Captura guardada en `public/imagenes/proyectos/`, por ejemplo `/imagenes/proyectos/vino.png`. */
  image: string | null;
};

export const projectLinks: ProjectLink[] = [
  {
    repo: "https://github.com/Theace07/Vino",
    demo: "https://proyecto-coder-seven-virid.vercel.app",
    stack: "HTML5 · SCSS · CSS3",
    image: "/imagenes/proyectos/vino.png",
  },
];

export const sectionIds = {
  profile: "perfil",
  stack: "stack",
  timeline: "trayectoria",
  projects: "proyectos",
  contact: "contacto",
} as const;
