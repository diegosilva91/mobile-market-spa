import type { ProductListItem } from '../types/product.types';

type ProductCardProps = {
  product: ProductListItem;
};

export function ProductCard({ product }: ProductCardProps) {
  const normalizedPrice = product.price.trim();

  return (
    <article className="product-card">
      <img
        src={product.imageUrl}
        alt={`${product.brand} ${product.model}`}
        className="product-card__image"
        loading="lazy"
      />
      <p className="product-card__brand">{product.brand}</p>
      <h2 className="product-card__model">{product.model}</h2>
      <p className="product-card__price">{normalizedPrice || 'Precio no disponible'}</p>
    </article>
  );
}
