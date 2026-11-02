# Tacsys Fitment

Katalog e-commerce React + Vite (JavaScript), Tailwind CSS v4, dan Lucide React. Keranjang memakai Context API dan localStorage. Proyek lokal ini tidak memakai backend.

## Menjalankan

```sh
npm install
npm run dev
```

Buka URL lokal yang dicetak Vite (http://127.0.0.1:5173/tacsys-fitment/).

```sh
npm test
npm run build
npm run preview
```

Build produksi ada di `dist/`. Host sebagai static site.

## Deploy ke GitHub Pages

Di repository GitHub, buka **Settings → Pages → Build and deployment → Source → GitHub Actions**. Workflow `.github/workflows/deploy.yml` berjalan saat push ke `main` atau melalui **Actions → Deploy Vite to GitHub Pages → Run workflow**. Workflow menjalankan `npm ci`, `npm run build`, lalu mengunggah dan men-deploy hanya folder `dist/`.

Vite memakai `base: '/tacsys-fitment/'`. Semua gambar public memakai helper `publicAsset` dengan `import.meta.env.BASE_URL` agar URL gambar mengikuti subfolder yang sama. Tidak ada React Router sehingga tidak diperlukan basename atau fallback route. JavaScript dan CSS hasil build otomatis mengikuti base Vite. Jangan men-deploy `index.html` source atau memilih root branch sebagai sumber Pages: source memuat `/src/main.jsx` yang belum dikompilasi.

Workflow memeriksa `dist/index.html` sebelum upload dengan `node scripts/verify-build.mjs`: entry harus menunjuk JavaScript dan CSS production di `/tacsys-fitment/assets/`, tanpa referensi source React, dan semua aset harus tersedia. Hanya gunakan satu workflow deployment ini. Jika sebelumnya memakai **Deploy from a branch**, ubah Source ke **GitHub Actions** agar deployment bawaan branch tidak menerbitkan source root. Jangan menambahkan workflow Jekyll atau static HTML yang mengunggah direktori `.`. Concurrency `pages` membatasi deployment workflow ini agar tidak berjalan bersamaan.

Untuk memeriksa build lokal, jalankan `npm run build` dan `npm run preview`, lalu buka `http://127.0.0.1:4173/tacsys-fitment/`. Jika nama repository diganti lagi, sesuaikan base Vite.

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
