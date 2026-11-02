import { ArrowRight, MessageCircle, ShieldCheck, Ruler, Tags, PackageCheck, Hexagon, Circle, Settings2, MoveUpRight } from 'lucide-react';
import { categories } from '../data/products';
import { Brand } from '../components/Header';
import { store } from '../config/store';
import { publicAsset } from '../utils/assets';
const categoryImages = ['bolt', 'nut', 'washer', 'screw', 'anchor', 'rod'];
export function Hero({ contact }) {
  return <><section id="home" className="hero"><div className="container hero-layout"><div className="hero-copy"><div className="hero-kicker"><span/>PARTNER KEBUTUHAN TEKNIK ANDA</div><h1>Solusi Baut &<br/>Fastener untuk<br/><span>Setiap Kebutuhan.</span></h1><p>Pilihan baut, mur, dan fastener berkualitas untuk konstruksi, otomotif, industri, hingga kebutuhan teknik sehari-hari.</p><div className="hero-buttons"><a className="button primary" href="#produk">Belanja Sekarang <ArrowRight size={18}/></a><button className="button hero-secondary" onClick={contact}><MessageCircle size={18}/>Hubungi Kami</button></div><div className="hero-footnote"><PackageCheck size={20}/><span>Pilih ukuran dengan mudah.<br/><strong>Pesan langsung melalui WhatsApp.</strong></span></div></div><div className="hero-art"><span className="hero-art-label">THE ESSENTIAL CONNECTION</span><div className="hero-disc"/><img className="hero-bolt" src={publicAsset('/images/products/bolt.svg')} alt="Ilustrasi baut hexagonal baja"/><img className="hero-nut" src={publicAsset('/images/products/nut.svg')} alt="Ilustrasi mur hexagonal"/><img className="hero-washer" src={publicAsset('/images/products/washer.svg')} alt="Ilustrasi ring datar"/><div className="art-spec"><span>BAUT HEXAGONAL</span><strong>Presisi pada setiap ulir.</strong><small>Ilustrasi produk · spesifikasi dapat bervariasi</small></div><div className="hero-index">01 / FASTENER ESSENTIALS</div></div></div></section><div className="benefit-bar"><div className="container"><div><ShieldCheck/><span>Produk berkualitas<small>Material sesuai kebutuhan</small></span></div><div><Ruler/><span>Pilihan ukuran lengkap<small>Untuk beragam aplikasi</small></span></div><div><Tags/><span>Harga kompetitif<small>Sesuaikan dengan anggaran</small></span></div><div><MessageCircle/><span>Pemesanan mudah<small>Konsultasi via WhatsApp</small></span></div></div></div></>;
}
export function Categories({ category, choose }) {
  return <section id="kategori" className="categories-section container"><div className="section-heading compact"><div><span className="eyebrow">DARI SAMBUNGAN HINGGA PERAKITAN</span><h2>Mulai dari kategori.</h2></div><a href="#produk" className="inline-link">Lihat semua produk <ArrowRight size={17}/></a></div><div className="category-grid">{categories.map((name, i) => <button className={`category-card ${category === name ? 'chosen' : ''}`} key={name} onClick={() => choose(name)}><img src={publicAsset(`/images/products/${categoryImages[i]}.svg`)} alt="" loading="lazy"/><span>{name}</span><MoveUpRight size={16}/></button>)}</div></section>;
}
export function About({ contact }) {
  return <section id="tentang" className="about-section"><div className="container about-layout"><div className="about-graphic"><Hexagon strokeWidth={.8}/><Circle strokeWidth={.7}/><Settings2 size={30}/><span>SETIAP SAMBUNGAN<br/>PUNYA PERAN.</span></div><div><span className="eyebrow">TENTANG TACSYS FITMENT</span><h2>Partner untuk detail<br/>yang menentukan.</h2><p>Tacsys Fitment menyediakan pilihan baut, mur, ring, dan kebutuhan fastener untuk berbagai pekerjaan teknik. Kami membantu Anda menemukan jenis dan ukuran yang sesuai melalui katalog yang mudah digunakan.</p><p>Dari kebutuhan satuan hingga perakitan, mulai dengan memilih produk. Tim toko dapat membantu mengonfirmasi spesifikasi, ketersediaan, dan pengiriman melalui WhatsApp.</p><button className="inline-link" onClick={contact}>Konsultasikan kebutuhan Anda <ArrowRight size={17}/></button></div></div></section>;
}
export function Footer({ contact, choose }) {
  return (
    <footer id="kontak"><div className="container">
      <div className="contact-banner"><div><span className="eyebrow">ADA KEBUTUHAN KHUSUS?</span><h2>Temukan sambungan<br/>yang tepat bersama kami.</h2></div><button className="button primary" onClick={contact}><MessageCircle size={20}/>Konsultasi via WhatsApp</button></div>
      <div className="footer-main">
        <div><Brand/><p>Baut, mur, ring, dan fastener.<br/>Untuk setiap kebutuhan teknik Anda.</p></div>
        <nav aria-label="Navigasi footer"><h3>Jelajahi</h3><a href="#home">Home</a><a href="#produk">Produk</a><a href="#tentang">Tentang Kami</a></nav>
        <nav aria-label="Kategori footer"><h3>Kategori produk</h3><div className="footer-categories">{categories.map(c => <button key={c} onClick={() => choose(c)}>{c}</button>)}</div></nav>
        <div className="footer-contact"><h3>Mari terhubung</h3><button onClick={contact}><MessageCircle size={17}/>WhatsApp admin</button><p>{store.whatsappConfigured ? `+${store.whatsapp}` : 'Kontak admin belum dikonfigurasi.'}<br/>Pemesanan mengikuti konfirmasi stok.</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Tacsys Fitment.</span><span>Katalog demo · Harga dan spesifikasi merupakan data contoh.</span></div>
    </div></footer>
  );
}
