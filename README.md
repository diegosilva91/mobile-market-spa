# Mobile Market SPA

Prueba técnica front-end para una miniaplicación de compra de dispositivos móviles.

La aplicación se desarrollará como una SPA de cliente usando React, TypeScript y Vite. El objetivo es implementar dos vistas principales: una página de listado de productos y una página de detalle de producto, incluyendo integración con API, búsqueda de productos, interacción con carrito y caché en cliente.

## Estado del proyecto

Este repositorio se implementará de forma progresiva mediante commits pequeños, para que cada hito pueda revisarse de manera independiente. Con eso se puede ver la evolución histórica del proyecto a media que se van completando los avances.

## Requisitos principales

Los requisitos que se piden son los siguientes:
- Construir una SPA sin SSR.
- Usar React o Preact.
- Implementar dos vistas:
  - Página de listado de productos.
    - Página donde se visualizará la lista de los productos.
    - En esta página, se mostrarán todos los elementos que nos devuelve la petición del API.
    - Permitirá el filtrado del contenido en función del criterio de búsqueda que el usuario introduzca.
    - Al seleccionar un producto, deberá navegar a los detalles del mismo.
    - Se mostrarán un máximo de cuatro elementos por fila, y que sea adaptativo según la resolución.
  - Página de detalle de producto.
    - Esta página se dividirá en dos columnas:
      - En la primera se mostrará el componente de la imagen del producto.
      - En la segunda, se mostrará los detalles y las acciones del producto.
    - Deberá mostrar un link para navegar de vuelta a la lista de productos.
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
- DESCRIPCIÓN DE LOS COMPONENTES
Cabecera (HEADER):
• El título o el icono de la aplicación, actuará como enlace a la vista principal.
• Se mostrará un breadcrumbs, mostrando la página donde se encuentra el 
usuario, así como un link para su navegación.
• En la parte derecha de la cabecera, se mostrará el número de ítems que se 
hayan añadido al carrito.
Barra de búsqueda (SEARCH):
• Se mostrará un input al usuario, el permitirá la introducción de una cadena de 
texto.
• El usuario deberá filtrar los productos en función del texto introducido, y se 
comparará con la Marca y el Modelo de los productos.
• El filtrado, será en tiempo real, es decir, se lanzará una búsqueda cada vez que el 
usuario cambie los criterios de búsqueda.
Elemento lista (ITEM):
• Se mostrará la siguiente información del producto:
o Imagen
o Marca
o Modelo
o Precio
Imagen Producto (IMAGE):
• Se visualizará la imagen del producto
Descripción Producto (DESCRIPTION):
• Se mostrará los detalles asociados a los productos. Se mostrarán al menos los 
siguientes atributos:
o Marca
o Modelo
o Precio
o CPU
o RAM
o Sistema Operativo
o Resolución de pantalla
o Batería
o Cámaras
o Dimensiones
o Peso
Acciones Producto (ACTIONS):
• Se mostrarán dos tipos de selectores, donde el usuario, podrá seleccionar el 
tipo de producto que quiere añadir a la cesta. Se mostrarán los selectores de 
opciones para los siguientes atributos:
o Almacenamiento
o Colores
• Aunque solo exista una opción, se mostrará el selector con la información. Para 
este caso de uso, deberá estar seleccionado por defecto.
• Se visualizará un botón de Añadir, donde el usuario, una vez seleccionada las 
opciones, añadirá el producto a la cesta.
• Al añadir un producto mediante el API, se requiere mandar la siguiente 
información:
o El identificador del producto.
o El código de color seleccionado.   

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
