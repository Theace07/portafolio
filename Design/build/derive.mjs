// Deriva Tablet.dc.html y Movil.dc.html: toman su maquetación propia
// y reutilizan, tal cual, el bloque de lógica y textos de Main.dc.html.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const main = readFileSync(join(root, 'Main.dc.html'), 'utf8');
const m = main.match(/<script data-dc-script[\s\S]*?<\/script>/);
if (!m) {
  console.error('No se encontró el bloque de lógica en Main.dc.html');
  process.exit(1);
}

const targets = [
  { body: 'tablet.body.html', out: 'Tablet.dc.html', w: 834, h: 4700 },
  { body: 'movil.body.html', out: 'Movil.dc.html', w: 390, h: 5700 }
];

for (const t of targets) {
  const logic = m[0].replace(
    /"\$preview": \{"width": \d+, "height": \d+\}/,
    `"$preview": {"width": ${t.w}, "height": ${t.h}}`
  );
  const body = readFileSync(join(here, t.body), 'utf8');
  if (!body.includes('<!--LOGIC-->')) {
    console.error(`Falta el marcador <!--LOGIC--> en ${t.body}`);
    process.exit(1);
  }
  writeFileSync(join(root, t.out), body.replace('<!--LOGIC-->', logic), 'utf8');
  console.log(`ok ${t.out} (${t.w}px)`);
}
