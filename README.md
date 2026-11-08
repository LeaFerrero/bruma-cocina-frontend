# Bruma Cocina — Frontend

Interfaz web del sistema de gestión de Bruma Cocina, una Dark Kitchen ubicada en Palermo Hollywood que elabora y vende viandas selladas al vacío y refrigeradas.

El sistema centraliza la gestión de pedidos, inventario, producción y cobros. Este repositorio contiene el frontend (SPA en React), que se comunica con el backend mediante una API REST y recibe avisos en tiempo real mediante Socket.IO.

- Aplicación desplegada: https://bruma-cocina.onrender.com/
- Repositorio del backend: [bruma-cocina-backend](https://github.com/LeaFerrero/bruma-cocina-backend)

> Proyecto Integrador del Equipo Orión — Tecnicatura Superior en Desarrollo de Software a Distancia, IFTS N.º 29, Comisión D (2026). Más detalle en el Manual Técnico.

## Funcionalidades

### Sitio público

- Página de inicio y «Quiénes somos».
- Catálogo de viandas con filtro por categoría.
- Carrito de compras persistente y checkout sin necesidad de iniciar sesión.
- No se pueden agregar al carrito ni confirmar viandas sin stock suficiente.

### Panel de gestión

El panel está protegido por inicio de sesión y tiene cuatro roles: `admin`, `cocina`, `caja` y `stock`.

| Módulo     | Descripción                                                                                   | Roles con acceso |
| ---------- | --------------------------------------------------------------------------------------------- | ---------------- |
| Cocina     | Listado de comandas, despacho y cancelación (la cancelación devuelve el stock de viandas).    | admin, cocina    |
| Producción | Registro de viandas elaboradas: descuenta insumos de la receta y suma stock de viandas.       | admin, cocina    |
| Caja       | Registro del cobro de pedidos según el medio de pago.                                         | admin, caja      |
| Viandas    | Alta, edición y baja lógica de viandas, con receta, categorías e imagen.                      | admin, stock     |
| Insumos    | Alta, edición, baja lógica e ingreso de stock por lotes, con alertas de agotado y stock bajo. | admin, stock     |
| Usuarios   | Alta, edición y baja lógica de cuentas de empleados.                                          | admin            |

### Características generales

- Verificación de sesión al cargar la aplicación y revalidación al volver a la pestaña.
- Protección de rutas por rol.
- Formularios con validación (Zod) y errores junto a cada campo.
- Notificaciones de éxito y error (toast).
- Confirmación obligatoria antes de eliminar.
- Actualización automática de pantallas mediante Socket.IO.
- Componentes reutilizables de interfaz y navegación.

### Fuera de alcance de esta versión (MVP)

Apertura y cierre de caja, «Plato del Día», proveedores y facturas, punto de venta (POS), gestión de personal, informes avanzados, integraciones externas y resumen diario de caja.

## Tecnologías

| Tecnología               | Versión | Uso                                       |
| ------------------------ | ------- | ----------------------------------------- |
| React y React DOM        | ^19.2   | Construcción de interfaces y componentes. |
| Vite                     | ^8.3    | Entorno de desarrollo y compilación.      |
| React Router             | ^7.18   | Navegación y definición de rutas.         |
| Zod                      | ^4.6    | Validación de formularios.                |
| react-hot-toast          | ^2.6    | Notificaciones.                           |
| react-icons              | ^5.7    | Íconos.                                   |
| socket.io-client         | ^4.8    | Eventos en tiempo real.                   |
| CSS Modules y CSS global | —       | Estilos de la aplicación.                 |
| Fetch API                | —       | Comunicación con el backend.              |

## Requisitos

- Git y acceso al repositorio.
- Node.js 20.19 o superior (requisito de Vite 8) y npm.
- Backend de Bruma Cocina configurado y en ejecución.
- Un usuario válido en la base de datos utilizada por el backend.

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/LeaFerrero/bruma-cocina-frontend.git
cd bruma-cocina-frontend
```

Si el repositorio ya está clonado, abrir una terminal en su carpeta raíz.

### 2. Instalar las dependencias

```bash
npm ci
```

Este comando instala las dependencias de acuerdo con `package-lock.json`.

### 3. Configurar las variables de entorno

Copiar el archivo `.env.example` como `.env` en la raíz del repositorio, al mismo nivel que `package.json`, y completar la variable:

| Variable           | Descripción                                                                                                                                               | Valor de ejemplo        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `VITE_BACKEND_URL` | URL base del servidor backend. De ella salen la API (`/api`) y las imágenes de las viandas (`/uploads`). Si no se define, se usa `http://localhost:3000`. | `http://localhost:3000` |

Se escribe sin barra `/` al final y sin el prefijo `/api`: la aplicación lo agrega sola (`src/config/env.js`).

El archivo `.env` está excluido del control de versiones. Las variables con prefijo `VITE_` son accesibles desde el navegador y no deben contener contraseñas, claves privadas ni otros secretos.

### 4. Iniciar el backend

Iniciar el backend en una terminal independiente, siguiendo las instrucciones de su repositorio. La configuración local utiliza:

| Parámetro                                                    | Valor                   |
| ------------------------------------------------------------ | ----------------------- |
| Dirección del backend                                        | `http://localhost:3000` |
| Prefijo de la API                                            | `/api`                  |
| Origen permitido del frontend (`FRONTEND_URL` en el backend) | `http://localhost:5173` |

Para cargar los datos iniciales (un usuario por rol, 18 insumos y 2 viandas de ejemplo) se ejecuta `npm run seed` en el backend.

### 5. Iniciar el frontend

```bash
npm run dev
```

Abrir `http://localhost:5173`. La pantalla de acceso del personal está en:

`http://localhost:5173/gestion/login`

Si Vite utiliza otro puerto, el origen permitido en el backend (`FRONTEND_URL`) debe coincidir con la dirección utilizada por el frontend. Después de crear o modificar el archivo `.env`, detener y volver a iniciar Vite.

> **Importante:** la cookie de sesión se envía con la opción `secure`, por lo que en local la aplicación debe abrirse desde `http://localhost` (no desde una IP) y, en el sitio desplegado, por HTTPS.

### 6. Iniciar sesión

El script de carga inicial del backend crea un usuario por rol:

| Rol           | Usuario         |
| ------------- | --------------- |
| Administrador | `admin.admin`   |
| Cocina        | `cocina.cocina` |
| Caja          | `caja.caja`     |
| Stock         | `stock.stock`   |

Las contraseñas se definen en el `.env` del backend (`ADMIN_INIT_PASSWORD`, `COCINA_INIT_PASSWORD`, `CAJA_INIT_PASSWORD` y `STOCK_INIT_PASSWORD`). Las credenciales de prueba se detallan en el Manual Técnico; este repositorio no incluye contraseñas. El administrador puede crear más usuarios desde la pantalla **Usuarios**.

Los datos creados mediante la aplicación se almacenan en la base de datos configurada en el backend; no se sincronizan mediante Git ni GitHub.

## Comandos disponibles

| Comando           | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo.                  |
| `npm run build`   | Genera la versión de producción en `dist/`.        |
| `npm run preview` | Permite revisar localmente la versión compilada.   |
| `npm run lint`    | Ejecuta el análisis estático de código con ESLint. |
| `npm test`        | Ejecuta las pruebas unitarias (`node --test`).     |

Para revisar la compilación de producción:

```bash
npm run build
npm run preview
```

La vista previa también necesita acceso al backend para utilizar las funcionalidades del sistema.

## Organización del código

| Carpeta o archivo        | Contenido                                                                                                                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/`                | Recursos públicos.                                                                                                                                                                                                |
| `src/assets/img/`        | Imágenes del sitio: fondo principal y logos.                                                                                                                                                                      |
| `src/pages/`             | Una página por ruta: inicio, quiénes somos, catálogo, checkout, cocina, producción, insumos, viandas, usuarios e inicio de sesión.                                                                                |
| `src/features/`          | Un módulo por área de negocio: `auth`, `cart`, `catalog`, `checkout`, `kitchen`, `meals`, `production`, `supplies` y `users`. Cada uno tiene `components/` e `index.js` y, según el caso, `services/` y `utils/`. |
| `src/components/ui/`     | Componentes reutilizables sin lógica de negocio: botones, inputs, formularios, modales, listas editables, tarjetas, alertas y carrusel.                                                                           |
| `src/components/layout/` | Header, sidebar, footer, los tres layouts (público, gestión y login) y `ProtectedRoute`.                                                                                                                          |
| `src/context/`           | Estado global: `AuthContext` (sesión) y `CartContext` (carrito).                                                                                                                                                  |
| `src/services/`          | Infraestructura compartida: `apiClient.js` (cliente HTTP), `socket.js` (tiempo real) y `ordersApi.js`.                                                                                                            |
| `src/config/`            | `env.js`: lee `VITE_BACKEND_URL` y define las URL base del backend y de la API.                                                                                                                                   |
| `src/utils/`             | `AppError.js`, `dates.js` y `parsers.js` (conversión y formato de números).                                                                                                                                       |
| `src/styles/`            | `global.css`: estilos generales. Páginas y componentes tienen además su propio `.module.css`.                                                                                                                     |
| `src/App.jsx`            | Definición de rutas y montaje del `Toaster`.                                                                                                                                                                      |
| `src/main.jsx`           | Punto de entrada de la aplicación.                                                                                                                                                                                |
| `tests/`                 | Pruebas unitarias del frontend.                                                                                                                                                                                   |

## Rutas

### Públicas

| Ruta             | Descripción                    |
| ---------------- | ------------------------------ |
| `/`              | Inicio.                        |
| `/menu`          | Catálogo y carrito.            |
| `/nosotros`      | Quiénes somos.                 |
| `/gestion/login` | Inicio de sesión del personal. |

Cualquier ruta desconocida redirige a `/`.

### Protegidas

| Ruta                  | Pantalla                                   | Roles permitidos      |
| --------------------- | ------------------------------------------ | --------------------- |
| `/gestion`            | Redirección a la pantalla inicial del rol. | Cualquiera con sesión |
| `/gestion/cocina`     | Cocina                                     | admin, cocina         |
| `/gestion/produccion` | Producción                                 | admin, cocina         |
| `/gestion/caja`       | Caja                                       | admin, caja           |
| `/gestion/viandas`    | Viandas                                    | admin, stock          |
| `/gestion/insumos`    | Insumos                                    | admin, stock          |
| `/gestion/usuarios`   | Usuarios                                   | admin                 |

Un usuario sin el rol necesario no ve un error: `ProtectedRoute` lo envía a la pantalla inicial de su propio rol.

| Rol    | Pantalla inicial    |
| ------ | ------------------- |
| admin  | `/gestion/usuarios` |
| cocina | `/gestion/cocina`   |
| caja   | `/gestion/caja`     |
| stock  | `/gestion/insumos`  |

La restricción por rol en el frontend es solo de interfaz. La seguridad real está en el backend, que rechaza las peticiones sin la sesión o el rol requeridos.

## Sesión

La sesión se maneja con `AuthContext`:

- El token JWT está en una cookie `httpOnly` que el JavaScript del frontend no puede leer; el usuario vive solo en el estado de React.
- Al cargar la aplicación se llama a `verifySession`. Mientras tanto se muestra «Verificando sesión...».
- Se usa un indicador auxiliar en `localStorage` (`has_active_session`) para saber si corresponde mostrar el aviso de sesión vencida.
- Si el servidor responde 401, se limpia la sesión y, desde una pantalla de gestión, se redirige a `/gestion/login` (con `?expired=true` si había una sesión activa).
- Cuando la pestaña vuelve a estar visible se revalida la sesión.
- Al cerrar sesión se limpia el estado y se recarga la página en el login.

## Carrito de compras

Implementado en `CartContext` (`useCart`). Se guarda en `localStorage` con la clave `bruma_cart`, por lo que sobrevive a recargas y al cierre del navegador. Controla el stock disponible al agregar o cambiar cantidades. El total del carrito es solo informativo: al confirmar el pedido, el servidor vuelve a verificar el stock y calcula el total con los precios de la base de datos.

## Comunicación con la API

Todas las solicitudes pasan por `apiFetch` (`src/services/apiClient.js`), que:

- Antepone la URL base de la API (`config/env.js`).
- Envía `credentials: "include"` para adjuntar la cookie de sesión.
- Agrega `Content-Type: application/json`, salvo con `FormData` (subida de imágenes).
- Redirige a `/gestion/login` ante un 401 en pantallas de gestión (con `?expired=true` si había una sesión activa).
- Lanza un `AppError` con mensaje, estado, detalles por campo (`details`) y código interno (`errorCode`) ante errores del servidor.
- Si no hay conexión, lanza un `AppError` con «No se pudo conectar con el servidor» (503, `NETWORK_ERROR`).

Las respuestas exitosas tienen la forma `{ status, message, data }` y los errores `{ status, message, errorCode, details }`.

## Tiempo real

`src/services/socket.js` crea una única conexión de Socket.IO compartida por toda la aplicación. Eventos que emite el servidor:

| Evento               | Cuándo                                  |
| -------------------- | --------------------------------------- |
| `order-created`      | Se registra un pedido nuevo.            |
| `order-updated`      | Se despacha, cancela o cobra un pedido. |
| `production-updated` | Se registra producción.                 |
| `supplies-updated`   | Se ingresa stock de insumos.            |

## Validaciones y errores

Los formularios validan con Zod antes de enviar. Los números aceptan coma o punto decimal. Los errores de campo del servidor se muestran junto a su campo, los generales dentro del formulario o del modal, y los de carga de datos como toast. Cada error se muestra en un solo lugar.

## Pruebas

```bash
npm test
```

Son pruebas unitarias (15 de 15 aprobadas) que no requieren servicios externos: validación de insumos (`supplySchema`, `stockEntryListSchema`) y utilidades de parseo (`parseDecimal`, `parseInteger`, `formatForDisplay`).

## Problemas frecuentes

### Las solicitudes contienen `undefined` en la dirección

Comprobar que el archivo `.env` esté en la raíz del frontend y contenga `VITE_BACKEND_URL=http://localhost:3000`. Reiniciar Vite después de modificarlo.

### Aparece «No se pudo conectar con el servidor»

- Comprobar que el backend esté en ejecución.
- Comprobar que `VITE_BACKEND_URL` coincida con la dirección del backend.
- Comprobar que el backend permita el origen del frontend (`FRONTEND_URL`) y el uso de credenciales.

Consultar la pestaña **Red / Network** de las herramientas del navegador para identificar la solicitud que falla.

### La sesión no se mantiene en local

La cookie de sesión es `secure`: abrir la aplicación desde `http://localhost:5173` y no desde una dirección IP.

### Solo se muestra el inicio de sesión

Las pantallas de gestión requieren autenticación. Acceder a sus rutas sin sesión activa redirige al login.

### La primera carga del sitio desplegado demora

Si el servicio estuvo un tiempo sin uso, la primera carga puede tardar unos segundos.

## Limitaciones conocidas y mejoras futuras

- Extraer la lógica de las páginas a custom hooks dentro de cada feature.
- Los banners de alerta de stock, una vez cerrados, no reaparecen hasta recargar la página.
- No hay pruebas automáticas de interfaz.
- El mapa de rutas iniciales por rol está duplicado (`ProtectedRoute` usa textos fijos y `RoleBasedRedirect` usa las constantes `ROLES`); conviene centralizarlo.
- `initCart` no valida que el contenido de `localStorage` sea JSON válido; si se corrompe, la aplicación falla al iniciar.
- Modularizar `apiFetch`, que concentra varias responsabilidades.
- Agregar transiciones y animaciones en tarjetas y componentes.
- Compartir las constantes de negocio (roles, estados, unidades) con el backend en un paquete común.

## Enlaces

- Aplicación desplegada: https://bruma-cocina.onrender.com/
- Backend: https://github.com/LeaFerrero/bruma-cocina-backend
- Frontend: https://github.com/LeaFerrero/bruma-cocina-frontend
