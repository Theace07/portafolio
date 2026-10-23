// Cambia el botón de idioma por un selector segmentado ES | EN.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const SEG_CSS = `    .seg { display: inline-flex; height: 44px; border: 1px solid var(--line); }
    .seg-b {
      appearance: none; border: 0; background: transparent; color: var(--muted);
      cursor: pointer; min-width: 44px; padding: 0 13px; margin: 0;
      font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.12em;
      transition: background .16s ease, color .16s ease;
    }
    .seg-b:hover { color: var(--fg); }
    .seg-b.on { background: var(--accent); color: var(--accent-fg); }
`;

const SEG_HTML = `<div class="seg" title="{{t.langTitle}}">
          <button type="button" class="seg-b {{esCls}}" onClick="{{setEs}}">ES</button>
          <button type="button" class="seg-b {{enCls}}" onClick="{{setEn}}">EN</button>
        </div>`;

const files = ['Main.dc.html', 'build/tablet.body.html', 'build/movil.body.html'];

for (const rel of files) {
  const path = join(root, rel);
  let src = readFileSync(path, 'utf8');

  src = src.replace('--faint: #8497 9A;', '--faint: #84979A;');

  if (!src.includes('.seg-b')) {
    src = src.replace(/^(\s*)\.ph \{/m, SEG_CSS + '\n$1.ph {');
  }

  const before = src;
  src = src.replace(
    /<button type="button" class="ibtn" onClick="\{\{toggleLang\}\}"[\s\S]*?<\/button>/,
    SEG_HTML
  );
  if (src === before) {
    console.error(`No se encontró el botón de idioma en ${rel}`);
    process.exit(1);
  }

  writeFileSync(path, src, 'utf8');
  console.log('ok ' + rel);
}

// Lógica: dos acciones explícitas en vez de un alternador.
const mainPath = join(root, 'Main.dc.html');
let main = readFileSync(mainPath, 'utf8');
const logicBefore = main;
main = main.replace(
  "      toggleLang: () => this.setState({ lang: lang === 'en' ? 'es' : 'en' }),",
  "      setEs: () => this.setState({ lang: 'es' }),\n" +
  "      setEn: () => this.setState({ lang: 'en' }),\n" +
  "      esCls: lang === 'en' ? '' : 'on',\n" +
  "      enCls: lang === 'en' ? 'on' : '',"
);
if (main === logicBefore) {
  console.error('No se encontró toggleLang en la lógica de Main.dc.html');
  process.exit(1);
}
writeFileSync(mainPath, main, 'utf8');
console.log('ok lógica de idioma');
