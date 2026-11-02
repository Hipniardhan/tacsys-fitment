export const categories = ['Baut', 'Mur', 'Ring / Washer', 'Sekrup', 'Dynabolt', 'Fastener Lainnya'];
const entries = [
  ['baut-hex', 'Baut Hexagonal', 'Baut', 'Baut kepala segi enam untuk sambungan konstruksi dan pekerjaan teknik. Material baja dengan finishing zinc.', 'bolt', 2500, ['M8 x 30', 'M10 x 50', 'M12 x 60']],
  ['baut-allen', 'Baut L Socket', 'Baut', 'Kepala socket untuk sambungan pada mesin dan area dengan ruang kerja terbatas.', 'socket', 3000, ['M6 x 20', 'M8 x 30', 'M10 x 40']],
  ['mur-hex', 'Mur Hexagonal', 'Mur', 'Mur segi enam untuk pasangan baut dengan diameter ulir yang sesuai.', 'nut', 800, ['M6', 'M8', 'M10']],
  ['ring-flat', 'Ring Plat Stainless', 'Ring / Washer', 'Ring datar untuk membantu menyebarkan beban pada permukaan sambungan.', 'washer', 500, ['M6', 'M8', 'M10']],
  ['sekrup-jp', 'Sekrup JP Stainless', 'Sekrup', 'Sekrup kepala pan dengan alur plus untuk perakitan dan kebutuhan teknik ringan.', 'screw', 750, ['M4 x 20', 'M5 x 25', 'M6 x 30']],
  ['dynabolt', 'Dynabolt Anchor', 'Dynabolt', 'Angkur ekspansi untuk pemasangan pada beton. Sesuaikan ukuran dan beban dengan kebutuhan aplikasi.', 'anchor', 4500, ['M8 x 65', 'M10 x 80', 'M12 x 100']],
  ['baut-carriage', 'Baut Carriage', 'Baut', 'Baut kepala bulat dengan leher persegi untuk sambungan kayu dan komponen logam.', 'bolt', 2800, ['M8 x 40', 'M10 x 60', 'M12 x 80']],
  ['mur-nylon', 'Mur Nylon Lock', 'Mur', 'Mur dengan sisipan nylon untuk membantu menahan kelonggaran sambungan.', 'nut', 1500, ['M6', 'M8', 'M10']],
  ['ring-spring', 'Ring Per / Spring Washer', 'Ring / Washer', 'Ring per untuk kebutuhan penguncian pada rakitan baut dan mur.', 'washer', 600, ['M6', 'M8', 'M10']],
  ['sekrup-drilling', 'Sekrup Self Drilling', 'Sekrup', 'Sekrup ujung bor untuk pekerjaan lembaran logam. Kemasan berisi 50 pcs.', 'screw', 25000, ['12 x 25 mm', '12 x 35 mm', '12 x 50 mm'], 'pack'],
  ['anchor-bolt', 'Baut Angkur L', 'Dynabolt', 'Baut angkur berbentuk L untuk kebutuhan penanaman pada konstruksi beton.', 'anchor', 16000, ['M12 x 200', 'M16 x 300', 'M20 x 400']],
  ['threaded-rod', 'As Drat / Threaded Rod', 'Fastener Lainnya', 'Batang ulir sepanjang 1 meter untuk gantungan, perakitan, dan kebutuhan instalasi.', 'rod', 18000, ['M8 x 1000', 'M10 x 1000', 'M12 x 1000']],
];
export const products = entries.map(([id, name, category, description, art, price, labels, unit = 'pcs'], index) => ({
  id, name, category, description, image: `/images/products/${art}.svg`, featured: index < 6,
  variants: labels.map((label, i) => ({ id: `${id}-${i + 1}`, label, price: price + Math.round(price * i * 0.65 / 100) * 100, unit })),
}));
