import test from 'node:test';
import assert from 'node:assert/strict';
import { addItem, hydrateCart, resolveCart, validQuantity } from '../src/utils/cart.js';
import { orderMessage, whatsappUrl } from '../src/utils/whatsapp.js';
test('cart merges matching variants and keeps different sizes separate', () => {
  let cart = addItem([], 'baut-hex', 'baut-hex-1', 2);
  cart = addItem(cart, 'baut-hex', 'baut-hex-1', 3);
  cart = addItem(cart, 'baut-hex', 'baut-hex-2', 4);
  assert.equal(cart.length, 2); assert.equal(cart[0].quantity, 5);
  assert.deepEqual(hydrateCart(JSON.stringify(cart)), cart);
});
test('invalid storage, unavailable products, fractional and invalid quantities are ignored', () => {
  for (const raw of ['{bad', '{}', 'null', '[null,1,{}]']) assert.deepEqual(hydrateCart(raw), []);
  const invalid = [{ productId: 'missing', variantId: 'x', quantity: 2 }, { productId: 'baut-hex', variantId: 'missing', quantity: 2 }, ...[0, -1, 1.5, '2', 100000].map(quantity => ({ productId: 'baut-hex', variantId: 'baut-hex-1', quantity }))];
  assert.deepEqual(hydrateCart(invalid), []);
  assert.equal(validQuantity(1), true); assert.equal(validQuantity(Infinity), false);
});
test('catalog prices override storage and totals remain numeric', () => {
  const items = resolveCart([{ productId: 'baut-hex', variantId: 'baut-hex-1', quantity: 20, price: 1, total: 1 }]);
  assert.equal(items[0].variant.price, 2500); assert.equal(items[0].subtotal, 50000);
});
test('WhatsApp message contains variants, unit, subtotal and encoded total', () => {
  const items = resolveCart(addItem([], 'baut-hex', 'baut-hex-1', 20));
  const message = orderMessage(items);
  assert.match(message, /Ukuran: M8 x 30/); assert.match(message, /Jumlah: 20 pcs/); assert.match(message, /Total Pesanan: Rp\s?50\.000/);
  const url = whatsappUrl(message, { whatsappConfigured: true, whatsapp: '6281234567890' });
  assert.equal(new URL(url).searchParams.get('text'), message);
  assert.throws(() => whatsappUrl(message, { whatsappConfigured: false, whatsapp: '628XXXXXXXXXX' }), /belum dikonfigurasi/);
  assert.throws(() => whatsappUrl(message, { whatsappConfigured: true, whatsapp: 'bad' }));
});
