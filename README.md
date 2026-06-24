# Mobile Market SPA

Prueba técnica front-end para una miniaplicación de compra de dispositivos móviles.

La aplicación se desarrollará como una SPA de cliente usando React, TypeScript y Vite. El objetivo es implementar dos vistas principales: un listado de productos y una página de detalle, con integración con API, búsqueda, carrito y caché en cliente.

## Estado del proyecto

El repositorio se implementará de forma progresiva mediante commits pequeños, de modo que cada hito pueda revisarse de forma independiente y quede claro el avance del proyecto.

## Requisitos principales

### Alcance funcional

- Construir una SPA sin SSR.
- Usar React o Preact.
- Mostrar todos los productos devueltos por la API.
- Filtrar productos en tiempo real por marca y modelo.
- Navegar desde una tarjeta de producto a su página de detalle.
- Cachear los datos de la API en el cliente durante una hora.
- Incluir una cabecera con:
  - Título o logo de la aplicación enlazando a la vista principal.
  - Navegación mediante breadcrumbs.
  - Contador de productos añadidos al carrito.
- Incluir los scripts obligatorios del proyecto:
  - `start`
  - `build`
  - `test`
  - `lint`

### Vistas principales

#### Listado de productos

- Mostrar la lista completa de productos obtenidos del API.
- Permitir el filtrado del contenido según el criterio de búsqueda introducido por el usuario.
- Mostrar un máximo de cuatro elementos por fila.
- Adaptar el número de columnas según la resolución de pantalla.
- Al seleccionar un producto, navegar a su detalle.

#### Detalle de producto

- Dividir la vista en dos columnas.
- Mostrar en la primera columna la imagen del producto.
- Mostrar en la segunda los detalles y las acciones del producto.
- Incluir un enlace para volver al listado de productos.
- Mostrar imagen, descripción y acciones del producto.
- Permitir acciones como seleccionar opciones y añadir el producto al carrito.

## Descripción de componentes

### Cabecera

- El título o icono de la aplicación actúa como enlace a la vista principal.
- Se muestra un breadcrumb con la página actual y su enlace de navegación.
- En la parte derecha se muestra el número de ítems añadidos al carrito.

### Barra de búsqueda

- Se muestra un input para introducir texto.
- El filtrado se hace sobre marca y modelo.
- La búsqueda es en tiempo real, ejecutándose cada vez que cambia el criterio de búsqueda.

### Elemento de lista

- Imagen.
- Marca.
- Modelo.
- Precio.

### Imagen de producto

- Se visualiza la imagen del producto.

### Descripción de producto

- Se muestran los detalles del producto, como mínimo:
  - Marca.
  - Modelo.
  - Precio.
  - CPU.
  - RAM.
  - Sistema operativo.
  - Resolución de pantalla.
  - Batería.
  - Cámaras.
  - Dimensiones.
  - Peso.

### Acciones de producto

- Se muestran selectores para los atributos:
  - Almacenamiento.
  - Colores.
- Aunque solo exista una opción, el selector debe mostrarse igualmente y quedar seleccionado por defecto.
- Se muestra un botón de añadir para incorporar el producto a la cesta.
- Al añadir un producto mediante la API, se envía:
  - El identificador del producto.
  - El código de color seleccionado.

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

La aplicación consumirá la API de la prueba técnica a través de una capa de servicios dedicada. El acceso a la API no quedará acoplado directamente a los componentes visuales.

### Endpoints previstos

```text
GET /api/product
GET /api/product/:id
POST /api/cart
```

## Estrategia de caché

El listado de productos y los detalles de producto se cachearán en el navegador durante una hora. La operación de carrito no se cacheará porque modifica el estado en servidor.

## Comandos de desarrollo

```bash
npm install
npm run start
npm run build
npm run test
npm run lint
```

## Decisiones técnicas

- Usar TypeScript para reforzar los contratos de API y el estado de UI.
- Mantener el enrutado solo en cliente, tal como exige la prueba.
- Evitar librerías de estado global innecesarias, ya que la aplicación solo necesita un estado pequeño para el contador del carrito.
- Mantener explícita la lógica de caché para cumplir con claridad el requisito.
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
