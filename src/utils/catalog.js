export const startingPrice = product => Math.min(...product.variants.map(variant => variant.price));
export function filterProducts(products, query = '', category = 'Semua', sort = 'featured') {
  const term = query.toLocaleLowerCase('id-ID').trim();
  return products.filter(product => product.name.toLocaleLowerCase('id-ID').includes(term) && (category === 'Semua' || product.category === category)).sort((a, b) => {
    if (sort === 'lowest') return startingPrice(a) - startingPrice(b);
    if (sort === 'highest') return startingPrice(b) - startingPrice(a);
    return Number(b.featured) - Number(a.featured);
  });
}
