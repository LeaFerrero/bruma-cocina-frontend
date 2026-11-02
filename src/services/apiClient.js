import AppError from "../utils/AppError.js";
import { API_URL } from "../config/env.js";

let isRedirecting = false;

const apiFetch = async (endpoint, options = {}) => {
  try {
    const isFormData = options.body instanceof FormData;

    const headers = {
      ...options.headers,
    };

    if (!isFormData) {
      headers["Content-type"] = "application/json";
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      credentials: "include",
      ...options,
      headers,
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

            const isTokenExpired = data.errorCode === "TOKEN_EXPIRED";
            window.location.href = isTokenExpired
              ? "/gestion/login?expired=true"
              : "/gestion/login";
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
