/**
 * Simple post-build link checker.
 *
 *   node scripts/check-links.mjs [base]
 *
 * Verifies that every internal href/src in the built HTML resolves to a file in
 * dist/, and that in-page anchors point at an existing id.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const base = (process.argv[2] ?? '/').replace(/\/+$/, '');

const htmlFiles = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
await walk(dist);

const idsByFile = new Map();
const problems = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  idsByFile.set(file, ids);

  const refs = [
    ...html.matchAll(/\shref="([^"]+)"/g),
    ...html.matchAll(/\ssrc="([^"]+)"/g),
  ].map((m) => m[1]);

  for (const ref of refs) {
    if (!ref || ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('data:')) continue;
    if (/^https?:\/\//.test(ref)) continue;

    if (ref.startsWith('#')) {
      if (ref !== '#' && !ids.has(ref.slice(1))) {
        problems.push(`${path.relative(dist, file)} -> missing anchor ${ref}`);
      }
      continue;
    }
    if (!ref.startsWith('/')) continue;

    if (base && !ref.startsWith(`${base}/`) && ref !== base) {
      problems.push(`${path.relative(dist, file)} -> link without base prefix: ${ref}`);
      continue;
    }

    const clean = ref.split('#')[0].split('?')[0];
    const rel = clean.slice(base.length).replace(/^\//, '');
    const candidates = rel === ''
      ? [path.join(dist, 'index.html')]
      : [
          path.join(dist, rel),
          path.join(dist, rel, 'index.html'),
        ];

    let found = false;
    for (const candidate of candidates) {
      try {
        const info = await stat(candidate);
        if (info.isFile()) { found = true; break; }
      } catch {}
    }
    if (!found) problems.push(`${path.relative(dist, file)} -> broken link ${ref}`);
  }
}

if (problems.length) {
  console.error(`${problems.length} problem(s):`);
  for (const problem of [...new Set(problems)]) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`OK — ${htmlFiles.length} HTML files, no broken internal links (base: "${base || '/'}").`);
