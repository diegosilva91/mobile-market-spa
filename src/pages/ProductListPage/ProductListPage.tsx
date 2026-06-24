import './ProductListPage.css';

const placeholderCards = ['Imagen', 'Marca', 'Modelo', 'Precio'];

export function ProductListPage() {
  return (
    <section className="page-section" aria-labelledby="product-list-title">
      <div className="page-section__header">
        <div>
          <p className="page-section__eyebrow">Vista principal</p>
          <h1 id="product-list-title">Listado de productos</h1>
          <p>
            Ruta preparada para mostrar los dispositivos móviles, aplicar búsqueda
            por marca/modelo y navegar al detalle de cada producto.
          </p>
        </div>
        <span className="route-badge">/</span>
      </div>

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
