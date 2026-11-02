import { useState } from 'react';
import { X, ShoppingCart, Check } from 'lucide-react';
import { useDialog } from '../hooks/useDialog';
import { useCart } from '../context/CartContext';
import { money, validQuantity } from '../utils/cart';
import ProductImage from './ProductImage';
import Quantity from './Quantity';
export default function ProductModal({ product, onClose }) {
  const ref = useDialog(onClose), { add } = useCart();
  const [variant, setVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  return <div className="overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" tabIndex="-1" ref={ref}><button className="icon-button close" aria-label="Tutup detail produk" onClick={onClose}><X/></button><div className="detail-image"><ProductImage product={product}/><span>Ilustrasi produk</span></div><div className="detail-body"><span className="eyebrow">{product.category}</span><h2 id="detail-title">{product.name}</h2><p>{product.description}</p><div className="detail-price">{money(variant.price)} <small>/ {variant.unit}</small></div><fieldset><legend>Pilih ukuran</legend><div className="variants">{product.variants.map(v => <button key={v.id} className={v.id === variant.id ? 'selected' : ''} aria-pressed={v.id === variant.id} onClick={() => setVariant(v)}>{v.label}{v.id === variant.id && <Check size={14}/>}</button>)}</div></fieldset><label className="field-label" htmlFor="detail-qty">Jumlah ({variant.unit})</label><Quantity id="detail-qty" value={quantity} onChange={setQuantity}/>{!validQuantity(quantity) && <p className="error">Masukkan bilangan bulat antara 1 dan 99.999.</p>}<div className="subtotal"><span>Subtotal</span><strong>{money(validQuantity(quantity) ? variant.price * quantity : 0)}</strong></div><button className="button primary full" disabled={!validQuantity(quantity)} onClick={() => { add(product, variant, quantity); onClose(); }}><ShoppingCart size={18}/>Tambah ke keranjang</button><p className="fine-print">Data contoh. Harga, spesifikasi, dan stok perlu dikonfirmasi kepada admin.</p></div></section></div>;
}
