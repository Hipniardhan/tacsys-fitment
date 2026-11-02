import { useCallback, useState } from 'react';
import { Check, MessageCircle, X } from 'lucide-react';
import Header from './components/Header';
import Catalog from './components/Catalog';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import { Hero, Categories, About, Footer } from './pages/Home';
import { useCart } from './context/CartContext';
import { whatsappUrl } from './utils/whatsapp';
import { useDialog } from './hooks/useDialog';
function ContactNotice({ message, onClose }) {
  const ref = useDialog(onClose);
  return <div className="overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}><section ref={ref} className="contact-modal" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="contact-title"><button className="close icon-button" aria-label="Tutup informasi kontak" onClick={onClose}><X/></button><MessageCircle size={34}/><h2 id="contact-title">Informasi kontak</h2><p>{message}</p><button className="button dark" onClick={onClose}>Kembali ke katalog</button></section></div>;
}
export default function App() {
  const [query, setQuery] = useState(''), [category, setCategory] = useState('Semua'), [sort, setSort] = useState('featured');
  const [detail, setDetail] = useState(null), [cartOpen, setCartOpen] = useState(false), [notice, setNotice] = useState('');
  const { toast } = useCart();
  const closeDetail = useCallback(() => setDetail(null), []), closeCart = useCallback(() => setCartOpen(false), []), closeNotice = useCallback(() => setNotice(''), []);
  const choose = c => { setCategory(c); setQuery(''); document.getElementById('produk').scrollIntoView({ behavior: 'smooth' }); };
  const contact = () => { try { window.open(whatsappUrl('Halo Admin Tacsys Fitment, saya ingin berkonsultasi mengenai kebutuhan fastener.'), '_blank', 'noopener,noreferrer'); } catch (e) { setNotice(e.message); } };
  return <><a className="skip-link" href="#produk">Langsung ke katalog</a><Header query={query} setQuery={setQuery} onCart={() => setCartOpen(true)}/><main><Hero contact={contact}/><Categories category={category} choose={choose}/><Catalog {...{ query, setQuery, category, setCategory, sort, setSort }} onDetail={setDetail}/><About contact={contact}/></main><Footer contact={contact} choose={choose}/><button className="floating-contact" aria-label="Konsultasi melalui WhatsApp" onClick={contact}><MessageCircle size={23}/><span>Butuh bantuan?</span></button>{detail && <ProductModal product={detail} onClose={closeDetail}/>} {cartOpen && <CartDrawer onClose={closeCart}/>} {notice && <ContactNotice message={notice} onClose={closeNotice}/>} {toast && <div className="toast" role="status"><Check size={19}/>{toast}</div>}</>;
}
