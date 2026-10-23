import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * `outputFileTracingRoot` fija la raíz del proyecto: sin esto Next.js puede
 * elegir un lockfile de un directorio superior al rastrear los archivos.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
};

export default nextConfig;
