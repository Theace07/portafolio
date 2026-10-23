import { sectionIds } from "@/lib/site";

export type Lang = "es" | "en";

export type NavItem = { label: string; href: string };
export type Stat = { value: string; label: string };
export type MetaRow = { key: string; value: string };
export type Tech = { name: string; note: string };

export type TechGroup = {
  label: string;
  items: Tech[];
};

export type Milestone = {
  /** Etiqueta corta del nodo de la línea de tiempo. */
  year: string;
  /** Segunda línea del nodo: empresa, institución o etapa. */
  org: string;
  period: string;
  role: string;
  place: string;
  description: string;
  achievements: string[];
  tech: string[];
};

/** El orden debe coincidir con `projectLinks` en `site.ts`. */
export type ProjectCopy = { name: string; description: string };

export type Content = {
  htmlLang: string;
  nav: NavItem[];
  actions: {
    cv: string;
    cvShort: string;
    email: string;
    demo: string;
    themeToDark: string;
    themeToLight: string;
    language: string;
    sections: string;
  };
  hero: {
    /** Cargo, sobre el nombre. El titular es el nombre, como en un CV. */
    role: string;
    /** Frases que se van escribiendo tras el cargo; la primera es la que se lee sin animación. */
    roles: string[];
    lede: string;
    stats: Stat[];
    seeProjects: string;
    photoAlt: string;
    photoPlaceholder: string;
    figure: string;
    place: string;
  };
  profile: {
    section: string;
    titleStart: string;
    titleAccent: string;
    paragraphs: [string, string];
    meta: MetaRow[];
  };
  stack: {
    section: string;
    hint: string;
    titleStart: string;
    titleAccent: string;
    groups: TechGroup[];
  };
  timeline: {
    section: string;
    hint: string;
    previous: string;
    next: string;
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    milestones: Milestone[];
  };
  projects: {
    section: string;
    all: string;
    titleStart: string;
    titleAccent: string;
    cta: string;
    capture: string;
    previous: string;
    next: string;
    /** Se usa como texto accesible de los puntos: «Proyecto 03». */
    item: string;
    items: ProjectCopy[];
  };
  contact: {
    section: string;
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    lede: string;
    /** Asunto y cuerpo con los que se abre el borrador de correo. */
    mailSubject: string;
    mailBody: string;
  };
  footer: {
    remote: string;
    rights: string;
  };
};

const es: Content = {
  htmlLang: "es",
  nav: [
    { label: "01 Perfil", href: `#${sectionIds.profile}` },
    { label: "02 Stack", href: `#${sectionIds.stack}` },
    { label: "03 Trayectoria", href: `#${sectionIds.timeline}` },
    { label: "04 Proyectos", href: `#${sectionIds.projects}` },
    { label: "05 Contacto", href: `#${sectionIds.contact}` },
  ],
  actions: {
    cv: "Descargar CV",
    cvShort: "CV en PDF",
    email: "Correo",
    demo: "Ver en vivo",
    themeToDark: "Cambiar a tema oscuro",
    themeToLight: "Cambiar a tema claro",
    language: "Idioma",
    sections: "Secciones",
  },
  hero: {
    role: "Front-End Developer Jr",
    roles: [
      "Front-End Developer Jr",
      "React · Next.js · TypeScript",
      "Interfaces rápidas y accesibles",
      "Dashboards y e-commerce",
    ],
    lede: "Desarrollador Front-End con más de dos años creando interfaces responsivas y rápidas con React, Next.js, TypeScript y Tailwind CSS.",
    stats: [
      { value: "2+", label: "Años de experiencia" },
      { value: "3", label: "Clientes y equipos" },
      { value: "B2", label: "Inglés profesional" },
    ],
    seeProjects: "Ver proyectos",
    photoAlt: "Retrato de Samuel Felipe Quiroz Piñeros",
    photoPlaceholder: "[ Tu foto ]",
    figure: "Fig. 01",
    place: "Zipaquirá, Colombia",
  },
  profile: {
    section: "Perfil",
    titleStart: "Quién hay detrás del",
    titleAccent: "código",
    paragraphs: [
      "Desarrollador Front-End con más de dos años de experiencia creando interfaces modernas, responsivas y de alto rendimiento con React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3 y Tailwind CSS. He entregado soluciones escalables para clientes globales, integrando APIs y sistemas backend, y optimizando SSR, SEO técnico, accesibilidad y rendimiento en entornos empresariales.",
      "Trabajo con Scrum y Kanban, gestiono el flujo en GitHub y participo en code review y testing automatizado, porque prefiero encontrar los errores antes de que los encuentre el cliente. Me muevo con soltura entre equipos de backend y testing, y busco un equipo donde crecer y hacerme cargo de piezas de producto de principio a fin.",
    ],
    meta: [
      { key: "Rol", value: "Front-End Developer Jr" },
      { key: "Base", value: "Zipaquirá, Cundinamarca — Colombia" },
      { key: "Idiomas", value: "Español nativo · Inglés B2 · Francés A2" },
      { key: "Modalidad", value: "Remoto" },
    ],
  },
  stack: {
    section: "Stack",
    hint: "Cinco áreas, una pestaña cada una",
    titleStart: "Lo que",
    titleAccent: "manejo",
    groups: [
      {
        label: "Frontend",
        items: [
          { name: "JavaScript", note: "ES6+ en todos mis proyectos, del sitio estático a la aplicación con React." },
          { name: "TypeScript", note: "Tipado en los proyectos con Next.js para que el código aguante crecer." },
          { name: "React", note: "Componentes reutilizables en interfaces de e-commerce y dashboards." },
          { name: "Next.js", note: "La base de mis últimos proyectos: rutas, SSR y despliegue." },
          { name: "HTML5", note: "Maquetación semántica y accesible como punto de partida de todo." },
          { name: "CSS3", note: "Diseño responsive y composición con Flexbox y Grid." },
          { name: "Tailwind CSS", note: "Mi herramienta diaria de estilos en los proyectos con Next.js." },
          { name: "SCSS", note: "Variables, anidamiento y orden en proyectos sin framework de estilos." },
          { name: "Bootstrap", note: "Prototipado rápido de interfaces en proyectos de e-commerce." },
          { name: "REST APIs", note: "Integración del front con servicios y sistemas backend." },
        ],
      },
      {
        label: "Datos",
        items: [
          { name: "MongoDB", note: "Base de los dashboards y las migraciones de datos desde Excel." },
          { name: "Firebase", note: "Autenticación, almacenamiento y base de datos en proyectos de e-commerce." },
        ],
      },
      {
        label: "Calidad",
        items: [
          { name: "Jest", note: "Pruebas unitarias para detectar errores antes de que lleguen a producción." },
          { name: "Testing automatizado", note: "Automatización de pruebas para sostener la estabilidad de la aplicación." },
          { name: "Code review", note: "Revisión de código con el equipo: mantiene la calidad y se aprende de los demás." },
        ],
      },
      {
        label: "Git y despliegue",
        items: [
          { name: "Git", note: "Ramas, historial limpio y resolución de conflictos en el día a día." },
          { name: "GitHub", note: "Gestión del flujo de trabajo, pull requests y revisión de código." },
          { name: "GitLab", note: "Control de versiones en los proyectos de cliente que lo usaban." },
          { name: "Vercel", note: "Despliegue continuo de los proyectos con Next.js y de los sitios estáticos." },
          { name: "Google Cloud", note: "Servicios de despliegue e infraestructura en proyectos empresariales." },
        ],
      },
      {
        label: "Método e IA",
        items: [
          { name: "Scrum", note: "Sprints, ceremonias y entrega continua junto al resto del equipo." },
          { name: "Kanban", note: "Tablero y flujo de tareas para no perder de vista lo que está en curso." },
          { name: "GitHub Copilot", note: "Apoyo en tareas repetitivas sin dejar de revisar lo que entra al repositorio." },
          { name: "Claude", note: "Exploración de soluciones, refactors y revisión de código." },
          { name: "Codex", note: "Automatización de tareas de desarrollo dentro del editor." },
        ],
      },
    ],
  },
  timeline: {
    section: "Trayectoria",
    hint: "Pulsa un hito",
    previous: "Hito anterior",
    next: "Hito siguiente",
    titleStart: "Mi",
    titleAccent: "trayectoria",
    titleEnd: "hasta hoy",
    milestones: [
      {
        year: "2024",
        org: "Coder House",
        period: "Enero 2024 — Julio 2025 · Formación",
        role: "Front-End Developer",
        place: "Coder House · Online",
        description:
          "Programa de año y medio de desarrollo front-end, cursado mientras empezaba a trabajar por mi cuenta.",
        achievements: [
          "Fundamentos de JavaScript, React y maquetación responsive.",
          "Proyecto final desplegado: Vino, un sitio multipágina en HTML y SCSS.",
        ],
        tech: ["JavaScript", "React", "HTML5", "SCSS"],
      },
      {
        year: "Ene 2025",
        org: "Freelance · Argentina",
        period: "Enero 2025 — Julio 2025 · Hito 02",
        role: "Front-end Developer",
        place: "Freelance · Argentina — Remoto",
        description:
          "Desarrollo de un e-commerce responsive con HTML, JavaScript y React, aplicando Bootstrap para la interfaz.",
        achievements: [
          "Componentes reutilizables y funcionalidades orientadas a mejorar navegación y usabilidad.",
          "Colaboración con equipos de backend y testing para integrar funcionalidades y validar requerimientos.",
          "Construcción de una solución escalable alineada con buenas prácticas de diseño responsive.",
        ],
        tech: ["HTML5", "JavaScript", "React", "Bootstrap"],
      },
      {
        year: "Jul 2025",
        org: "Freelance · Colombia",
        period: "Julio 2025 — Diciembre 2025 · Hito 03",
        role: "Front-End Developer",
        place: "Freelance · Colombia — Remoto",
        description:
          "Aplicaciones web de e-commerce, diseñando y estructurando la interfaz completa con una experiencia clara y orientada a conversión.",
        achievements: [
          "Soluciones front-end con Next.js, Tailwind CSS y TypeScript, optimizando mantenibilidad y calidad del código.",
          "Integración de Firebase: autenticación, almacenamiento y base de datos.",
          "Coordinación de la validación con el equipo de testing, reduciendo errores y mejorando la consistencia del producto.",
        ],
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
      },
      {
        year: "2026",
        org: "Av3x",
        period: "Enero 2026 — Abril 2026 · Hito 04",
        role: "Front-End Developer",
        place: "Av3x · Colombia — Remoto",
        description:
          "Automatizaciones para distintos clientes: dashboards interactivos desde los que los administradores visualizan, gestionan y controlan la información de forma centralizada.",
        achievements: [
          "Migraciones de datos desde Excel hacia bases dinámicas, con almacenamiento estructurado.",
          "Front-end con Next.js, React, Tailwind, Firebase y MongoDB, priorizando rendimiento y escalabilidad.",
          "Gestión del flujo de trabajo en GitHub con Scrum y Kanban.",
          "Code review y testing automatizado para detectar errores temprano y ganar estabilidad.",
        ],
        tech: ["Next.js", "React", "Tailwind CSS", "Firebase", "MongoDB"],
      },
    ],
  },
  projects: {
    section: "Proyectos",
    all: "Todos en GitHub",
    titleStart: "Algunos de mis",
    titleAccent: "proyectos",
    cta: "Ver en GitHub",
    capture: "[ Captura del proyecto ]",
    previous: "Proyecto anterior",
    next: "Proyecto siguiente",
    item: "Proyecto",
    items: [
      {
        name: "Vino",
        description:
          "BAKOS, un sitio multipágina sobre el mundo del vino: fabricación, productos e historia. Maquetado desde cero con HTML semántico y SCSS, y desplegado en Vercel. Fue mi proyecto final de Coder House.",
      },
    ],
  },
  contact: {
    section: "Contacto",
    titleStart: "¿Hablamos de tu",
    titleAccent: "próximo",
    titleEnd: "proyecto?",
    lede: "Cuéntame qué necesitas construir y te respondo lo antes posible.",
    mailSubject: "Hablemos de un proyecto",
    mailBody:
      "Hola Samuel:\n\nTe escribo desde tu portafolio.\n\nSoy:\nLo que necesito construir:\nPlazos aproximados:\n\nUn saludo.",
  },
  footer: {
    remote: "Disponible en remoto",
    rights: "Todos los derechos reservados.",
  },
};

const en: Content = {
  htmlLang: "en",
  nav: [
    { label: "01 Profile", href: `#${sectionIds.profile}` },
    { label: "02 Stack", href: `#${sectionIds.stack}` },
    { label: "03 Timeline", href: `#${sectionIds.timeline}` },
    { label: "04 Projects", href: `#${sectionIds.projects}` },
    { label: "05 Contact", href: `#${sectionIds.contact}` },
  ],
  actions: {
    cv: "Download CV",
    cvShort: "CV (PDF)",
    email: "Email",
    demo: "View live",
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    language: "Language",
    sections: "Sections",
  },
  hero: {
    role: "Jr Front-End Developer",
    roles: [
      "Jr Front-End Developer",
      "React · Next.js · TypeScript",
      "Fast, accessible interfaces",
      "Dashboards & e-commerce",
    ],
    lede: "Front-End Developer with over two years building responsive, fast interfaces with React, Next.js, TypeScript and Tailwind CSS.",
    stats: [
      { value: "2+", label: "Years of experience" },
      { value: "3", label: "Clients and teams" },
      { value: "B2", label: "Professional English" },
    ],
    seeProjects: "See projects",
    photoAlt: "Portrait of Samuel Felipe Quiroz Piñeros",
    photoPlaceholder: "[ Your photo ]",
    figure: "Fig. 01",
    place: "Zipaquirá, Colombia",
  },
  profile: {
    section: "Profile",
    titleStart: "Who is behind the",
    titleAccent: "code",
    paragraphs: [
      "Front-End Developer with more than two years of experience creating modern, responsive and high-performance interfaces with React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3 and Tailwind CSS. I have delivered scalable solutions for global clients, integrating APIs and backend systems, and optimising SSR, technical SEO, accessibility and performance in enterprise environments.",
      "I work with Scrum and Kanban, run the workflow through GitHub, and take part in code review and automated testing, because I would rather find the bugs before the client does. I move comfortably between backend and testing teams, and I am looking for a team where I can grow and own product work end to end.",
    ],
    meta: [
      { key: "Role", value: "Jr Front-End Developer" },
      { key: "Based in", value: "Zipaquirá, Cundinamarca — Colombia" },
      { key: "Languages", value: "Spanish native · English B2 · French A2" },
      { key: "Setup", value: "Remote" },
    ],
  },
  stack: {
    section: "Stack",
    hint: "Five areas, one tab each",
    titleStart: "What I",
    titleAccent: "work with",
    groups: [
      {
        label: "Frontend",
        items: [
          { name: "JavaScript", note: "ES6+ across every project, from static sites to React applications." },
          { name: "TypeScript", note: "Typing on the Next.js projects so the codebase can grow." },
          { name: "React", note: "Reusable components in e-commerce interfaces and dashboards." },
          { name: "Next.js", note: "The backbone of my recent projects: routing, SSR and deployment." },
          { name: "HTML5", note: "Semantic, accessible markup as the starting point for everything." },
          { name: "CSS3", note: "Responsive design and layout with Flexbox and Grid." },
          { name: "Tailwind CSS", note: "My day-to-day styling tool on Next.js projects." },
          { name: "SCSS", note: "Variables, nesting and structure on projects without a styling framework." },
          { name: "Bootstrap", note: "Fast interface prototyping on e-commerce projects." },
          { name: "REST APIs", note: "Wiring the front end to services and backend systems." },
        ],
      },
      {
        label: "Data",
        items: [
          { name: "MongoDB", note: "Behind the dashboards and the data migrations out of Excel." },
          { name: "Firebase", note: "Authentication, storage and database on e-commerce projects." },
        ],
      },
      {
        label: "Quality",
        items: [
          { name: "Jest", note: "Unit tests to catch bugs before they reach production." },
          { name: "Automated testing", note: "Test automation to keep the application stable." },
          { name: "Code review", note: "Reviewing code with the team: it keeps quality up and I learn from others." },
        ],
      },
      {
        label: "Git & deploy",
        items: [
          { name: "Git", note: "Branches, a clean history and conflict resolution day to day." },
          { name: "GitHub", note: "Workflow management, pull requests and code review." },
          { name: "GitLab", note: "Version control on the client projects that used it." },
          { name: "Vercel", note: "Continuous deployment for Next.js projects and static sites." },
          { name: "Google Cloud", note: "Deployment and infrastructure services on enterprise projects." },
        ],
      },
      {
        label: "Process & AI",
        items: [
          { name: "Scrum", note: "Sprints, ceremonies and continuous delivery alongside the team." },
          { name: "Kanban", note: "Board and task flow so nothing in progress gets lost." },
          { name: "GitHub Copilot", note: "Help with repetitive work, without skipping review of what lands in the repo." },
          { name: "Claude", note: "Exploring solutions, refactors and code review." },
          { name: "Codex", note: "Automating development tasks inside the editor." },
        ],
      },
    ],
  },
  timeline: {
    section: "Timeline",
    hint: "Tap a milestone",
    previous: "Previous milestone",
    next: "Next milestone",
    titleStart: "My",
    titleAccent: "path",
    titleEnd: "so far",
    milestones: [
      {
        year: "2024",
        org: "Coder House",
        period: "January 2024 — July 2025 · Education",
        role: "Front-End Developer",
        place: "Coder House · Online",
        description:
          "An eighteen-month front-end development programme, taken while I started working on my own.",
        achievements: [
          "Foundations in JavaScript, React and responsive markup.",
          "Final project shipped: Vino, a multi-page site in HTML and SCSS.",
        ],
        tech: ["JavaScript", "React", "HTML5", "SCSS"],
      },
      {
        year: "Jan 2025",
        org: "Freelance · Argentina",
        period: "January 2025 — July 2025 · Milestone 02",
        role: "Front-end Developer",
        place: "Freelance · Argentina — Remote",
        description:
          "Built a responsive e-commerce site with HTML, JavaScript and React, using Bootstrap for the interface.",
        achievements: [
          "Reusable components and features aimed at better navigation and usability.",
          "Worked with backend and testing teams to integrate features and validate requirements.",
          "Helped build a scalable solution aligned with responsive design best practices.",
        ],
        tech: ["HTML5", "JavaScript", "React", "Bootstrap"],
      },
      {
        year: "Jul 2025",
        org: "Freelance · Colombia",
        period: "July 2025 — December 2025 · Milestone 03",
        role: "Front-End Developer",
        place: "Freelance · Colombia — Remote",
        description:
          "E-commerce web applications, designing and structuring the full interface around a clear, conversion-oriented experience.",
        achievements: [
          "Front-end solutions with Next.js, Tailwind CSS and TypeScript, improving maintainability and code quality.",
          "Firebase integration: authentication, storage and database.",
          "Coordinated validation with the testing team, cutting bugs and improving product consistency.",
        ],
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
      },
      {
        year: "2026",
        org: "Av3x",
        period: "January 2026 — April 2026 · Milestone 04",
        role: "Front-End Developer",
        place: "Av3x · Colombia — Remote",
        description:
          "Automations for different clients: interactive dashboards where administrators visualise, manage and control information from one place.",
        achievements: [
          "Data migrations from Excel into dynamic databases, with structured storage.",
          "Front end with Next.js, React, Tailwind, Firebase and MongoDB, prioritising performance and scalability.",
          "Ran the workflow through GitHub with Scrum and Kanban.",
          "Code review and automated testing to catch errors early and gain stability.",
        ],
        tech: ["Next.js", "React", "Tailwind CSS", "Firebase", "MongoDB"],
      },
    ],
  },
  projects: {
    section: "Projects",
    all: "All on GitHub",
    titleStart: "Some of my",
    titleAccent: "projects",
    cta: "View on GitHub",
    capture: "[ Project screenshot ]",
    previous: "Previous project",
    next: "Next project",
    item: "Project",
    items: [
      {
        name: "Vino",
        description:
          "BAKOS, a multi-page site about the world of wine: production, products and history. Hand-built with semantic HTML and SCSS, and deployed on Vercel. It was my final Coder House project.",
      },
    ],
  },
  contact: {
    section: "Contact",
    titleStart: "Shall we talk about your",
    titleAccent: "next",
    titleEnd: "project?",
    lede: "Tell me what you need to build and I will get back to you as soon as I can.",
    mailSubject: "Let's talk about a project",
    mailBody:
      "Hi Samuel,\n\nI am writing from your portfolio.\n\nWho I am:\nWhat I need to build:\nRough timeline:\n\nBest regards.",
  },
  footer: {
    remote: "Available remotely",
    rights: "All rights reserved.",
  },
};

export const content: Record<Lang, Content> = { es, en };
