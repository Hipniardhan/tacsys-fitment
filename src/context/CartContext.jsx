import { createContext, useContext, useEffect, useState } from 'react';
import { addItem, CART_KEY, hydrateCart, resolveCart, validQuantity } from '../utils/cart';
const CartContext = createContext(null);
export function CartProvider({ children }) {
  const [storageError, setStorageError] = useState('');
  const [cart, setCart] = useState(() => { try { return hydrateCart(localStorage.getItem(CART_KEY)); } catch { return []; } });
  const [toast, setToast] = useState('');
  useEffect(() => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { setStorageError('Browser tidak dapat menyimpan keranjang. Keranjang hanya tersedia selama halaman ini terbuka.'); } }, [cart]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 3200); return () => clearTimeout(timer); }, [toast]);
  const items = resolveCart(cart);
  const add = (product, variant, quantity) => { if (!validQuantity(quantity)) return; setCart(current => addItem(current, product.id, variant.id, quantity)); setToast(`${product.name} ditambahkan ke keranjang`); };
  const update = (productId, variantId, quantity) => { if (validQuantity(quantity)) setCart(current => current.map(i => i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i)); };
  const remove = (productId, variantId) => setCart(current => current.filter(i => !(i.productId === productId && i.variantId === variantId)));
  return <CartContext.Provider value={{ items, add, update, remove, clear: () => setCart([]), count: items.reduce((n, i) => n + i.quantity, 0), total: items.reduce((n, i) => n + i.subtotal, 0), toast, storageError }}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
