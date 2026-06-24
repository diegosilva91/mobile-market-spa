import './ProductListPage.css';

const placeholderCards = ['Imagen', 'Marca', 'Modelo', 'Precio'];

export function ProductListPage() {
  return (
    <section className="page-section" aria-labelledby="product-list-title">
  

      <div className="search-placeholder" aria-label="Buscador pendiente de integración">
        <label htmlFor="product-search">Buscar por marca o modelo</label>
        <input
          id="product-search"
          disabled
          placeholder="Se habilitará al integrar la API"
          type="search"
        />
      </div>

      <div className="product-grid-placeholder" aria-label="Estructura del listado de productos">
        {placeholderCards.map((label) => (
          <article className="product-card-placeholder" key={label}>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
