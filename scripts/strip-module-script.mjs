// Vite always tags the built entry <script> as type="module", regardless of
// the internal bundle format. vite.config.singlefile.ts builds an IIFE
// (self-invoking, no import/export statements left), so the module wrapper
// isn't needed — and some strict script-hosting environments only run
// classic scripts. This strips the attribute after the singlefile build.
import fs from 'fs';

const path = 'dist-singlefile/index.html';
const html = fs.readFileSync(path, 'utf-8');
const patched = html.replace('<script type="module" crossorigin>', '<script>');

if (patched === html) {
  console.warn('strip-module-script: no <script type="module" crossorigin> tag found — nothing changed.');
} else {
  fs.writeFileSync(path, patched);
  console.log('strip-module-script: stripped type="module" from the bundled script tag.');
}
