# Mobile Market SPA

Prueba técnica front-end para una miniaplicación de compra de dispositivos móviles.

La aplicación está desarrollada como una SPA de cliente usando React, TypeScript y Vite. Implementa dos vistas principales: listado de productos y detalle de producto, con integración de API, búsqueda, selección de opciones y flujo de carrito.

## Requisitos principales

- SPA sin SSR.
- React con TypeScript.
- Listado de productos obtenido desde API.
- Filtrado en tiempo real por marca y modelo.
- Navegación desde producto hacia su detalle.
- Detalle con información técnica y acciones.
- Selectores de almacenamiento y color.
- Añadir al carrito mediante API.
- Contador de carrito en cabecera.
- Scripts obligatorios: `start`, `build`, `test` y `lint`.
- CI con GitHub Actions.

## Comandos

```bash
npm install
npm run start
npm run build
npm run test
npm run lint
```

## Variables de entorno

Crear un archivo `.env` a partir de `.env.example`:

```bash
VITE_API_BASE_URL=https://itx-frontend-test.onrender.com
VITE_CACHE_TTL_MS=3600000
```

## Endpoints usados

```text
GET /api/product
GET /api/product/:id
POST /api/cart
```

Para añadir al carrito se envía el identificador del producto, el código de color y el código de almacenamiento seleccionado.

## Arquitectura

```text
src/
├── app/
├── features/
│   ├── cart/
│   └── products/
├── pages/
├── shared/
└── test/
```

## Decisiones técnicas

- La aplicación se organiza por dominios funcionales.
- El acceso a API se encapsula en servicios.
- El listado filtra en cliente para evitar llamadas innecesarias.
- El layout mantiene el contador del carrito y lo comparte con la vista de detalle.
- La caché queda encapsulada tras una función dedicada para poder mejorar su implementación sin tocar las pantallas.

## Historial de entrega

El proyecto se ha implementado mediante commits pequeños y revisables:

1. README inicial.
2. Base React, TypeScript y Vite.
3. Routing y layout.
4. Maquetación alineada con las capturas.
5. API, contratos y servicios base.
6. Listado real y búsqueda.
7. Detalle y selectores.
8. Flujo de carrito.
9. CI, documentación y limpieza.
