<div align="center">

# Portafolio · Samuel Quiroz

**Front-End Developer** · Zipaquirá, Colombia

Portafolio personal construido con Next.js 15, TypeScript y Tailwind CSS v4.
Lo diseñé y lo construí yo, sin plantillas.

![Next.js](https://img.shields.io/badge/Next.js_15-0b1416?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-0b1416?style=flat-square&logo=react&logoColor=5fd3c4)
![TypeScript](https://img.shields.io/badge/TypeScript-0b1416?style=flat-square&logo=typescript&logoColor=a97bff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-0b1416?style=flat-square&logo=tailwindcss&logoColor=5fd3c4)

![Vista previa del portafolio](docs/preview.png)

</div>

## Qué tiene

- **Tema claro y oscuro.** Al cambiar de tema, el nuevo se expande en círculo desde el botón (View Transitions API).
- **Dos idiomas, español e inglés.** Todos los textos viven en un solo diccionario tipado.
- **Animaciones propias, sin librerías.** El nombre se «descifra» como en una terminal, los títulos suben palabra a palabra y las líneas de sección se dibujan solas. Las tarjetas tienen un foco que sigue al cursor y hay una barra de lectura ligada al scroll.
- **Rendimiento.** Solo se anima `transform`, `opacity` y `clip-path`. Todo el sistema de movimiento suma unos 3 kB de JavaScript y la página es estática.
- **Accesibilidad.** Respeta `prefers-reduced-motion` y los lectores de pantalla leen siempre el texto real, no los caracteres del efecto. Sin JavaScript, la página se ve completa.
- **Del diseño al código.** En [`Design/`](Design/) están las maquetas de escritorio, tablet y móvil, junto con las tres propuestas descartadas.

## Estructura

```
Portafolio/
├── Design/              Maquetas (escritorio, tablet, móvil) y propuestas descartadas
└── web/                 Aplicación Next.js
    ├── public/          Foto, capturas de proyectos y CV en PDF
    └── src/
        ├── app/         Layout, página y estilos globales (tokens de color y animaciones)
        ├── components/  Secciones de la página
        │   └── motion/  Reveal, Scramble y MotionLayer: el sistema de animación
        └── lib/         Contenido bilingüe, datos del sitio y hooks de movimiento
```

## Ejecutar en local

```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

Otros comandos: `npm run build`, `npm start` y `npm run typecheck`.

## Cómo se trabaja este repositorio

Cada cambio se hace en su propia rama y entra a `main` con un merge `--no-ff`. Así el historial muestra qué se hizo y por qué:

| Prefijo  | Uso                                     |
| -------- | --------------------------------------- |
| `feat/`  | Funcionalidad o cambio visible          |
| `fix/`   | Correcciones, incluidas las de seguridad |
| `docs/`  | Documentación                           |
| `chore/` | Mantenimiento                           |

Los mensajes siguen [Conventional Commits](https://www.conventionalcommits.org/es/).
Para verlo: `git log --oneline --graph`.

## Contacto

[LinkedIn](https://www.linkedin.com/in/samuel-felipe-quiroz-pi%C3%B1eros-3a5327323/) · [GitHub](https://github.com/Theace07) · sfqp2003@gmail.com
