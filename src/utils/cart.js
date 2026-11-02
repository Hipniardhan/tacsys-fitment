import { products } from '../data/products.js';
export const CART_KEY = 'tacsys-fitment-cart';
export const money = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
export const validQuantity = (value) => Number.isSafeInteger(value) && value >= 1 && value <= 99999;
export function hydrateCart(raw) {
  try {
    const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!Array.isArray(data)) return [];
    return data.reduce((items, item) => {
      if (!item || !validQuantity(item.quantity)) return items;
      const product = products.find(p => p.id === item.productId);
      const variant = product?.variants.find(v => v.id === item.variantId);
      if (!variant) return items;
      const existing = items.find(i => i.productId === product.id && i.variantId === variant.id);
      if (existing) existing.quantity = Math.min(99999, existing.quantity + item.quantity);
      else items.push({ productId: product.id, variantId: variant.id, quantity: item.quantity });
      return items;
    }, []);
  } catch { return []; }
}
export function resolveCart(items) {
  return hydrateCart(items).map(item => {
    const product = products.find(p => p.id === item.productId);
    const variant = product.variants.find(v => v.id === item.variantId);
    return { ...item, product, variant, subtotal: variant.price * item.quantity };
  });
}
export function addItem(items, productId, variantId, quantity) {
  if (!validQuantity(quantity)) return items;
  return hydrateCart([...items, { productId, variantId, quantity }]);
}
