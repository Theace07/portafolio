# Portafolio

Portafolio de desarrollador web construido con **Next.js (App Router)**, **TypeScript** y
**Tailwind CSS v4**. Es la implementación del diseño «Editorial nocturno»: tema claro/oscuro,
idioma español/inglés, línea de tiempo pulsable y galería de proyectos.

## Empezar

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

Otros comandos: `npm run build`, `npm start`, `npm run typecheck`.

## Dónde se cambia cada cosa

| Qué                                            | Archivo                        |
| ---------------------------------------------- | ------------------------------ |
| Nombre, correo, teléfono, GitHub, LinkedIn, CV | `src/lib/site.ts`              |
| Repositorios, stack y capturas de proyectos    | `src/lib/site.ts`              |
| Todos los textos, en español e inglés          | `src/lib/content.ts`           |
| Colores, tipografías y tramas                  | `src/app/globals.css`          |
| Estructura de la página                        | `src/app/page.tsx`             |

Todo lo que aparece entre `[CORCHETES]` es un hueco pendiente de rellenar.

### Foto y capturas

Todo lo estático vive en `public/` y viaja con el repositorio, así que quien clone o
despliegue el proyecto lo ve sin descargar nada aparte:

- `public/imagenes/foto.jpg` — el retrato del inicio, referenciado en `site.photo`.
- `public/imagenes/proyectos/` — las capturas de cada proyecto, campo `image` de `projectLinks`.
- `public/cv-es.pdf` y `public/cv-en.pdf` — el CV en cada idioma.

### Proyectos

`projectLinks` (en `site.ts`) y `projects.items` (en `content.ts`) se emparejan **por
posición**: la primera entrada de uno corresponde a la primera del otro. Si añades un
proyecto, añádelo en los dos sitios y en los dos idiomas.

## Cómo funcionan el tema y el idioma

Ambos viven en `src/lib/site-context.tsx`:

- El tema aplica la clase `dark` en `<html>` y se guarda en `localStorage`. Un script
  pequeño en `layout.tsx` lo aplica antes del primer pintado para que no haya parpadeo.
- El idioma cambia el diccionario que devuelve `useSite()` y el atributo `lang` del
  documento. No cambia la URL: si más adelante quieres `/es` y `/en` indexables por
  buscadores, habría que pasar a rutas por idioma (`app/[lang]/`).

## Paleta

Definida como variables CSS en `globals.css` y expuesta a Tailwind con `@theme inline`,
así que en el marcado se usan clases normales: `bg-bg`, `text-fg`, `border-line`,
`bg-accent`, `text-aqua`…

| Token             | Oscuro    | Claro     |
| ----------------- | --------- | --------- |
| `bg`              | `#0b1416` | `#eff3f3` |
| `fg`              | `#e9f1f1` | `#0b1618` |
| `accent`          | `#a97bff` | `#6d3bd6` |
| `aqua`            | `#5fd3c4` | `#0e7a6b` |

## Despliegue

Vercel lo detecta sin configuración: importa el repositorio, marca `web` como directorio
raíz si el proyecto vive en un subdirectorio, y listo.
