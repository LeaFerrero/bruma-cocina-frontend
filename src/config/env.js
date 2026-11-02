const rawUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

if (import.meta.env.PROD && !import.meta.env.VITE_BACKEND_URL) {
  console.warn("VITE_BACKEND_URL no está definida; se usa localhost.");
}

export const BACKEND_URL = rawUrl.replace(/\/+$/, "");
export const API_URL = `${BACKEND_URL}/api`;
