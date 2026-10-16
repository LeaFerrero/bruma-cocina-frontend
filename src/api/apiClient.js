import AppError from "../utils/AppError.js";
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Wrapper estandarizado para peticiones fetch.
 * Maneja automáticamente las credenciales, los headers y transforma
 * los errores nativos o del servidor en instancias de AppError.
 *
 * @param {string} endpoint - La ruta de la API (ej. "/users").
 * @param {object} [options={}] - Opciones nativas de fetch (method, body, etc.).
 * @returns {Promise<any>} Promesa que resuelve con los datos de la respuesta.
 */
const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      credentials: "include",
      ...options,
      headers: {
        "Content-type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (import.meta.env.MODE !== "production") {
        console.error(`[Error del Backend en ${endpoint}]:`, data);
      }

      throw new AppError(
        data.message || "Ocurrió un error en el servidor",
        response.status,
        data.status || "error",
        data.details || null,
        data.errorCode || "UNKNOWN_ERROR",
      );
    }

    return data;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error("Error de red capturado en apiFetch:", error.message);

    throw new AppError(
      "No se pudo conectar con el servidor",
      503,
      "error",
      null,
      "NETWORK_ERROR",
    );
  }
};

export default apiFetch;
