import type { ProductListItem } from '../types/product.types';

type ProductCardProps = {
  product: ProductListItem;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <span>ITEM</span>
      <p>{product.brand}</p>
      <h2>{product.model}</h2>
      <p>{product.price}</p>
    </article>
  );
}
