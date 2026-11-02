import test from 'node:test';
import assert from 'node:assert/strict';
import { publicAsset } from '../src/utils/assets.js';
import { products } from '../src/data/products.js';
import { existsSync } from 'node:fs';

test('public assets follow the GitHub Pages base instead of the domain root', () => {
  assert.equal(publicAsset('/images/products/bolt.svg', '/tacsys-fitment/'), '/tacsys-fitment/images/products/bolt.svg');
  assert.equal(publicAsset('images/products/nut.svg', '/tacsys-fitment/'), '/tacsys-fitment/images/products/nut.svg');
  for (const product of products) {
    assert.ok(existsSync(new URL(`../public${product.image}`, import.meta.url)));
    assert.ok(publicAsset(product.image, '/tacsys-fitment/').startsWith('/tacsys-fitment/images/products/'));
  }
});
