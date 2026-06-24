import { Link, useParams } from 'react-router-dom';

import './ProductDetailPage.css';

export function ProductDetailPage() {
  const { productId = 'pendiente' } = useParams();

  return (
    <section className="detail-section" aria-labelledby="product-detail-title">
      <Link className="back-link" to="/">
        ← Volver al listado
      </Link>

      <div className="detail-layout">
        <div className="product-image-placeholder" aria-label="Imagen de producto pendiente">
          Imagen del producto
        </div>

        <article className="detail-panel">
          <p className="detail-panel__eyebrow">Vista de detalle</p>
          <h1 id="product-detail-title">Detalle de producto</h1>
          <p>
            Ruta preparada para cargar el producto con identificador{' '}
            <strong>{productId}</strong>, mostrar su descripción técnica y permitir
            seleccionar almacenamiento y color antes de añadirlo al carrito.
          </p>

          <div className="actions-placeholder" aria-label="Acciones pendientes de integración">
            <label>
              Almacenamiento
              <select disabled>
                <option>Se cargará desde la API</option>
              </select>
            </label>
            <label>
              Color
              <select disabled>
                <option>Se cargará desde la API</option>
              </select>
            </label>
            <button disabled type="button">
              Añadir al carrito
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
