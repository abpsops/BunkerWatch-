// Vite always injects the built entry <script> into <head>, tagged
// type="module" (regardless of the internal bundle format — this build uses
// an IIFE, which doesn't need the module wrapper). Module scripts defer
// automatically, which is why that placement normally works. But some
// static-hosting environments only run classic scripts, and a classic
// script sitting in <head> runs immediately during parsing — before
// <div id="root"> exists in <body> — which crashes createRoot(null).
//
// The fix that's correct regardless of script-timing semantics: strip the
// module type AND physically move the script to just before </body>, after
// #root already exists in the DOM.
import fs from 'fs';

const path = 'dist-singlefile/index.html';
const html = fs.readFileSync(path, 'utf-8');

const OPEN_TAG = '<script type="module" crossorigin>';
const openIdx = html.indexOf(OPEN_TAG);
if (openIdx === -1) {
  console.warn('strip-module-script: no <script type="module" crossorigin> tag found — nothing changed.');
  process.exit(0);
}
const contentStart = openIdx + OPEN_TAG.length;
const closeIdx = html.indexOf('</script>', contentStart);
if (closeIdx === -1) {
  console.error('strip-module-script: found the opening tag but no matching </script> — aborting.');
  process.exit(1);
}
const scriptBody = html.slice(contentStart, closeIdx);

const bodyCloseIdx = html.lastIndexOf('</body>');
if (bodyCloseIdx === -1) {
  console.error('strip-module-script: no </body> tag found — aborting.');
  process.exit(1);
}

// Slice-and-concatenate throughout (never String.prototype.replace with the
// huge minified script as the replacement argument): replace() treats `$&`,
// `$\``, `$'` etc. as special patterns in its replacement string, and
// minified JS is full of `$` characters that can coincidentally match them,
// silently corrupting the bundle.
const patched =
  html.slice(0, openIdx) +
  html.slice(closeIdx + '</script>'.length, bodyCloseIdx) +
  '<script>' + scriptBody + '</script>\n  ' +
  html.slice(bodyCloseIdx);

fs.writeFileSync(path, patched);
console.log('strip-module-script: moved the bundled script to the end of <body> as a classic script.');
