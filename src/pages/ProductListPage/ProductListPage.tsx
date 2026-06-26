import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { ProductCard } from '../../features/products/components/ProductCard';
import { useProducts } from '../../features/products/hooks/useProducts';
import { useInfiniteScroll } from '../../shared/hooks/useInfiniteScroll';
import './ProductListPage.css';

const PAGE_SIZE = 20;

export function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { products, isLoading, error, reload } = useProducts();

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) => {
      const brand = product.brand.toLowerCase();
      const model = product.model.toLowerCase();

      return brand.includes(normalizedSearch) || model.includes(normalizedSearch);
    });
  }, [products, searchTerm]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchTerm]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  function loadMore() {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }

  const sentinelRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <section className="list-view" aria-labelledby="product-list-title">
      <div className="list-view__toolbar">
        <div>
          <span className="list-view__label">LIST VIEW</span>
          <h1 id="product-list-title">Listado de productos</h1>
        </div>

        <div className="list-view__search">
          <label htmlFor="product-search">SEARCH</label>
          <input
            id="product-search"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Marca o modelo"
            type="search"
            value={searchTerm}
          />
        </div>
      </div>

      {isLoading && <p className="list-view__state">Cargando productos...</p>}
      {!isLoading && error && (
        <div className="list-view__state list-view__state--error">
          <p>{error}</p>
          <button className="list-view__retry" type="button" onClick={reload}>
            Reintentar
          </button>
        </div>
      )}
      {!isLoading && !error && filteredProducts.length === 0 && (
        <p className="list-view__state">No hay productos que coincidan con la búsqueda.</p>
      )}

      {!isLoading && !error && filteredProducts.length > 0 && (
        <>
          <div className="list-view__grid" aria-label="Listado de productos">
            {visibleProducts.map((product) => (
              <Link className="product-card-link" key={product.id} to={'/products/' + product.id}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>

          {hasMore && (
            <div ref={sentinelRef} className="list-view__sentinel" aria-hidden="true">
              <span className="list-view__sentinel-spinner" />
              Cargando más productos...
            </div>
          )}
        </>
      )}
    </section>
  );
}
