# Tacsys Fitment

Katalog e-commerce React + Vite (JavaScript), Tailwind CSS v4, dan Lucide React. Keranjang memakai Context API dan localStorage. Proyek lokal ini tidak memakai backend.

## Menjalankan

```sh
npm install
npm run dev
```

Buka URL lokal yang dicetak Vite (default http://127.0.0.1:5173).

```sh
npm test
npm run build
npm run preview
```

Build produksi ada di `dist/`. Host sebagai static site.

## Struktur

```text
public/images/products/   Ilustrasi SVG lokal
src/assets/              Tempat aset impor tambahan
src/components/          Header, katalog, dialog, keranjang, kontrol jumlah
src/pages/               Bagian halaman utama
src/context/             State dan persistensi keranjang
src/hooks/               Fokus dialog, Escape, scroll lock
src/data/products.js     Data produk dan varian
src/config/store.js      Konfigurasi toko dan WhatsApp
src/utils/               Validasi cart, filter, formatter, pesan WhatsApp
tests/                   Pengujian logika dengan Node test runner
DESIGN.md                Arah visual dan alasan desain
```

## Mengganti produk dan harga

Edit `src/data/products.js`. Setiap produk mempunyai id, name, category, description, image, variants, dan featured. Harga tiap varian harus angka dalam rupiah. ID produk dan ID varian harus stabil dan unik. Pertahankan ID bila hanya mengubah harga agar keranjang lama tetap cocok. Harga keranjang selalu dihitung ulang dari katalog; data harga dari localStorage diabaikan.

Ganti ilustrasi dengan foto lokal di `public/images/products/` dan ubah properti `image`. Sesuaikan label “Ilustrasi produk” di komponen terkait bila menggunakan foto asli. Data dan spesifikasi saat ini merupakan contoh, bukan penawaran stok nyata. Plus pada kartu memasukkan 1 unit varian pertama; gunakan detail untuk memilih ukuran lain.

## Nomor WhatsApp admin

Edit `src/config/store.js`:

```js
whatsapp: '6281234567890', // ganti dengan nomor admin asli, tanpa + atau spasi
whatsappConfigured: true,
```

Nilai bawaan adalah placeholder dan tidak membuka nomor sembarang. Nomor harus diawali 628 serta memiliki 10–14 digit. Pesan memakai `encodeURIComponent`; checkout tidak menghapus keranjang dan tidak mengirim pesan secara otomatis. Pelanggan mengirim sendiri di WhatsApp.

## Perilaku keranjang

Key penyimpanan: `tacsys-fitment-cart`. Hanya productId, variantId, dan quantity yang disimpan. JSON rusak, produk/varian hilang, dan jumlah tidak valid diabaikan. Batas jumlah tiap varian 1–99.999 unit. Penggabungan berhenti di batas tersebut. Jika penyimpanan browser ditolak, keranjang tetap bekerja selama sesi halaman dan menampilkan informasi di drawer.

## Pengujian dan batasan

Pengujian otomatis mencakup filter, pencarian, sort harga, identitas varian, JSON rusak, persistensi serialisasi, validasi jumlah, kalkulasi harga dari katalog, dan format URL/pesan WhatsApp. Lihat `QA.md` untuk hasil validasi.

Belum tersedia: stok real-time, akun, pembayaran online, perhitungan ongkir, serta pengelolaan katalog melalui admin. Fitur tersebut di luar lingkup brief. Nomor admin, foto asli, harga, dan spesifikasi perlu diganti sebelum dipakai menerima pesanan nyata.
