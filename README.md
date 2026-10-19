# Bruma Cocina — Frontend

Interfaz web del sistema de gestión de Bruma Cocina, un emprendimiento gastronómico dedicado a la producción y venta de viandas selladas al vacío y refrigeradas.

El sistema tiene como objetivo centralizar la gestión de pedidos, inventario, producción y cobros. Este repositorio contiene el frontend y se comunica con el backend mediante una API REST.

## Estado del desarrollo

Actualmente, el frontend incluye:

- Inicio y cierre de sesión.
- Verificación de sesión al cargar la aplicación.
- Protección de las rutas de gestión mediante autenticación.
- Gestión de usuarios: listado, búsqueda, registro, edición y eliminación.
- Gestión de insumos: listado, búsqueda, registro, edición y eliminación.
- Formularios con validación de datos.
- Notificaciones de resultados y errores.
- Ventanas de confirmación para eliminaciones.
- Componentes reutilizables de interfaz y navegación.

La ventana de ingreso de insumos permite seleccionar insumos y cantidades. El envío de esa operación al backend para actualizar el stock está pendiente de implementación.

Las interfaces de tienda online, pedidos, recetas, producción y caja todavía no están incluidas en esta versión.

### Verificaciones realizadas

En el entorno local se comprobó:

- La conexión del frontend con el backend.
- El inicio de sesión con un usuario válido.
- La conservación de la sesión al recargar la página.
- El cierre de sesión y el posterior ingreso.

Las operaciones de gestión de usuarios e insumos están implementadas en el código, pero sus pruebas funcionales completas y la persistencia de los cambios permanecen pendientes de verificación manual.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| React | Construcción de interfaces y componentes. |
| JavaScript | Lógica del frontend. |
| Vite | Entorno de desarrollo y compilación. |
| React Router | Navegación y definición de rutas. |
| CSS Modules y CSS global | Estilos de la aplicación. |
| Zod | Validación de formularios. |
| React Hot Toast | Notificaciones. |
| Fetch API | Comunicación con el backend. |

## Requisitos

- Git y acceso al repositorio.
- Node.js compatible con la versión de Vite declarada en `package.json`.
- npm.
- Backend de Bruma Cocina configurado y en ejecución.
- Un usuario válido en la base de datos utilizada por el backend.

## Instalación y ejecución local

### 1. Clonar el repositorio

Mediante SSH:

```bash
git clone git@github.com:LeaFerrero/bruma-cocina-frontend.git
cd bruma-cocina-frontend
```

Si el repositorio ya está clonado, abrir una terminal en su carpeta raíz.

### 2. Instalar las dependencias

```bash
npm ci
```

Este comando instala las dependencias de acuerdo con el archivo `package-lock.json`.

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del repositorio, al mismo nivel que `package.json`.

Para la configuración local probada:

```env
VITE_API_URL=http://localhost:3000/api
```

La variable contiene la dirección base de la API, incluido el prefijo `/api`. Debe escribirse sin una barra `/` al final.

El archivo `.env` está excluido del control de versiones. Las variables con prefijo `VITE_` son accesibles desde el navegador y no deben contener contraseñas, claves privadas ni otros secretos.

### 4. Iniciar el backend

Iniciar el backend en una terminal independiente, siguiendo las instrucciones de su repositorio:

[bruma-cocina-backend](https://github.com/LeaFerrero/bruma-cocina-backend)

La configuración local probada utiliza:

| Parámetro | Valor |
| --- | --- |
| Dirección del backend | `http://localhost:3000` |
| Prefijo de la API | `/api` |
| Origen permitido del frontend (`FRONTEND_URL` en el backend) | `http://localhost:5173` |

### 5. Iniciar el frontend

```bash
npm run dev
```

Abrir la dirección indicada por Vite en la terminal. En el entorno probado, la pantalla de acceso se encuentra en:

http://localhost:5173/gestion/login

Si Vite utiliza otro puerto, el origen permitido en el backend debe coincidir con la dirección utilizada por el frontend.

Después de crear o modificar el archivo `.env`, detener y volver a iniciar Vite para aplicar los cambios.

### 6. Iniciar sesión

Ingresar con un usuario válido de la base de datos del backend. El repositorio no incluye credenciales de acceso.

Los datos creados mediante la aplicación se almacenan en la base de datos configurada en el backend; no se sincronizan mediante Git ni GitHub.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Permite revisar localmente la versión compilada. |
| `npm run lint` | Ejecuta el análisis estático de código con ESLint. |

Para revisar la compilación de producción:

```bash
npm run build
npm run preview
```

La vista previa también necesita acceso al backend para utilizar las funcionalidades del sistema.

## Organización del código

| Carpeta o archivo | Contenido |
| --- | --- |
| `public/` | Recursos públicos. |
| `src/api/` | Cliente HTTP y funciones de acceso a la API. |
| `src/assets/` | Imágenes y recursos gráficos. |
| `src/auth/` | Formulario de inicio de sesión. |
| `src/components/layout/` | Estructura general, encabezado, menú lateral y pie de página. |
| `src/components/ui/` | Botones, tarjetas, formularios, campos y ventanas modales reutilizables. |
| `src/context/` | Estado compartido de autenticación. |
| `src/data/` | Datos de ejemplo. |
| `src/pages/` | Pantallas principales. |
| `src/styles/` | Estilos globales. |
| `src/supplies/` | Componentes de gestión e ingreso de insumos. |
| `src/users/` | Componentes de gestión de usuarios. |
| `src/utils/` | Utilidades, constantes y esquemas de validación. |
| `src/App.jsx` | Definición de rutas y protección del acceso. |
| `src/main.jsx` | Punto de entrada de la aplicación. |

## Rutas

| Ruta | Descripción | Acceso |
| --- | --- | --- |
| `/gestion/login` | Inicio de sesión. | Público. |
| `/gestion` | Redirección a la gestión de usuarios. | Requiere sesión. |
| `/gestion/usuarios` | Gestión de usuarios. | Requiere sesión. |
| `/gestion/insumos` | Gestión de insumos. | Requiere sesión. |

Actualmente, la protección de rutas comprueba la existencia de una sesión. La restricción de las vistas según el rol del usuario está pendiente de implementación en el frontend.

## Comunicación con la API

Las solicitudes se centralizan en `src/api/apiClient.js`, que utiliza `VITE_API_URL` y envía las credenciales mediante `credentials: "include"`.

Los módulos de acceso a la API son:

| Archivo | Responsabilidad |
| --- | --- |
| `loginApi.js` | Inicio, cierre y verificación de sesión. |
| `userApi.js` | Consulta, registro, edición y eliminación de usuarios. |
| `supplyApi.js` | Consulta, registro, edición y eliminación de insumos, además de la función de solicitud de ingreso de stock. |

Los endpoints de autenticación utilizados son `/login`, `/logout` y `/verify`, relativos a la dirección base de la API.

## Problemas frecuentes

### Las solicitudes contienen `undefined` en la dirección

Comprobar que el archivo `.env` esté en la raíz del frontend y contenga:

```env
VITE_API_URL=http://localhost:3000/api
```

Reiniciar Vite después de modificarlo.

### Aparece «No se pudo conectar con el servidor»

Comprobar:

- Que el backend esté en ejecución.
- Que `VITE_API_URL` coincida con la dirección y el prefijo de la API.
- Que el backend permita el origen del frontend y el uso de credenciales.

Consultar la pestaña **Red / Network** de las herramientas del navegador para identificar la solicitud que falla y su respuesta.

### Solo se muestra el inicio de sesión

Las pantallas de usuarios e insumos requieren autenticación. Acceder directamente a sus rutas sin una sesión activa redirige al inicio de sesión.