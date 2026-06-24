import './App.css';

const plannedMilestones = [
  'Listado de productos con búsqueda en tiempo real',
  'Detalle de producto con descripción y acciones',
  'Integración con API, carrito y caché en cliente',
];

export function App() {
  return (
    <main className="app-shell">
      <section className="hero-card" aria-labelledby="app-title">
        <p className="eyebrow">Prueba técnica front-end</p>
        <h1 id="app-title">Mobile Market SPA</h1>
        <p className="hero-copy">
          Base React, TypeScript y Vite preparada para implementar la compra de
          dispositivos móviles como SPA de cliente.
        </p>

        <ul className="milestone-list" aria-label="Próximos hitos del proyecto">
          {plannedMilestones.map((milestone) => (
            <li key={milestone}>{milestone}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
