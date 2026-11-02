import { money } from './cart.js';
import { store } from '../config/store.js';
export function orderMessage(items) {
  return `Halo Admin Tacsys Fitment,\nSaya ingin melakukan pemesanan:\n\n${items.map((item, i) => `${i + 1}. ${item.product.name}\n   Ukuran: ${item.variant.label}\n   Harga: ${money(item.variant.price)}\n   Jumlah: ${item.quantity} ${item.variant.unit}\n   Subtotal: ${money(item.subtotal)}`).join('\n\n')}\n\nTotal Pesanan: ${money(items.reduce((sum, item) => sum + item.subtotal, 0))}\n\nMohon konfirmasi ketersediaan stok dan biaya pengiriman. Terima kasih.`;
}
export function whatsappUrl(message, config = store) {
  if (!config.whatsappConfigured || !/^628\d{7,11}$/.test(config.whatsapp)) throw new Error('Nomor WhatsApp admin belum dikonfigurasi. Silakan kembali setelah kontak toko tersedia.');
  return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
}
