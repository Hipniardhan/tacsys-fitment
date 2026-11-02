import { publicAsset } from '../utils/assets';

export default function ProductImage({ product, ...props }) {
  return <img {...props} src={publicAsset(product.image)} alt={`Ilustrasi ${product.name}`} loading="lazy" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = publicAsset('/images/products/bolt.svg'); }} />;
}
