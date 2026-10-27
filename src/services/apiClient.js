import AppError from "../utils/AppError.js";
const API_URL = import.meta.env.VITE_API_URL;

// Bandera para evitar que múltiples peticiones concurrentes disparen errores superpuestos
let isRedirecting = false;

const apiFetch = async (endpoint, options = {}) => {
  try {
    // 1. Detectamos si el body es un FormData
    const isFormData = options.body instanceof FormData;

    // 2. Construimos los headers dinámicamente
    const headers = {
      ...options.headers,
    };

    // 3. Solo agregamos application/json si NO es FormData
    if (!isFormData) {
      headers["Content-type"] = "application/json";
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      credentials: "include",
      ...options,
      headers, // Usamos los headers condicionales
    });

    let data = {};
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      try {
        data = await response.json();
      } catch (e) {
        data = {};
      }
    }

    if (!response.ok) {
      if (
        response.status === 401 ||
        response.status === 403 ||
        data.errorCode === "TOKEN_EXPIRED" ||
        data.errorCode === "INVALID_TOKEN" ||
        data.errorCode === "UNAUTHORIZED" ||
        data.errorCode === "NO_TOKEN"
      ) {
        if (
          window.location.pathname.startsWith("/gestion") &&
          window.location.pathname !== "/gestion/login"
        ) {
          if (!isRedirecting) {
            isRedirecting = true;
            window.location.href = "/gestion/login?expired=true";
          }
          return new Promise(() => {});
        }
        return { success: false, unauthorized: true, data: null };
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
