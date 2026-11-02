import { Minus, Plus } from 'lucide-react';
export default function Quantity({ value, onChange, id = 'quantity' }) {
  return <div className="quantity"><button aria-label="Kurangi jumlah" disabled={Number(value) <= 1} onClick={() => onChange(Math.max(1, Number(value) - 1))}><Minus size={15}/></button><input id={id} aria-label="Jumlah pembelian" type="number" min="1" max="99999" step="1" value={value} onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))} onBlur={() => { if (!Number.isSafeInteger(Number(value)) || Number(value) < 1 || Number(value) > 99999) onChange(1); }}/><button aria-label="Tambah jumlah" disabled={Number(value) >= 99999} onClick={() => onChange(Math.min(99999, Number(value) + 1))}><Plus size={15}/></button></div>;
}
