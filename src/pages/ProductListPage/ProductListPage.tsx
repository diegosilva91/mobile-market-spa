import './ProductListPage.css';

const placeholderItems = Array.from({ length: 8 }, (_, index) => `ITEM ${index + 1}`);

export function ProductListPage() {
  return (
    <section className="list-view" aria-labelledby="product-list-title">
      <div className="list-view__toolbar">
        <div>
          <span className="list-view__label">LIST VIEW</span>
          <h1 id="product-list-title">Listado de productos</h1>
        </div>

        <div className="list-view__search" aria-label="Buscador pendiente de integración">
          <label htmlFor="product-search">SEARCH</label>
          <input
            id="product-search"
            disabled
            placeholder="Marca o modelo"
            type="search"
          />
        </div>
      </div>

      <div className="list-view__grid" aria-label="Estructura del listado de productos">
        {placeholderItems.map((item) => (
          <article className="list-view__item" key={item}>
            <span>{item}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
