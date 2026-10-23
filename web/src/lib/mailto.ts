import { site } from "@/lib/site";

/**
 * Construye un enlace `mailto:` con asunto y cuerpo ya escritos, de modo que
 * al pulsarlo se abra el gestor de correo del visitante con un borrador
 * dirigido a ti y listo para completar.
 *
 * `URLSearchParams` codifica los espacios como `+`, y algunos clientes de
 * correo los muestran literalmente; por eso se sustituyen por `%20`.
 */
export function mailtoHref(subject: string, body: string): string {
  const query = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20");
  return `mailto:${site.email}?${query}`;
}
