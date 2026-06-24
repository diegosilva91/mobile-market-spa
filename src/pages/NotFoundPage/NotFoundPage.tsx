import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="page-section" aria-labelledby="not-found-title">
      <div className="page-section__header">
        <div>
          <p className="page-section__eyebrow">Ruta no encontrada</p>
          <h1 id="not-found-title">Página no encontrada</h1>
          <p>La ruta solicitada no existe dentro de la SPA.</p>
          <p>
            <Link to="/">Volver al listado de productos</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
