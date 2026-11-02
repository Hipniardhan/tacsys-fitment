import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const output = new URL('../dist/', import.meta.url);
const html = readFileSync(new URL('index.html', output), 'utf8');
const base = '/tacsys-fitment/';

assert.ok(!html.includes('/src/') && !/\.jsx(?:["?])/.test(html), 'Build must not reference React source files');
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]);
const styles = [...html.matchAll(/<link\b[^>]*\bhref="([^"]+\.css)"/g)].map(match => match[1]);
assert.ok(scripts.length > 0, 'Production JavaScript is missing');
assert.ok(styles.length > 0, 'Production CSS is missing');

for (const asset of [...scripts, ...styles]) {
  assert.ok(asset.startsWith(`${base}assets/`), `Incorrect deployment path: ${asset}`);
  assert.ok(existsSync(new URL(asset.slice(base.length), output)), `Build asset missing: ${asset}`);
}
for (const name of ['bolt', 'nut', 'washer', 'socket', 'screw', 'anchor', 'rod']) {
  assert.ok(existsSync(new URL(`images/products/${name}.svg`, output)), `Product image missing: ${name}`);
}
console.log('Production build verified: subfolder paths, JavaScript, CSS, and product images are valid.');
