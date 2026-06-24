import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="list-view" aria-labelledby="not-found-title">
      <div className="list-view__toolbar">
        <div>
          <span className="list-view__label">Ruta no encontrada</span>
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
