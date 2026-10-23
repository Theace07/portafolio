import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * `outputFileTracingRoot` fija la raíz del proyecto: sin esto Next.js puede
 * elegir un lockfile de un directorio superior al rastrear los archivos.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  // En `next dev`, permite abrir la web desde otro dispositivo de la red
  // (el móvil, por ejemplo) sin que Next bloquee sus propios recursos.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "100.*.*.*"],
};

export default nextConfig;
