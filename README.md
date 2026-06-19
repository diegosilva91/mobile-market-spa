# Mobile Market SPA

Prueba técnica front-end para una miniaplicación de compra de dispositivos móviles.

La aplicación se desarrollará como una SPA de cliente usando React, TypeScript y Vite. El objetivo es implementar dos vistas principales: una página de listado de productos y una página de detalle de producto, incluyendo integración con API, búsqueda de productos, interacción con carrito y caché en cliente.

## Estado del proyecto

Este repositorio se implementará de forma progresiva mediante commits pequeños, para que cada hito pueda revisarse de manera independiente.

## Requisitos principales

- Construir una SPA sin SSR.
- Usar React o Preact.
- Implementar dos vistas:
  - Página de listado de productos.
  - Página de detalle de producto.
- Mostrar todos los productos devueltos por la API.
- Filtrar productos en tiempo real por marca y modelo.
- Navegar desde una tarjeta de producto hacia su página de detalle.
- Mostrar un máximo de cuatro productos por fila, adaptándose a la resolución de pantalla.
- Incluir una cabecera con:
  - Título o logo de la aplicación enlazando a la vista principal.
  - Navegación mediante breadcrumbs.
  - Contador de productos añadidos al carrito.
- Mostrar imagen, descripción y acciones del producto en la vista de detalle.
- Permitir acciones sobre el producto, como seleccionar opciones y añadirlo al carrito.
- Cachear datos de la API en el cliente durante una hora.
- Incluir los scripts obligatorios del proyecto:
  - `start`
  - `build`
  - `test`
  - `lint`

## Stack planificado

- React.
- TypeScript.
- Vite.
- React Router DOM.
- Vitest.
- React Testing Library.
- CSS estructurado o CSS Modules.
- GitHub Actions para validación CI.

## Arquitectura planificada

```text
src/
├── app/
├── pages/
├── features/
│   ├── products/
│   └── cart/
├── shared/
└── test/
```

El proyecto seguirá una estructura orientada por funcionalidades para mantener componentes de UI, hooks, servicios, tipos y tests cerca de su dominio.

## Estrategia de API

La aplicación consumirá la API proporcionada por la prueba técnica a través de una capa de servicios dedicada. El acceso a la API no quedará acoplado directamente a los componentes visuales.

Endpoints previstos:

```text
GET /api/product
GET /api/product/:id
POST /api/cart
```

## Estrategia de caché

El listado de productos y los detalles de producto se cachearán en el navegador durante una hora. La operación de carrito no se cacheará porque modifica estado en servidor.

## Comandos de desarrollo

Estos comandos estarán disponibles cuando el proyecto quede inicializado:

```bash
npm install
npm run start
npm run build
npm run test
npm run lint
```

## Decisiones técnicas

- Usar TypeScript para hacer más seguros los contratos de API y el estado de UI.
- Mantener el enrutado únicamente en cliente, tal como exige la prueba.
- Evitar librerías de estado global innecesarias, ya que la aplicación solo necesita un estado pequeño para el contador del carrito.
- Mantener la lógica de caché explícita para cumplir claramente el requisito de la prueba.
- Añadir tests centrados en comportamiento de negocio, no solo en detalles de implementación.

## Enfoque de entrega

El repositorio evolucionará mediante commits pequeños:

1. README inicial.
2. Configuración de React y TypeScript.
3. Configuración de linting y testing.
4. Routing y layout de la aplicación.
5. Cliente API, contratos y caché.
6. Listado de productos y búsqueda.
7. Detalle de producto y flujo de carrito.
8. Tests, accesibilidad, rendimiento y CI.
