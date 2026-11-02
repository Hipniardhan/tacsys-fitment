import test from 'node:test';
import assert from 'node:assert/strict';
import { products, categories } from '../src/data/products.js';
import { filterProducts, startingPrice } from '../src/utils/catalog.js';
test('search combines with category and handles empty results', () => {
  assert.equal(filterProducts(products, ' HEXAGONAL ', 'Baut').length, 1);
  assert.equal(filterProducts(products, 'mur', 'Baut').length, 0);
  assert.equal(filterProducts(products, 'tidak tersedia').length, 0);
  for (const category of categories) assert.ok(filterProducts(products, '', category).every(p => p.category === category));
});
test('sort uses numeric starting price and preserves source order', () => {
  const original = products.map(p => p.id);
  const ascending = filterProducts(products, '', 'Semua', 'lowest').map(startingPrice);
  const descending = filterProducts(products, '', 'Semua', 'highest').map(startingPrice);
  assert.deepEqual(ascending, [...ascending].sort((a, b) => a - b));
  assert.deepEqual(descending, [...ascending].reverse());
  assert.deepEqual(products.map(p => p.id), original);
});
test('product data references local assets and unique variants with numeric prices', () => {
  assert.ok(products.length >= 12);
  const ids = products.flatMap(p => p.variants.map(v => v.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const product of products) {
    assert.ok(product.image.startsWith('/images/products/'));
    for (const variant of product.variants) assert.ok(Number.isFinite(variant.price) && variant.price > 0);
  }
});
