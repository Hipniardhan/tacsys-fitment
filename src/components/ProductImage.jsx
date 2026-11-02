export default function ProductImage({ product, ...props }) {
  return <img {...props} src={product.image} alt={`Ilustrasi ${product.name}`} loading="lazy" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/products/bolt.svg'; }} />;
}
